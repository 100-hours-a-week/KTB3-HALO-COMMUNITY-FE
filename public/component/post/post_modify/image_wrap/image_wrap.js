export function renderImageWrap(container) {
    container.innerHTML = `
      <div class="image_modify_container">
        <label class="image_label">이미지</label>
        <div class="image_preview">
          <span class="image_placeholder">이미지를 선택해주세요</span>
        </div>
        <input type="file" id="image_input" class="image_input" accept="image/*" hidden>
        <button class="btn_image_upload" onclick="document.getElementById('image_input').click()">
          이미지 업로드
        </button>
      </div>
    `;
  }