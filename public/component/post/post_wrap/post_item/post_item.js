// 개별 게시글 HTML 생성 (카드 형식)
export function renderPostItem(post) {
    // 내용 미리보기 생성 (HTML 태그 제거, 100자 제한)
    const getContentPreview = (content) => {
        if (!content) return '';
        const text = content.replace(/<[^>]*>/g, ''); // HTML 태그 제거
        return text.length > 100 ? text.substring(0, 100) + '...' : text;
    };

    // 프로필 이미지 또는 기본 이미지
    const profileImg = (post.profileImageUrl && post.profileImageUrl.trim() !== '') 
        ? post.profileImageUrl 
        : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNFNUU3RUIiLz4KPHBhdGggZD0iTTIwIDIwQzIyLjc2MTQgMjAgMjUgMTcuNzYxNCAyNSAxNUM1NSAxNy43NjE0IDIyLjc2MTQgMTUgMjAgMTVDMTcuMjM4NiAxNSAxNSAxNy4yMzg2IDE1IDIwQzE1IDIyLjc2MTQgMTcuMjM4NiAyNSAyMCAyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
    
    // 이미지 URL 처리 (null, undefined, 빈 문자열 체크)
    // 백엔드에서 postImageUrl 필드로 전달됨
    let imageUrl = '';
    if (post.postImageUrl && typeof post.postImageUrl === 'string' && post.postImageUrl.trim() !== '') {
        imageUrl = post.postImageUrl.trim();
    } else {
        // 플레이스홀더 이미지 (SVG base64)
        imageUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMjUgMTAwTDE1MCA3NUwxNzUgMTAwTDIwMCA3NUwyMjUgMTAwVjEzMEgxMjVWMTAwWiIgZmlsbD0iI0Q1RDVENSIvPgo8Y2lyY2xlIGN4PSIxNjAiIGN5PSIxMjAiIHI9IjIwIiBmaWxsPSIjRDVENUQ1Ii8+Cjwvc3ZnPg==';
    }

    return `
      <div class="post-item" data-post-id="${post.id}">
        <div class="post-item__image">
          <img src="${imageUrl}" alt="${post.title || '게시글 이미지'}" loading="lazy" style="display: block; width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMjUgMTAwTDE1MCA3NUwxNzUgMTAwTDIwMCA3NUwyMjUgMTAwVjEzMEgxMjVWMTAwWiIgZmlsbD0iI0Q1RDVENSIvPgo8Y2lyY2xlIGN4PSIxNjAiIGN5PSIxMjAiIHI9IjIwIiBmaWxsPSIjRDVENUQ1Ii8+Cjwvc3ZnPg=='">
        </div>
        <div class="post-item__content">
          <div class="post-item__author">
            <img src="${profileImg}" alt="${post.author || '작성자'}" class="post-item__author-avatar" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNFNUU3RUIiLz4KPHBhdGggZD0iTTIwIDIwQzIyLjc2MTQgMjAgMjUgMTcuNzYxNCAyNSAxNUM1NSAxNy43NjE0IDIyLjc2MTQgMTUgMjAgMTVDMTcuMjM4NiAxNSAxNSAxNy4yMzg2IDE1IDIwQzE1IDIyLjc2MTQgMTcuMjM4NiAyNSAyMCAyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'">
            <div class="post-item__author-info">
              <span class="post-item__author-name">${post.author || '익명'}</span>
              <span class="post-item__author-desc">커뮤니티 멤버</span>
            </div>
          </div>
          <h3 class="post-item__title">${post.title || '제목 없음'}</h3>
          ${post.content ? `<p class="post-item__preview">${getContentPreview(post.content)}</p>` : ''}
          <div class="post-item__stats">
            <div class="post-item__stat">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3C4.667 3 2.073 5.28 1 8.5C2.073 11.72 4.667 14 8 14C11.333 14 13.927 11.72 15 8.5C13.927 5.28 11.333 3 8 3ZM8 11.5C6.621 11.5 5.5 10.379 5.5 9C5.5 7.621 6.621 6.5 8 6.5C9.379 6.5 10.5 7.621 10.5 9C10.5 10.379 9.379 11.5 8 11.5Z" fill="#6C757D"/>
              </svg>
              <span>${post.views || 0}</span>
            </div>
            <div class="post-item__stat">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 13.5C8 13.5 2.5 9.5 2.5 5.75C2.5 4.09 3.84 2.75 5.5 2.75C6.57 2.75 7.53 3.27 8 4.08C8.47 3.27 9.43 2.75 10.5 2.75C12.16 2.75 13.5 4.09 13.5 5.75C13.5 9.5 8 13.5 8 13.5Z" fill="#DC3545"/>
              </svg>
              <span>${post.likes || 0}</span>
            </div>
            <div class="post-item__stat">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33333 2.66667C2.6 2.66667 2 3.26667 2 4V9.33333C2 10.0667 2.6 10.6667 3.33333 10.6667H4V13.3333L6.66667 10.6667H11.3333C12.0667 10.6667 12.6667 10.0667 12.6667 9.33333V4C12.6667 3.26667 12.0667 2.66667 11.3333 2.66667H3.33333Z" fill="#6C757D"/>
              </svg>
              <span>${post.comments || 0}</span>
            </div>
          </div>
        </div>
      </div>
    `;
}