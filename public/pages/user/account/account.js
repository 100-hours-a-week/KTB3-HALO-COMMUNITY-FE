// API Client 초기화 (토큰 자동 갱신 활성화)
import "/utils/initApiClient.js";

import { renderNavigator } from "/component/common/header/navigator/navigator.js";
import { renderFooter } from "/component/common/footer/footer_inner.js";

// 프로필 관련 서비스
import { addProfileLoadEvent } from "/service/user/profile/add_profile_load_event.js";
import { addProfileChangeEvent } from "/service/user/profile/add_profile_change_event.js";
import { addProfileDeleteEvent } from "/service/user/profile/add_profile_delete_event.js";
import { addProfileImageChangeEvent } from "/service/user/profile/add_profile_image_change_event.js";
import { fetchWithAuth } from "/utils/fetchWithAuth.js";

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const account_wrap = document.getElementById("account_wrap");
    const footer = document.getElementById("footer");

    renderNavigator(header);
    renderFooter(footer);

    // 프로필 관련 이벤트 바인딩
    addProfileLoadEvent(account_wrap);
    addProfileImageChangeEvent(account_wrap);
    addProfileChangeEvent(account_wrap);
    addProfileDeleteEvent(account_wrap);
    
    // 로그아웃 버튼 이벤트 바인딩
    const logoutBtn = account_wrap.querySelector('.btn_logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            if (confirm('정말로 로그아웃하시겠습니까?')) {
                try {
                    const token = localStorage.getItem('accessToken');
                    if (token) {
                        await fetchWithAuth(`/auth/logout`, {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        });
                    }
                } catch (err) {
                    console.error('로그아웃 오류:', err);
                }
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/posts';
            }
        });
    }
});
