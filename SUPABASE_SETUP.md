# Supabase 설정 가이드

이 가이드는 설문조사 데이터를 Supabase에 저장하기 위한 설정 방법을 설명합니다.

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 가입하고 로그인합니다.
2. "New Project" 버튼을 클릭하여 새 프로젝트를 생성합니다.
3. 프로젝트 이름, 데이터베이스 비밀번호, 지역을 설정합니다.
4. 프로젝트가 생성될 때까지 기다립니다 (보통 2-3분 소요).

## 2. 데이터베이스 테이블 생성

1. Supabase 대시보드에서 "SQL Editor"로 이동합니다.
2. `supabase_setup.sql` 파일의 내용을 복사하여 SQL 에디터에 붙여넣습니다.
3. "Run" 버튼을 클릭하여 테이블과 관련 설정을 생성합니다.

## 3. 환경 변수 설정

1. Supabase 대시보드에서 "Settings" > "API"로 이동합니다.
2. 다음 값들을 찾아서 복사합니다:

   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

3. 프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가합니다:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 4. 테이블 구조

생성된 `survey_responses` 테이블은 다음과 같은 구조를 가집니다:

### 기본 필드

- `id`: UUID (자동 생성)
- `created_at`: 생성 시간 (자동 설정)
- `updated_at`: 수정 시간 (자동 업데이트)

### 설문조사 데이터

- `age`: 나이 (TEXT)
- `diagnosed_diseases`: 진단받은 질환 목록 (JSONB 배열)
- `health_interests`: 건강 관심사 목록 (JSONB 배열)
- `activity_level`: 활동 수준 (TEXT)
- `meal_target`: 식사 준비 대상 (TEXT)
- `diet_goal`: 식단 목표 (TEXT)
- `weekly_budget`: 주간 예산 (TEXT)
- `dietary_restrictions`: 식이 제한사항 (JSONB 배열)
- `nutrition_preferences`: 영양 선호도 (JSONB 배열)
- `cooking_styles`: 요리 스타일 (JSONB 배열)
- `preferred_meats`: 선호 육류 (JSONB 배열)
- `preferred_seafoods`: 선호 해산물 (JSONB 배열)
- `avoid_foods`: 기피 음식 (JSONB 배열)
- `email`: 이메일 주소 (TEXT)

## 5. 보안 설정

- **Row Level Security (RLS)**: 활성화됨
- **INSERT 정책**: 모든 사용자가 설문조사를 제출할 수 있음
- **SELECT 정책**: 인증된 사용자만 데이터를 조회할 수 있음

## 6. 분석 뷰

다음 뷰들이 데이터 분석을 위해 생성됩니다:

### `survey_statistics`

- 전체 응답 수
- 고유 이메일 수
- 일별 응답 통계
- 활동 수준, 식사 대상, 목표, 예산별 분포

### `health_interests_analysis`

- 건강 관심사별 빈도 분석

### `dietary_restrictions_analysis`

- 식이 제한사항별 빈도 분석

## 7. 데이터 조회 예시

### 최근 설문조사 응답 조회

```sql
SELECT * FROM survey_responses
ORDER BY created_at DESC
LIMIT 10;
```

### 건강 관심사 통계

```sql
SELECT * FROM health_interests_analysis;
```

### 활동 수준별 통계

```sql
SELECT
  activity_level,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM survey_responses
WHERE activity_level IS NOT NULL
GROUP BY activity_level
ORDER BY count DESC;
```

## 8. 문제 해결

### 연결 오류

- 환경 변수가 올바르게 설정되었는지 확인
- Supabase 프로젝트가 활성화되어 있는지 확인

### 권한 오류

- RLS 정책이 올바르게 설정되었는지 확인
- API 키가 올바른지 확인

### 데이터 타입 오류

- JSONB 필드에 배열 형태로 데이터가 전송되는지 확인
- 필수 필드가 누락되지 않았는지 확인

## 9. 관리자 대시보드

Supabase 대시보드에서 "Table Editor"를 통해 저장된 설문조사 데이터를 직접 확인하고 관리할 수 있습니다.
