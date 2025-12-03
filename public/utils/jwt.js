/**
 * JWT 토큰 디코딩 및 만료 시간 확인 유틸리티
 */

/**
 * JWT 토큰을 디코딩하여 payload 반환
 * @param {string} token - JWT 토큰
 * @returns {object|null} 디코딩된 payload 또는 null
 */
export function decodeJwtToken(token) {
    if (!token) return null;

    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const payload = parts[1];
        const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(decoded);
    } catch (error) {
        console.error('JWT 디코딩 실패:', error);
        return null;
    }
}

/**
 * Access Token의 만료 시간을 확인
 * @param {string} token - JWT Access Token
 * @returns {number|null} 만료 시간 (UNIX timestamp) 또는 null
 */
export function getTokenExpiration(token) {
    const payload = decodeJwtToken(token);
    return payload?.exp || null;
}

/**
 * Access Token이 만료되었는지 확인
 * @param {string} token - JWT Access Token
 * @returns {boolean} 만료 여부
 */
export function isTokenExpired(token) {
    const exp = getTokenExpiration(token);
    if (!exp) return true;

    // 현재 시간보다 작거나 같으면 만료
    const now = Math.floor(Date.now() / 1000);
    return exp <= now;
}

/**
 * Access Token이 만료 예정인지 확인 (5분 이내 만료)
 * @param {string} token - JWT Access Token
 * @returns {boolean} 만료 예정 여부
 */
export function isTokenExpiringSoon(token) {
    const exp = getTokenExpiration(token);
    if (!exp) return true;

    // 현재 시간 + 5분보다 작거나 같으면 곧 만료 예정
    const now = Math.floor(Date.now() / 1000);
    const fiveMinutes = 300; // 5분(300초)
    return exp <= now + fiveMinutes;
}

