export function renderSignupWrap(rootEl) {
  rootEl.innerHTML = `

    <div class="input_item input_item_id">
      <label for="email">이메일</label>
      <input id="email" name="email" type="email" placeholder="이메일을 입력하세요" required />
    </div>

    <div class="input_item input_item_nickname">
      <label for="nickname">닉네임</label>
      <input id="nickname" name="nickname" type="text" placeholder="닉네임을 입력하세요" required />
    </div>

    <div class="input_item input_item_pw">
      <label for="password">비밀번호</label>
      <input id="password" name="password" type="password" placeholder="비밀번호를 입력하세요" required />
    </div>

    <div class="input_item input_item_pw_confirm">
      <label for="password_confirm">비밀번호 확인</label>
      <input id="password_confirm" name="password_confirm" type="password" placeholder="비밀번호를 다시 입력하세요" required />
    </div>

    <button type="button" class="btn_signup_button">회원가입</button>

    <p class="login_cta">
      이미 회원이신가요?
      <a href="/auth/login">로그인</a>
    </p>
  `;
}