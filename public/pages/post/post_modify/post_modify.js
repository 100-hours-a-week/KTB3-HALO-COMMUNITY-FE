// API Client 초기화 (토큰 자동 갱신 활성화)
import "/utils/initApiClient.js";

import { renderNavigator } from "/component/common/header/navigator/navigator.js";
import { renderInfoWrap } from "/component/post/post_modify/info_wrap/info_wrap.js";
import { renderTitleWrap } from "/component/post/post_modify/title_wrap/title_wrap.js";
import { renderArticleWrap } from "/component/post/post_modify/article_wrap/article_wrap.js";
import { renderImageWrap } from "/component/post/post_modify/image_wrap/image_wrap.js";
import { renderModifyButtonWrap } from "/component/post/post_modify/modify_button_wrap/modify_button_wrap.js";
import { renderFooter } from "/component/common/footer/footer_inner.js";
import { addPostUpdateEvent } from "/service/post/post_update/add_post_update_event.js";
import { fetchWithAuth } from "/utils/fetchWithAuth.js";
import { decodeJwtToken } from "/utils/jwt.js";


document.addEventListener("DOMContentLoaded", async () => {
  // 1. 로그인 체크
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    alert('로그인이 필요합니다.');
    window.location.href = '/auth/login';
    return;
  }

  // 2. Extract postId from URL
  const path = window.location.pathname; // e.g., "/posts/123/edit"
  const postId = parseInt(path.split('/')[2], 10); // Get the ID part

  if (isNaN(postId)) {
    alert("유효하지 않은 게시글 ID입니다.");
    return;
  }

  // 3. 게시글 상세 정보를 가져와서 작성자 확인
  try {
    const response = await fetchWithAuth(`/posts/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "게시글 정보를 불러오는데 실패했습니다.");
      window.location.href = `/posts/${postId}`;
      return;
    }

    const responseData = await response.json();
    const post = responseData.data;

    // 4. JWT 토큰에서 현재 사용자 ID 추출
    const decodedToken = decodeJwtToken(accessToken);
    const currentUserId = decodedToken?.userId;

    if (!currentUserId) {
      alert('로그인 정보를 확인할 수 없습니다.');
      window.location.href = '/auth/login';
      return;
    }

    // 5. 게시글 작성자 ID 확인 (BE API 응답에 author.userId가 없으므로, 
    //    게시글 수정 API를 호출해서 권한을 확인)
    //    실제로는 BE에서 권한 체크를 하므로, 여기서는 로그인 체크만 하고
    //    실제 권한 검증은 addPostUpdateEvent에서 BE API 호출 시 처리됨
    //    하지만 사용자 경험을 위해 미리 체크하려면 게시글 수정 API를 먼저 호출해볼 수 있음
    //    또는 게시글 상세 API 응답에 작성자 ID가 포함되어야 함
    
    // 일단 로그인 체크는 완료했으므로, 실제 권한 검증은 addPostUpdateEvent에서
    // 게시글 수정 API 호출 시 BE에서 처리됨

  } catch (error) {
    console.error("게시글 정보 로드 중 오류 발생:", error);
    alert("게시글 정보를 불러오는데 실패했습니다.");
    window.location.href = '/posts';
    return;
  }

  const header = document.getElementById("header");
  const info_wrap = document.getElementById("info_wrap");
  const title_wrap = document.getElementById("title_wrap");
  const article_wrap = document.getElementById("article_wrap");
  const image_wrap = document.getElementById("image_wrap");
  const modify_button_wrap = document.getElementById("modify_button_wrap");
  const footer = document.getElementById("footer");

  renderNavigator(header);
  renderInfoWrap(info_wrap);
  renderTitleWrap(title_wrap);
  renderArticleWrap(article_wrap);
  renderImageWrap(image_wrap);
  renderModifyButtonWrap(modify_button_wrap);
  renderFooter(footer);

  await addPostUpdateEvent(postId); // Call the update event function
});