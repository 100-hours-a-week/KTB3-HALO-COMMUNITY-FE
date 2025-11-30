import { bindNavigatorEvents } from '/component/common/header/navigator/bindNavigatorEvents.js';

export function renderNavigator(rootEl) {
  const isLoggedIn = !!localStorage.getItem('accessToken'); // 로그인 여부 확인

  rootEl.innerHTML = `
    <div class="navigator_inner">
      <div class="navigator_left"></div>
      <div class="navigator_center">
        <a href="/posts" class="nav_logo">NOT ME</a>
      </div>
      <div class="navigator_right">
        <div class="profile_dropdown">
          <button class="profile_btn" id="profileBtn">
            <div class="profile_icon">
              <div class="profile_avatar">🐱</div>
            </div>
          </button>
          <div class="dropdown_menu" id="dropdownMenu">
            <a href="/account" class="dropdown_item">
              <span class="dropdown_icon">👤</span> 프로필
            </a>
            <a href="/users/edit-profile" class="dropdown_item">
              <span class="dropdown_icon">⚙️</span> 설정
            </a>
            <a href="/password" class="dropdown_item">
              <span class="dropdown_icon">🔒</span> 비밀번호 변경
            </a>
            <hr class="dropdown_divider">
            <button class="dropdown_item" id="authBtn">
              <span class="dropdown_icon">
                ${isLoggedIn ? '🚪' : '🔑'}
              </span>
              ${isLoggedIn ? '로그아웃' : '로그인'}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // 렌더링 후 이벤트 바인딩
  bindNavigatorEvents(isLoggedIn);
}
