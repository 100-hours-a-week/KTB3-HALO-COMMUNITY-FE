import { API_BASE } from "/config.js";
import { renderPostItem } from "/component/post/post_wrap/post_item/post_item.js";

export function addPostListEvent(rootEl) {
    if (!rootEl) return;

    const listContainer = rootEl.querySelector(".post-wrap__list");
    if (!listContainer) {
        console.error("post-wrap__list 요소를 찾을 수 없습니다.");
        return;
    }

    let nextCursor = 0;
    let hasNext = true;
    let isLoading = false; // 중복 호출 방지

    const token = localStorage.getItem("accessToken");

    function loadPosts() {
        if (!hasNext || isLoading) return;
        isLoading = true;

        

        fetch(`${API_BASE}/posts?cursor=${nextCursor}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(({ status, data }) => {
                if (status !== 200 || !data?.posts) {
                    alert("게시글을 불러오지 못했습니다.");
                    return;
                }

                // 게시글 HTML 생성 후 추가
                const postsHTML = data.posts.map(post => renderPostItem({
                    id: post.postId,
                    title: post.title,
                    date: new Date(post.createdAt).toLocaleString(),
                    likes: post.likeCount,
                    comments: post.commentCount,
                    views: post.viewCount,
                    author: post.nickname,
                    profileImageUrl: post.profileImageUrl
                })).join("");

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
                console.error(err);
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
