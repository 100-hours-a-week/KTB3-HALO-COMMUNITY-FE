import { API_BASE } from "/config.js";
import { renderUserInfoWrap } from "/component/post/post_detail/user_info_wrap/user_info_wrap.js";
import { renderArticleWrap } from "/component/post/post_detail/article_wrap/article_wrap.js";
import { renderStatsWrap } from "/component/post/post_detail/stats_wrap/stats_wrap.js";
import { renderCommentWrap } from "/component/post/post_detail/comment_wrap/comment_wrap.js";

/**
 * 포스트 디테일 로드 및 이벤트 바인딩
 */
export async function addPostDetailEvent(postId, userInfoEl, articleEl, statsEl, commentEl) {
    if (!postId) return console.error("postId가 필요합니다.");

    const token = localStorage.getItem("accessToken");

    try {
        const res = await fetch(`${API_BASE}/posts/${postId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message);

        }
        const { data } = await res.json();

        renderUserInfoWrap(userInfoEl, { nickname: data.nickname, createdAt: data.createdAt });
        renderArticleWrap(articleEl, { title: data.title, content: data.content, imageUrl: data.imageUrl });
        renderStatsWrap(statsEl, { likeCount: data.likeCount, viewCount: data.viewCount, commentCount: data.commentCount });
        renderCommentWrap(commentEl, data.comments || []);

        // 댓글 등록 이벤트
        const commentInput = commentEl.querySelector(".comment_input");
        const submitBtn = commentEl.querySelector(".btn_submit");
        submitBtn?.addEventListener("click", async () => {
            const content = commentInput.value.trim();
            if (!content) return alert("댓글 내용을 입력하세요.");

            try {
                const res = await fetch(`${API_BASE}/posts/${postId}/comments`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ content })
                });

                if (!res.ok) throw new Error("댓글 등록 실패");
                alert("댓글이 등록되었습니다.");
                commentInput.value = "";
                addPostDetailEvent(postId, userInfoEl, articleEl, statsEl, commentEl); // 댓글 리스트 갱신
            } catch (err) {
                console.error(err);
                alert("댓글 등록에 실패했습니다.");
            }
        });

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}
