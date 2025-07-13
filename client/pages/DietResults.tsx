import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface SurveyData {
  age: string;
  gender: string;
  diagnosedDiseases: string[];
  familyDiseases: string[];
  healthInterests: string[];
  activityLevel: string;
  mealTarget: string;
  mealTargetNumber?: string;
  dietGoal: string;
  weeklyBudget: string;
  dietaryRestrictions: string[];
  nutritionPreferences: string[];
  cookingStyles: string[];
  preferredTastes: string[];
  preferredMeats: string[];
  preferredSeafoods: string[];
  avoidFoods: string[];
  email: string;
}

interface DietRecommendation {
  mealPlan: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
  nutritionGoals: {
    calories: string;
    protein: string;
    carbs: string;
    fats: string;
  };
  weeklyMenu: Array<{
    day: string;
    meals: {
      breakfast: string;
      lunch: string;
      dinner: string;
    };
  }>;
  healthTips: string[];
  shoppingList: string[];
}

export default function DietResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [recommendation, setRecommendation] =
    useState<DietRecommendation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URL의 state에서 설문 데이터 가져오기
    if (location.state?.surveyData) {
      setSurveyData(location.state.surveyData);
      generateRecommendation(location.state.surveyData);
    } else {
      // 데이터가 없으면 홈으로 리다이렉트
      navigate("/");
    }
  }, [location.state, navigate]);

  const generateRecommendation = (data: SurveyData) => {
    setLoading(true);

    // 설문 데이터를 기반으로 맞춤형 추천 생성
    setTimeout(() => {
      const rec: DietRecommendation = {
        mealPlan: generateMealPlan(data),
        nutritionGoals: calculateNutritionGoals(data),
        weeklyMenu: generateWeeklyMenu(data),
        healthTips: generateHealthTips(data),
        shoppingList: generateShoppingList(data),
      };

      setRecommendation(rec);
      setLoading(false);
    }, 2000); // 로딩 시뮬레이션
  };

  const generateMealPlan = (data: SurveyData) => {
    const isVegetarian = data.dietaryRestrictions.includes("채식주의");
    const hasGluten = data.dietaryRestrictions.includes("글루텐 불내증");
    const preferredTastes = data.preferredTastes || [];

    return {
      breakfast: [
        isVegetarian ? "아보카도 토스트와 두유" : "달걀찜과 현미밥",
        "그릭요거트와 견과류",
        "오트밀과 바나나",
        "녹색 채소 스무디",
      ],
      lunch: [
        "현미밥과 된장찌개",
        "샐러드 볼과 닭가슴살",
        "김밥과 미역국",
        "비빔밥과 나물",
      ],
      dinner: [
        isVegetarian ? "두부스테이크와 야채" : "생선구이와 현미밥",
        "채소볶음과 잡곡밥",
        "국수와 채소",
        "쌈밥과 나물",
      ],
      snacks: ["견과류 믹스", "과일 (사과, 배)", "요거트", "당근스틱"],
    };
  };

  const calculateNutritionGoals = (data: SurveyData) => {
    const age = parseInt(data.age);
    const isActive =
      data.activityLevel === "매우 활발함" || data.activityLevel === "활발함";

    let baseCalories = data.gender === "남성" ? 2200 : 1800;
    if (isActive) baseCalories += 300;
    if (age > 50) baseCalories -= 200;

    return {
      calories: `${baseCalories}kcal`,
      protein: `${Math.round((baseCalories * 0.2) / 4)}g`,
      carbs: `${Math.round((baseCalories * 0.5) / 4)}g`,
      fats: `${Math.round((baseCalories * 0.3) / 9)}g`,
    };
  };

  const generateWeeklyMenu = (data: SurveyData) => {
    const days = [
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
      "일요일",
    ];

    return days.map((day) => ({
      day,
      meals: {
        breakfast: "현미밥 + 된장국 + 계란후라이",
        lunch: "닭가슴살 샐러드 + 현미밥",
        dinner: "생선구이 + 야채볶음 + 현미밥",
      },
    }));
  };

  const generateHealthTips = (data: SurveyData) => {
    const tips = [
      "하루 8잔 이상의 물을 마시세요",
      "식사 시간을 규칙적으로 유지하세요",
      "천천히 꼭꼭 씹어서 드세요",
      "가공식품 섭취를 줄이세요",
    ];

    if (data.activityLevel === "적음") {
      tips.push("주 3회 이상 30분씩 가벼운 운동을 시작해보세요");
    }

    if (data.healthInterests.includes("체중감량")) {
      tips.push("간식은 오후 6시 이전에만 드세요");
    }

    return tips;
  };

  const generateShoppingList = (data: SurveyData) => {
    const baseList = [
      "현미",
      "두부",
      "달걀",
      "브로콜리",
      "시금치",
      "당근",
      "양파",
      "마늘",
      "올리브오일",
      "견과류",
    ];

    if (!data.dietaryRestrictions.includes("채식주의")) {
      baseList.push("닭가슴살", "생선(고등어, 연어)");
    }

    if (data.preferredSeafoods.length > 0) {
      baseList.push("미역", "다시마", "새우");
    }

    return baseList;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-health-orange border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="font-pretendard text-health-gray text-xl font-bold mb-2">
            맞춤형 식단을 분석 중입니다...
          </h2>
          <p className="font-pretendard text-health-gray/70">
            잠시만 기다려주세요 🍽️
          </p>
        </div>
      </div>
    );
  }

  if (!recommendation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-pretendard text-health-gray text-xl font-bold mb-4">
            추천 결과를 생성할 수 없습니다
          </h2>
          <Button
            onClick={() => navigate("/")}
            className="bg-health-orange text-black"
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-health-orange to-orange-400 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <span className="text-3xl">🍽️</span>
            </div>
          </div>
          <h1 className="font-pretendard text-health-gray text-[28px] sm:text-[36px] lg:text-[48px] font-bold leading-[130%] mb-4">
            맞춤형 건강 식단 추천
          </h1>
          <p className="font-pretendard text-health-gray/70 text-lg">
            {surveyData?.email}님을 위한 개인 맞춤 건강 식단입니다
          </p>
        </div>

        {/* 영양 목표 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-8">
          <h2 className="font-pretendard text-health-gray font-bold text-2xl mb-6 flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            일일 영양 목표
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">🔥</div>
              <div className="font-bold text-lg text-red-600">
                {recommendation.nutritionGoals.calories}
              </div>
              <div className="text-sm text-red-500">칼로리</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">💪</div>
              <div className="font-bold text-lg text-blue-600">
                {recommendation.nutritionGoals.protein}
              </div>
              <div className="text-sm text-blue-500">단백질</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">🌾</div>
              <div className="font-bold text-lg text-green-600">
                {recommendation.nutritionGoals.carbs}
              </div>
              <div className="text-sm text-green-500">탄수화물</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">🥑</div>
              <div className="font-bold text-lg text-yellow-600">
                {recommendation.nutritionGoals.fats}
              </div>
              <div className="text-sm text-yellow-500">지방</div>
            </div>
          </div>
        </div>

        {/* 추천 식단 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-8">
          <h2 className="font-pretendard text-health-gray font-bold text-2xl mb-6 flex items-center gap-3">
            <span className="text-3xl">📋</span>
            추천 식단 구성
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4 text-orange-700 flex items-center gap-2">
                <span className="text-xl">🌅</span>
                아침
              </h3>
              <ul className="space-y-2">
                {recommendation.mealPlan.breakfast.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-orange-600 flex items-start gap-2"
                  >
                    <span className="text-orange-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4 text-green-700 flex items-center gap-2">
                <span className="text-xl">☀️</span>
                점심
              </h3>
              <ul className="space-y-2">
                {recommendation.mealPlan.lunch.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-green-600 flex items-start gap-2"
                  >
                    <span className="text-green-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4 text-blue-700 flex items-center gap-2">
                <span className="text-xl">🌙</span>
                저녁
              </h3>
              <ul className="space-y-2">
                {recommendation.mealPlan.dinner.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-blue-600 flex items-start gap-2"
                  >
                    <span className="text-blue-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4 text-purple-700 flex items-center gap-2">
                <span className="text-xl">🍎</span>
                간식
              </h3>
              <ul className="space-y-2">
                {recommendation.mealPlan.snacks.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-purple-600 flex items-start gap-2"
                  >
                    <span className="text-purple-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 건강 팁 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-8">
          <h2 className="font-pretendard text-health-gray font-bold text-2xl mb-6 flex items-center gap-3">
            <span className="text-3xl">💡</span>
            건강 팁
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendation.healthTips.map((tip, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-start gap-3"
              >
                <span className="text-green-500 text-xl flex-shrink-0">✅</span>
                <p className="text-green-700 font-medium">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 장보기 목록 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-8">
          <h2 className="font-pretendard text-health-gray font-bold text-2xl mb-6 flex items-center gap-3">
            <span className="text-3xl">🛒</span>
            장보기 목록
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {recommendation.shoppingList.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-3 flex items-center gap-2"
              >
                <span className="text-yellow-500">🛍️</span>
                <span className="text-yellow-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA 버튼들 */}
        <div className="text-center space-y-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <h3 className="font-pretendard text-health-gray font-bold text-xl mb-4">
              🎉 축하합니다! 건강한 식단의 시작입니다
            </h3>
            <p className="text-health-gray/70 mb-6">
              이 추천 결과를 이메일로도 받아보세요. 더 자세한 레시피와 영양
              정보를 보내드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/")}
                className="px-8 py-4 bg-gradient-to-r from-health-orange to-orange-400 hover:from-orange-400 hover:to-health-orange text-black font-bold text-lg rounded-2xl transform transition-all duration-300 hover:scale-105 shadow-xl"
              >
                홈으로 돌아가기
              </Button>
              <Button
                onClick={() => navigate("/survey")}
                className="px-8 py-4 bg-white border-2 border-health-orange text-health-orange hover:bg-health-orange hover:text-black font-bold text-lg rounded-2xl transform transition-all duration-300 hover:scale-105"
              >
                새로운 설문하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
