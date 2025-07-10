# Vercel 배포 가이드

## 1. Vercel 계정 설정

1. [vercel.com](https://vercel.com)에서 GitHub 계정으로 회원가입
2. GitHub 저장소 연동

## 2. 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수들을 설정해주세요:

### 필수 환경 변수

- `GOOGLE_SHEETS_API_KEY`: Google Sheets API 키
- `GOOGLE_SHEETS_ID`: Google Sheets 문서 ID

### 설정 방법

1. Vercel 프로젝트 대시보드 → Settings
2. Environment Variables 탭
3. 각 환경 변수 추가 (Production, Preview, Development 모두 체크)

## 3. 배포 과정

### 자동 배포 (권장)

1. GitHub에 코드 푸시
2. Vercel이 자동으로 빌드 및 배포 실행
3. 완료 시 URL 제공

### 수동 배포 (Vercel CLI)

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포
vercel --prod
```

## 4. 프로젝트 구조

```
프로젝트/
├── api/
│   └── index.ts         # Vercel 서버리스 함수
├── client/              # React 프론트엔드
├── server/              # Express 서버 로직
├── vercel.json          # Vercel 설정
└── package.json         # 빌드 설정
```

## 5. API 경로

- 프론트엔드: `https://your-app.vercel.app`
- API 엔드포인트: `https://your-app.vercel.app/api/*`

## 6. 주요 특징

✅ **무료 호스팅** (개인 프로젝트)
✅ **자동 HTTPS** 적용
✅ **글로벌 CDN** 적용
✅ **자동 배포** (Git 푸시시)
✅ **서버리스 함수** 지원
✅ **환경별 배포** (Production/Preview)

## 7. 문제 해결

### 빌드 에러

- Vercel 대시보드에서 빌드 로그 확인
- 환경 변수 누락 여부 확인

### API 호출 실패

- `/api` 경로로 시작하는지 확인
- CORS 설정 확인

### 한글 문자 깨짐

- UTF-8 인코딩 설정 확인
- 서버 응답 헤더에 charset 설정
