export function bindNavigatorEvents(isLoggedIn) {
  const profileBtn = document.getElementById('profileBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const authBtn = document.getElementById('authBtn'); // 로그인/로그아웃 버튼

  if (!profileBtn || !dropdownMenu || !authBtn) return;

  // 드롭다운 토글
  profileBtn.onclick = (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
  };

  // 외부 클릭 시 드롭다운 닫기
  document.onclick = () => {
    dropdownMenu.classList.remove('show');
  };

  // 로그인/로그아웃 버튼 처리
  authBtn.onclick = async () => {
    if (isLoggedIn) {
      if (confirm('정말로 로그아웃하시겠습니까?')) {
        localStorage.removeItem('accessToken');
        try {
          await fetch('/api/v1/auth/logout', { method: 'POST', credentials: 'include' });
        } catch (err) {
          console.error('서버 로그아웃 실패', err);
        }
        window.location.href = '/pages/post/postList/postList.html';
      }
    } else {
      window.location.href = '/pages/auth/login/login.html';
    }
  };
}
