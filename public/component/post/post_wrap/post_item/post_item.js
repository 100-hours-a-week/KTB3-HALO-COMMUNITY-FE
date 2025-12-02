// 개별 게시글 HTML 생성 (테이블 행 형식)
export function renderPostItem(post) {
    // 날짜 포맷팅 (MM.DD 형식)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}.${day}`;
    };

    // 시간 포맷팅 (HH:mm 형식)
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const date = new Date(post.date);
    const isToday = date.toDateString() === new Date().toDateString();
    const dateDisplay = isToday ? formatTime(post.date) : formatDate(post.date);

    return `
      <tr class="post-item" data-post-id="${post.id}">
        <td class="col-number">${post.id}</td>
        <td class="col-board">커뮤니티</td>
        <td class="col-title">
          <span class="post-title">${post.title}</span>
        </td>
        <td class="col-date">${dateDisplay}</td>
        <td class="col-views">${post.views}</td>
      </tr>
    `;
}