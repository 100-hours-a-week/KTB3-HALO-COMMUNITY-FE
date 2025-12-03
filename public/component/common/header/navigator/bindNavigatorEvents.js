
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

  // 설정 메뉴 클릭 이벤트
  const settingLink = dropdownMenu.querySelector('a[href="/users/edit-profile"]');
  if (settingLink) {
    settingLink.addEventListener('click', (e) => {
      e.preventDefault();
      dropdownMenu.classList.remove('show');
      alert('추후 개발될 예정입니다.');
    });
  }

  // 로그인/로그아웃 이벤트 분리 호출
  addLogoutEvent(authBtn, isLoggedIn);
}



import { API_BASE } from "/config.js";


function addLogoutEvent(authBtn, isLoggedIn) {
  if (!authBtn) return;

  authBtn.onclick = async () => {
    if (isLoggedIn) {
      if (confirm('정말로 로그아웃하시겠습니까?')) {
        try {
          const token = localStorage.getItem('accessToken');

          await fetch(`${API_BASE}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

        } catch (err) {
          console.error('서버 로그아웃 실패', err);
        }
        localStorage.removeItem('accessToken');
        window.location.href = '/pages/post/postList/postList.html';
      }
    } else {
      window.location.href = '/pages/auth/login/login.html';
    }
  };
}