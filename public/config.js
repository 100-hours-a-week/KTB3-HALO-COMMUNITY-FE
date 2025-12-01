export const API_BASE =
    window.location.hostname === "localhost"
        ? "http://localhost:8080/api/v1"
        : "https://www.ouruniverse.cloud/api/v1";

export const post_image_lambda_url =
    "https://9sdsv6n2dj.execute-api.ap-northeast-2.amazonaws.com/bookpick/cruration-image";

export const profile_image_lambda_url =
    "https://9sdsv6n2dj.execute-api.ap-northeast-2.amazonaws.com/bookpick/profile-image";
