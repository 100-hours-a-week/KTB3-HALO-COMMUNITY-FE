import { renderPostWrap } from "/component/post/post_wrap/post_wrap.js";
import { addPostListEvent } from "/service/post/post_list/add_post_list_event.js";

/**
 * 카테고리 선택 UI 렌더링 (온보딩 페이지 형식)
 */
export function renderCategoryWrap(categoryEl, postsWrapEl) {
    if (!categoryEl) {
        console.error('categoryEl을 찾을 수 없습니다!');
        return;
    }

    let currentSlide = 0;
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

    function renderSlide(index) {
        const category = categories[index];
        return `
            <div class="onboarding-slide ${index === currentSlide ? 'active' : ''}" data-index="${index}">
                <div class="slide-content">
                    <div class="slide-icon">${category.icon}</div>
                    <h2 class="slide-title">${category.name}</h2>
                    <p class="slide-description">${category.description}</p>
                    ${!category.available ? '<span class="coming-soon-badge">추후 개발 예정</span>' : ''}
                    ${category.available ? `
                        <button class="slide-action-btn" data-category="${category.id}">
                            시작하기
                        </button>
                    ` : `
                        <button class="slide-action-btn disabled" disabled>
                            준비 중
                        </button>
                    `}
                </div>
                <div class="slide-background" style="background: ${category.gradient};"></div>
            </div>
        `;
    }

    function renderDots() {
        return categories.map((_, index) => 
            `<span class="onboarding-dot ${index === currentSlide ? 'active' : ''}" data-index="${index}"></span>`
        ).join('');
    }

    categoryEl.innerHTML = `
        <div class="onboarding-container">
            <div class="onboarding-slides-wrapper">
                ${categories.map((_, index) => renderSlide(index)).join('')}
            </div>
            <div class="onboarding-controls">
                <button class="onboarding-nav-btn prev-btn" id="prevBtn">
                    <span>←</span>
                </button>
                <div class="onboarding-dots">
                    ${renderDots()}
                </div>
                <button class="onboarding-nav-btn next-btn" id="nextBtn">
                    <span>→</span>
                </button>
            </div>
        </div>
    `;

    const slidesWrapper = categoryEl.querySelector('.onboarding-slides-wrapper');
    const prevBtn = categoryEl.querySelector('#prevBtn');
    const nextBtn = categoryEl.querySelector('#nextBtn');
    const dots = categoryEl.querySelectorAll('.onboarding-dot');
    const actionBtns = categoryEl.querySelectorAll('.slide-action-btn');

    function updateSlide() {
        const slides = categoryEl.querySelectorAll('.onboarding-slide');
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // 슬라이드 이동 애니메이션
        slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        if (currentSlide < categories.length - 1) {
            currentSlide++;
            updateSlide();
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlide();
        }
    }

    // 네비게이션 버튼 이벤트
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // 도트 클릭 이벤트
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide();
        });
    });

    // 시작하기 버튼 이벤트
    actionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            
            if (!category || !categories.find(c => c.id === category)?.available) {
                alert('랜덤 행성 방문은 추후 개발 예정입니다.');
                return;
            }
            
            if (category === 'community') {
                // 커뮤니티 선택 시 게시글 목록 표시
                categoryEl.style.display = 'none';
                postsWrapEl.style.display = 'block';
                
                // 게시글 목록 렌더링 및 이벤트 바인딩
                renderPostWrap(postsWrapEl);
                addPostListEvent(postsWrapEl);
            }
        });
    });

    // 키보드 네비게이션
    document.addEventListener('keydown', (e) => {
        if (categoryEl.style.display === 'none') return;
        
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // 초기 슬라이드 설정
    updateSlide();
}

