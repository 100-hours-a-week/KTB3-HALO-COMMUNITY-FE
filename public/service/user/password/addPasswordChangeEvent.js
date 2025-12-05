import { fetchWithAuth } from "/utils/fetchWithAuth.js";

export function addPasswordChangeEvent(container) {
    const btn = container.querySelector('.btn_submit');
    const inputs = container.querySelectorAll('.form_input');
    const [nowPassInput, newPassInput, confirmInput] = inputs;

    btn.addEventListener('click', async () => {
        const nowPass = nowPassInput.value.trim();
        const newPass = newPassInput.value.trim();
        const confirm = confirmInput.value.trim();

        if (!nowPass || !newPass || !confirm) {
            alert('모든 비밀번호를 입력해주세요.');
            return;
        }

        if (newPass !== confirm) {
            alert('변경 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
            return;
        }

        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('로그인이 필요합니다.');
            window.location.href = '/auth/login';
            return;
        }

        try {
            const response = await fetchWithAuth(`/my/password/change`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nowPassWord: nowPass,
                    newPassWord: newPass,
                    confirmPassword: confirm
                })
            });

            const result = await response.json().catch(() => ({}));

            if (response.ok && result.status === 200) {
                alert(result.message || '비밀번호 변경에 성공하였습니다.');
                // 게시글 리스트 페이지로 이동
                window.location.href = '/posts';
            } else {
                alert(result.message || '비밀번호 변경에 실패했습니다.');
            }
        } catch (err) {
            console.error("비밀번호 변경 오류:", err);
            alert(err.message || '비밀번호 변경 중 오류가 발생했습니다.');
        }
    });
}
