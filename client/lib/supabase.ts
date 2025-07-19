import { createClient } from "@supabase/supabase-js";

// Supabase 환경 변수
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://your-project.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseKey);

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

// 설문조사 데이터를 Supabase에 저장하는 함수
export async function saveSurveyResponse(
  surveyData: Omit<SurveyResponse, "id" | "created_at">,
) {
  try {
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

    console.log("설문조사 데이터 저장 성공:", data);
    return { success: true, data };
  } catch (error) {
    console.error("설문조사 저장 중 오류 발생:", error);
    return { success: false, error };
  }
}

// 설문조사 응답 조회 함수 (관리자용)
export async function getSurveyResponses() {
  try {
    const { data, error } = await supabase
      .from("survey_responses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error("설문조사 데이터 조회 중 오류 발생:", error);
    return { success: false, error };
  }
}
