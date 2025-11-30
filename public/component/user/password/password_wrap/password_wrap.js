export function renderPasswordWrap(container) {
  container.innerHTML = `
    <div class="password_container">
      <h1 class="password_title">비밀번호 수정</h1>
      
      <div class="form_section">
        <div class="form_group">
          <label class="form_label">현재 비밀번호</label>
          <input type="password" class="form_input" placeholder="현재 비밀번호를 입력하세요">
          <span class="helper_text">* 현재 비밀번호를 입력해주세요</span>
        </div>

        <div class="form_group">
          <label class="form_label">새 비밀번호</label>
          <input type="password" class="form_input" placeholder="새 비밀번호를 입력하세요">
          <span class="helper_text">* 새 비밀번호를 입력해주세요</span>
        </div>

        <div class="form_group">
          <label class="form_label">비밀번호 확인</label>
          <input type="password" class="form_input" placeholder="비밀번호를 한번 더 입력하세요">
          <span class="helper_text">* 새 비밀번호를 확인해주세요</span>
        </div>

        <div class="button_section">
          <button class="btn_submit">수정하기</button>
        </div>
      </div>
    </div>
  `;
}
