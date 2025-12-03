/**
 * Axios 인스턴스 및 인터셉터 설정
 * 토큰 자동 갱신 및 401 에러 처리
 */
import { API_BASE } from "/config.js";
import { isTokenExpired, isTokenExpiringSoon } from "/utils/jwt.js";
import { refreshAccessToken, isRefreshingToken } from "/service/auth/refresh/refresh_service.js";

/**
 * axios를 CDN에서 동적으로 로드
 */
async function loadAxios() {
    if (window.axios) {
        return window.axios;
    }

    return new Promise((resolve, reject) => {
        // 이미 로드 중인지 확인
        if (window.__axiosLoading) {
            window.__axiosLoading.then(resolve).catch(reject);
            return;
        }

        // axios CDN에서 로드
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/axios@1.7.9/dist/axios.min.js";
        
        const loadingPromise = new Promise((res, rej) => {
            script.onload = () => {
                window.__axiosLoading = null;
                res(window.axios);
            };
            script.onerror = () => {
                window.__axiosLoading = null;
                rej(new Error("axios 로드 실패"));
            };
        });

        window.__axiosLoading = loadingPromise;
        document.head.appendChild(script);
        loadingPromise.then(resolve).catch(reject);
    });
}

// axios 및 apiClient 캐시
let axios = null;
let apiClientInstance = null;

/**
 * API Client 인스턴스 생성
 */
function createApiClient(axiosLib) {
    // axios 인스턴스 생성
    const client = axiosLib.create({
        baseURL: API_BASE,
        withCredentials: true, // 쿠키 전송 (Refresh Token용)
        headers: {
            "Content-Type": "application/json",
        },
    });

    // 요청 인터셉터: Access Token 만료 확인 및 자동 갱신
    client.interceptors.request.use(
        async (config) => {
            const accessToken = localStorage.getItem("accessToken");

            // Access Token이 있는 경우
            if (accessToken) {
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
                            config.headers.Authorization = `Bearer ${newToken}`;
                            console.log("✅ Access Token 재발급 완료");
                        } else {
                            // refresh 중이면 잠시 대기 후 새 토큰 사용
                            await new Promise((resolve) => {
                                const checkInterval = setInterval(() => {
                                    if (!isRefreshingToken()) {
                                        clearInterval(checkInterval);
                                        const updatedToken = localStorage.getItem("accessToken");
                                        if (updatedToken) {
                                            config.headers.Authorization = `Bearer ${updatedToken}`;
                                        }
                                        resolve();
                                    }
                                }, 100);
                            });
                        }
                    } catch (error) {
                        console.error("토큰 갱신 실패:", error);
                        // refresh 실패 시 로그인 페이지로 이동 (refresh_service.js에서 처리)
                        return Promise.reject(error);
                    }
                } else {
                    // 토큰이 유효하면 그대로 사용
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // 응답 인터셉터: 401 에러 처리 및 자동 재시도
    client.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            // 401 에러 = 액세스 토큰이 만료되었거나 유효하지 않음
            // 리프레시 토큰으로 재발급 후 재시도
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                console.log("⚠️ 401 에러 발생 - 액세스 토큰이 만료되었을 수 있습니다. 리프레시 토큰으로 재발급 요청...");

                try {
                    // Refresh Token으로 새로운 Access Token 발급
                    const newToken = await refreshAccessToken();
                    console.log("✅ Access Token 재발급 완료 - 원래 요청 재시도");
                    
                    // 원래 요청에 새 토큰으로 재시도
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return client(originalRequest);
                } catch (refreshError) {
                    console.error("❌ 토큰 갱신 실패 (401 처리):", refreshError);
                    // refresh 실패 시 로그인 페이지로 이동 (refresh_service.js에서 처리)
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );

    return client;
}

/**
 * API Client 가져오기 (비동기)
 */
async function getApiClient() {
    if (apiClientInstance) {
        return apiClientInstance;
    }

    if (!axios) {
        axios = await loadAxios();
    }

    if (!apiClientInstance) {
        apiClientInstance = createApiClient(axios);
    }

    return apiClientInstance;
}

/**
 * API Client를 동기적으로 export (초기화는 비동기로 처리)
 */
const apiClient = {
    get: async (...args) => {
        const client = await getApiClient();
        return client.get(...args);
    },
    post: async (...args) => {
        const client = await getApiClient();
        return client.post(...args);
    },
    put: async (...args) => {
        const client = await getApiClient();
        return client.put(...args);
    },
    patch: async (...args) => {
        const client = await getApiClient();
        return client.patch(...args);
    },
    delete: async (...args) => {
        const client = await getApiClient();
        return client.delete(...args);
    },
};

export default apiClient;
