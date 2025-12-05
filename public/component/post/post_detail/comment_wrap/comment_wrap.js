export function renderCommentWrap(container, comments = []) {
  container.innerHTML = `
    <div class="comment_container">
      <div class="comment_input_wrap">
        <input type="text" class="comment_input" placeholder="댓글을 남겨주세요!">
        <button class="btn_submit">댓글 등록</button>
      </div>
      
      <div class="comment_list">
        ${comments
          .map(
            (comment) => `
          <div class="comment_item" data-comment-id="${comment.commentId}">
            <div class="comment_profile">
              <div class="comment_avatar">
                ${comment.profileImageUrl 
                  ? `<img src="${comment.profileImageUrl}" alt="${comment.nickname || '작성자'}" onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, rgba(26, 37, 48, 0.3) 0%, rgba(37, 48, 64, 0.2) 100%)';" />` 
                  : ''}
              </div>
              <div class="comment_info">
                <div class="comment_header">
                  <span class="comment_author">${comment.nickname || "익명"}</span>
                  <span class="comment_date">
                    ${
                      comment.createdAt
                        ? new Date(comment.createdAt).toLocaleString()
                        : ""
                    }
                  </span>
                </div>
                <p class="comment_text">${comment.content ?? ""}</p>
              </div>
            </div>
            <div class="comment_actions">
              <button class="btn_edit" data-comment-id="${comment.commentId}">수정</button>
              <button class="btn_delete" data-comment-id="${comment.commentId}">삭제</button>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
}
