import { API_BASE } from "/config.js";

export function addProfileLoadEvent(container) {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    fetch(`${API_BASE}/profiles/me`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(({ status, data }) => {
            if (status !== 200) throw new Error("프로필 로드 실패");

            // input과 프로필 이미지 업데이트
            const emailInput = container.querySelector('input[name="email"]');
            const nickInput = container.querySelector('input[name="nickName"]');
            const profileImg = container.querySelector('img[name="profileImage"]');

            if (emailInput) emailInput.value = data.email;
            if (nickInput) nickInput.value = data.nickName;
            if (profileImg) profileImg.src = data.profileImage || profileImg.src;
        })
        .catch(err => {
            console.error(err);
            alert("프로필 정보를 불러오지 못했습니다.");
        });
}
