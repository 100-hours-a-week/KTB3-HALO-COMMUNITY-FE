/**
 * 이미지 미리보기 기능 설정
 * @param {string} imageInputSelector - 이미지 input 요소 선택자
 * @param {string} previewSelector - 미리보기 컨테이너 선택자
 * @param {string} placeholderSelector - 플레이스홀더 선택자
 * @param {string} uploadButtonSelector - 업로드 버튼 선택자
 */
export function setupImagePreview(imageInputSelector, previewSelector, placeholderSelector, uploadButtonSelector) {
  const imageInput = document.querySelector(imageInputSelector);
  const preview = document.querySelector(previewSelector);
  const placeholder = document.querySelector(placeholderSelector);
  const uploadButton = document.querySelector(uploadButtonSelector);

  if (!imageInput || !preview || !placeholder || !uploadButton) {
    console.error('이미지 미리보기 요소를 찾을 수 없습니다.');
    return;
  }

  // 업로드 버튼 클릭 시 파일 input 클릭
  uploadButton.addEventListener('click', () => {
    imageInput.click();
  });

  // 파일 선택 시 미리보기 표시
  imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        displayImagePreview(imageUrl, preview, placeholder);
      };
      reader.readAsDataURL(file);
    }
  });
}

/**
 * 이미지 URL로 미리보기 표시
 * @param {string} imageUrl - 이미지 URL
 * @param {HTMLElement} preview - 미리보기 컨테이너
 * @param {HTMLElement} placeholder - 플레이스홀더 요소
 * @param {string} altText - 대체 텍스트
 */
export function displayImageUrlPreview(imageUrl, preview, placeholder, altText = '이미지 미리보기') {
  if (!preview || !placeholder) {
    console.error('미리보기 요소를 찾을 수 없습니다.');
    return;
  }

  // 플레이스홀더 숨기기
  if (placeholder) {
    placeholder.style.display = 'none';
  }

  // 기존 이미지 제거
  const existingImg = preview.querySelector('img');
  if (existingImg) {
    existingImg.remove();
  }

  // 새 이미지 추가
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = altText;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  img.style.borderRadius = '16px';
  preview.appendChild(img);
}

/**
 * 이미지 미리보기 표시 (로컬 파일용)
 * @param {string} imageUrl - 이미지 Data URL
 * @param {HTMLElement} preview - 미리보기 컨테이너
 * @param {HTMLElement} placeholder - 플레이스홀더 요소
 */
function displayImagePreview(imageUrl, preview, placeholder) {
  if (!preview || !placeholder) {
    console.error('미리보기 요소를 찾을 수 없습니다.');
    return;
  }

  // 플레이스홀더 숨기기
  placeholder.style.display = 'none';

  // 기존 이미지 제거
  const existingImg = preview.querySelector('img');
  if (existingImg) {
    existingImg.remove();
  }

  // 새 이미지 추가
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = '이미지 미리보기';
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  img.style.borderRadius = '16px';
  preview.appendChild(img);
}
