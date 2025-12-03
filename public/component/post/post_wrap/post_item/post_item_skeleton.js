// 게시글 카드 스켈레톤 UI - CLS 0을 위한 고정 레이아웃
export function renderPostItemSkeleton() {
    return `
      <div class="post-item post-item--skeleton">
        <div class="post-item__image">
          <div class="skeleton-image"></div>
        </div>
        <div class="post-item__content">
          <div class="post-item__author">
            <div class="skeleton-avatar"></div>
            <div class="post-item__author-info">
              <div class="skeleton-text skeleton-text--name"></div>
              <div class="skeleton-text skeleton-text--desc"></div>
            </div>
          </div>
          <div class="skeleton-text skeleton-text--title"></div>
          <div class="skeleton-text skeleton-text--title"></div>
          <div class="skeleton-text skeleton-text--content"></div>
          <div class="skeleton-text skeleton-text--content"></div>
          <div class="post-item__stats">
            <div class="skeleton-text skeleton-text--stat"></div>
            <div class="skeleton-text skeleton-text--stat"></div>
            <div class="skeleton-text skeleton-text--stat"></div>
          </div>
        </div>
      </div>
    `;
}


