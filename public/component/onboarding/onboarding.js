/**
 * 웹사이트 온보딩 페이지 렌더링 (카드 그리드 형태)
 */
import { renderCosmicBackground } from './cosmic_background/cosmic_background.js';
import { renderCategoryGrid } from './category_card/category_card.js';
import { renderManualSection } from './manual_section/manual_section.js';

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
            ${renderCosmicBackground()}
            <div class="onboarding-container">
                <h2 class="onboarding-title">Our Universe에 오신 것을 환영합니다!</h2>
                <p class="onboarding-subtitle">서비스를 선택하여 시작하세요</p>
                ${renderCategoryGrid(categories)}
                ${renderManualSection()}
            </div>
        </div>
    `;
}

