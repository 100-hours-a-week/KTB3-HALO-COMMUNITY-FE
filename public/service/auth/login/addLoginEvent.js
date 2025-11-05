// /service/auth/addLoginEvent.js
import { API_BASE } from "/config.js";

export function addLoginEvent() {
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const loginBtn = document.querySelector(".btn_login_button");

    if (!loginBtn) return;

    loginBtn.addEventListener("click", async () => {
        const email = emailInput.value.trim();
        const passWord = passwordInput.value.trim();

        if (!email || !passWord) {
            alert("이메일과 비밀번호를 입력해주세요.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ email, passWord }),
            });

            const result = await response.json().catch(() => ({}));

            if (response.ok && result.status === 200) {
                const token = result.data?.accessToken;

                if (token) {
                    localStorage.setItem("accessToken", token);
                }

                window.location.href = "/pages/post/postList/postList.html";
            } else {
                alert(result.message || "로그인 실패");
            }
        } catch (err) {
            console.error("로그인 요청 실패:", err);
            alert("서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.");
        }
    });
}