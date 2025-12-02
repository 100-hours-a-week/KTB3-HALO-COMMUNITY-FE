import { API_BASE } from "/config.js";

export function addPasswordChangeEvent(container) {
    const btn = container.querySelector('.btn_submit');
    const inputs = container.querySelectorAll('.form_input');
    const [nowPassInput, newPassInput, confirmInput] = inputs;

    btn.addEventListener('click', () => {
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

        fetch(`${API_BASE}/my/password/change`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nowPassWord: nowPass,
                newPassWord: newPass,
                confirmPassword: confirm
            })
        })
            .then(res => res.json().then(data => ({ status: res.status, body: data })))
            .then(({ status, body }) => {
                if (status === 200) {
                    alert(body.message || '비밀번호 변경에 성공하였습니다.');
                    nowPassInput.value = '';
                    newPassInput.value = '';
                    confirmInput.value = '';
                } else if (status === 400) {
                    alert(body.message || '비밀번호 확인이 일치하지 않습니다.');
                } else if (status === 401) {
                    alert(body.message || '현재 비밀번호가 올바르지 않습니다.');
                } else {
                    alert('비밀번호 변경에 실패했습니다.');
                }
            })
            .catch(err => {
                console.error(err);
                alert('비밀번호 변경 중 오류가 발생했습니다.');
            });
    });
}
