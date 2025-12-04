import { API_BASE } from "/config.js";
import { fetchWithAuth } from "/utils/fetchWithAuth.js";
import { renderUserInfoWrap } from "/component/post/post_detail/user_info_wrap/user_info_wrap.js";
import { renderArticleWrap } from "/component/post/post_detail/article_wrap/article_wrap.js";
import { renderStatsWrap } from "/component/post/post_detail/stats_wrap/stats_wrap.js";
import { renderCommentWrap } from "/component/post/post_detail/comment_wrap/comment_wrap.js";
import { decodeJwtToken } from "/utils/jwt.js";
import { fetchComments } from "/service/comment/comment_service.js";
import { addCommentEvents, addCommentUpdateDeleteEvent } from "/service/comment/add_comment_event.js";

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
        const result = await detailRes.json();
        const { data } = result;

        // 2. 작성자 여부 확인 (게시글 수정 API를 호출해서 권한 확인)
        let isAuthor = false;
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            try {
                // 게시글 수정 API를 호출해서 권한 확인 (변경사항 없이 호출)
                const permissionCheckResponse = await fetchWithAuth(`/posts/${postId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: data.title,
                        content: data.content,
                        imageUrl: data.imageUrl
                    })
                });

                // 권한이 있으면 작성자
                if (permissionCheckResponse.ok) {
                    isAuthor = true;
                }
            } catch (error) {
                // 권한이 없으면 작성자가 아님
                isAuthor = false;
            }
        }

        // 3. 댓글 리스트 조회
        const comments = await fetchComments(postId);

        // author 객체가 있는지 확인하고 안전하게 접근
        const author = data.author || {};
        renderUserInfoWrap(userInfoEl, { 
            nickname: author.nickname || '익명', 
            profileImageUrl: author.profileImageUrl || null,
            createdAt: data.createdAt 
        }, postId, isAuthor);
        renderArticleWrap(articleEl, { title: data.title, content: data.content, imageUrl: data.imageUrl });
        renderStatsWrap(statsEl, { likeCount: data.likeCount, viewCount: data.viewCount, commentCount: data.commentCount });
        renderCommentWrap(commentEl, comments);

        // 4. 댓글 이벤트 바인딩 (모듈화)
        const refreshComments = async () => {
            const comments = await fetchComments(postId);
            renderCommentWrap(commentEl, comments);
            // 댓글 리스트 갱신 후 수정/삭제 이벤트만 다시 바인딩 (등록 이벤트는 한 번만)
            addCommentUpdateDeleteEvent(commentEl, refreshComments);
        };
        
        addCommentEvents(commentEl, postId, refreshComments);

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}
