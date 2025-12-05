// 개별 게시글 HTML 생성 (카드 형식)
export function renderPostItem(post) {
    // 내용 미리보기 생성 (HTML 태그 제거, 100자 제한)
    const getContentPreview = (content) => {
        if (!content) return '';
        const text = content.replace(/<[^>]*>/g, ''); // HTML 태그 제거
        return text.length > 100 ? text.substring(0, 100) + '...' : text;
    };

    // 시간 표시 함수 (몇 시간 전 형식)
    const getTimeAgo = (dateString) => {
        if (!dateString) return '';
        const now = new Date();
        const postDate = new Date(dateString);
        
        // 유효하지 않은 날짜 체크
        if (isNaN(postDate.getTime())) return '';
        
        const diffMs = now - postDate;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return '방금 전';
        if (diffMins < 60) return `${diffMins}분 전`;
        if (diffHours < 24) return `${diffHours}시간 전`;
        if (diffDays < 30) return `${diffDays}일 전`;
        
        // 30일 이상이면 날짜 표시
        const year = postDate.getFullYear();
        const month = String(postDate.getMonth() + 1).padStart(2, '0');
        const day = String(postDate.getDate()).padStart(2, '0');
        return `${year}. ${month}. ${day}.`;
    };

    // 프로필 이미지 또는 기본 이미지
    const profileImg = (post.profileImageUrl && post.profileImageUrl.trim() !== '') 
        ? post.profileImageUrl 
        : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNFNUU3RUIiLz4KPHBhdGggZD0iTTIwIDIwQzIyLjc2MTQgMjAgMjUgMTcuNzYxNCAyNSAxNUM1NSAxNy43NjE0IDIyLjc2MTQgMTUgMjAgMTVDMTcuMjM4NiAxNSAxNSAxNy4yMzg2IDE1IDIwQzE1IDIyLzc2MTQgMTcuMjM4NiAyNSAyMCAyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
    
    // 이미지 URL 처리 (null, undefined, 빈 문자열 체크)
    // 백엔드에서 postImageUrl 또는 imageUrl 필드로 전달됨
    let imageUrl = '';
    if (post.postImageUrl && typeof post.postImageUrl === 'string' && post.postImageUrl.trim() !== '') {
        imageUrl = post.postImageUrl.trim();
    } else if (post.imageUrl && typeof post.imageUrl === 'string' && post.imageUrl.trim() !== '') {
        imageUrl = post.imageUrl.trim();
    } else {
        // 플레이스홀더 이미지 (SVG base64)
        imageUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMjUgMTAwTDE1MCA3NUwxNzUgMTAwTDIwMCA3NUwyMjUgMTAwVjEzMEgxMjVWMTAwWiIgZmlsbD0iI0Q1RDVENSIvPgo8Y2lyY2xlIGN4PSIxNjAiIGN5PSIxMjAiIHI9IjIwIiBmaWxsPSIjRDVENUQ1Ii8+Cjwvc3ZnPg==';
    }

    return `
      <div class="post-item" data-post-id="${post.id}">
        <div class="post-item__content">
          <div class="post-item__author">
            <img src="${profileImg}" alt="${post.author || '작성자'}" class="post-item__author-avatar" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNFNUU3RUIiLz4KPHBhdGggZD0iTTIwIDIwQzIyLjc2MTQgMjAgMjUgMTcuNzYxNCAyNSAxNUM1NSAxNy43NjE0IDIyLjc2MTQgMTUgMjAgMTVDMTcuMjM4NiAxNSAxNSAxNy4yMzg2IDE1IDIwQzE1IDIyLzc2MTQgMTcuMjM4NiAyNSAyMCAyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'">
            <div class="post-item__author-info">
              <span class="post-item__author-name">${post.author || '익명'}</span>
              <span class="post-item__author-time">${getTimeAgo(post.createdAt || post.date)}</span>
            </div>
          </div>
          <h3 class="post-item__title">${post.title || '제목 없음'}</h3>
          ${post.content ? `<p class="post-item__preview">${getContentPreview(post.content)}</p>` : ''}
          <div class="post-item__stats">
            <div class="post-item__stat">
              <span class="post-item__stat-label">공감</span>
              <span>${post.likeCount || post.likes || 0}</span>
            </div>
            <div class="post-item__stat">
              <span class="post-item__stat-label">댓글</span>
              <span>${post.commentCount || post.comments || 0}</span>
            </div>
            <div class="post-item__stat">
              <span class="post-item__stat-label">조회수</span>
              <span>${post.viewCount || post.views || 0}</span>
            </div>
          </div>
        </div>
        <div class="post-item__image">
          <img src="${imageUrl}" alt="${post.title || '게시글 이미지'}" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMjUgMTAwTDE1MCA3NUwxNzUgMTAwTDIwMCA3NUwyMjUgMTAwVjEzMEgxMjVWMTAwWiIgZmlsbD0iI0Q1RDVENSIvPgo8Y2lyY2xlIGN4PSIxNjAiIGN5PSIxMjAiIHI9IjIwIiBmaWxsPSIjRDVENUQ1Ii8+Cjwvc3ZnPg=='">
        </div>
      </div>
    `;
}
