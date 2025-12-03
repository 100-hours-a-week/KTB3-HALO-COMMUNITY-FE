import { API_BASE } from "/config.js";
import { post_image_lambda_url } from "/config.js";
import { setupImagePreview } from "/utils/imagePreview.js";

export function addPostCreateEvent() {
  // 이미지 미리보기 기능 설정
  setupImagePreview(
    ".post_image",
    ".image_preview",
    ".image_placeholder",
    ".btn_image_upload"
  );

  const imageInput = document.querySelector(".post_image");

  const submitButton = document.querySelector(".btn_submit");
  if (submitButton) {
    submitButton.addEventListener("click", async () => {
      const title = document.querySelector(".post_title").value;
      const content = document.querySelector(".post_content").value;
      const imageFile = imageInput?.files[0];
      let imageUrl = ""; // Default to empty string

      if (!title || !content) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
      }

      // 이미지가 선택된 경우 Lambda로 업로드
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
          imageUrl = uploadResult.data.filePath; // Lambda에서 반환된 S3 이미지 URL
        } catch (error) {
          console.error("이미지 업로드 중 오류 발생:", error);
          alert("이미지 업로드 중 오류가 발생했습니다.");
          return;
        }
      }

      const postData = {
        title: title,
        content: content,
        imageUrl: imageUrl, // 업로드된 이미지 URL 포함
      };

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        alert('로그인이 필요합니다.');
        window.location.href = '/auth/login';
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/posts`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          const result = await response.json();
          alert(result.message || "게시글이 성공적으로 등록되었습니다!");
          window.location.href = "/posts";
        } else {
          const errorData = await response.json();
          alert(`게시글 등록 실패: ${errorData.message || response.statusText}`);
        }
      } catch (error) {
        console.error("게시글 등록 중 오류 발생:", error);
        alert("게시글 등록 중 오류가 발생했습니다.");
      }
    });
  }
}
