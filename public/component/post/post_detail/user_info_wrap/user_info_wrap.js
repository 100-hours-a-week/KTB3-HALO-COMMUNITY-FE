export function renderUserInfoWrap(container, user = { nickname: "익명", createdAt: "" }) {
  container.innerHTML = `
    <div class="user_info_container">
      <div class="user_header">
        <div class="user_profile">
          <div class="user_avatar"></div>
          <div class="user_details">
            <span class="user_name">${user.nickname}</span>
            <span class="post_date">${new Date(user.createdAt).toLocaleString()}</span>
          </div>
        </div>
        <div class="action_buttons">
          <button class="btn_follow" onclick="location.href='/posts/${user.postId}/edit'">수정</button>
          <button class="btn_message">삭제</button>
        </div>
      </div>
    </div>
  `;
}
