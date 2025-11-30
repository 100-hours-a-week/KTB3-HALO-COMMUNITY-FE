export function renderLoginWrap(rootEl) {
  rootEl.innerHTML = `

    <div class="input_item input_item_id">
      <label for="email">이메일</label>
      <input id="email" name="email" type="email" placeholder="이메일을 입력하세요" required />
    </div>

    <div class="input_item input_item_pw">
      <label for="password">비밀번호</label>
      <input id="password" name="password" type="password" placeholder="비밀번호를 입력하세요" required />
    </div>

    <button type="button" class="btn_login_button">로그인</button>

    <p class="signup_cta">
      아직 회원이 아니신가요?
      <a href="/auth/signup">회원가입</a>
    </p>
  `;
}
