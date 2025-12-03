/**
 * 카테고리 카드 컴포넌트
 */
export function renderCategoryCard(category) {
    const backgroundStyle = category.backgroundImage 
        ? `background-image: url('${category.backgroundImage}') !important; background-size: cover !important; background-position: center !important; background-repeat: no-repeat !important;`
        : `background: ${category.gradient} !important;`;
    
    return `
        <div class="category-card" data-category="${category.id}" style="--glow-color: ${category.glowColor};">
            <div class="category-image" style="${backgroundStyle}" ${category.backgroundImage ? 'data-has-image="true"' : ''}>
                ${!category.backgroundImage ? '<div class="category-glow"></div>' : ''}
                <div class="category-overlay">
                    <div class="category-icon">${category.icon}</div>
                    <h3 class="category-name">${category.name}</h3>
                    <p class="category-description">${category.description}</p>
                    ${!category.available ? '<span class="coming-soon-badge">추후 개발 예정</span>' : ''}
                </div>
            </div>
        </div>
    `;
}

export function renderCategoryGrid(categories) {
    return `
        <div class="category-grid">
            ${categories.map(category => renderCategoryCard(category)).join('')}
        </div>
    `;
}

