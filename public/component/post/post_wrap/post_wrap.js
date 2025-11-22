// post_item에서 renderPostItem 가져오기
import { renderPostItem } from './post_item/post_item.js';

// 더미 데이터
const dummyPosts = [
    
];

// post_wrap 전체를 렌더링 (네비게이터처럼 컨테이너 받아서 렌더링)
// post_wrap 전체를 렌더링 (네비게이터처럼 컨테이너 받아서 렌더링)
export function renderPostWrap(rootEl) {
  if (!rootEl) {
      console.error('rootEl을 찾을 수 없습니다!');
      return;
  }

  // 모든 게시글 HTML을 합쳐서 만들기
  const postsHTML = dummyPosts.map(post => renderPostItem(post)).join('');

  // post_wrap 전체 HTML 구조 생성
  rootEl.innerHTML = `
  <div class="post-wrap">
    <div class="post-wrap__header">
      <span class="post-wrap__greeting">평소 하고싶었던 말을 적어봐</span>
      <button class="post-wrap__add-btn">게시글 작성</button>
    </div>
    <div class="post-wrap__list">
      ${postsHTML}
    </div>
  </div>
  `;

  // 이벤트 바인딩
  const addBtn = rootEl.querySelector('.post-wrap__add-btn');
  addBtn?.addEventListener('click', (event) => {
      event.stopPropagation(); // 이벤트 전파 방지
      const isLoggedIn = !!localStorage.getItem('accessToken');
      if (!isLoggedIn) {
          alert('게시글을 작성하려면 로그인이 필요합니다.');
          window.location.href = 'auth/login';
          return;
      }
      window.location.href = '/posts/write';
  });

  const postItems = rootEl.querySelectorAll('.post-item');
  postItems.forEach(item => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
          const postId = item.getAttribute('data-post-id');
          window.location.href = `/posts/${postId}`;
      });
  });
}

// 이벤트 바인딩 함수
function bindEvents(rootEl) {
    // 게시글 작성 버튼 이벤트
    const addBtn = rootEl.querySelector('.post-wrap__add-btn');
    addBtn?.addEventListener('click', () => {
        window.location.href = '/posts/write';
    });

    // 게시글 클릭 이벤트
    const postItems = rootEl.querySelectorAll('.post-item');
    postItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const postId = item.getAttribute('data-post-id');
            window.location.href = `/posts/${postId}`;
        });
    });
}