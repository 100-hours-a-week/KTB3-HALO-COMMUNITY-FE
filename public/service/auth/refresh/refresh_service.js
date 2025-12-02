/**
 * Refresh Token 재발급 서비스
 */
import { API_BASE } from "/config.js";

let isRefreshing = false;
let refreshPromise = null;

/**
 * Refresh Token을 사용하여 새로운 Access Token 발급
 * @returns {Promise<string>} 새로운 Access Token
 */
export async function refreshAccessToken() {
    // 이미 refresh 중이면 기존 promise 반환
    if (isRefreshing && refreshPromise) {
        return refreshPromise;
    }

    isRefreshing = true;
    refreshPromise = (async () => {
        try {
            const response = await fetch(`${API_BASE}/auth/token/refresh`, {
                method: "POST",
                credentials: "include", // 쿠키 전송 (Refresh Token은 쿠키에 있음)
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "토큰 재발급 실패");
            }

            const result = await response.json();
            
            if (result.status === 200 && result.data?.accessToken) {
                const newAccessToken = result.data.accessToken;
                
                // 새로운 Access Token을 localStorage에 저장
                localStorage.setItem("accessToken", newAccessToken);
                
                return newAccessToken;
            } else {
                throw new Error(result.message || "토큰 재발급 실패");
            }
        } catch (error) {
            console.error("Refresh Token 재발급 실패:", error);
            
            // Refresh 실패 시 로그인 페이지로 이동
            localStorage.removeItem("accessToken");
            if (window.location.pathname !== "/auth/login") {
                window.location.href = "/auth/login";
            }
            
            throw error;
        } finally {
            isRefreshing = false;
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

/**
 * Refresh Token 재발급이 진행 중인지 확인
 * @returns {boolean}
 */
export function isRefreshingToken() {
    return isRefreshing;
}

