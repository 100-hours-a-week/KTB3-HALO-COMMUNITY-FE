import { API_BASE } from "/config.js";

// 댓글 목록 조회
export async function fetchComments(postId, page = 0, size = 20) {
  try {
    const res = await fetch(
      `${API_BASE}/posts/${postId}/comments?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("댓글 목록 조회 실패");
    }

    const body = await res.json();
    return body.data?.comments ?? [];
  } catch (error) {
    console.error("fetchComments error:", error);
    return [];
  }
}

// 댓글 생성
export async function createComment(postId, content, token) {
  const res = await fetch(`${API_BASE}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "댓글 등록 실패");
  }

  return res.json();
}

// 댓글 수정
export async function updateComment(commentId, content, token) {
  const res = await fetch(`${API_BASE}/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "댓글 수정 실패");
  }

  return res.json();
}

// 댓글 삭제
export async function deleteComment(commentId, token) {
  const res = await fetch(`${API_BASE}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "댓글 삭제 실패");
  }

  return res.json();
}


