/**
 * 텍스트 처리 유틸리티 모듈
 */

/**
 * HTML 태그를 제거하고 텍스트만 추출
 * @param {string} html - HTML 문자열
 * @returns {string} - 텍스트만 추출된 문자열
 */
export function stripHtmlTags(html) {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
}

/**
 * 텍스트 미리보기 생성 (최대 길이 제한)
 * @param {string} text - 원본 텍스트
 * @param {number} maxLength - 최대 길이 (기본값: 100)
 * @returns {string} - 제한된 길이의 텍스트
 */
export function truncateText(text, maxLength = 100) {
    if (!text) return '';
    const cleanText = stripHtmlTags(text);
    return cleanText.length > maxLength 
        ? cleanText.substring(0, maxLength) + '...' 
        : cleanText;
}

/**
 * 안전한 텍스트 렌더링 (XSS 방지)
 * @param {string} text - 원본 텍스트
 * @returns {string} - 이스케이프된 텍스트
 */
export function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 기본값 제공
 * @param {any} value - 확인할 값
 * @param {any} defaultValue - 기본값
 * @returns {any} - 값이 있으면 값, 없으면 기본값
 */
export function getDefaultValue(value, defaultValue) {
    return value ?? defaultValue;
}


