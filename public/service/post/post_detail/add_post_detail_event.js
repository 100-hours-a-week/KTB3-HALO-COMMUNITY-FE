import { API_BASE } from "/config.js";
import { fetchWithAuth } from "/utils/fetchWithAuth.js";
import { renderUserInfoWrap } from "/component/post/post_detail/user_info_wrap/user_info_wrap.js";
import { renderArticleWrap } from "/component/post/post_detail/article_wrap/article_wrap.js";
import { renderStatsWrap } from "/component/post/post_detail/stats_wrap/stats_wrap.js";
import { renderCommentWrap } from "/component/post/post_detail/comment_wrap/comment_wrap.js";
import {
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
} from "/service/comment/comment_service.js";

/**
 * 포스트 디테일 로드 및 이벤트 바인딩
 */
export async function addPostDetailEvent(postId, userInfoEl, articleEl, statsEl, commentEl) {
    if (!postId) return console.error("postId가 필요합니다.");

    try {
        // 1. 게시글 상세 조회 (토큰 자동 갱신)
        const detailRes = await fetchWithAuth(`/posts/${postId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!detailRes.ok) {
            const errorData = await detailRes.json();
            throw new Error(errorData.message);
        }
        const { data } = await detailRes.json();

        // 2. 댓글 리스트 조회
        const comments = await fetchComments(postId);

        renderUserInfoWrap(userInfoEl, { nickname: data.nickname, createdAt: data.createdAt }, postId);
        renderArticleWrap(articleEl, { title: data.title, content: data.content, imageUrl: data.imageUrl });
        renderStatsWrap(statsEl, { likeCount: data.likeCount, viewCount: data.viewCount, commentCount: data.commentCount });
        renderCommentWrap(commentEl, comments);

        // 3. 댓글 등록 이벤트
        const commentInput = commentEl.querySelector(".comment_input");
        const submitBtn = commentEl.querySelector(".btn_submit");
        submitBtn?.addEventListener("click", async () => {
            const content = commentInput.value.trim();
            if (!content) return alert("댓글 내용을 입력하세요.");

            try {
                const token = localStorage.getItem("accessToken");
                await createComment(postId, content, token);
                alert("댓글이 등록되었습니다.");
                commentInput.value = "";
                addPostDetailEvent(postId, userInfoEl, articleEl, statsEl, commentEl); // 댓글 리스트 갱신
            } catch (err) {
                console.error("댓글 등록 실패:", err);
                alert(err.message || "댓글 등록에 실패했습니다.");
            }
        });

        // 4. 댓글 수정/삭제 이벤트 (이벤트 위임)
        if (commentEl._commentClickHandler) {
            commentEl.removeEventListener("click", commentEl._commentClickHandler);
        }

        const clickHandler = async (e) => {
            const target = e.target;

            // 삭제
            if (target.classList.contains("btn_delete")) {
                const commentId = target.dataset.commentId;
                if (!commentId) return;
                if (!confirm("댓글을 삭제하시겠습니까?")) return;

                try {
                    const token = localStorage.getItem("accessToken");
                    await deleteComment(commentId, token);

                    alert("댓글이 삭제되었습니다.");
                    addPostDetailEvent(postId, userInfoEl, articleEl, statsEl, commentEl);
                } catch (error) {
                    console.error("댓글 삭제 실패:", error);
                    alert(error.message || "댓글 삭제에 실패했습니다.");
                }
                return;
            }

            // 수정
            if (target.classList.contains("btn_edit")) {
                const commentId = target.dataset.commentId;
                if (!commentId) return;

                const commentItem = target.closest(".comment_item");
                const commentTextEl = commentItem?.querySelector(".comment_text");
                const currentContent = commentTextEl?.textContent || "";

                const newContent = prompt("댓글을 수정하세요.", currentContent);
                if (newContent === null) return; // 취소

                const trimmed = newContent.trim();
                if (!trimmed) {
                    alert("내용을 입력하세요.");
                    return;
                }

                try {
                    const token = localStorage.getItem("accessToken");
                    await updateComment(commentId, trimmed, token);

                    alert("댓글이 수정되었습니다.");
                    addPostDetailEvent(postId, userInfoEl, articleEl, statsEl, commentEl);
                } catch (error) {
                    console.error("댓글 수정 실패:", error);
                    alert(error.message || "댓글 수정에 실패했습니다.");
                }
            }
        };

        commentEl.addEventListener("click", clickHandler);
        commentEl._commentClickHandler = clickHandler;

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}
