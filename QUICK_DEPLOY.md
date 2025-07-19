# ⚡ 빠른 배포 가이드 (5분 완성)

## 🚀 지금 바로 배포하기

### 1️⃣ GitHub 업로드 (2분)

```bash
# 터미널에서 다음 명령어 차례대로 실행:

# 1. Git 초기화
git init

# 2. 모든 파일 추가
git add .

# 3. 첫 커밋
git commit -m "feat: 건강 식단 추천 서비스 초기 배포"

# 4. 기본 브랜치 설정
git branch -M main
```

**⏸️ 잠깐!** GitHub에서 새 리포지토리 생성:

1. [github.com/new](https://github.com/new) 접속
2. Repository name: `health-diet-survey`
3. **Public** 선택
4. **Create repository** 클릭
5. 생성된 URL 복사 (예: `https://github.com/username/health-diet-survey.git`)

```bash
# 5. GitHub 연결 (위에서 복사한 URL 사용)
git remote add origin https://github.com/[YOUR_USERNAME]/health-diet-survey.git

# 6. 업로드
git push -u origin main
```

✅ **GitHub 업로드 완료!**

---

### 2️⃣ Vercel 배포 (2분)

1. **[vercel.com](https://vercel.com) 접속**
2. **"Continue with GitHub"** 클릭
3. **"New Project"** 클릭
4. **`health-diet-survey`** 선택 → **"Import"**
5. 설정 확인:
   - Framework Preset: **Vite** ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `dist` ✅
6. **"Deploy"** 클릭

⏳ **배포 중... (약 1-2분 소요)**

---

### 3️⃣ 환경 변수 설정 (1분)

배포 완료 후:

1. **"Settings"** 탭 클릭
2. 왼쪽 메뉴에서 **"Environment Variables"** 클릭
3. 다음 변수들 추가:

**필수 설정** (Supabase 사용 시):

```
Name: VITE_SUPABASE_URL
Value: https://your-project.supabase.co
```

```
Name: VITE_SUPABASE_ANON_KEY
Value: your-supabase-anon-key
```

**선택사항** (Google Sheets 사용 시):

```
Name: GOOGLE_SHEETS_API_KEY
Value: your-api-key
```

4. 각 변수 추가 후 **"Save"** 클릭

---

## 🎉 배포 완료!

### ✅ 최종 확인

배포된 사이트 URL (예: `https://health-diet-survey.vercel.app`)에서:

- [ ] 홈페이지 로딩 확인
- [ ] 설문조사 페이지 접근 (`/survey`)
- [ ] 관리자 대시보드 접근 (`/admin/surveys`)
- [ ] Supabase 상태 확인 (`/supabase-status`)

### 📱 공유용 링크

- **🌐 웹사이트**: `https://your-project.vercel.app`
- **📊 관리자**: `https://your-project.vercel.app/admin/surveys`
- **⚙️ 설정**: `https://your-project.vercel.app/supabase-status`

---

## 🔄 자동 배포 설정됨

이제 GitHub에 코드를 `push`할 때마다 Vercel이 자동으로:

1. **새 커밋 감지** → **자동 빌드** → **자동 배포**
2. **Pull Request** 생성 시 → **미리보기 배포**

---

## 🆘 문제 발생 시

### ❌ 빌드 실패

```bash
# 로컬에서 빌드 테스트
npm run build

# 오류 확인 후 수정
git add .
git commit -m "fix: 빌드 오류 수정"
git push
```

### ❌ 환경 변수 오류

1. Vercel → Settings → Environment Variables 확인
2. 변수명에 `VITE_` 접두사 있는지 확인
3. 변수 값에 공백 없는지 확인

### ❌ 404 페이지 오류

- Vercel의 SPA 설정이 자동으로 처리됨
- `vercel.json` 파일에 rewrite 규칙 설정됨

---

## 🚀 다음 단계

### 🔧 추가 설정

- **커스텀 도메인**: Vercel → Settings → Domains
- **분석 도구**: Vercel Analytics 활성화
- **성능 모니터링**: Core Web Vitals 확인

### 📈 개선사항

- **SEO 최적화**: 메타 태그 추가
- **성능 향상**: 이미지 최적화
- **보안 강화**: CSP 헤더 설정

---

_🎯 이제 전 세계 누구나 여러분의 건강 식단 추천 서비스를 이용할 수 있습니다!_
