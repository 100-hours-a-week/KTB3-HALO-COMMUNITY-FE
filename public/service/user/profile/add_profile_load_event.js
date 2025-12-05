import { fetchWithAuth } from "/utils/fetchWithAuth.js";

export async function addProfileLoadEvent(container) {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        alert("로그인이 필요합니다.");
        window.location.href = '/auth/login';
        return;
    }

    try {
        const response = await fetchWithAuth(`/profiles/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "프로필 로드 실패");
        }

        const result = await response.json();
        const { status, data } = result;

        if (status !== 200) {
            throw new Error(result.message || "프로필 로드 실패");
        }

        // input과 프로필 이미지 업데이트
        const emailInput = container.querySelector('input[name="email"]');
        const nickInput = container.querySelector('input[name="nickName"]');
        const profileImg = container.querySelector('img[name="profileImage"]');

        if (emailInput) emailInput.value = data.email || '';
        if (nickInput) nickInput.value = data.nickName || '';
        if (profileImg && data.profileImage) {
            profileImg.src = data.profileImage;
        }
    } catch (err) {
        console.error("프로필 로드 오류:", err);
        alert(err.message || "프로필 정보를 불러오지 못했습니다.");
    }
}
