import { API_BASE } from "/config.js";

export async function addPostUpdateEvent(postId) {
  if (!postId) {
    console.error("postId가 필요합니다.");
    return;
  }

  // 1. 기존 게시글 데이터를 가져와서 폼을 미리 채웁니다.
  const token = localStorage.getItem("accessToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    window.location.href = "/login";
    return;
  }

  let post; // 업데이트 이벤트 리스너에서 post 데이터에 접근할 수 있도록 함수 스코프에 변수를 선언합니다.

  try {
    const response = await fetch(`${API_BASE}/posts/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "게시글 정보를 불러오는데 실패했습니다.");
    }

    const responseData = await response.json();
    post = responseData.data;

    // 폼 필드를 미리 채웁니다.
    document.querySelector(".title_input").value = post.title; // 제목 입력 필드의 클래스로 가정
    document.querySelector(".article_textarea").value = post.content; // 내용 입력 필드의 클래스로 가정
    // 기존 이미지가 있는 경우, 표시하고 변경할 수 있는 옵션을 제공할 수 있습니다.
    // 지금은 텍스트 필드만 미리 채웁니다.

  } catch (error) {
    console.error("게시글 정보 로드 중 오류 발생:", error);
    alert(`게시글 정보 로드 실패: ${error.message}`);
    return;
  }

  // 2. 게시글 수정을 위한 폼 제출을 처리합니다.
  const updateButton = document.querySelector(".btn_submit"); // 이 클래스를 가진 버튼으로 가정
  if (updateButton) {
    updateButton.addEventListener("click", async () => {
      const title = document.querySelector(".post_title_input").value;
      const content = document.querySelector(".post_content_textarea").value;
      const imageInput = document.querySelector(".image_input"); // 이미지 입력 필드의 클래스로 가정
      const imageFile = imageInput.files[0];

      if (!title || !content) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
      }

      // 새 이미지를 선택한 경우, 먼저 업로드하여 새 imageUrl을 받아야 합니다.
      // 지금은 이미지 업로드가 별도의 단계이거나 이 업데이트에서 처리되지 않는다고 가정합니다.
      if (imageFile) {
        alert("새 이미지 업로드는 별도의 API 호출이 필요합니다. 현재는 기존 이미지 URL을 유지합니다.");
        // TODO: 새 imageUrl을 얻기 위한 이미지 업로드 로직 구현
      }

      const updatedFields = {};
      if (title !== post.title) {
        updatedFields.title = title;
      }
      if (content !== post.content) {
        updatedFields.content = content;
      }
      // TODO: imageUrl 변경 처리 로직 추가 필요

      if (Object.keys(updatedFields).length === 0) {
        alert("변경된 내용이 없습니다.");
        return;
      }

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/posts/${postId}`, {
          method: "PATCH", // 부분 업데이트를 위해 PUT 대신 PATCH를 사용합니다.
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
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