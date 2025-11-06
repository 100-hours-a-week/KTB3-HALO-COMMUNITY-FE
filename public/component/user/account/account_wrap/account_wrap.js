export function renderAccountWrap(container) {
  container.innerHTML = `
    <div class="account_container">
      <h1 class="account_title">프로필</h1>
      
      <div class="profile_section">
        <label class="profile_label">프로필 사진*</label>
        <div class="profile_image_wrap">
          <div class="profile_image">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                 alt="프로필" 
                 class="profile_img" 
                 name="profileImage">
          </div>
          <button class="btn_change_profile">변경</button>
          <input type="file" id="profile_input" class="profile_input" accept="image/*" hidden>
        </div>
      </div>

      <div class="form_section">
        <div class="form_group">
          <label class="form_label">이메일</label>
          <input type="email" class="form_input" name="email" readonly>
        </div>

        <div class="form_group">
          <label class="form_label">닉네임</label>
          <input type="text" class="form_input" name="nickName" placeholder="닉네임을 입력하세요">
          <span class="helper_text">* 닉네임을 입력해주세요</span>
        </div>

        <div class="button_group">
          <button class="btn_primary">수정하기</button>
          <button class="btn_secondary">회원 탈퇴</button>
        </div>
      </div>

      <div class="logout_section">
        <button class="btn_logout">로그아웃</button>
      </div>
    </div>
  `;
}
