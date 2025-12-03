/**
 * 우주 배경 효과 컴포넌트
 */
export function renderCosmicBackground() {
    // 날아다니는 별 생성
    const createFloatingStars = () => {
        const stars = [];
        const directions = [
            { x: 100, y: -100 },
            { x: -100, y: -100 },
            { x: 150, y: -50 },
            { x: -150, y: -50 },
            { x: 0, y: -150 },
        ];
        
        for (let i = 0; i < 50; i++) {
            const startX = Math.random() * 100;
            const startY = 100 + Math.random() * 20;
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
            const hue = 240 + Math.random() * 60;
            
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

    return `
        <div class="cosmic-background">
            ${createNebulas()}
            ${createBlackHoles()}
        </div>
        <div class="stars-container">${createFloatingStars()}</div>
    `;
}


