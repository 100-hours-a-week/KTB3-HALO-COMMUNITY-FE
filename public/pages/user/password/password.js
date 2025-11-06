import { renderNavigator } from "/component/common/header/navigator/navigator.js";
import { renderPasswordWrap } from "../../../component/user/password/password_wrap/password_wrap.js";
import { renderFooter } from "/component/common/footer/footer_inner.js";

import {addPasswordChangeEvent} from "/service/user/password/addPasswordChangeEvent.js"

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header")
  const password_wrap = document.getElementById("password_wrap");
  const footer = document.getElementById("footer")

  renderNavigator(header);
  renderPasswordWrap(password_wrap);
  renderFooter(footer);

  // 1. 비밀번호 변경 이벤트 적용
  addPasswordChangeEvent(password_wrap);

});