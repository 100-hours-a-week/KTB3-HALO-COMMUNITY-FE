import { renderLoginWrap } from "/component/auth/login_wrap/login_wrap.js";
import { renderFindWrap} from "/component/auth/login_wrap/find_wrap.js";
import { renderGladBanner } from "/component/auth/gladbanner/gladbanner.js";
import { renderFooter} from "/component/auth/footer/footer_inner.js";

import {addLoginEvent} from "/service/auth/login/addLoginEvent.js"


document.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("logo");
  const login_wrap = document.getElementById("login_wrap");
  const find_wrap = document.getElementById("find_wrap");
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

  renderLoginWrap(login_wrap);
  renderFindWrap(find_wrap);
  renderGladBanner(gladbanner);
  renderFooter(footer);

  // 랜더링 후 바인딩 함수들
  addLoginEvent();
});