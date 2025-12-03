/**
 * 스크롤 감지 모듈
 * Intersection Observer를 사용한 무한 스크롤
 */

/**
 * 스크롤 감지 옵저버 생성
 * @param {Function} callback - 감지 시 실행할 콜백 함수
 * @param {Object} options - 옵저버 옵션
 * @returns {IntersectionObserver} - 생성된 옵저버
 */
export function createScrollObserver(callback, options = {}) {
    const defaultOptions = {
        root: null,
        rootMargin: '200px',
        threshold: 0
    };

    const observerOptions = { ...defaultOptions, ...options };

    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry);
            }
        });
    }, observerOptions);
}

/**
 * 무한 스크롤 트리거 요소 생성
 * @param {HTMLElement} container - 컨테이너 요소
 * @param {IntersectionObserver} observer - 옵저버 인스턴스
 * @returns {HTMLElement} - 생성된 트리거 요소
 */
export function createScrollTrigger(container, observer) {
    const trigger = document.createElement('div');
    trigger.className = 'scroll-trigger';
    trigger.style.cssText = 'height: 1px; width: 100%; position: absolute; bottom: 0;';
    container.appendChild(trigger);
    observer.observe(trigger);
    return trigger;
}



