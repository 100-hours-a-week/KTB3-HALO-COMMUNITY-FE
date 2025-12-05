import { renderSignupWrap } from "/component/auth/signup_wrap/signup_wrap.js";
import { renderGladBanner } from "/component/auth/gladbanner/gladbanner.js";
import { renderFooter } from "/component/auth/footer/footer_inner.js";

import { addSignupEvent } from "/service/auth/signup/addSignupEvent.js";

document.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("logo");
  const signup_wrap = document.getElementById("signup_wrap");
  const gladbanner = document.getElementById("gladbanner");
  const footer = document.getElementById("footer");

  // 로고 렌더링
  if (logo) {
    logo.innerHTML = `
      <a href="/posts" class="logo_link">
        <h1 class="logo_text">Our Universe</h1>
      </a>
    `;
  }

  renderSignupWrap(signup_wrap);
  renderGladBanner(gladbanner);
  renderFooter(footer);

  // 랜더링 후 바인딩 함수들
  addSignupEvent();
});


