export function renderGladBanner(rootEl) {
    // 광고 배너 이미지 배열
    const bannerImages = [
        'https://not-me-be.s3.ap-northeast-2.amazonaws.com/Unsaved/2025/11/13/image+(1).avif',
        'https://cdn.srtimes.kr/news/photo/201911/50047_44451_2910.jpg'
    ];
    
    // 랜덤으로 이미지 선택
    const randomImage = bannerImages[Math.floor(Math.random() * bannerImages.length)];
    
    rootEl.innerHTML = `
      <div class="gladbanner">
        <img src="${randomImage}" alt="광고 배너" />
      </div>
    `;
}
