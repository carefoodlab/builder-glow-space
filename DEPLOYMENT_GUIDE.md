# 🚀 GitHub + Vercel 배포 가이드

이 가이드를 따라하면 건강 식단 추천 사이트를 GitHub에 업로드하고 Vercel에서 자동 배포할 수 있습니다.

## ✅ 배포 체크리스트

- [ ] 1단계: GitHub 리포지토리 생성
- [ ] 2단계: 로컬 Git 설정 및 코드 업로드
- [ ] 3단계: Vercel 프로젝트 생성
- [ ] 4단계: 환경 변수 설정
- [ ] 5단계: 빌드 및 배포 확인
- [ ] 6단계: 도메인 설정 (선택사항)

---

## 📋 1단계: GitHub 리포지토리 생성

### 1.1 GitHub 접속 및 리포지토리 생성

1. [github.com](https://github.com) 로그인
2. **"New repository"** 버튼 클릭 (우측 상단 + 버튼)
3. 리포지토리 정보 입력:
   ```
   Repository name: health-diet-survey
   Description: 개인 맞춤형 건강 식단 추천 서비스
   ✅ Public (또는 Private - 개인 선택)
   ❌ Add a README file (이미 있음)
   ❌ Add .gitignore (이미 있음)
   ❌ Choose a license
   ```
4. **"Create repository"** 클릭

### 1.2 리포지토리 URL 복사

생성된 리포지토리 페이지에서 HTTPS URL 복사:

```
https://github.com/[your-username]/health-diet-survey.git
```

---

## 🔧 2단계: 로컬 Git 설정 및 코드 업로드

### 2.1 Git 초기화 (터미널에서 실행)

```bash
# Git 초기화
git init

# .env 파일을 .gitignore에 추가 (보안을 위해)
echo ".env" >> .gitignore
echo "dist/" >> .gitignore
echo "node_modules/" >> .gitignore

# 모든 파일 추가
git add .

# 첫 번째 커밋
git commit -m "feat: 초기 프로젝트 설정 - 건강 식단 추천 서비스"

# 기본 브랜치를 main으로 설정
git branch -M main

# GitHub 리포지토리 연결
git remote add origin https://github.com/[your-username]/health-diet-survey.git

# 코드 업로드
git push -u origin main
```

### 2.2 업로드 확인

1. GitHub 리포지토리 페이지 새로고침
2. 파일들이 업로드되었는지 확인
3. `.env` 파일이 업로드되지 않았는지 확인 (보안상 중요!)

---

## 🌐 3단계: Vercel 프로젝트 생성

### 3.1 Vercel 계정 생성 및 연결

1. [vercel.com](https://vercel.com) 접속
2. **"Continue with GitHub"** 클릭하여 GitHub 계정으로 로그인
3. GitHub 권한 승인

### 3.2 새 프로젝트 생성

1. Vercel 대시보드에서 **"New Project"** 클릭
2. GitHub 리포지토리 목록에서 `health-diet-survey` 선택
3. **"Import"** 클릭

### 3.3 프로젝트 설정

#### Build and Output Settings:

- **Framework Preset**: `Vite` (자동 감지됨)
- **Build Command**: `npm run build` (기본값)
- **Output Directory**: `dist` (기본값)
- **Install Command**: `npm install` (기본값)

#### Root Directory:

- **Root Directory**: `.` (기본값 - 변경하지 않음)

---

## 🔐 4단계: 환경 변수 설정

### 4.1 Vercel 환경 변수 추가

1. Vercel 프로젝트 페이지에서 **"Settings"** 탭 클릭
2. 좌측 메뉴에서 **"Environment Variables"** 클릭
3. 다음 환경 변수들을 추가:

#### Supabase 환경 변수 (필수)

```
Name: VITE_SUPABASE_URL
Value: https://your-project-id.supabase.co
Environment: Production, Preview, Development 모두 체크
```

```
Name: VITE_SUPABASE_ANON_KEY
Value: your-supabase-anon-key
Environment: Production, Preview, Development 모두 체크
```

#### Google Sheets API (선택사항)

```
Name: GOOGLE_SHEETS_API_KEY
Value: your-google-sheets-api-key
Environment: Production, Preview, Development 모두 체크
```

```
Name: GOOGLE_SHEETS_ID
Value: your-google-sheets-id
Environment: Production, Preview, Development 모두 체크
```

### 4.2 환경 변수 확인

각 환경 변수 추가 후 **"Save"** 버튼 클릭

---

## 🔨 5단계: 빌드 및 배포 확인

### 5.1 자동 배포 시작

환경 변수 설정 완료 후 Vercel이 자동으로 빌드를 시작합니다:

1. **"Deployments"** 탭에서 배포 상태 확인
2. 빌드 로그에서 오류가 없는지 확인
3. 성공 시 배포 URL 확인

### 5.2 배포된 사이트 테스트

배포 완료 후 생성된 URL(예: `https://health-diet-survey.vercel.app`)에서:

1. **홈페이지 접속**: 메인 페이지가 정상 로드되는지 확인
2. **설문조사 테스트**: `/survey` 페이지에서 설문 제출 테스트
3. **Supabase 연결**: `/supabase-status` 페이지에서 연결 상태 확인
4. **관리자 대시보드**: `/admin/surveys` 페이지 접근 확인

---

## 🌍 6단계: 도메인 설정 (선택사항)

### 6.1 커스텀 도메인 추가

1. Vercel 프로젝트에서 **"Settings"** → **"Domains"**
2. 원��는 도메인 입력 (예: `healthdiet.example.com`)
3. DNS 설정 안내에 따라 도메인 제공업체에서 설정

### 6.2 무료 Vercel 도메인 사용

기본 제공되는 `*.vercel.app` 도메인을 그대로 사용할 수 있습니다.

---

## 🔄 지속적 배포 (CI/CD) 설정

### 자동 배포 확인

이제 GitHub에 코드를 push할 때마다 Vercel이 자동으로:

1. **새 커밋 감지**: GitHub push 이벤트 감지
2. **자동 빌드**: 최신 코드로 빌드 실행
3. **자동 배포**: 빌드 성공 시 자동 배포
4. **미리보기**: PR 생성 시 미리보기 배포

### 배포 알림 설정

1. Vercel에서 **"Settings"** → **"Git"**
2. **"Deploy Hooks"** 또는 **"Notifications"** 설정
3. 이메일/Slack 알림 설정

---

## 🚨 문제 해결

### ❌ 빌드 실패

**증상**: Vercel 빌드가 실패함
**해결책**:

1. 로컬에서 `npm run build` 실행하여 오류 확인
2. `package.json`의 dependencies 확인
3. TypeScript 오류 수정

### ❌ 환경 변수 오류

**증상**: Supabase 연결 실패
**해결책**:

1. Vercel 환경 변수 설정 확인
2. 변수명이 `VITE_` 접두사로 시작하는지 확인
3. 환경 변수 값에 공백이나 특수문자가 없는지 확인

### ❌ 라우팅 오류

**증��**: `/survey` 등 페이지에서 404 오류
**해결책**:

1. Vercel 설정에서 SPA 리다이렉트 설정
2. `vercel.json` 파일에서 rewrites 설정 확인

### ❌ API 경로 오류

**증상**: `/api/*` 경로에서 404 오류
**해결책**:

1. Serverless functions 설정 확인
2. `api/` 폴더 구조 확인

---

## 📊 배포 후 확인사항

### ✅ 최종 체크리스트

- [ ] 홈페이지 정상 로드
- [ ] 설문조사 폼 정상 작동
- [ ] Supabase 데이터 저장 확인
- [ ] 관리자 대시보드 접근 가능
- [ ] 모바일 반응형 확인
- [ ] 로딩 속도 확인

### 📈 성능 최적화

배포 후 Vercel Analytics 또는 Google PageSpeed Insights로 성능 확인:

1. **Core Web Vitals** 점수 확인
2. **이미지 최적화** 필요시 진행
3. **번들 크기** 최적화 검토

---

## 🎉 배포 완료!

축하합니다! 이제 건강 식단 추천 서비스가 인터넷에서 누구나 접근할 수 있게 되었습니다.

### 📋 공유용 정보

- **웹사이트 URL**: `https://your-project.vercel.app`
- **관리자 대시보드**: `https://your-project.vercel.app/admin/surveys`
- **GitHub 리포지토리**: `https://github.com/[username]/health-diet-survey`

### 🔧 유지보수

- 코드 변경 시 GitHub에 push하면 ��동 배포
- 환경 변수 변경 시 Vercel 설정에서 수정
- 도메인/SSL 인증서는 Vercel이 자동 관리

---

_🚀 배포 성공! 이제 전 세계 어디서나 여러분의 건강 식단 추천 서비스를 이용할 수 있습니다!_
