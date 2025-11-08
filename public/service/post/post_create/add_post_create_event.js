import { API_BASE } from "/config.js";


export function addPostCreateEvent() {
  const submitButton = document.querySelector(".btn_submit");
  if (submitButton) {
    submitButton.addEventListener("click", async () => {
      const title = document.querySelector(".post_title").value;
      const content = document.querySelector(".post_content").value;
      const imageInput = document.querySelector(".post_image");
      const imageFile = imageInput.files[0];
      let imageUrl = ""; // Default to empty string

      if (!title || !content) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
      }

      // If an image is selected, we need to handle its upload to get an imageUrl.
      // For now, I'll assume imageUrl is optional and can be an empty string.
      // If image upload is required, a separate API call would be needed here.
      if (imageFile) {
        alert("이미지 업로드는 별도의 API 호출이 필요합니다. 현재는 이미지 없이 게시글을 등록합니다.");
        // TODO: Implement image upload logic here to get imageUrl
        // For now, we'll proceed without an image URL.
      }

      const postData = {
        title: title,
        content: content,
        imageUrl: imageUrl, // Send empty string if no image or image upload not implemented
      };

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        alert('로그인이 필요합니다.');
        window.location.href = '/login'; // 로그인 페이지로 리디렉션
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/posts`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json', // Set Content-Type to application/json
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(postData), // Stringify the JSON object
        });

        if (response.ok) {
          const result = await response.json();
          alert(result.message || "게시글이 성공적으로 등록되었습니다!");
          window.location.href = "/posts"; // 게시글 목록 페이지로 이동
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