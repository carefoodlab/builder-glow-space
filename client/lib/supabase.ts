import { createClient } from "@supabase/supabase-js";

// Supabase 환경 변수
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 개발 모드에서 Supabase 설정이 없을 때의 처리
const isSupabaseConfigured =
  supabaseUrl &&
  supabaseKey &&
  !supabaseUrl.includes("your-project") &&
  !supabaseKey.includes("your-anon-key");

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// 로컬 스토리지를 사용한 fallback
let localSurveyData: SurveyResponse[] = [];

// 로컬 스토리지에서 데이터 로드
if (typeof window !== "undefined") {
  const stored = localStorage.getItem("survey_responses");
  if (stored) {
    try {
      localSurveyData = JSON.parse(stored);
    } catch (error) {
      console.warn("로컬 스토리지 데이터 파싱 오류:", error);
    }
  }
}

// 설문조사 데이터 타입 정의
export interface SurveyResponse {
  id?: string;
  created_at?: string;
  age: string;
  diagnosed_diseases: string[];
  health_interests: string[];
  activity_level: string;
  meal_target: string;
  diet_goal: string;
  weekly_budget: string;
  dietary_restrictions: string[];
  nutrition_preferences: string[];
  cooking_styles: string[];
  preferred_meats: string[];
  preferred_seafoods: string[];
  avoid_foods: string[];
  email: string;
}

// 설문조사 데이터를 Supabase 또는 로컬에 저장하는 함수
export async function saveSurveyResponse(
  surveyData: Omit<SurveyResponse, "id" | "created_at">,
) {
  try {
    if (supabase && isSupabaseConfigured) {
      // Supabase에 저장
      const { data, error } = await supabase
        .from("survey_responses")
        .insert([
          {
            age: surveyData.age,
            diagnosed_diseases: surveyData.diagnosed_diseases,
            health_interests: surveyData.health_interests,
            activity_level: surveyData.activity_level,
            meal_target: surveyData.meal_target,
            diet_goal: surveyData.diet_goal,
            weekly_budget: surveyData.weekly_budget,
            dietary_restrictions: surveyData.dietary_restrictions,
            nutrition_preferences: surveyData.nutrition_preferences,
            cooking_styles: surveyData.cooking_styles,
            preferred_meats: surveyData.preferred_meats,
            preferred_seafoods: surveyData.preferred_seafoods,
            avoid_foods: surveyData.avoid_foods,
            email: surveyData.email,
          },
        ])
        .select();

      if (error) {
        console.error("Supabase 저장 오류:", error);
        throw error;
      }

      console.log("Supabase 데이터 저장 성공:", data);
      return { success: true, data };
    } else {
      // 로컬 스토리지에 저장 (fallback)
      console.warn("Supabase가 설정되지 않아 로컬 스토리지를 사용합니다.");

      const newResponse: SurveyResponse = {
        ...surveyData,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
      };

      localSurveyData.push(newResponse);
      localStorage.setItem("survey_responses", JSON.stringify(localSurveyData));

      console.log("로컬 스토리지 데이터 저장 성공:", newResponse);
      return { success: true, data: [newResponse] };
    }
  } catch (error) {
    console.error("설문조사 저장 중 오류 발생:", error);
    return { success: false, error };
  }
}

// 설문조사 응답 조회 함수 (관리자용)
export async function getSurveyResponses() {
  try {
    if (supabase && isSupabaseConfigured) {
      // Supabase에서 조회
      const { data, error } = await supabase
        .from("survey_responses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return { success: true, data };
    } else {
      // 로컬 스토리���에서 조회 (fallback)
      console.warn("Supabase가 설정되지 않아 로컬 스토리지를 사용합니다.");

      // 최신순으로 정렬
      const sortedData = [...localSurveyData].sort(
        (a, b) =>
          new Date(b.created_at || "").getTime() -
          new Date(a.created_at || "").getTime(),
      );

      return { success: true, data: sortedData };
    }
  } catch (error) {
    console.error("설문조사 데이터 조회 중 오류 발생:", error);
    return { success: false, error };
  }
}

// Supabase 연결 상태 확인 함수
export function getConnectionStatus() {
  return {
    isConfigured: isSupabaseConfigured,
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey,
    usingFallback: !isSupabaseConfigured,
  };
}
