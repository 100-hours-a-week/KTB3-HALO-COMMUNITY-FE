/**
 * fetch를 래핑하여 토큰 자동 갱신 기능 추가
 */
import { API_BASE } from "/config.js";
import { isTokenExpired, isTokenExpiringSoon } from "/utils/jwt.js";
import { refreshAccessToken, isRefreshingToken } from "/service/auth/refresh/refresh_service.js";

/**
 * 토큰이 필요하면 자동으로 갱신하고 헤더에 추가
 */
async function ensureValidToken(headers = {}) {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return headers;
    }

    // 토큰이 만료되었는지 먼저 확인
    const expired = isTokenExpired(accessToken);
    const expiringSoon = isTokenExpiringSoon(accessToken);
    
    if (expired || expiringSoon) {
        if (expired) {
            console.log("⏰ 액세스 토큰이 만료되었습니다. 리프레시 토큰으로 재발급 요청...");
        } else {
            console.log("⏰ 액세스 토큰이 곧 만료 예정입니다. 미리 재발급 요청...");
        }
        
        try {
            // 이미 refresh 중이 아니면 새로 refresh
            if (!isRefreshingToken()) {
                console.log("🔄 Refresh Token으로 Access Token 재발급 시작");
                const newToken = await refreshAccessToken();
                console.log("✅ Access Token 재발급 완료");
                return {
                    ...headers,
                    Authorization: `Bearer ${newToken}`,
                };
            } else {
                // refresh 중이면 완료될 때까지 대기
                await new Promise((resolve) => {
                    const checkInterval = setInterval(() => {
                        if (!isRefreshingToken()) {
                            clearInterval(checkInterval);
                            resolve();
                        }
                    }, 100);
                });
                // 새 토큰 가져오기
                const updatedToken = localStorage.getItem("accessToken");
                if (updatedToken) {
                    return {
                        ...headers,
                        Authorization: `Bearer ${updatedToken}`,
                    };
                }
            }
        } catch (error) {
            console.error("토큰 갱신 실패:", error);
            throw error;
        }
    }

    // 토큰이 유효하면 그대로 사용
    return {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
    };
}

/**
 * fetch를 래핑하여 토큰 자동 갱신 및 401 에러 처리
 */
export async function fetchWithAuth(url, options = {}) {
    const isAbsoluteUrl = url.startsWith("http://") || url.startsWith("https://");
    const fullUrl = isAbsoluteUrl ? url : `${API_BASE}${url.startsWith("/") ? url : `/${url}`}`;

    // 옵션 복사
    const fetchOptions = {
        ...options,
        credentials: options.credentials || "include", // 쿠키 전송
    };

    // Access Token이 있으면 토큰 갱신 체크 (Authorization 헤더가 있든 없든)
    const accessToken = localStorage.getItem("accessToken");
    
    if (accessToken) {
        // 기존 헤더 유지하면서 토큰 자동 갱신 및 헤더 추가
        const existingHeaders = fetchOptions.headers || {};
        fetchOptions.headers = await ensureValidToken(existingHeaders);
    }

    // 요청 실행
    let response = await fetch(fullUrl, fetchOptions);

    // 401 에러인 경우 = 액세스 토큰이 만료되었거나 유효하지 않음
    // 리프레시 토큰으로 재발급 후 재시도
    if (response.status === 401 && accessToken) {
        console.log("⚠️ 401 에러 발생 - 액세스 토큰이 만료되었을 수 있습니다. 리프레시 토큰으로 재발급 요청...");
        try {
            const newToken = await refreshAccessToken();
            console.log("✅ Access Token 재발급 완료 - 원래 요청 재시도");

            // 새로운 토큰으로 재시도
            fetchOptions.headers = {
                ...fetchOptions.headers,
                Authorization: `Bearer ${newToken}`,
            };

            response = await fetch(fullUrl, fetchOptions);
        } catch (refreshError) {
            console.error("❌ 토큰 갱신 실패 (401 처리):", refreshError);
            throw refreshError;
        }
    }

    return response;
}

