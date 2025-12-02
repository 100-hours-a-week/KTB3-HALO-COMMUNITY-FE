/**
 * 웹사이트 온보딩 페이지 렌더링 (카드 그리드 형태)
 */
export function renderOnboarding(container) {
    if (!container) {
        console.error('container을 찾을 수 없습니다!');
        return;
    }

    const categories = [
        {
            id: 'community',
            name: '커뮤니티',
            description: '자유롭게 소통하는 공간',
            icon: '💬',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            available: true
        },
        {
            id: 'random-planet',
            name: '랜덤 행성 방문',
            description: '다른 행성을 탐험해보세요',
            icon: '🪐',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            available: false
        }
    ];

    container.innerHTML = `
        <div class="onboarding-wrapper">
            <button class="skip-btn" id="skipBtn">건너뛰기</button>
            <div class="onboarding-container">
                <h2 class="onboarding-title">Our Universe에 오신 것을 환영합니다!</h2>
                <p class="onboarding-subtitle">서비스를 선택하여 시작하세요</p>
                <div class="category-grid">
                    ${categories.map(category => `
                        <div class="category-card" data-category="${category.id}">
                            <div class="category-image" style="background: ${category.gradient};">
                                <div class="category-overlay">
                                    <div class="category-icon">${category.icon}</div>
                                    <h3 class="category-name">${category.name}</h3>
                                    <p class="category-description">${category.description}</p>
                                    ${!category.available ? '<span class="coming-soon-badge">추후 개발 예정</span>' : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

