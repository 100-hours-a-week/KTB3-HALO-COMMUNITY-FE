/**
 * 사용설명서 섹션 컴포넌트
 */
export function renderManualSection() {
    const manualCards = [
        {
            icon: '✍️',
            title: '게시글 작성하기',
            description: '커뮤니티에서 자유롭게 생각을 공유해보세요.<br>제목과 내용을 작성하고 이미지를 첨부할 수 있습니다.',
            steps: [
                '커뮤니티 페이지로 이동',
                '게시글 작성 버튼 클릭',
                '제목과 내용 입력 후 등록'
            ]
        },
        {
            icon: '💬',
            title: '댓글 달기',
            description: '게시글에 댓글을 남겨 소통을 시작해보세요.<br>다른 사용자들과 의견을 나누고 토론할 수 있습니다.',
            steps: [
                '게시글 상세 페이지로 이동',
                '댓글 입력창에 내용 작성',
                '댓글 등록 버튼 클릭'
            ]
        },
        {
            icon: '✏️',
            title: '게시글 수정/삭제',
            description: '내가 작성한 게시글은 언제든지 수정하거나 삭제할 수 있습니다.<br>게시글 상세 페이지에서 수정 및 삭제 버튼을 확인하세요.',
            steps: [
                '내가 작성한 게시글 열기',
                '수정 또는 삭제 버튼 클릭',
                '변경사항 확인 후 저장'
            ]
        },
        {
            icon: '❤️',
            title: '좋아요 & 조회수',
            description: '마음에 드는 게시글에 좋아요를 눌러주세요.<br>조회수는 게시글을 읽을 때마다 자동으로 증가합니다.',
            steps: [
                '게시글 상세 페이지 확인',
                '좋아요 버튼 클릭',
                '통계에서 확인 가능'
            ]
        }
    ];

    return `
        <div class="manual-section">
            <div class="manual-header">
                <div class="manual-icon">📖</div>
                <h2 class="manual-title">사용설명서</h2>
                <p class="manual-subtitle">Our Universe를 더 잘 활용하는 방법을 알아보세요</p>
            </div>
            
            <div class="manual-content">
                ${manualCards.map(card => `
                    <div class="manual-card">
                        <div class="manual-card-icon">${card.icon}</div>
                        <h3 class="manual-card-title">${card.title}</h3>
                        <p class="manual-card-description">${card.description}</p>
                        <div class="manual-steps">
                            ${card.steps.map((step, index) => `
                                <div class="step-item">
                                    <span class="step-number">${index + 1}</span>
                                    <span class="step-text">${step}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="manual-footer">
                <div class="manual-footer-glow"></div>
                <p class="manual-footer-text">이제 Our Universe의 모든 기능을 활용할 준비가 되었습니다! 🚀</p>
            </div>
        </div>
    `;
}


