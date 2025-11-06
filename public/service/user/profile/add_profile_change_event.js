import { API_BASE } from "/config.js";

export function addProfileChangeEvent(container) {
    const btnChange = container.querySelector('.btn_primary'); // 수정하기 버튼
    const nickInput = container.querySelector('input[name="nickName"]');
    const profileImg = container.querySelector('img[name="profileImage"]');

    btnChange.addEventListener('click', () => {
        const nickName = nickInput.value.trim();
        const profileImage = profileImg.src;

        if (!nickName) {
            alert("닉네임을 입력해주세요.");
            return;
        }

        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        fetch(`${API_BASE}/profiles/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                nickName,
                profileImage
            })
        })
            .then(res => res.json().then(data => ({ status: res.status, body: data })))
            .then(({ status, body }) => {
                if (status === 200) {
                    alert(body.message || "프로필 수정이 완료되었습니다.");
                } else {
                    alert(body.message || "프로필 수정에 실패했습니다.");
                }
            })
            .catch(err => {
                console.error(err);
                alert("프로필 수정 중 오류가 발생했습니다.");
            });
    });
}
