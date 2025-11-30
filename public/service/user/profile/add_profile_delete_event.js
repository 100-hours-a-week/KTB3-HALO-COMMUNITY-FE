import { API_BASE } from "/config.js";
import { post_list_path } from "/page_path.js";

export function addProfileDeleteEvent(container) {
    const btnDelete = container.querySelector('.btn_secondary'); // 회원 탈퇴 버튼

    btnDelete.addEventListener('click', () => {
        if (!confirm("정말로 회원 탈퇴를 진행하시겠습니까?")) return;

        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        fetch(`${API_BASE}/profiles/me`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json().then(data => ({ status: res.status, body: data })))
            .then(({ status, body }) => {
                if (status === 200) {
                    alert("회원 탈퇴가 완료되었습니다.");
                    localStorage.removeItem("accessToken");
                    window.location.href = post_list_path; // 포스트 페이지로 이동
                } else {
                    alert(body.message || "회원 탈퇴에 실패했습니다.");
                }
            })
            .catch(err => {
                console.error(err);
                alert("회원 탈퇴 중 오류가 발생했습니다.");
            });
    });
}
