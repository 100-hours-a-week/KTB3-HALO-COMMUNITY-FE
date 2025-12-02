import { setOnboardingCompleted } from "/service/onboarding/onboarding_service.js";

/**
 * 웹사이트 온보딩 페이지 이벤트 바인딩
 */
export function addOnboardingEvent(container) {
    if (!container) {
        console.error('container을 찾을 수 없습니다!');
        return;
    }

    const skipBtn = container.querySelector('#skipBtn');
    const categoryCards = container.querySelectorAll('.category-card');

    function handleStart(categoryId) {
        // 웹사이트 온보딩 완료 플래그 저장
        setOnboardingCompleted();
        
        if (categoryId === 'community') {
            // 커뮤니티 게시판으로 이동
            window.location.href = '/posts';
        } else {
            alert('랜덤 행성 방문은 추후 개발 예정입니다.');
        }
    }

    function handleSkip() {
        // 웹사이트 온보딩 완료 플래그 저장
        setOnboardingCompleted();
        
        // 커뮤니티 게시판으로 이동
        window.location.href = '/posts';
    }

    // 건너뛰기 버튼 이벤트
    if (skipBtn) {
        skipBtn.addEventListener('click', handleSkip);
    }

    // 카테고리 카드 클릭 이벤트
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            handleStart(category);
        });
    });
}

