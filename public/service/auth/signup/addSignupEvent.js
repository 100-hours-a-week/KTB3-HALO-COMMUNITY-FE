// /service/auth/addSignupEvent.js
import { API_BASE } from '/config.js';

export function addSignupEvent() {
    const signupButton = document.querySelector('.btn_signup_button');
    const nicknameInput = document.querySelector('#nickname'); // 닉네임 입력
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const passwordConfirmInput = document.querySelector('#password_confirm');

    if (!signupButton) return;

    signupButton.addEventListener('click', async () => {
        const nickName = nicknameInput.value.trim(); // 카멜케이스
        const email = emailInput.value.trim();
        const passWord = passwordInput.value.trim(); // 카멜케이스
        const passwordConfirm = passwordConfirmInput.value.trim();

        if (!nickName || !email || !passWord || !passwordConfirm) {
            alert('모든 입력란을 채워주세요.');
            return;
        }

        if (passWord !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    passWord,   // 서버 DTO와 일치
                    nickName    // 서버 DTO와 일치
                }),
            });

            const result = await response.json().catch(() => ({}));
            alert(result.message || '서버에서 메시지를 받지 못했습니다.');

            if (response.ok) {
                window.location.href = '/pages/auth/login/login.html';
            }
        } catch (error) {
            console.error(error);
            alert('서버 요청 중 오류가 발생했습니다.');
        }
    });
}
