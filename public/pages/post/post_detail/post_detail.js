import { renderNavigator } from "/component/common/header/navigator/navigator.js";

import { renderUserInfoWrap } from "/component/post/post_detail/user_info_wrap/user_info_wrap.js";
import { renderArticleWrap } from "/component/post/post_detail/article_wrap/article_wrap.js";
import { renderStatsWrap } from "/component/post/post_detail/stats_wrap/stats_wrap.js";
import { renderCommentWrap } from "/component/post/post_detail/comment_wrap/comment_wrap.js";

import { renderFooter } from "/component/common/footer/footer_inner.js";
import { addPostDetailEvent } from "/service/post/post_detail/add_post_detail_event.js";

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const user_info_wrap = document.getElementById("user_info_wrap");
    const article_wrap = document.getElementById("article_wrap");
    const stats_wrap = document.getElementById("stats_wrap");
    const comment_wrap = document.getElementById("comment_wrap");
    const footer = document.getElementById("footer");

    // 네비게이터, Footer 렌더링
    renderNavigator(header);
    renderFooter(footer);

    // URL에서 postId 추출
    const path = window.location.pathname; // 예: "/posts/6"
    const postId = parseInt(path.split("/").pop(), 10);

    if (isNaN(postId)) {
        alert("게시글 ID를 찾을 수 없습니다.");
        return;
    }

    // 게시글 상세 렌더링 및 이벤트 바인딩
    addPostDetailEvent(postId, user_info_wrap, article_wrap, stats_wrap, comment_wrap);
});
