import { fetchWithAuth } from "/utils/fetchWithAuth.js";
import { post_list_path } from "/page_path.js";

export function addProfileDeleteEvent(container) {
    const btnDelete = container.querySelector('.btn_secondary'); // 회원 탈퇴 버튼

    if (!btnDelete) return;

    btnDelete.addEventListener('click', async () => {
        if (!confirm("정말로 회원 탈퇴를 진행하시겠습니까?")) return;

        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("로그인이 필요합니다.");
            window.location.href = '/auth/login';
            return;
        }

        try {
            const response = await fetchWithAuth(`/profiles/me`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const result = await response.json().catch(() => ({}));

            if (response.ok && result.status === 200) {
                alert(result.message || "회원 탈퇴가 완료되었습니다.");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = '/posts'; // 포스트 페이지로 이동
            } else {
                alert(result.message || "회원 탈퇴에 실패했습니다.");
            }
        } catch (err) {
            console.error("회원 탈퇴 오류:", err);
            alert("회원 탈퇴 중 오류가 발생했습니다.");
        }
    });
}
