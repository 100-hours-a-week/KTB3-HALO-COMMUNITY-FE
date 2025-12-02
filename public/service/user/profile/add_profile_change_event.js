import { API_BASE } from "/config.js";
import { fetchWithAuth } from "/utils/fetchWithAuth.js";

export function addProfileChangeEvent(container) {
    const btnChange = container.querySelector('.btn_primary'); // 수정하기 버튼
    const nickInput = container.querySelector('input[name="nickName"]');
    const profileImg = container.querySelector('img[name="profileImage"]');

    btnChange.addEventListener('click', async () => {
        const nickName = nickInput.value.trim();
        
        // 업로드된 이미지 URL이 있으면 사용, 없으면 기존 이미지 URL 사용
        const profileImage = profileImg.getAttribute('data-uploaded-url') || profileImg.src;

        if (!nickName) {
            alert("닉네임을 입력해주세요.");
            return;
        }

        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            const response = await fetchWithAuth(`/profiles/me`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nickName,
                    profileImage
                })
            });

            const result = await response.json().catch(() => ({}));

            if (response.ok && result.status === 200) {
                alert(result.message || "프로필 수정이 완료되었습니다.");
                // 업로드된 URL 정보 초기화
                if (profileImg.getAttribute('data-uploaded-url')) {
                    profileImg.removeAttribute('data-uploaded-url');
                }
            } else {
                alert(result.message || "프로필 수정에 실패했습니다.");
            }
        } catch (err) {
            console.error(err);
            alert("프로필 수정 중 오류가 발생했습니다.");
        }
    });
}
