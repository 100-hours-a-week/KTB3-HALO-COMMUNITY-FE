/**
 * 이미지 미리보기 유틸리티
 */

/**
 * 이미지 파일을 미리보기로 표시
 * @param {File} file - 이미지 파일
 * @param {HTMLElement} previewElement - 미리보기를 표시할 요소
 * @param {HTMLElement} placeholderElement - 플레이스홀더 요소
 */
export function displayImageFilePreview(file, previewElement, placeholderElement) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        if (previewElement && placeholderElement) {
            placeholderElement.style.display = "none";
            // 기존 이미지가 있으면 제거
            const existingImg = previewElement.querySelector("img");
            if (existingImg) {
                existingImg.remove();
            }
            const img = document.createElement("img");
            img.src = event.target.result;
            img.alt = "미리보기";
            previewElement.appendChild(img);
        }
    };
    reader.readAsDataURL(file);
}

/**
 * 이미지 URL로 미리보기 표시
 * @param {string} imageUrl - 이미지 URL
 * @param {HTMLElement} previewElement - 미리보기를 표시할 요소
 * @param {HTMLElement} placeholderElement - 플레이스홀더 요소
 * @param {string} altText - 이미지 alt 텍스트
 */
export function displayImageUrlPreview(imageUrl, previewElement, placeholderElement, altText = "이미지") {
    if (!imageUrl || !previewElement || !placeholderElement) return;

    placeholderElement.style.display = "none";
    // 기존 이미지가 있으면 제거
    const existingImg = previewElement.querySelector("img");
    if (existingImg) {
        existingImg.remove();
    }
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = altText;
    previewElement.appendChild(img);
}

/**
 * 이미지 미리보기 기능 설정
 * @param {string} imageInputSelector - 이미지 input 선택자
 * @param {string} previewSelector - 미리보기 영역 선택자
 * @param {string} placeholderSelector - 플레이스홀더 선택자
 * @param {string} uploadButtonSelector - 업로드 버튼 선택자 (선택적)
 */
export function setupImagePreview(
    imageInputSelector,
    previewSelector,
    placeholderSelector,
    uploadButtonSelector = null
) {
    const imageInput = document.querySelector(imageInputSelector) || document.getElementById(imageInputSelector.replace('#', ''));
    const imagePreview = document.querySelector(previewSelector);
    const imagePlaceholder = document.querySelector(placeholderSelector);
    const uploadButton = uploadButtonSelector ? document.querySelector(uploadButtonSelector) : null;

    if (!imageInput || !imagePreview || !imagePlaceholder) {
        console.warn("이미지 미리보기 설정 실패: 필수 요소를 찾을 수 없습니다.");
        return;
    }

    // 업로드 버튼 클릭 시 파일 선택
    if (uploadButton) {
        uploadButton.addEventListener("click", () => {
            imageInput.click();
        });
    }

    // 이미지 파일 선택 시 미리보기
    imageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            displayImageFilePreview(file, imagePreview, imagePlaceholder);
        }
    });
}

