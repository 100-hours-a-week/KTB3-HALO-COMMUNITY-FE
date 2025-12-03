// API Client 초기화 (토큰 자동 갱신 활성화)
import "/utils/initApiClient.js";

import { renderNavigator } from "/component/common/header/navigator/navigator.js";
import { renderFooter } from "/component/common/footer/footer_inner.js";
import { addPostUpdateEvent } from "/service/post/post_update/add_post_update_event.js";

document.addEventListener("DOMContentLoaded", async () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  renderNavigator(header);
  renderFooter(footer);

  // URL에서 postId 추출
  const path = window.location.pathname; // 예: "/posts/6/edit"
  const postId = parseInt(path.split('/')[2], 10);

  if (isNaN(postId)) {
    alert("유효하지 않은 게시글 ID입니다.");
    return;
  }

  // 게시글 수정 이벤트 바인딩
  await addPostUpdateEvent(postId);
});