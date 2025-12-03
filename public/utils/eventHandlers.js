/**
 * 이벤트 핸들러 유틸리티 모듈
 */

/**
 * 게시글 클릭 이벤트 바인딩
 * @param {NodeList|HTMLElement[]} elements - 바인딩할 요소들
 */
export function bindPostClickEvents(elements) {
    elements.forEach(item => {
        // 이미 바인딩된 요소는 스킵
        if (item.hasAttribute('data-event-bound')) {
            return;
        }

        item.setAttribute('data-event-bound', 'true');
        item.style.cursor = 'pointer';

        item.addEventListener('click', () => {
            const postId = item.getAttribute('data-post-id');
            if (postId) {
                window.location.href = `/posts/${postId}`;
            }
        });
    });
}

/**
 * 새로 추가된 게시글 요소만 필터링
 * @param {HTMLElement} container - 컨테이너 요소
 * @returns {NodeList} - 새로 추가된 요소들
 */
export function getUnboundPostItems(container) {
    return container.querySelectorAll('.post-item[data-post-id]:not([data-event-bound])');
}


