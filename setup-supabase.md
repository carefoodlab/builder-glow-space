# 🚀 Supabase 설정 완전 가이드

이 가이드를 따라하면 설문조사 데이터를 Supabase에 저장할 수 있습니다.

## ✅ 체크리스트

- [ ] 1단계: Supabase 프로젝트 생성
- [ ] 2단계: 환경 변수 설정
- [ ] 3단계: 데이터베이스 테이블 생성
- [ ] 4단계: 개발 서버 재시작
- [ ] 5단계: 설문조사 테스트

---

## 📋 1단계: Supabase 프로젝트 생성

### 1.1 회원가입 및 로그인

1. [supabase.com](https://supabase.com) 접속
2. **"Start your project"** 클릭
3. GitHub 계정으로 로그인 (추천) 또는 이메일로 회원가입

### 1.2 새 프로젝트 생성

1. **"New Project"** 버튼 클릭
2. 조직 선택 (개인 계정 사용)
3. 프로젝트 정보 입력:
   ```
   Name: health-survey-app (또는 원하는 이름)
   Database Password: 안전한 비밀번호 생성 (저장해두세요!)
   Region: Northeast Asia (Seoul) - 한국 사용자용
   Pricing Plan: Free (개발/테스트용)
   ```
4. **"Create new project"** 클릭
5. ⏳ 프로젝트 생성 대기 (2-3분 소요)

---

## 🔧 2단계: 환경 변수 설정

### 2.1 API 키 확인

1. Supabase 대시보드에서 **"Settings"** → **"API"** 메뉴 이동
2. 다음 값들을 복사:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 2.2 .env 파일 수정

프로젝트 루트 폴더의 `.env` 파일을 열고 다음과 같이 수정:

```env
# 실제 값으로 교체하세요
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 기존 Google Sheets 설정 (유지)
GOOGLE_SHEETS_API_KEY=your-google-sheets-api-key
GOOGLE_SHEETS_ID=your-google-sheets-id
```

---

## 🗄️ 3단계: 데이터베이스 테이블 생성

### 3.1 SQL Editor 접속

1. Supabase 대시보드에서 **"SQL Editor"** 메뉴 클릭
2. **"New query"** 버튼 클릭

### 3.2 SQL 스크립트 실행

1. 프로젝트의 `supabase_setup.sql` 파일 내용을 복��
2. SQL Editor에 붙여넣기
3. **"Run"** 버튼 클릭 (⚡ 아이콘)
4. ✅ 성공 메시지 확인

### 3.3 테이블 확인

1. **"Table Editor"** 메뉴로 이동
2. `survey_responses` 테이블이 생성되었는지 확인
3. 컬럼 구조 확인 (id, created_at, age, email 등)

---

## 🔄 4단계: 개발 서버 재시작

터미널에서 다음 명령어 실행:

```bash
# 현재 서버 중지 (Ctrl+C)
# 그 다음 재시작
npm run dev
```

---

## 🧪 5단계: 설문조사 테스트

### 5.1 연결 상태 확인

1. 브라우저에서 [http://localhost:8080/supabase-status](http://localhost:8080/supabase-status) 접속
2. 연결 상태가 "✅ Supabase 연결됨"인지 확인
3. **"연결 테스트"** 버튼 클릭하여 실제 연결 확인

### 5.2 설문조사 제출 테스트

1. [http://localhost:8080/survey](http://localhost:8080/survey) 접속
2. 설문조사 작성 및 제출
3. "Supabase에 성공적으로 저장되었습니다! 🎉" 메시지 확인

### 5.3 관리자 대시보드 확인

1. [http://localhost:8080/admin/surveys](http://localhost:8080/admin/surveys) 접속
2. 제출한 설문조사 데이터 확인
3. 상단에 "🟢 Supabase 연결됨" 상태 확인

---

## 🔍 문제 해결

### ❌ 환경 변수 관련 오류

- `.env` 파일이 프로젝트 루트에 있는지 확인
- 파일명이 정확히 `.env`인지 확인 (확장자 없음)
- 개발 서버를 재시작했는지 확인

### ❌ Supabase 연결 오류

- Project URL과 API 키가 올바른지 확인
- Supabase 프로젝트가 활성 상태인지 확인
- 네트워크 연결 상태 확인

### ❌ 테이블 관련 오류

- SQL 스크립트가 완전히 실행되었는지 확인
- Table Editor에서 `survey_responses` 테이블 존재 여부 확인
- RLS (Row Level Security) 정책이 올바르게 설정되었는지 확인

### ❌ 권한 관련 오류

- anon key를 사용하고 있는지 확인 (service_role key 아님)
- 테이블의 INSERT 정책이 활성화되어 있는지 확인

---

## 🎯 성공 확인 방법

다음 모든 항목이 ✅ 상태가 되면 설정 완료:

1. **Supabase Status 페이지**:

   - ✅ Supabase URL: 설정됨
   - ✅ Supabase Key: 설정됨
   - ✅ 전체 설정: 완료
   - ✅ 연결 테스트: Supabase 연결 성공!

2. **설문조사 제출**:

   - ✅ 설문 완료 시 "Supabase에 성공적으로 저장" 메시지
   - ✅ DietResults 페이지로 정상 이동

3. **관리자 대시보드**:
   - ✅ "🟢 Supabase 연결됨" 상태 표시
   - ✅ 제출된 설문조사 데이터 표시
   - ✅ CSV 내보내기 기능 동작

---

## 📞 추가 지원

설정 중 문제가 발생하면:

1. **Supabase 문서**: [docs.supabase.com](https://docs.supabase.com)
2. **커뮤니티**: [discord.supabase.com](https://discord.supabase.com)
3. **로컬 상태 페이지**: `/supabase-status`에서 디버그 정보 확인

---

_🎉 설정이 완료되면 설문조사 데이터가 안전하게 Supabase 클라우드에 저장됩니다!_
