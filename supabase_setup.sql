-- 설문조사 응답을 저장할 테이블 생성
CREATE TABLE survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  
  -- 기본 정보
  age TEXT NOT NULL,
  
  -- 건강 관련 정보
  diagnosed_diseases JSONB DEFAULT '[]'::jsonb,
  health_interests JSONB DEFAULT '[]'::jsonb,
  activity_level TEXT,
  
  -- 식사 계획 정보
  meal_target TEXT,
  diet_goal TEXT,
  weekly_budget TEXT,
  
  -- 음식 선호도
  dietary_restrictions JSONB DEFAULT '[]'::jsonb,
  nutrition_preferences JSONB DEFAULT '[]'::jsonb,
  cooking_styles JSONB DEFAULT '[]'::jsonb,
  preferred_meats JSONB DEFAULT '[]'::jsonb,
  preferred_seafoods JSONB DEFAULT '[]'::jsonb,
  avoid_foods JSONB DEFAULT '[]'::jsonb,
  
  -- 연락처
  email TEXT NOT NULL
);

-- 인덱스 생성
CREATE INDEX idx_survey_responses_created_at ON survey_responses(created_at);
CREATE INDEX idx_survey_responses_email ON survey_responses(email);

-- updated_at 자동 업데이트를 위한 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_at 트리거 생성
CREATE TRIGGER update_survey_responses_updated_at
    BEFORE UPDATE ON survey_responses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) 활성화
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 INSERT할 수 있도록 정책 생성 (설문조사 제출용)
CREATE POLICY "Anyone can insert survey responses" ON survey_responses
  FOR INSERT WITH CHECK (true);

-- 인증된 사용자만 조회할 수 있도록 정책 생성 (관리자용)
CREATE POLICY "Authenticated users can view survey responses" ON survey_responses
  FOR SELECT USING (auth.role() = 'authenticated');

-- 설문조사 응답 통계를 위한 뷰 생성
CREATE VIEW survey_statistics AS
SELECT 
  COUNT(*) as total_responses,
  COUNT(DISTINCT email) as unique_emails,
  DATE_TRUNC('day', created_at) as response_date,
  activity_level,
  meal_target,
  diet_goal,
  weekly_budget
FROM survey_responses
GROUP BY DATE_TRUNC('day', created_at), activity_level, meal_target, diet_goal, weekly_budget
ORDER BY response_date DESC;

-- 건강 관심사 빈도 분석을 위한 뷰
CREATE VIEW health_interests_analysis AS
SELECT 
  jsonb_array_elements_text(health_interests) as interest,
  COUNT(*) as frequency
FROM survey_responses
WHERE health_interests IS NOT NULL AND jsonb_array_length(health_interests) > 0
GROUP BY interest
ORDER BY frequency DESC;

-- 식이 제한사항 분석을 위한 뷰
CREATE VIEW dietary_restrictions_analysis AS
SELECT 
  jsonb_array_elements_text(dietary_restrictions) as restriction,
  COUNT(*) as frequency
FROM survey_responses
WHERE dietary_restrictions IS NOT NULL AND jsonb_array_length(dietary_restrictions) > 0
GROUP BY restriction
ORDER BY frequency DESC;
