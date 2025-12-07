# 🚀 Our Space

## Front-end 소개

- `우주에 대해 소통하는 커뮤니티` 프로젝트입니다.
- `express.js` 프레임워크를 사용하여 구현했습니다.
- 개발은 초기 프로젝트 화면부터, 기능, 백엔드 연결까지 `직접 구현`했습니다.

### 개발 인원 및 기간

- 개발기간 :  2024-10-03 ~ 2024-12-07
- 개발 인원 : 프론트엔드/백엔드 1명 (본인)

### 사용 기술 및 tools
- Express.js

### Back-end
- <a href="https://github.com/100-hours-a-week/KTB3-HALO-COMMUNITY-BE">Back-end Github</a>

### 폴더 구조
<details>
  <summary>폴더 구조 보기/숨기기</summary>
  <div markdown="1">

    KTB3-HALO-COMMUNITY-FE/
    ├── app.js
    ├── package.json
    ├── package-lock.json
    ├── openapi.json
    ├── Dockerfile
    ├── .github/
    │   └── workflows/
    │       └── deploy.yml
    ├── routes/
    │   ├── index.js
    │   ├── authRoutes.js
    │   ├── healthCheck.js
    │   ├── onboardingRoutes.js
    │   ├── postRoutes.js
    │   └── userRoutes.js
    ├── utils/
    │   └── path.js
    └── public/
        ├── config.js
        ├── page_path.js
        ├── component/
        │   ├── auth/
        │   │   ├── footer/
        │   │   │   ├── footer_inner.css
        │   │   │   └── footer_inner.js
        │   │   ├── gladbanner/
        │   │   │   ├── gladbanne.css
        │   │   │   └── gladbanner.js
        │   │   ├── header/
        │   │   │   ├── header_inner.css
        │   │   │   └── header_inner.js
        │   │   ├── login_wrap/
        │   │   │   ├── find_wrap.css
        │   │   │   ├── find_wrap.js
        │   │   │   ├── login_wrap.css
        │   │   │   └── login_wrap.js
        │   │   └── signup_wrap/
        │   │       ├── signup_wrap.css
        │   │       └── signup_wrap.js
        │   ├── common/
        │   │   ├── alert/
        │   │   │   ├── alert.css
        │   │   │   └── alert.js
        │   │   ├── footer/
        │   │   │   ├── footer_inner.css
        │   │   │   └── footer_inner.js
        │   │   ├── header/
        │   │   │   └── navigator/
        │   │   │       ├── bindNavigatorEvents.js
        │   │   │       ├── navigator.css
        │   │   │       └── navigator.js
        │   │   └── toast/
        │   │       ├── toast.css
        │   │       └── toast.js
        │   ├── onboarding/
        │   │   ├── category_card/
        │   │   │   └── category_card.js
        │   │   ├── cosmic_background/
        │   │   │   └── cosmic_background.js
        │   │   ├── manual_section/
        │   │   │   └── manual_section.js
        │   │   ├── onboarding.css
        │   │   └── onboarding.js
        │   ├── post/
        │   │   ├── category_wrap/
        │   │   │   ├── category_wrap.css
        │   │   │   └── category_wrap.js
        │   │   ├── onboarding/
        │   │   ├── post_detail/
        │   │   │   ├── article_wrap/
        │   │   │   │   ├── article_wrap.css
        │   │   │   │   └── article_wrap.js
        │   │   │   ├── comment_wrap/
        │   │   │   │   ├── comment_wrap.css
        │   │   │   │   └── comment_wrap.js
        │   │   │   ├── stats_wrap/
        │   │   │   │   ├── stats_wrap.css
        │   │   │   │   └── stats_wrap.js
        │   │   │   └── user_info_wrap/
        │   │   │       ├── user_info_wrap.css
        │   │   │       └── user_info_wrap.js
        │   │   ├── post_modify/
        │   │   │   ├── article_wrap/
        │   │   │   │   ├── article_wrap.css
        │   │   │   │   └── article_wrap.js
        │   │   │   ├── image_wrap/
        │   │   │   │   ├── image_wrap.css
        │   │   │   │   └── image_wrap.js
        │   │   │   ├── info_wrap/
        │   │   │   │   ├── info_wrap.css
        │   │   │   │   └── info_wrap.js
        │   │   │   ├── modify_button_wrap/
        │   │   │   │   ├── modify_button_wrap.css
        │   │   │   │   └── modify_button_wrap.js
        │   │   │   └── title_wrap/
        │   │   │       ├── title_wrap.css
        │   │   │       └── title_wrap.js
        │   │   └── post_wrap/
        │   │       ├── post_item/
        │   │       │   ├── post_item_skeleton.css
        │   │       │   ├── post_item_skeleton.js
        │   │       │   ├── post_item.css
        │   │       │   └── post_item.js
        │   │       ├── post_wrap_handlers.js
        │   │       ├── post_wrap.css
        │   │       └── post_wrap.js
        │   └── user/
        │       ├── account/
        │       │   └── account_wrap/
        │       │       ├── account_wrap.css
        │       │       └── account_wrap.js
        │       └── password/
        │           └── password_wrap/
        │               ├── password_wrap.css
        │               └── password_wrap.js
        ├── pages/
        │   ├── auth/
        │   │   ├── login/
        │   │   │   ├── login.css
        │   │   │   ├── login.html
        │   │   │   └── login.js
        │   │   └── signup/
        │   │       ├── signup.css
        │   │       ├── signup.html
        │   │       └── signup.js
        │   ├── onboarding/
        │   │   ├── onboarding.css
        │   │   ├── onboarding.html
        │   │   └── onboarding.js
        │   ├── post/
        │   │   ├── post_create/
        │   │   │   ├── post_create.css
        │   │   │   ├── post_create.html
        │   │   │   └── post_create.js
        │   │   ├── post_detail/
        │   │   │   ├── post_detail.css
        │   │   │   ├── post_detail.html
        │   │   │   └── post_detail.js
        │   │   ├── post_modify/
        │   │   │   ├── post_modify.css
        │   │   │   ├── post_modify.html
        │   │   │   └── post_modify.js
        │   │   └── postList/
        │   │       ├── postList.css
        │   │       ├── postList.html
        │   │       └── postList.js
        │   └── user/
        │       ├── account/
        │       │   ├── account.css
        │       │   ├── account.html
        │       │   └── account.js
        │       └── password/
        │           ├── password.css
        │           ├── password.html
        │           └── password.js
        ├── service/
        │   ├── auth/
        │   │   ├── login/
        │   │   │   └── addLoginEvent.js
        │   │   ├── logout/
        │   │   │   └── addLogoutEvent.js
        │   │   ├── refresh/
        │   │   │   └── refresh_service.js
        │   │   └── signup/
        │   │       └── addSignupEvent.js
        │   ├── comment/
        │   │   ├── add_comment_event.js
        │   │   └── comment_service.js
        │   ├── onboarding/
        │   │   ├── add_onboarding_event.js
        │   │   └── onboarding_service.js
        │   ├── post/
        │   │   ├── onboarding/
        │   │   ├── post_create/
        │   │   │   └── add_post_create_event.js
        │   │   ├── post_delete/
        │   │   │   └── add_post_delete_event.js
        │   │   ├── post_detail/
        │   │   │   ├── add_post_detail_event.js
        │   │   │   └── post_like/
        │   │   │       └── add_post_detail_like_event.js
        │   │   ├── post_list/
        │   │   │   └── add_post_list_event.js
        │   │   └── post_update/
        │   │       └── add_post_update_event.js
        │   └── user/
        │       ├── password/
        │       │   └── addPasswordChangeEvent.js
        │       └── profile/
        │           ├── add_navigator_profile_image.js
        │           ├── add_profile_change_event.js
        │           ├── add_profile_delete_event.js
        │           ├── add_profile_image_change_event.js
        │           └── add_profile_load_event.js
        ├── styles/
        │   ├── alert.css
        │   └── global.css
        └── utils/
            ├── apiClient.js
            ├── confirmDialog.js
            ├── eventHandlers.js
            ├── fetchWithAuth.js
            ├── iconSvgs.js
            ├── imageConstants.js
            ├── imagePreview.js
            ├── initApiClient.js
            ├── jwt.js
            ├── scrollObserver.js
            ├── showAlert.js
            ├── skeletonConfig.js
            ├── textUtils.js
            └── toast.js
        
  </div>
  </details>
  <br/>

