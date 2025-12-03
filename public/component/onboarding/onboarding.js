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

    // 날아다니는 별 생성
    const createFloatingStars = () => {
        const stars = [];
        const directions = [
            { x: 100, y: -100 }, // 오른쪽 위
            { x: -100, y: -100 }, // 왼쪽 위
            { x: 150, y: -50 }, // 오른쪽 위 대각선
            { x: -150, y: -50 }, // 왼쪽 위 대각선
            { x: 0, y: -150 }, // 위로
        ];
        
        for (let i = 0; i < 50; i++) {
            const startX = Math.random() * 100;
            const startY = 100 + Math.random() * 20; // 화면 하단에서 시작
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const moveX = direction.x + (Math.random() - 0.5) * 50;
            const moveY = direction.y - Math.random() * 50;
            const size = 2 + Math.random() * 3;
            const duration = 15 + Math.random() * 15;
            const delay = Math.random() * 5;
            const starType = Math.random() > 0.7 ? 'shooting' : 'normal';
            
            stars.push(`
                <div class="floating-star ${starType}" style="
                    left: ${startX}%;
                    top: ${startY}%;
                    width: ${size}px;
                    height: ${size}px;
                    --move-x: ${moveX}vw;
                    --move-y: ${moveY}vh;
                    animation-delay: ${delay}s;
                    animation-duration: ${duration}s;
                    opacity: ${0.4 + Math.random() * 0.4};
                "></div>
            `);
        }
        return stars.join('');
    };

    // 블랙홀 생성
    const createBlackHoles = () => {
        const blackHoles = [];
        for (let i = 0; i < 3; i++) {
            const x = 10 + Math.random() * 80;
            const y = 10 + Math.random() * 80;
            const size = 150 + Math.random() * 100;
            
            blackHoles.push(`
                <div class="black-hole" style="
                    left: ${x}%;
                    top: ${y}%;
                    width: ${size}px;
                    height: ${size}px;
                    animation-delay: ${i * 2}s;
                "></div>
            `);
        }
        return blackHoles.join('');
    };

    // 성운 생성
    const createNebulas = () => {
        const nebulas = [];
        for (let i = 0; i < 4; i++) {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = 200 + Math.random() * 300;
            const hue = 240 + Math.random() * 60; // 퍼플 계열
            
            nebulas.push(`
                <div class="nebula" style="
                    left: ${x}%;
                    top: ${y}%;
                    width: ${size}px;
                    height: ${size}px;
                    --hue: ${hue};
                    animation-delay: ${i * 3}s;
                "></div>
            `);
        }
        return nebulas.join('');
    };

    container.innerHTML = `
        <div class="onboarding-wrapper">
            <div class="cosmic-background">
                ${createNebulas()}
                ${createBlackHoles()}
            </div>
            <div class="stars-container">${createFloatingStars()}</div>
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
                
                <!-- 사용설명서 섹션 -->
                <div class="manual-section">
                    <div class="manual-header">
                        <div class="manual-icon">📖</div>
                        <h2 class="manual-title">사용설명서</h2>
                        <p class="manual-subtitle">Our Universe를 더 잘 활용하는 방법을 알아보세요</p>
                    </div>
                    
                    <div class="manual-content">
                        <div class="manual-card">
                            <div class="manual-card-icon">✍️</div>
                            <h3 class="manual-card-title">게시글 작성하기</h3>
                            <p class="manual-card-description">
                                커뮤니티에서 자유롭게 생각을 공유해보세요.<br>
                                제목과 내용을 작성하고 이미지를 첨부할 수 있습니다.
                            </p>
                            <div class="manual-steps">
                                <div class="step-item">
                                    <span class="step-number">1</span>
                                    <span class="step-text">커뮤니티 페이지로 이동</span>
                                </div>
                                <div class="step-item">
                                    <span class="step-number">2</span>
                                    <span class="step-text">게시글 작성 버튼 클릭</span>
                                </div>
                                <div class="step-item">
                                    <span class="step-number">3</span>
                                    <span class="step-text">제목과 내용 입력 후 등록</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="manual-card">
                            <div class="manual-card-icon">💬</div>
                            <h3 class="manual-card-title">댓글 달기</h3>
                            <p class="manual-card-description">
                                게시글에 댓글을 남겨 소통을 시작해보세요.<br>
                                다른 사용자들과 의견을 나누고 토론할 수 있습니다.
                            </p>
                            <div class="manual-steps">
                                <div class="step-item">
                                    <span class="step-number">1</span>
                                    <span class="step-text">게시글 상세 페이지로 이동</span>
                                </div>
                                <div class="step-item">
                                    <span class="step-number">2</span>
                                    <span class="step-text">댓글 입력창에 내용 작성</span>
                                </div>
                                <div class="step-item">
                                    <span class="step-number">3</span>
                                    <span class="step-text">댓글 등록 버튼 클릭</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="manual-card">
                            <div class="manual-card-icon">✏️</div>
                            <h3 class="manual-card-title">게시글 수정/삭제</h3>
                            <p class="manual-card-description">
                                내가 작성한 게시글은 언제든지 수정하거나 삭제할 수 있습니다.<br>
                                게시글 상세 페이지에서 수정 및 삭제 버튼을 확인하세요.
                            </p>
                            <div class="manual-steps">
                                <div class="step-item">
                                    <span class="step-number">1</span>
                                    <span class="step-text">내가 작성한 게시글 열기</span>
                                </div>
                                <div class="step-item">
                                    <span class="step-number">2</span>
                                    <span class="step-text">수정 또는 삭제 버튼 클릭</span>
                                </div>
                                <div class="step-item">
                                    <span class="step-number">3</span>
                                    <span class="step-text">변경사항 확인 후 저장</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="manual-card">
                            <div class="manual-card-icon">❤️</div>
                            <h3 class="manual-card-title">좋아요 & 조회수</h3>
                            <p class="manual-card-description">
                                마음에 드는 게시글에 좋아요를 눌러주세요.<br>
                                조회수는 게시글을 읽을 때마다 자동으로 증가합니다.
                            </p>
                            <div class="manual-steps">
                                <div class="step-item">
                                    <span class="step-number">1</span>
                                    <span class="step-text">게시글 상세 페이지 확인</span>
                                </div>
                                <div class="step-item">
                                    <span class="step-number">2</span>
                                    <span class="step-text">좋아요 버튼 클릭</span>
                                </div>
                                <div class="step-item">
                                    <span class="step-number">3</span>
                                    <span class="step-text">통계에서 확인 가능</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="manual-footer">
                        <div class="manual-footer-glow"></div>
                        <p class="manual-footer-text">이제 Our Universe의 모든 기능을 활용할 준비가 되었습니다! 🚀</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

