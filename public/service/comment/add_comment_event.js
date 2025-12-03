import {
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
} from "/service/comment/comment_service.js";
import { renderCommentWrap } from "/component/post/post_detail/comment_wrap/comment_wrap.js";

/**
 * 댓글 등록 이벤트 바인딩
 */
export function addCommentCreateEvent(commentEl, postId, onCommentUpdate) {
    const commentInput = commentEl.querySelector(".comment_input");
    const submitBtn = commentEl.querySelector(".btn_submit");
    
    // 기존 핸들러 제거
    if (commentEl._commentSubmitHandler) {
        submitBtn?.removeEventListener("click", commentEl._commentSubmitHandler);
    }
    
    const submitHandler = async () => {
        const content = commentInput.value.trim();
        if (!content) {
            alert("댓글 내용을 입력하세요.");
            return;
        }

        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("로그인이 필요합니다.");
            window.location.href = '/auth/login';
            return;
        }

        try {
            await createComment(postId, content, token);
            alert("댓글이 등록되었습니다.");
            commentInput.value = "";
            
            // 댓글 리스트 갱신
            if (onCommentUpdate) {
                await onCommentUpdate();
            }
        } catch (err) {
            console.error("댓글 등록 실패:", err);
            alert(err.message || "댓글 등록에 실패했습니다.");
        }
    };
    
    submitBtn?.addEventListener("click", submitHandler);
    commentEl._commentSubmitHandler = submitHandler;
}

/**
 * 댓글 수정/삭제 이벤트 바인딩 (이벤트 위임)
 */
export function addCommentUpdateDeleteEvent(commentEl, onCommentUpdate) {
    // 기존 핸들러 제거
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

            const token = localStorage.getItem("accessToken");
            if (!token) {
                alert("로그인이 필요합니다.");
                window.location.href = '/auth/login';
                return;
            }

            try {
                await deleteComment(commentId, token);
                alert("댓글이 삭제되었습니다.");
                
                // 댓글 리스트 갱신
                if (onCommentUpdate) {
                    await onCommentUpdate();
                }
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

            const token = localStorage.getItem("accessToken");
            if (!token) {
                alert("로그인이 필요합니다.");
                window.location.href = '/auth/login';
                return;
            }

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
                await updateComment(commentId, trimmed, token);
                alert("댓글이 수정되었습니다.");
                
                // 댓글 리스트 갱신
                if (onCommentUpdate) {
                    await onCommentUpdate();
                }
            } catch (error) {
                console.error("댓글 수정 실패:", error);
                alert(error.message || "댓글 수정에 실패했습니다.");
            }
        }
    };

    commentEl.addEventListener("click", clickHandler);
    commentEl._commentClickHandler = clickHandler;
}

/**
 * 댓글 관련 모든 이벤트 바인딩
 */
export function addCommentEvents(commentEl, postId, onCommentUpdate) {
    addCommentCreateEvent(commentEl, postId, onCommentUpdate);
    addCommentUpdateDeleteEvent(commentEl, onCommentUpdate);
}

