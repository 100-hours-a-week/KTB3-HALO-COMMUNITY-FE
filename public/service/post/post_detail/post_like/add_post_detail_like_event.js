import { API_BASE } from "/config.js";



export function addPostDetailLikeEvent() {
  const likeButton = document.getElementById('like_button');
  if (likeButton) {
    likeButton.addEventListener('click', async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return;
      }

      const postId = window.location.pathname.split('/').pop();
      const API_URL = `${API_BASE}/${postId}`;

      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result.message);
          window.location.reload();
        } else {
          const errorData = await response.json();
          console.error('Error liking post:', errorData);
        }
      } catch (error) {
        console.error('Error liking post:', error);
      }
    });
  }
}
