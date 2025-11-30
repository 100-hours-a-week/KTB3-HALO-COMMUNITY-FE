import { renderNavigator } from "/component/common/header/navigator/navigator.js";
import { renderFooter } from "/component/common/footer/footer_inner.js";
import { addPostCreateEvent } from "/service/post/post_create/add_post_create_event.js";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  renderNavigator(header);
  renderFooter(footer);

  addPostCreateEvent(); // 이벤트 바인딩
});