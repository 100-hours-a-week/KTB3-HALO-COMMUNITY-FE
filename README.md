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
|![image](https://github.com/user-attachments/assets/b36773fa-a777-4994-a808-c78919bac76f)|![image]([https://github.com/100-hours-a-week/5-erica-express-fe/assets/81230764/ced09612-80c1-4ef8-b102-55e57c5c2a78](https://github.com/user-attachments/assets/b3b08b41-ca96-4eb3-a97a-13026c388e7c))|





`게시글 목록`
|전체 게시글|개발 게시글|고민 게시글|
|---|---|---|
|![image](https://github.com/100-hours-a-week/5-erica-express-fe/assets/81230764/8cf84f26-cc6f-4cac-a25e-116875345185)|![image](https://github.com/100-hours-a-week/5-erica-express-fe/assets/81230764/0eb19661-b049-4dbb-b319-9b188bed412d)|![image](https://github.com/100-hours-a-week/5-erica-express-fe/assets/81230764/b81534fa-90bd-4cd6-aa89-045573447c6c)|


`게시물 작성 / 상세 / 수정 / 삭제`

|게시물 작성|게시물 상세|게시글 수정|게시글 삭제|
|---|---|---|---|
|![image](https://github.com/100-hours-a-week/5-erica-express-fe/assets/81230764/d5920b5c-6e6f-4e7c-9eda-9bccba44d267)|![image](https://github.com/100-hours-a-week/5-erica-express-fe/assets/81230764/08804c41-5640-4d37-baf3-9c0ece156ff6)|![image](https://github.com/100-hours-a-week/5-erica-express-fe/assets/81230764/eed24594-d475-499f-bf9b-d580fc782396)|![image](https://github.com/100-hours-a-week/5-erica-express-fe/assets/81230764/88cdcea2-b3b2-4cd0-abdc-52836eb2a92b)|


`댓글 목록 / 등록 / 수정 /삭제`

|댓글 화면|댓글 등록|댓글 수정|댓글 삭제|
|---|---|---|---|
|![image](https://github.com/100-hours-a-week/5-erica-express-fe/assets/81230764/d57fa86e-d1d8-4fb7-b86c-021129053ef0)|![image](https://github.com/100-hours-a-week/5-erica-express-fe/assets/81230764/076fa883-e20f-46ad-8649-67b38448676a)|![image](https://github.com/100-hours-a-week/5-erica-express-fe/assets/81230764/1c70a6e6-1f4c-4334-aaf9-f8a9ee5d5f9c)|![image](https://github.com/100-hours-a-week/5-erica-express-fe/assets/81230764/3f411243-9cc0-49d7-b3d0-511c961ada60)|

  
`프로필 수정 / 비밀번호 수정 / 회원 탈퇴 / 로그아웃`

|프로필 수정|비밀번호 수정|회원 탈퇴|로그아웃|
|---|---|---|---|
|![image](https://github.com/100-hours-a-week/5-erica-express-fe/assets/81230764/f96873ad-36f8-4258-92e0-b0f0f5c047d0)|![image](https://github.com/100-hours-a-week/5-erica-express-fe/assets/81230764/17ac88da-b06a-4b47-ab01-06fdcdced779)|![image](https://github.com/100-hours-a-week/5-erica-express-fe/assets/81230764/95e9e091-139a-4cf2-9d99-e0d22d8d24e5)|![image](https://github.com/100-hours-a-week/5-erica-express-fe/assets/81230764/878fb30b-fdb2-448f-aa16-24e3e088e94d)|

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