## 서비스 화면

`홈`
|로그인|회원가입|
|---|---|
|![image](https://github.com/user-attachments/assets/b36773fa-a777-4994-a808-c78919bac76f)|![image](https://github.com/user-attachments/assets/3853709e-fe2b-4a34-b46d-8bb3edc176a2)|












`전체 게시글 / 게시물 작성 / 상세 / 수정 / 삭제`

|전체 게시글|게시물 작성|게시물 상세|게시글 수정|게시글 삭제|
|---|---|---|---|---|
|![image](https://github.com/user-attachments/assets/4e175003-5e3e-47af-8dbe-a96573093444)|![image](https://github.com/user-attachments/assets/ac7070c0-4ab0-4fea-8b61-cefb0b2a7c10)|![image](https://github.com/user-attachments/assets/83e4f3d9-d8c1-4b2a-9e22-948058d1efce)|![image](https://github.com/user-attachments/assets/1b58c704-fc55-4f9f-a54c-689190665f88)|![image](https://github.com/user-attachments/assets/4c9daa63-4332-4b38-8854-e6b1fb9b907d)|






`댓글 목록 / 등록 / 수정 /삭제`

|댓글 화면|댓글 등록|댓글 수정|댓글 삭제|
|---|---|---|---|
|![image](https://github.com/user-attachments/assets/ca9cc958-bf49-425b-be8b-81e1f6aea1b3)|![image](https://github.com/user-attachments/assets/d16bd4ca-c110-4dbe-a695-4fd17e647971)|![image](https://github.com/user-attachments/assets/d38a94ae-397b-4df4-b874-f78135c30aa6)|![image](https://github.com/user-attachments/assets/21a089cc-b74a-4dde-a220-24780c6666b7)|

  
`프로필 수정 / 비밀번호 수정 / 회원 탈퇴 / 로그아웃`





|프로필 수정|비밀번호 수정|회원 탈퇴|로그아웃|
|---|---|---|---|
|![image](https://github.com/user-attachments/assets/2f038f23-5cb7-4c73-a913-8978be381a1f)|![image](https://github.com/user-attachments/assets/d2fb3211-d21c-4731-a5f0-b2cf5291bc3c)|![image](https://github.com/user-attachments/assets/f09aa1da-9674-4187-8ca5-06144a7e8ef1)|![image](https://github.com/user-attachments/assets/f518c1a9-d9ec-463d-bd63-cc7fbb68bf7b)|

<br/>

## 트러블 슈팅

추후 작성 ...

<br/>

## 프로젝트 후기
평소에 웹 페이지를 개발할 때 vanilla가 아닌 React 라이브러리를 사용해서 개발을 하는데, 요번 프로젝트는 vanilla만 사용해서 개발을 했습니다. vanilla에서는 훅을 사용하지 못하기 때문에 훅처럼 동작하는 코드를 만들기 위해 어떻게 해야하나 고민도 많이해보게 된 프로젝트였던 것 같습니다. 프로젝트를 하면서 javascript 동작 방식에 대해서 좀 더 이해하게 되었습니다. 좀 더 많은 기능을 추가하고 싶었으나 아이디어 부족으로 인해, 기능 추가를 하지 못한 점이 아쉬운 것 같습니다. 다음 프로젝트에서는 여러 핵심 기능을 구현하고, 현재 습득한 기술 및 지식을 활용하여 프로젝트를 진행하도록 하겠습니다.
<br/>
<br/>
<br/>


<p align="center">
  <img src="https://github.com/100-hours-a-week/5-erica-express-fe/assets/81230764/97f46705-5714-40fe-a3c6-ce5250a24285" style="width:200px; margin: 0 auto"/>
</p>
