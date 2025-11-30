// 개별 게시글 HTML 생성 (문자열로 반환)
export function renderPostItem(post) {
    return `
      <div class="post-item" data-post-id="${post.id}">
        <div class="post-item__header">
          <h3 class="post-item__title">${post.title}</h3>
          <span class="post-item__date">${post.date}</span>
        </div>
        
        <div class="post-item__stats">
          <span>좋아요 ${post.likes}</span>
          <span>댓글 ${post.comments}</span>
          <span>조회수 ${post.views}</span>
        </div>
        
        <div class="post-item__author">
          <div class="post-item__author-img"></div>
          <span class="post-item__author-name">${post.author}</span>
        </div>
      </div>
    `;
}