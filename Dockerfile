# Node.js 20.12.2 버전의 공식 이미지 사용
FROM node:20.12.2

# npm install을 위해 package.json과 package-lock.json을 먼저 복사
COPY package*.json ./

# 패키지 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 애플리케이션이 사용할 포트 노출
EXPOSE 3000

# 컨테이너 시작 시 실행할 명령어 (package.json의 scripts에 있는 start 명령어 실행)
CMD ["npm", "start"]
