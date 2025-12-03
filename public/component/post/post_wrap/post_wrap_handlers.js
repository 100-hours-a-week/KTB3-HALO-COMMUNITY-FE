/**
 * 게시글 목록 래퍼 이벤트 핸들러 모듈
 */

/**
 * 게시글 작성 버튼 이벤트 바인딩
 * @param {HTMLElement} rootEl - 루트 요소
 */
export function bindPostCreateButton(rootEl) {
    const addBtn = rootEl.querySelector('.post-wrap__add-btn');
    
    if (!addBtn) {
        console.warn('게시글 작성 버튼을 찾을 수 없습니다.');
        return;
    }

    addBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        
        const isLoggedIn = !!localStorage.getItem('accessToken');
        
        if (!isLoggedIn) {
            alert('게시글을 작성하려면 로그인이 필요합니다.');
            window.location.href = '/auth/login';
            return;
        }
        
        window.location.href = '/posts/write';
    });
}



