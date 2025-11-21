export function renderFindWrap(rootEl) {
  rootEl.innerHTML = `
    <div class="find_wrap">
      <a href="#" class="find_link">비밀번호 찾기</a>
      <span class="divider">|</span>
      <a href="#" class="find_link">아이디 찾기</a>
      <span class="divider">|</span>
      <a href="/auth/signup" class="find_link">회원가입</a>
    </div>
  `;
}
