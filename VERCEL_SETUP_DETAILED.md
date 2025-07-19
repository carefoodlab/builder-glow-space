# 🚀 Vercel 설정 완전 가이드 (스크린샷 포함)

이 가이드는 GitHub 리포지토리를 Vercel에 연결하고 배포하는 모든 과정을 스크린샷과 함께 단계별로 설명합니다.

---

## 📋 사전 준비사항

- ✅ GitHub 계정
- ✅ GitHub에 업로드된 프로젝트 코드
- ✅ Supabase 프로젝트 (환경 변수용)

---

## 🔷 1단계: Vercel 계정 생성 및 로그인

### 1.1 Vercel 웹사이트 접속

1. 브라우저에서 [vercel.com](https://vercel.com) 접속

### 1.2 GitHub 계정으로 로그인

1. **"Continue with GitHub"** 버튼 클릭
2. GitHub 로그인 정보 입력
3. Vercel의 GitHub 권한 요청 승인

> 💡 **팁**: GitHub 계정으로 로그���하면 리포지토리 연동이 자동으로 됩니다.

---

## 🔷 2단계: 새 프로젝트 생성

### 2.1 프로젝트 생성 시작

1. Vercel 대시보드에서 **"New Project"** 버튼 클릭
2. 또는 **"Add New..."** → **"Project"** 선택

### 2.2 GitHub 리포지토리 선택

**Import Git Repository** 섹션에서:

1. **GitHub** 탭이 선택되어 있는지 확인
2. 리포지토리 목록에서 `health-diet-survey` (또는 여러분의 프로젝트명) 찾기
3. 해당 리포지토리 옆의 **"Import"** 버튼 클릭

> ⚠️ **리포지토리가 보이지 않는 경우**:
>
> - **"Adjust GitHub App Permissions"** 클릭
> - 해당 리포지토리에 대한 권한 부여
> - 페이지 새로고침

---

## 🔷 3단계: 프로젝트 설정 구성

### 3.1 기본 프로젝트 정보

**Configure Project** 페이지에서 다음 정보 확인:

```
Project Name: health-diet-survey (자동 입력됨)
Framework Preset: Vite (자동 감지됨) ✅
Root Directory: ./ (기본값 유지) ✅
```

### 3.2 빌드 및 출력 설정

**Build and Output Settings** 확장:

```
Build Command: npm run build ✅
Output Directory: dist ✅
Install Command: npm install ✅
Development Command: npm run dev ✅
```

> 💡 **모든 설정이 자동으로 올바���게 감지됩니다!**

### 3.3 환경 변수 설정 (중요!)

**Environment Variables** 섹션에서:

1. **"Add Environment Variable"** 클릭
2. 다음 변수들을 하나씩 추가:

#### 필수 환경 변수 (Supabase)

**첫 번째 변수**:

```
Name: VITE_SUPABASE_URL
Value: https://your-project-id.supabase.co
```

**두 번째 변수**:

```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 선택 환경 변수 (Google Sheets API)

**세 번째 변수**:

```
Name: GOOGLE_SHEETS_API_KEY
Value: your-google-api-key
```

**네 번째 변수**:

```
Name: GOOGLE_SHEETS_ID
Value: your-sheet-id
```

> 🔐 **보안 주의**: API 키는 절대 GitHub에 업로드하지 마세요!

### 3.4 배포 시작

모든 설정 완료 후 **"Deploy"** 버튼 클릭

---

## 🔷 4단계: 배포 프로세스 모니터링

### 4.1 빌드 로그 확인

배포가 시작되면:

1. **빌드 진행 상황** 실시간 확인
2. **로그 메시지** 에서 오류 여부 체크
3. **성공 메시지** 대기

### 4.2 일반적인 빌드 과정

```
⏳ Queued
🔄 Building
📦 npm install
🔨 npm run build
✅ Build completed
🚀 Deployment ready
```

### 4.3 빌드 완료 확인

성공 시 다음과 같은 메시지가 표���됩니다:

```
✅ Deployment completed successfully
🌐 Your application is live at: https://health-diet-survey.vercel.app
```

---

## 🔷 5단계: 배포 결과 확인

### 5.1 배포된 사이트 접속

1. Vercel에서 제공하는 URL 클릭
2. 사이트가 정상적으로 로드되는지 확인

### 5.2 주요 페이지 테스트

다음 페이지들이 정상 작동하는지 확인:

- **홈페이지**: `/` - 메인 화면
- **설문조사**: `/survey` - 설문 폼
- **관리자 대시보드**: `/admin/surveys` - 데이터 확인
- **Supabase 상태**: `/supabase-status` - 연결 상태

### 5.3 Supabase 연결 테스트

`/supabase-status` 페이지에서:

1. **연결 상태 확인**: "🟢 Supabase 연결됨" 표시 확인
2. **"연결 테스트"** 버튼 클릭
3. **"✅ Supabase 연결 성공!"** 메시지 확인

---

## 🔷 6단계: 도메인 및 추가 설정

### 6.1 커스텀 도메인 설정 (선택사항)

1. 프로젝트 대시보드에서 **"Settings"** 탭 클릭
2. 왼쪽 메뉴에서 **"Domains"** 선택
3. **"Add Domain"** 클릭
4. 원하는 도메인 입력 (예: `healthdiet.com`)
5. DNS 설정 안내에 따라 도메인 제공업체에서 설정

### 6.2 성능 모니터링 설정

**Analytics 활성화**:

1. **"Settings"** → **"Analytics"**
2. **"Enable Analytics"** 토글 ON
3. Core Web Vitals 모니터링 시작

### 6.3 알림 설정

**Notifications 설정**:

1. **"Settings"** → **"Notifications"**
2. 배포 성공/실패 알림 설정
3. 이메일 또는 Slack 연동

---

## 🔷 7단계: 지속적 배포 (CI/CD) 확인

### 7.1 자동 배포 테스트

1. 로컬에서 코드 수정
2. GitHub에 push:
   ```bash
   git add .
   git commit -m "test: 자동 배포 테스트"
   git push
   ```
3. Vercel에서 자동 빌드 시작 확인
4. 배포 완료 후 사이트 업데이트 확인

### 7.2 Preview 배포 (브랜치별)

- **Pull Request** 생성 시 자동으로 미리보기 배포
- **다른 브랜치** push 시에도 미리보기 생성
- 메인 브랜치 merge 시 프로덕션 배포

---

## 🚨 문제 해결 가이드

### ❌ 빌드 실패 시

**증상**: 빌드가 실패하고 사이트가 배포되지 않음

**해결 방법**:

1. **빌드 로그 확인**: 어떤 오류가 발생했는지 확인
2. **로컬 테스트**: `npm run build` 로컬에서 실행
3. **의존성 확인**: `package.json` 확인
4. **TypeScript 오류 수정**: 타입 오류 해결

### ❌ 환경 변수 오류

**증상**: Supabase 연결 실패, 기능 동작 안 함

**해결 방법**:

1. **변수명 확인**: `VITE_` 접두사 확인
2. **값 확인**: 공백이나 특수문자 없는지 확인
3. **재배포**: 환경 변수 수정 후 재배포 필요

### ❌ 404 페이지 오류

**증상**: `/survey` 등 페이지에서 404 오류

**해결 방법**:

1. **vercel.json 확인**: SPA 리라이트 설정 확인
2. **라우팅 설정**: React Router 설정 확인

### ❌ 함수/API 오류

**증상**: `/api/*` 경로에서 500 오류

**해결 방법**:

1. **함수 설정**: `api/` 폴더 구조 확인
2. **Serverless 함수**: 런타임 설정 확인

---

## 📊 배포 후 체크리스트

### ✅ 필수 확인사항

- [ ] 홈페이지 정상 로딩
- [ ] 설문조사 폼 작동
- [ ] 데이터 저장 기능 (Supabase 연결)
- [ ] 관리자 대시보드 접근
- [ ] 모바일 반응형 확인
- [ ] 로딩 속도 확인 (3초 이내)

### 📈 성능 최적화

**Vercel Analytics에서 확인**:

- **First Contentful Paint**: 1.5초 이하
- **Largest Contentful Paint**: 2.5초 이하
- **Cumulative Layout Shift**: 0.1 이하

---

## 🎉 배포 완료!

### 📋 배포 정보 요약

```
🌐 Production URL: https://your-project.vercel.app
📊 Admin Dashboard: https://your-project.vercel.app/admin/surveys
⚙️ Settings Page: https://your-project.vercel.app/supabase-status
📱 GitHub Repo: https://github.com/username/health-diet-survey
```

### 🔗 유용한 링크

- **Vercel 대시보드**: 배포 상태 및 설정 관리
- **Analytics**: 사용자 트래픽 및 성능 모니터링
- **Logs**: 실시간 애플리케이션 로그
- **Domains**: 커스텀 도메인 관리

---

## 🤝 다음 단계

1. **SEO 최적화**: 메타 태그 및 구조화된 데이터 추가
2. **보안 강화**: CSP 헤더 및 보안 설정
3. **성능 향상**: 이미지 최적화 및 캐싱
4. **모니터링**: 오류 추적 및 성능 모니터링 설정

---

_🚀 축하합니다! 건강 식단 추천 서비스가 성공적으로 배포되었습니다!_

**이제 전 세계 누구나 여러분의 서비스를 이용할 수 있습니다! 🌍✨**
