export function renderFooter(rootEl) {
  rootEl.innerHTML = `
    <footer class="footer_inner">
      <div class="footer_links">
        <a href="#">이용약관</a>
        <span class="divider">|</span>
        <a href="#"><strong>개인정보처리방침</strong></a>
        <span class="divider">|</span>
        <a href="#">책임의 한계와 법적고지</a>
        <span class="divider">|</span>
        <a href="#">고객센터</a>
      </div>

      <div class="footer_brand">
        <span class="brand_name">OUR SPACE</span>
        <span class="copyright">Copyright © Our Space Corp. All Rights Reserved.</span>
      </div>
    </footer>
  `;
}
