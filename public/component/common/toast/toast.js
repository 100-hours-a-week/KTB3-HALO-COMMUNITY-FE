/**
 * 토스트 알림 컴포넌트
 * 화면 상단에 표시되는 토스트 알림을 생성하고 관리합니다.
 */

// CSS 파일 동적 로드 (한 번만 로드)
let cssLoaded = false;

function loadToastCSS() {
  if (cssLoaded) return;
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/component/common/toast/toast.css';
  document.head.appendChild(link);
  cssLoaded = true;
}

// 아이콘 SVG 정의
const TOAST_ICONS = {
  'check-circle': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor"/>
  </svg>`,
  'error': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="currentColor"/>
  </svg>`,
  'warning': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0L0 18H20L10 0ZM10 14C9.45 14 9 14.45 9 15C9 15.55 9.45 16 10 16C10.55 16 11 15.55 11 15C11 14.45 10.55 14 10 14ZM9 12H11V8H9V12Z" fill="currentColor"/>
  </svg>`,
  'info': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z" fill="currentColor"/>
  </svg>`
};

/**
 * 토스트 알림 표시
 * @param {Object} options - 토스트 알림 옵션
 * @param {string} options.type - 알림 타입 (기본값: "toast")
 * @param {string} options.position - 위치 (기본값: "top-center")
 * @param {string} options.background - 배경색 (기본값: "#FFFFFF")
 * @param {number} options.borderRadius - 모서리 둥글기 (기본값: 10)
 * @param {number} options.paddingVertical - 세로 패딩 (기본값: 10)
 * @param {number} options.paddingHorizontal - 가로 패딩 (기본값: 18)
 * @param {string} options.shadow - 그림자 (기본값: "0 4px 12px rgba(0, 0, 0, 0.12)")
 * @param {string} options.icon - 아이콘 타입 (기본값: "check-circle")
 * @param {string} options.iconColor - 아이콘 색상 (기본값: "#30C860")
 * @param {number} options.iconSize - 아이콘 크기 (기본값: 20)
 * @param {number} options.fontSize - 폰트 크기 (기본값: 14)
 * @param {string} options.fontColor - 폰트 색상 (기본값: "#000000")
 * @param {string} options.message - 메시지 (필수)
 * @param {number} options.duration - 표시 시간(ms) (기본값: 2500)
 * @param {number} options.gap - 아이콘과 메시지 간격 (기본값: 8)
 */
export function showToast(options = {}) {
  // CSS 로드
  loadToastCSS();

  const {
    type = "toast",
    position = "top-center",
    background = "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    borderRadius = 12,
    paddingVertical = 12,
    paddingHorizontal = 20,
    shadow = "0 4px 20px rgba(22, 33, 62, 0.5), 0 0 40px rgba(22, 33, 62, 0.2)",
    icon = "check-circle",
    iconColor = "#5b8fb8",
    iconSize = 20,
    fontSize = 14,
    fontColor = "#ffffff",
    message = "",
    duration = 2500,
    gap = 10
  } = options;

  if (!message) {
    console.warn('토스트 메시지가 없습니다.');
    return;
  }

  // 기존 토스트가 있으면 제거
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) {
    existingToast.remove();
  }

  // 토스트 컨테이너 생성
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.setAttribute('data-type', type);
  toast.setAttribute('data-position', position);

  // 스타일 적용
  toast.style.background = background;
  toast.style.borderRadius = `${borderRadius}px`;
  toast.style.padding = `${paddingVertical}px ${paddingHorizontal}px`;
  toast.style.boxShadow = shadow;
  toast.style.fontSize = `${fontSize}px`;
  toast.style.color = fontColor;

  // 아이콘 SVG 가져오기
  const iconSvg = TOAST_ICONS[icon] || TOAST_ICONS['check-circle'];
  const iconWrapper = document.createElement('div');
  iconWrapper.className = 'toast-icon';
  iconWrapper.style.width = `${iconSize}px`;
  iconWrapper.style.height = `${iconSize}px`;
  iconWrapper.style.color = iconColor;
  iconWrapper.style.flexShrink = '0';
  iconWrapper.innerHTML = iconSvg;

  // 메시지 요소 생성
  const messageEl = document.createElement('div');
  messageEl.className = 'toast-message';
  messageEl.textContent = message;

  // 토스트 내용 래퍼
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'toast-content';
  contentWrapper.style.gap = `${gap}px`;
  contentWrapper.appendChild(iconWrapper);
  contentWrapper.appendChild(messageEl);

  toast.appendChild(contentWrapper);
  document.body.appendChild(toast);

  // 애니메이션으로 표시
  requestAnimationFrame(() => {
    toast.classList.add('toast-show');
  });

  // duration 후 자동으로 사라짐
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  }, duration);
}

/**
 * 토스트를 즉시 제거하는 함수
 */
export function hideToast() {
  const toast = document.querySelector('.toast-notification');
  if (toast) {
    toast.classList.remove('toast-show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  }
}

/**
 * 간편한 토스트 함수들
 */
export const toast = {
  success: (message, options = {}) => {
    showToast({
      ...options,
      message,
      icon: 'check-circle',
      iconColor: '#5b8fb8'
    });
  },
  error: (message, options = {}) => {
    showToast({
      ...options,
      message,
      icon: 'error',
      iconColor: '#ff6b9d'
    });
  },
  warning: (message, options = {}) => {
    showToast({
      ...options,
      message,
      icon: 'warning',
      iconColor: '#ffa500'
    });
  },
  info: (message, options = {}) => {
    showToast({
      ...options,
      message,
      icon: 'info',
      iconColor: '#5b8fb8'
    });
  }
};

