export function addPostDeleteEvent() {
  const deleteButton = document.querySelector(".btn_message"); // Assuming a delete button with this class
  if (deleteButton) {
    deleteButton.addEventListener("click", async () => {
      const postId = window.location.pathname.split('/').pop(); // Extract postId from URL like /posts/{postId}

      if (!postId || isNaN(postId)) {
        alert("유효하지 않은 게시글 ID입니다.");
        return;
      }

      if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
        return; // User cancelled deletion
      }

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/v1/posts/${postId}`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          alert("게시글이 성공적으로 삭제되었습니다.");
          window.location.href = "/posts"; // Redirect to post list page
        } else {
          const errorData = await response.json();
          alert(`게시글 삭제 실패: ${errorData.message || response.statusText}`);
        }
      } catch (error) {
        console.error("게시글 삭제 중 오류 발생:", error);
        alert("게시글 삭제 중 오류가 발생했습니다.");
      }
    });
  }
}