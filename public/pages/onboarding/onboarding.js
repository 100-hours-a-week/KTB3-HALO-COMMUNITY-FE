// API Client 초기화 (토큰 자동 갱신 활성화)
import "/utils/initApiClient.js";

import { renderNavigator } from "/component/common/header/navigator/navigator.js";
import { renderFooter } from "/component/common/footer/footer_inner.js";
import { renderOnboarding } from "/component/onboarding/onboarding.js";
import { addOnboardingEvent } from "/service/onboarding/add_onboarding_event.js";

import { addLogoutEvent } from "/service/auth/logout/addLogoutEvent.js";

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const onboarding_container = document.getElementById("onboarding_container");
    const footer = document.getElementById("footer");

    // 렌더링
    renderNavigator(header);
    renderOnboarding(onboarding_container);
    renderFooter(footer);

    // 이벤트 바인딩
    addLogoutEvent();
    addOnboardingEvent(onboarding_container);
});


