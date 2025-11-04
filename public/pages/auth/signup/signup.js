import { renderHeader } from "/component/auth/header/header_inner.js";
import { renderSignupWrap } from "/component/auth/signup_wrap/signup_wrap.js";
import { renderGladBanner } from "/component/auth/gladbanner/gladbanner.js";
import { renderFooter } from "/component/auth/footer/footer_inner.js";

import { addSignupEvent } from "/service/auth/signup/addSignupEvent.js";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const signup_wrap = document.getElementById("signup_wrap");
  const gladbanner = document.getElementById("gladbanner");
  const footer = document.getElementById("footer");

  renderHeader(header);
  renderSignupWrap(signup_wrap);
  renderGladBanner(gladbanner);
  renderFooter(footer);

  // 랜더링 후 바인딩 함수들
  addSignupEvent();
});


