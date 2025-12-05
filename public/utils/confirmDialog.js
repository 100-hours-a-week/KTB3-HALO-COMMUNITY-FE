/**
 * 커스텀 확인 다이얼로그 유틸리티
 * 우주 테마에 맞는 확인 모달
 */

/**
 * 확인 다이얼로그 표시
 * @param {string} message - 확인 메시지
 * @param {Function} onConfirm - 확인 시 실행할 함수
 * @param {Function} onCancel - 취소 시 실행할 함수 (선택)
 */
export function showConfirm(message, onConfirm, onCancel = null) {
  // 기존 모달이 있으면 제거
  const existingModal = document.querySelector('.confirm-modal');
  if (existingModal) {
    existingModal.remove();
  }

  // 모달 오버레이 생성
  const overlay = document.createElement('div');
  overlay.className = 'confirm-modal-overlay';
  
  // 모달 컨테이너 생성
  const modal = document.createElement('div');
  modal.className = 'confirm-modal';
  
  modal.innerHTML = `
    <div class="confirm-modal__content">
      <div class="confirm-modal__message">${message}</div>
      <div class="confirm-modal__buttons">
        <button class="confirm-modal__btn confirm-modal__btn--cancel">취소</button>
        <button class="confirm-modal__btn confirm-modal__btn--confirm">확인</button>
      </div>
    </div>
  `;
  
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  
  // 애니메이션으로 표시
  requestAnimationFrame(() => {
    overlay.classList.add('show');
  });
  
  // 확인 버튼 이벤트
  const confirmBtn = modal.querySelector('.confirm-modal__btn--confirm');
  confirmBtn.addEventListener('click', () => {
    overlay.classList.remove('show');
    setTimeout(() => {
      overlay.remove();
      if (onConfirm) onConfirm();
    }, 300);
  });
  
  // 취소 버튼 이벤트
  const cancelBtn = modal.querySelector('.confirm-modal__btn--cancel');
  cancelBtn.addEventListener('click', () => {
    overlay.classList.remove('show');
    setTimeout(() => {
      overlay.remove();
      if (onCancel) onCancel();
    }, 300);
  });
  
  // 오버레이 클릭 시 취소
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('show');
      setTimeout(() => {
        overlay.remove();
        if (onCancel) onCancel();
      }, 300);
    }
  });
  
  // ESC 키로 취소
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      overlay.classList.remove('show');
      setTimeout(() => {
        overlay.remove();
        if (onCancel) onCancel();
      }, 300);
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);
}

/**
 * Promise 기반 확인 다이얼로그
 * @param {string} message - 확인 메시지
 * @returns {Promise<boolean>} - 확인 시 true, 취소 시 false
 */
export function confirmDialog(message) {
  return new Promise((resolve) => {
    showConfirm(
      message,
      () => resolve(true),
      () => resolve(false)
    );
  });
}

