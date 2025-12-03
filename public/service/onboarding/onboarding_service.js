/**
 * 웹사이트 온보딩 서비스
 * 온보딩 완료 여부 체크 및 플래그 관리
 */

/**
 * 온보딩 완료 여부 확인
 */
export function isOnboardingCompleted() {
    return localStorage.getItem('onboardingCompleted') === 'true';
}

/**
 * 온보딩 완료 플래그 설정
 */
export function setOnboardingCompleted() {
    localStorage.setItem('onboardingCompleted', 'true');
}

/**
 * 온보딩 완료 플래그 제거 (테스트용)
 */
export function clearOnboardingCompleted() {
    localStorage.removeItem('onboardingCompleted');
}

/**
 * 온보딩이 완료되지 않았으면 온보딩 페이지로 리다이렉션
 */
export function redirectToOnboardingIfNeeded() {
    if (!isOnboardingCompleted()) {
        window.location.href = '/onboarding';
        return true;
    }
    return false;
}


