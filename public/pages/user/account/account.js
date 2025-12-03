// API Client 초기화 (토큰 자동 갱신 활성화)
import "/utils/initApiClient.js";

import { renderNavigator } from "/component/common/header/navigator/navigator.js";
import { renderAccountWrap } from "/component/user/account/account_wrap/account_wrap.js";
import { renderFooter } from "/component/common/footer/footer_inner.js";

import { addProfileLoadEvent } from "/service/user/profile/add_profile_load_event.js";
import { addProfileChangeEvent } from "/service/user/profile/add_profile_change_event.js";
import { addProfileDeleteEvent } from "/service/user/profile/add_profile_delete_event.js";
import { addProfileImageChangeEvent } from "/service/user/profile/add_profile_image_change_event.js";

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const account_wrap = document.getElementById("account_wrap");
    const footer = document.getElementById("footer");

    renderNavigator(header);
    renderAccountWrap(account_wrap);
    renderFooter(footer);

    addProfileLoadEvent(account_wrap);
    addProfileImageChangeEvent(account_wrap); // 프로필 이미지 변경 이벤트
    addProfileChangeEvent(account_wrap);
    addProfileDeleteEvent(account_wrap);
});
