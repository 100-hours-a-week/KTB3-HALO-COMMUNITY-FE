import { API_BASE } from "/config.js";
import { renderPostItem } from "/component/post/post_wrap/post_item/post_item.js";

export function addPostListEvent(rootEl) {
    if (!rootEl) {
        console.error("rootEl이 없습니다.");
        return;
    }

    // renderPostWrap이 실행된 후에 호출되므로 .post-wrap__list를 찾기
    const listContainer = rootEl.querySelector(".post-wrap__list");
    
    if (!listContainer) {
        console.error("post-wrap__list 요소를 찾을 수 없습니다.");
        console.error("rootEl.innerHTML:", rootEl.innerHTML.substring(0, 200));
        return;
    }
    
    console.log("게시글 목록 로드 시작");

    let nextCursor = 0;
    let hasNext = true;
    let isLoading = false; // 중복 호출 방지

    const token = localStorage.getItem("accessToken");

    function loadPosts() {
        if (!hasNext || isLoading) return;
        isLoading = true;

        const requestUrl = `${API_BASE}/posts?cursor=${nextCursor}`;
        console.log('🔵 API 요청 시작:', requestUrl);
        console.log('🔵 요청 파라미터 - cursor:', nextCursor);

        fetch(requestUrl, {
            method: "GET",
        })
            .then(res => {
                console.log('🟢 API 응답 상태:', res.status, res.statusText);
                return res.json();
            })
            .then((response) => {
                console.log('🟢 API 응답 전체:', response);
                const { status, data } = response;
                
                if (status !== 200 || !data?.posts) {
                    console.error('❌ 게시글 로드 실패:', response);
                    alert("게시글을 불러오지 못했습니다.");
                    return;
                }

                console.log('✅ 게시글 데이터:', data.posts);
                console.log('✅ 게시글 개수:', data.posts.length);
                
                // 각 게시글의 이미지 URL 확인
                data.posts.forEach((post, index) => {
                    console.log(`📸 게시글 ${index + 1}:`, {
                        postId: post.postId,
                        title: post.title,
                        postImageUrl: post.postImageUrl,
                        profileImageUrl: post.profileImageUrl
                    });
                });

                // 게시글 HTML 생성 후 추가
                // 백엔드 DTO 구조: postId, title, content(미리보기), nickname, profileImageUrl, postImageUrl, likeCount, commentCount, viewCount, createdAt, updatedAt
                const postsHTML = data.posts.map(post => {
                    return renderPostItem({
                        id: post.postId,
                        title: post.title || '',
                        content: post.content || '', // 백엔드에서 미리보기로 처리된 내용
                        postImageUrl: post.postImageUrl || null,
                        createdAt: post.createdAt,
                        date: post.createdAt, // 호환성을 위해 둘 다 전달
                        likes: post.likeCount || 0,
                        likeCount: post.likeCount || 0,
                        comments: post.commentCount || 0,
                        commentCount: post.commentCount || 0,
                        views: post.viewCount || 0,
                        viewCount: post.viewCount || 0,
                        author: post.nickname || '익명',
                        profileImageUrl: post.profileImageUrl || null
                    });
                }).join("");

                listContainer.innerHTML += postsHTML;

                // 게시글 클릭 이벤트
                const postItems = rootEl.querySelectorAll(".post-item");
                postItems.forEach(item => {
                    item.style.cursor = "pointer";
                    item.addEventListener("click", () => {
                        const postId = item.getAttribute("data-post-id");
                        window.location.href = `/posts/${postId}`;
                    });
                });

                // 다음 페이지 정보 업데이트
                hasNext = data.pageInfo.hasNext;
                nextCursor = data.pageInfo.nextCursor;
            })
            .catch(err => {
                console.error('❌ API 요청 에러:', err);
                console.error('❌ 에러 상세:', err.message, err.stack);
                alert("게시글 로드 중 오류가 발생했습니다.");
            })
            .finally(() => {
                isLoading = false;
            });
    }

    // 스크롤 이벤트
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
            loadPosts();
        }
    });

    // 초기 로드
    loadPosts();
}
