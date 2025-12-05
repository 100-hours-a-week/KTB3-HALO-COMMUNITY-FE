/**
 * 커스텀 알림 컴포넌트
 * 화면 가운데에 표시되는 커스텀 알림을 생성하고 관리합니다.
 */

// CSS 파일 동적 로드 (한 번만 로드)
let cssLoaded = false;

function loadAlertCSS() {
  if (cssLoaded) return;
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/component/common/alert/alert.css';
  document.head.appendChild(link);
  cssLoaded = true;
}

/**
 * 알림을 표시하는 함수
 * @param {string} message - 표시할 메시지
 * @param {string} type - 알림 타입 ('success', 'error', 'warning', 'info')
 * @param {number} duration - 표시 시간 (밀리초, 기본값: 2000)
 */
export function showAlert(message, type = 'info', duration = 2000) {
  // CSS 로드
  loadAlertCSS();

  // 기존 알림이 있으면 제거
  const existingAlert = document.querySelector('.custom-alert');
  if (existingAlert) {
    existingAlert.remove();
  }

  // 알림 요소 생성
  const alert = document.createElement('div');
  alert.className = 'custom-alert';
  alert.setAttribute('data-type', type);
  
  // 아이콘 설정
  let icon = '';
  if (type === 'success') {
    icon = '✓';
  } else if (type === 'error') {
    icon = '✕';
  } else if (type === 'warning') {
    icon = '⚠';
  } else {
    icon = 'ℹ';
  }

  alert.innerHTML = `
    <div class="custom-alert__content">
      <span class="custom-alert__icon">${icon}</span>
      <span class="custom-alert__message">${message}</span>
    </div>
  `;

  document.body.appendChild(alert);

  // 애니메이션으로 표시
  setTimeout(() => {
    alert.classList.add('show');
  }, 10);

  // 지정된 시간 후 자동으로 사라짐
  setTimeout(() => {
    alert.classList.remove('show');
    setTimeout(() => {
      alert.remove();
    }, 300);
  }, duration);
}

/**
 * 알림을 즉시 제거하는 함수
 */
export function hideAlert() {
  const alert = document.querySelector('.custom-alert');
  if (alert) {
    alert.classList.remove('show');
    setTimeout(() => {
      alert.remove();
    }, 300);
  }
}

