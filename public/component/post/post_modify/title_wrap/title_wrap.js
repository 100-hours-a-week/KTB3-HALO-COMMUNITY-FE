export function renderTitleWrap(container) {
    container.innerHTML = `
      <div class="title_container">
        <label class="title_label">제목*</label>
        <input type="text" class="title_input" placeholder="제목 1" value="제목 1">
      </div>
    `;
  }