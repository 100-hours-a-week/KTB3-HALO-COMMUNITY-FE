/**
 * 프로필 이미지 변경 이벤트
 * 람다를 통해 이미지 업로드 후 미리보기
 */
import { profile_image_lambda_url } from "/config.js";

export function addProfileImageChangeEvent(container) {
    const btnChange = container.querySelector('.btn_change_profile');
    const profileInput = container.querySelector('#profile_input');
    const profileImg = container.querySelector('img[name="profileImage"]');

    if (!btnChange || !profileInput || !profileImg) return;

    // 변경 버튼 클릭 시 파일 선택
    btnChange.addEventListener('click', () => {
        profileInput.click();
    });

    // 파일 선택 시 람다에 업로드
    profileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // 이미지 파일인지 확인
        if (!file.type.startsWith('image/')) {
            alert('이미지 파일만 업로드 가능합니다.');
            return;
        }

        // FormData 생성
        const formData = new FormData();
        formData.append("profileImage", file);

        try {
            // 람다에 이미지 업로드
            const uploadResponse = await fetch(profile_image_lambda_url, {
                method: "POST",
                body: formData
            });

            if (!uploadResponse.ok) {
                alert("이미지 업로드 실패");
                return;
            }

            const uploadResult = await uploadResponse.json();
            const imageUrl = uploadResult.data?.filePath || uploadResult.data?.imageUrl || uploadResult.filePath;

            if (!imageUrl) {
                alert("이미지 URL을 받아오지 못했습니다.");
                return;
            }

            // 미리보기로 이미지 URL 저장 (data attribute에 저장)
            profileImg.setAttribute('data-uploaded-url', imageUrl);
            profileImg.src = imageUrl;

            alert("프로필 이미지가 업로드되었습니다. '수정하기' 버튼을 클릭하여 저장하세요.");
        } catch (error) {
            console.error("이미지 업로드 중 오류 발생:", error);
            alert("이미지 업로드 중 오류가 발생했습니다.");
        }
    });
}

