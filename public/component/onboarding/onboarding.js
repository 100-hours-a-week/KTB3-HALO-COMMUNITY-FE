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
            gradient: 'linear-gradient(135deg, #7c5cff 0%, #9b7aff 50%, #b794f6 100%)',
            glowColor: 'rgba(124, 92, 255, 0.5)',
            available: true
        },
        {
            id: 'random-planet',
            name: '랜덤 행성 방문',
            description: '다른 행성을 탐험해보세요',
            icon: '🪐',
            gradient: 'linear-gradient(135deg, #4a148c 0%, #6a1b9a 50%, #7b1fa2 100%)',
            glowColor: 'rgba(106, 27, 154, 0.4)',
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
                        <div class="category-card" data-category="${category.id}" style="--glow-color: ${category.glowColor};">
                            <div class="category-image" style="background: ${category.gradient};">
                                <div class="category-glow"></div>
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

