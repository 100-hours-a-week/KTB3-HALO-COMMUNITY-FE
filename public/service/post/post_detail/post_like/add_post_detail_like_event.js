import { API_BASE } from "/config.js";
import { fetchWithAuth } from "/utils/fetchWithAuth.js";

export function addPostDetailLikeEvent() {
  const likeCard = document.getElementById('like_stat_card');
  if (!likeCard) return;

  likeCard.addEventListener('click', async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      window.location.href = '/auth/login';
      return;
    }

    const postId = window.location.pathname.split('/').pop();
    
    // 좋아요 상태 확인
    const isLiked = likeCard.classList.contains('liked');
    
    // 카드 비활성화 (중복 클릭 방지)
    likeCard.style.pointerEvents = 'none';
    likeCard.style.opacity = '0.6';
    likeCard.style.cursor = 'wait';

    try {
      const response = await fetchWithAuth(`/like/posts/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const result = await response.json();
        const { postId, liked } = result.data;
        
        // 좋아요 수 업데이트
        const statNumber = document.querySelector('#like_stat_card .stat_number');
        if (statNumber) {
          const currentCount = parseInt(statNumber.textContent) || 0;
          const newCount = liked ? currentCount + 1 : Math.max(0, currentCount - 1);
          statNumber.textContent = newCount;
        }

        // 카드 상태 업데이트
        if (liked) {
          likeCard.classList.add('liked');
        } else {
          likeCard.classList.remove('liked');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || '좋아요 처리에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error liking post:', error);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    } finally {
      // 카드 활성화
      likeCard.style.pointerEvents = 'auto';
      likeCard.style.opacity = '1';
      likeCard.style.cursor = 'pointer';
    }
  });
}
