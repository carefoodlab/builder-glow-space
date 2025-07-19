# 🥗 건강 식단 추천 서비스

개인 맞춤형 건강 식단을 추천해주는 웹 애플리케이션입니다. 사용자의 건강 상태, 생활 패턴, 음식 선호도를 분석하여 최적의 식단을 제안합니다.

## ✨ 주요 기능

- 📋 **개인화된 설문조사**: 건강 상태, 활동 수준, 식습관 분석
- 🎯 **맞춤형 추천**: AI 기반 개인별 건강 식단 제안
- 📊 **관리자 대시보드**: 설문 응답 통계 및 데이터 관리
- 🔒 **안전한 데이터 저장**: Supabase 클라우드 DB 연동
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화

## 🛠️ 기술 스택

### Frontend

- **React 18** + **TypeScript**
- **Vite** (빌드 도구)
- **React Router 6** (SPA 라우팅)
- **TailwindCSS 3** (스타일링)
- **Radix UI** (컴포넌트 라이브러리)
- **Framer Motion** (애니메이션)

### Backend & Database

- **Supabase** (PostgreSQL + 실시간 API)
- **Row Level Security** (데이터 보안)

### Deployment

- **Vercel** (호스팅 & CI/CD)
- **GitHub** (소스코드 관리)

## 🚀 빠른 시작

### 1. 프로젝트 클론

```bash
git clone https://github.com/[username]/health-diet-survey.git
cd health-diet-survey
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가:

```env
# Supabase 설정
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Google Sheets API (선택사항)
GOOGLE_SHEETS_API_KEY=your-api-key
GOOGLE_SHEETS_ID=your-sheet-id
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:8080` 접속

## 📋 사용 가이드

### 🏠 홈페이지

- 서비스 소개 및 기능 안내
- 설문조사 시작 버튼

### 📝 설문조사 (`/survey`)

1. **기본 정보**: 나이 입력
2. **건강 상태**: 질환, 관심사, 활동 수준
3. **식사 계획**: 인원, 목표, 예산
4. **음식 선호도**: 제한사항, 선호 음식, 기피 음식

### 📊 ���리자 대시보드 (`/admin/surveys`)

- 설문 응답 현황 통계
- 응답 데이터 조회 및 분석
- CSV 파일 내보내기

### ⚙️ 설정 확인 (`/supabase-status`)

- Supabase 연결 상태 확인
- 환경 변수 설정 가이드
- 연결 테스트 기능

## 🌐 배포하기

### GitHub + Vercel 자동 배포

1. **GitHub 리포지토리 생성**

   ```bash
   # Git 초기화
   git init
   git add .
   git commit -m "feat: 초기 프로젝트 설정"
   git branch -M main
   git remote add origin https://github.com/[username]/health-diet-survey.git
   git push -u origin main
   ```

2. **Vercel 연결**

   - [vercel.com](https://vercel.com)에서 GitHub 계정으로 로그인
   - "New Project" → GitHub 리포지토리 선택
   - Framework: `Vite` 선택

3. **환경 변수 설정**

   - Vercel 프로젝트 Settings → Environment Variables
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 추가

4. **자동 배포 완료!**
   - GitHub push → Vercel 자동 빌드 & 배포
   - 생성된 URL에서 사이트 확인

### 📖 상세 가이드

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - 단계별 배포 가이드
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Supabase 설정 가이드

## 🗂️ 프로젝트 구조

```
health-diet-survey/
├── client/                 # React 프론트엔드
│   ├── components/ui/      # UI 컴포넌트 라이브러리
│   ├── lib/               # 유틸리티 및 설정
│   │   └── supabase.ts    # Supabase 클라이언트
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── Index.tsx      # 홈페이지
│   │   ├── Survey.tsx     # 설문조사
│   │   ├── SurveyAdmin.tsx # 관리자 대시보드
│   │   └── SupabaseStatus.tsx # 설정 상태
│   ├── App.tsx           # 앱 진입점 & 라우팅
│   └── global.css        # 글로벌 스타일
├── server/               # Express 서버 (로컬 개발용)
├── api/                  # Vercel Serverless Functions
├── public/               # 정적 파일
├── supabase_setup.sql    # DB 스키마 & 설정
├── vercel.json           # Vercel 배포 설정
└── package.json          # 의존성 & 스크립트
```

## 🧪 테스트

```bash
# 단위 테스트 실행
npm run test

# 테스트 watch 모드
npm run test:watch

# 타입 체크
npm run typecheck

# 빌드 테스트
npm run build
```

## 📈 성능 최적화

- **Code Splitting**: React.lazy로 페이지별 분할 로딩
- **Image Optimization**: WebP 형식 및 반응형 이미지
- **Caching**: Vercel Edge Network 활용
- **Bundle Analysis**: Vite 번들 최적화

## 🔒 보안

- **환경 변수**: 민감한 정보 .env 파일 분리
- **Row Level Security**: Supabase RLS 정책 적용
- **HTTPS**: Vercel 자동 SSL 인증서
- **CSP Headers**: 보안 헤더 설정

## 🤝 기여하기

1. Fork 프로젝트
2. Feature 브랜치 생성 (`git checkout -b feature/new-feature`)
3. 변경사항 커밋 (`git commit -am 'Add new feature'`)
4. 브랜치 Push (`git push origin feature/new-feature`)
5. Pull Request 생성

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일 참조

## 🆘 지원

### 문제 해결

- [Issues](https://github.com/[username]/health-diet-survey/issues) - 버그 리포트 & 기능 요청
- [Discussions](https://github.com/[username]/health-diet-survey/discussions) - 질문 & 토론

### 관련 문서

- [Supabase 공식 문서](https://docs.supabase.com)
- [Vercel 배포 가이드](https://vercel.com/docs)
- [Vite 개발 가이드](https://vitejs.dev/guide/)

---

**🎯 목표**: 개인 맞춤형 건강 식단으로 모든 사람의 건강한 라이프스타일을 지원합니다!

Made with ❤️ by [Your Name]
