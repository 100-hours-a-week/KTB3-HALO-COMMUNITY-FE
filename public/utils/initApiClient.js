/**
 * API Client 초기화
 * 모든 페이지에서 로드되어 axios 인터셉터 활성화
 */
import apiClient from "/utils/apiClient.js";

// 전역에서 사용 가능하도록 window에 등록
window.apiClient = apiClient;

// 모듈로도 export
export default apiClient;
