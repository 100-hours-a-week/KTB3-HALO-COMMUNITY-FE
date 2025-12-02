export function renderStatsWrap(container, stats = { likeCount: 0, viewCount: 0, commentCount: 0 }, isLiked = false) {
  container.innerHTML = `
    <div class="stats_container">
      <div class="stat_card like_card ${isLiked ? 'liked' : ''}" id="like_stat_card">
        <div class="stat_number">${stats.likeCount}</div>
        <div class="stat_label">좋아요</div>
      </div>
      <div class="stat_card">
        <div class="stat_number">${stats.viewCount}</div>
        <div class="stat_label">조회수</div>
      </div>
      <div class="stat_card">
        <div class="stat_number">${stats.commentCount}</div>
        <div class="stat_label">댓글</div>
      </div>
    </div>
  `;
}
