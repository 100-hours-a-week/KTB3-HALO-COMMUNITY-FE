/**
 * 네비게이터 프로필 이미지 로드
 */
import { fetchWithAuth } from "/utils/fetchWithAuth.js";

export async function loadNavigatorProfileImage() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        // 로그인하지 않은 경우 기본 이모지 유지
        return;
    }

    try {
        const response = await fetchWithAuth(`/profiles/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return;
        }

        const result = await response.json().catch(() => ({}));
        
        if (result.status === 200 && result.data?.profileImage) {
            const profileImageUrl = result.data.profileImage;
            const profileAvatar = document.querySelector('.profile_avatar');
            
            if (profileAvatar && profileImageUrl) {
                // 기존 텍스트 제거하고 이미지 표시
                profileAvatar.innerHTML = '';
                profileAvatar.style.background = 'none';
                profileAvatar.style.padding = '0';
                
                const img = document.createElement('img');
                img.src = profileImageUrl;
                img.alt = '프로필';
                img.style.width = '100%';
                img.style.height = '100%';ㄴ
                img.style.objectFit = 'cover';
                img.style.borderRadius = '50%';
                img.onerror = () => {
                    // 이미지 로드 실패 시 기본 이모지로 복귀
                    profileAvatar.innerHTML = '⚒️';
                    profileAvatar.style.background = '#333';
                };
                
                profileAvatar.appendChild(img);
            }
        }
    } catch (error) {
        console.error("프로필 이미지 로드 실패:", error);
        // 에러 발생 시 기본 이모지 유지
    }
}

