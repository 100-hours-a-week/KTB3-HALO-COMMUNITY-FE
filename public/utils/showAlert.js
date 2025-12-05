/**
 * 화면 가운데에 표시되는 커스텀 알림 함수
 */
export function showAlert(message, type = 'info') {
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

  // 2초 후 자동으로 사라짐
  setTimeout(() => {
    alert.classList.remove('show');
    setTimeout(() => {
      alert.remove();
    }, 300);
  }, 2000);
}

