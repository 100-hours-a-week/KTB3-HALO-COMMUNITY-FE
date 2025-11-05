export function addLogoutEvent() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (!logoutBtn) return; // 요소가 없으면 종료

    logoutBtn.addEventListener('click', () => {
        if (confirm('정말로 로그아웃하시겠습니까?')) {
            localStorage.removeItem('accessToken');
            window.location.href = '../login';
        }
    });
}
