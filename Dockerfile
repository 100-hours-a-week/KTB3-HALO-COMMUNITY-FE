# ~으로 부터 : 도커 베이스 이미지를 어디서 가져올지
FROM node:20-alpine

# 작업 디렉토리 : 컨테이너 안에서 작업 디렉토리를 설정
WORKDIR /app

# 복사하다 : 이미지 안으로 복사 아래 두개 파일 복사
COPY package.json package-lock.json ./

# 이미지 빌드시 명령어 실행
RUN npm install
RUN npm install nodemon


# 현재 로컬 디렉터리 이미지 안으로 복사
COPY . .

# 포트 설정
EXPOSE 8080

# 컨테이너 실행시 앱 시작
CMD ["npm", "start"]




