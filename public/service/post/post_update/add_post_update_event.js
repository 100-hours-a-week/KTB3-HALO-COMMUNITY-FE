import { API_BASE } from "/config.js";
import { post_image_lambda_url } from "/config.js";
import { setupImagePreview, displayImageUrlPreview } from "/utils/imagePreview.js";
import { fetchWithAuth } from "/utils/fetchWithAuth.js";

export async function addPostUpdateEvent(postId) {
  if (!postId) {
    console.error("postId가 필요합니다.");
    return;
  }

  // 1. 로그인 체크
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    alert('로그인이 필요합니다.');
    window.location.href = '/auth/login';
    return;
  }

  // 2. 기존 게시글 데이터를 가져와서 폼을 미리 채웁니다.
  let post; // 업데이트 이벤트 리스너에서 post 데이터에 접근할 수 있도록 함수 스코프에 변수를 선언합니다.

  try {
    const response = await fetchWithAuth(`/posts/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "게시글 정보를 불러오는데 실패했습니다.");
      window.location.href = `/posts/${postId}`;
      return;
    }

    const responseData = await response.json();
    post = responseData.data;

    // 3. 권한 확인: 게시글 수정 API를 호출해서 권한 확인 (변경사항 없이 호출)
    //    BE에서 작성자만 수정 가능하도록 체크하므로, 권한이 없으면 에러 발생
    try {
      const permissionCheckResponse = await fetchWithAuth(`/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          imageUrl: post.imageUrl
        })
      });

      if (!permissionCheckResponse.ok) {
        const errorData = await permissionCheckResponse.json();
        // 권한이 없거나 게시글이 없는 경우
        if (permissionCheckResponse.status === 403 || permissionCheckResponse.status === 401) {
          alert('수정 권한이 없습니다. 본인이 작성한 게시글만 수정할 수 있습니다.');
          window.location.href = `/posts/${postId}`;
          return;
        }
        alert(errorData.message || "게시글 수정 권한을 확인할 수 없습니다.");
        window.location.href = `/posts/${postId}`;
        return;
      }
    } catch (permissionError) {
      console.error("권한 확인 중 오류 발생:", permissionError);
      alert("게시글 수정 권한을 확인할 수 없습니다.");
      window.location.href = `/posts/${postId}`;
      return;
    }

    // 폼 필드를 미리 채웁니다.
    document.querySelector(".title_input").value = post.title; // 제목 입력 필드의 클래스로 가정
    document.querySelector(".article_textarea").value = post.content; // 내용 입력 필드의 클래스로 가정
    
    // 기존 이미지가 있는 경우 미리보기 표시
    const imagePreview = document.querySelector(".image_preview");
    const imagePlaceholder = document.querySelector(".image_placeholder");
    if (post.imageUrl) {
      displayImageUrlPreview(post.imageUrl, imagePreview, imagePlaceholder, "기존 이미지");
    }

  } catch (error) {
    console.error("게시글 정보 로드 중 오류 발생:", error);
    alert(`게시글 정보 로드 실패: ${error.message}`);
    return;
  }

  // 이미지 미리보기 기능 설정
  setupImagePreview(
    "#image_input",
    ".image_preview",
    ".image_placeholder",
    ".btn_image_upload"
  );

  // 2. 게시글 수정을 위한 폼 제출을 처리합니다.
  const updateButton = document.querySelector(".btn_submit"); // 이 클래스를 가진 버튼으로 가정
  if (updateButton) {
    updateButton.addEventListener("click", async () => {
      const title = document.querySelector(".title_input").value;
      const content = document.querySelector(".article_textarea").value;
      const imageInput = document.querySelector(".image_input"); // 이미지 입력 필드의 클래스로 가정
      const imageFile = imageInput.files[0];

      if (!title || !content) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
      }

      let imageUrl = post.imageUrl || ""; // 기본값은 기존 이미지 URL

      // 새 이미지를 선택한 경우 Lambda로 업로드
      if (imageFile) {
        const formData = new FormData();
        formData.append("profileImage", imageFile);

        try {
          const uploadResponse = await fetch(
            post_image_lambda_url,
            { method: "POST", body: formData }
          );

          if (!uploadResponse.ok) {
            alert("이미지 업로드 실패");
            return;
          }

          const uploadResult = await uploadResponse.json();
          imageUrl = uploadResult.data?.filePath || uploadResult.data?.imageUrl || uploadResult.filePath || "";
        } catch (error) {
          console.error("이미지 업로드 중 오류 발생:", error);
          alert("이미지 업로드 중 오류가 발생했습니다.");
          return;
        }
      }

      const updatedFields = {};
      if (title !== post.title) {
        updatedFields.title = title;
      }
      if (content !== post.content) {
        updatedFields.content = content;
      }
      // 이미지가 변경되었거나 새로 업로드된 경우 imageUrl 업데이트
      if (imageUrl !== (post.imageUrl || "")) {
        updatedFields.imageUrl = imageUrl;
      }

      if (Object.keys(updatedFields).length === 0) {
        alert("변경된 내용이 없습니다.");
        return;
      }

      try {
        const response = await fetchWithAuth(`/posts/${postId}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFields),
        });

        if (response.ok) {
          const result = await response.json();
          alert(result.message || "게시글이 성공적으로 수정되었습니다!");
          window.location.href = `/posts/${postId}`; // 수정 후 게시글 상세 페이지로 이동합니다.
        } else {
          const errorData = await response.json();
          alert(`게시글 수정 실패: ${errorData.message || response.statusText}`);
        }
      } catch (error) {
        console.error("게시글 수정 중 오류 발생:", error);
        alert("게시글 수정 중 오류가 발생했습니다.");
      }
    });
  }
}