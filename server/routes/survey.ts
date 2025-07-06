import { RequestHandler } from "express";

interface SurveyData {
  // 기본 정보
  age: string;
  gender: string;

  // 건강 관련 질문
  diagnosedDiseases: string[];
  familyDiseases: string[];
  healthInterests: string[];
  activityLevel: string;

  // 필요 재료 조사
  mealTarget: string;
  mealTargetNumber?: string;
  dietGoal: string;
  weeklyBudget: string;

  // 음식 선호도
  dietaryRestrictions: string[];
  nutritionPreferences: string[];
  cookingStyles: string[];
  preferredTastes: string[];
  preferredMeats: string[];
  preferredSeafoods: string[];
  avoidFoods: string[];

  // 연락처
  email: string;
}

// 구글시트 연동을 위한 함수
async function saveToGoogleSheets(data: SurveyData) {
  try {
    // 구글시트 웹앱 URL을 환경변수에서 가져오기
    const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL;

    if (!GOOGLE_SHEET_URL) {
      throw new Error("GOOGLE_SHEET_URL 환경변수가 설정되지 않았습니다.");
    }

    // 현재 시간 추가
    const timestamp = new Date().toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // 구글시트에 전송할 데이터 구성
    const sheetData = {
      timestamp,
      age: data.age,
      gender: data.gender === "male" ? "남성" : "여성",
      diagnosedDiseases: data.diagnosedDiseases.join(", ") || "없음",
      familyDiseases: data.familyDiseases.join(", ") || "없음",
      healthInterests: data.healthInterests.join(", ") || "없음",
      activityLevel: getActivityLevelText(data.activityLevel),
      mealTarget:
        data.mealTarget +
        (data.mealTargetNumber ? ` (${data.mealTargetNumber}인)` : ""),
      dietGoal: data.dietGoal,
      weeklyBudget: data.weeklyBudget,
      dietaryRestrictions: data.dietaryRestrictions.join(", ") || "없음",
      nutritionPreferences: data.nutritionPreferences.join(", ") || "없음",
      cookingStyles: data.cookingStyles.join(", ") || "없음",
      preferredTastes: data.preferredTastes.join(", ") || "없음",
      preferredMeats: data.preferredMeats.join(", ") || "없음",
      preferredSeafoods: data.preferredSeafoods.join(", ") || "없음",
      avoidFoods: data.avoidFoods.join(", ") || "없음",
      email: data.email,
    };

    // 구글 앱스 스크립트로 데이터 전송
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sheetData),
    });

    if (!response.ok) {
      throw new Error(`구글시트 저장 실패: ${response.status}`);
    }

    const result = await response.text();
    console.log("구글시트 저장 성공:", result);
    return { success: true, message: "데이터가 성공적으로 저장되었습니다." };
  } catch (error) {
    console.error("구글시트 저장 오류:", error);
    throw error;
  }
}

// 활동량 텍스트 변환
function getActivityLevelText(level: string): string {
  const texts: { [key: string]: string } = {
    very_active: "매우 활동적 (일주일에 5일 이상 운동)",
    active: "활동적 (일주일에 3-4일 운동)",
    slightly_active: "약간 활동적 (일주일에 1-2일 운동)",
    inactive: "비활동적 (운동 없음)",
  };
  return texts[level] || level;
}

// 건강 목�� 텍스트 변환
function getHealthGoalText(goal: string): string {
  const texts: { [key: string]: string } = {
    weight_loss: "체중 감량",
    weight_gain: "체중 증가",
    muscle_gain: "근육량 증가",
    maintenance: "현재 체중 유지",
    health_improvement: "전반적인 건강 개선",
  };
  return texts[goal] || goal;
}

// 예산 텍스트 변환
function getBudgetText(budget: string): string {
  const texts: { [key: string]: string } = {
    under_30: "30만원 미만",
    "30_50": "30-50만원",
    "50_70": "50-70만원",
    over_70: "70만원 이상",
  };
  return texts[budget] || budget;
}

// 요리 시간 텍스트 변환
function getCookingTimeText(time: string): string {
  const texts: { [key: string]: string } = {
    under_15: "15분 미만",
    "15_30": "15-30분",
    "30_60": "30-60분",
    over_60: "60분 이상",
  };
  return texts[time] || time;
}

export const handleSurveySubmit: RequestHandler = async (req, res) => {
  try {
    const surveyData: SurveyData = req.body;

    // 필수 필드 검증
    const requiredFields = [
      "age",
      "gender",
      "activityLevel",
      "mealTarget",
      "dietGoal",
      "weeklyBudget",
      "email",
    ];
    const missingFields = requiredFields.filter(
      (field) => !surveyData[field as keyof SurveyData],
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `필수 필드가 누락되었습니다: ${missingFields.join(", ")}`,
      });
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(surveyData.email)) {
      return res.status(400).json({
        success: false,
        message: "올바른 이메일 형식을 입력해주세요.",
      });
    }

    // 구글시트에 데이터 저장
    await saveToGoogleSheets(surveyData);

    res.json({
      success: true,
      message:
        "설문조사가 성공적으로 제출되었습니다. 1-2일 내에 맞춤 식단을 이메일로 보내드리겠습니다.",
    });
  } catch (error) {
    console.error("설문조사 제출 오류:", error);
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    });
  }
};
