// 푸터 렌더링
export function renderFooter(rootEl) {
  if (!rootEl) {
    console.error('rootEl을 찾을 수 없습니다!');
    return;
  }

  rootEl.innerHTML = `
    <div class="footer_inner">
      <div class="footer_content">
        <div class="footer_section footer_brand">
          <h3 class="footer_logo">NOT ME</h3>
          <p class="footer_description">
            "가끔 너가 아니여도 돼"<br>
            나다움과 개성을 강요받는 세상에 지쳐 모인 곳, Not Me
          </p>
          <div class="footer_socials">
            <a href="#" class="social_link" aria-label="Thread">🧵</a>
            <a href="#" class="social_link" aria-label="Twitter">𝕏</a>
            <a href="#" class="social_link" aria-label="Instagram">📷</a>
          </div>
        </div>

        <div class="footer_section">
          <h4 class="footer_title">About</h4>
          <ul class="footer_links">
            <li><a href="/about/service">서비스 소개</a></li>
            <li><a href="/about/team">팀 소개</a></li>
            <li><a href="/about/contact">자주 묻는 질문</a></li>
          </ul>
        </div>

        <div class="footer_section">
          <h4 class="footer_title">Community</h4>
          <ul class="footer_links">
            <li><a href="/posts">리뷰 & 추천</a></li>
            <li><a href="/community/news">뉴스레터 구독</a></li>
            <li><a href="/community/support">고객센터/문의하기</a></li>
          </ul>
        </div>

        <div class="footer_section">
          <h4 class="footer_title">Socials</h4>
          <ul class="footer_links">
            <li><a href="#">인스타그램</a></li>
            <li><a href="#">트위터/X</a></li>
            <li><a href="#">블로그/브런치</a></li>
          </ul>
        </div>
      </div>

      <div class="footer_bottom">
        <p class="footer_copyright">© 2025 NOT ME. All rights reserved.</p>
        <p class="footer_contact">문의: dongjin778@naver.com | 대표: Halo | 사업자등록번호: 123-45-67890</p>
      </div>
    </div>
  `;
}