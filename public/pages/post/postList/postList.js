import { renderNavigator } from "/component/common/header/navigator/navigator.js";
import { renderPostWrap } from "/component/post/post_wrap/post_wrap.js";
import { renderFooter } from "/component/common/footer/footer_inner.js";
import { addLogoutEvent } from "/service/auth/logout/addLogoutEvent.js"; // 로그아웃 이벤트

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const posts_wrap = document.getElementById("posts_wrap");
    const footer = document.getElementById("footer");

    // 렌더링
    renderNavigator(header);
    renderPostWrap(posts_wrap);
    renderFooter(footer);

    // 이벤트 바인딩
    addLogoutEvent();      // 로그아웃
});
