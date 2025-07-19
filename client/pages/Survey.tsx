import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { saveSurveyResponse } from "@/lib/supabase";
import type { SurveyResponse } from "@/lib/supabase";

interface SurveyData {
  age: string;
  diagnosedDiseases: string[];
  healthInterests: string[];
  activityLevel: string;
  mealTarget: string;
  dietGoal: string;
  weeklyBudget: string;
  dietaryRestrictions: string[];
  nutritionPreferences: string[];
  cookingStyles: string[];
  preferredMeats: string[];
  preferredSeafoods: string[];
  avoidFoods: string[];
  email: string;
}

export default function Survey() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SurveyData>({
    age: "",
    diagnosedDiseases: [],
    healthInterests: [],
    activityLevel: "",
    mealTarget: "",
    dietGoal: "",
    weeklyBudget: "",
    dietaryRestrictions: [],
    nutritionPreferences: [],
    cookingStyles: [],
    preferredMeats: [],
    preferredSeafoods: [],
    avoidFoods: [],
    email: "",
  });

  const totalSteps = 4;

  const handleInputChange = (field: keyof SurveyData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMultiSelect = (
    field: keyof SurveyData,
    value: string,
    maxSelections: number = 3,
  ) => {
    const currentArray = formData[field] as string[];
    let newArray: string[];

    if (currentArray.includes(value)) {
      newArray = currentArray.filter((item) => item !== value);
    } else {
      if (currentArray.length >= maxSelections) {
        newArray = [...currentArray.slice(1), value];
      } else {
        newArray = [...currentArray, value];
      }
    }

    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Supabase에 맞는 데이터 형식으로 변환
      const supabaseData: Omit<SurveyResponse, "id" | "created_at"> = {
        age: formData.age,
        diagnosed_diseases: formData.diagnosedDiseases || [],
        health_interests: formData.healthInterests || [],
        activity_level: formData.activityLevel,
        meal_target: formData.mealTarget,
        diet_goal: formData.dietGoal,
        weekly_budget: formData.weeklyBudget,
        dietary_restrictions: formData.dietaryRestrictions || [],
        nutrition_preferences: formData.nutritionPreferences || [],
        cooking_styles: formData.cookingStyles || [],
        preferred_meats: formData.preferredMeats || [],
        preferred_seafoods: formData.preferredSeafoods || [],
        avoid_foods: formData.avoidFoods || [],
        email: formData.email,
      };

      console.log("전송할 데이터:", supabaseData);

      // Supabase에 데이터 저장
      const result = await saveSurveyResponse(supabaseData);

      if (result.success) {
        const isUsingSupabase =
          import.meta.env.VITE_SUPABASE_URL &&
          !import.meta.env.VITE_SUPABASE_URL.includes("your-project");
        const message = isUsingSupabase
          ? "설문조사가 Supabase에 성공적으로 저장되었습니다! 🎉"
          : "설문조사가 로컬에 임시 저장되었습니다. (개발 모드)💾";

        alert(message);
        navigate("/diet-results", {
          state: {
            surveyData: supabaseData,
            supabaseId: result.data?.[0]?.id,
            isUsingSupabase,
          },
        });
      } else {
        console.error("Supabase 저장 오류:", result.error);
        alert("데이터 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("설문조사 제출 오류:", error);
      alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">기본 정보 수집</h2>
              <p className="text-gray-600">나이를 알려주세요</p>
            </div>
            <div>
              <label className="block font-semibold mb-2">
                나이를 입력해주세요
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-lg"
                placeholder="만 나이"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">건강 관련 질문</h2>
              <p className="text-gray-600">건강 상태 및 관심사를 알려주세요</p>
            </div>

            <div>
              <label className="block font-semibold mb-3">
                1. 진단을 받았거나 주의가 필요한 질환을 선택해주세요 (최대 3개)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "간질환",
                  "고지혈증",
                  "고혈압",
                  "당뇨병",
                  "신장질환",
                  "없음",
                ].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                      formData.diagnosedDiseases.includes(option)
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.diagnosedDiseases.includes(option)}
                      onChange={() =>
                        handleMultiSelect("diagnosedDiseases", option, 3)
                      }
                      className="mr-3"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-3">
                2. 관심 있는 건강 정보를 선택해주세요 (최대 3개)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "체중 감량",
                  "근육 증진",
                  "뼈/관절 건강",
                  "소화기/장 건강",
                  "면역력 강화",
                  "스트레스 관리",
                  "노화 방지",
                  "없음",
                ].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                      formData.healthInterests.includes(option)
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.healthInterests.includes(option)}
                      onChange={() =>
                        handleMultiSelect("healthInterests", option, 3)
                      }
                      className="mr-3"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-3">
                3. 일상 활동 수준을 평가해주세요
              </label>
              <div className="space-y-3">
                {[
                  "매우 활동적 (일주일에 5일 이상 운동)",
                  "활동적 (일주일에 3-4일 운동)",
                  "약간 활동적 (일주일에 1-2일 운동)",
                  "비활동적 (운동 없음)",
                ].map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="activityLevel"
                      value={option}
                      checked={formData.activityLevel === option}
                      onChange={(e) =>
                        handleInputChange("activityLevel", e.target.value)
                      }
                      className="mr-3"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">필요 재료 조사</h2>
              <p className="text-gray-600">
                식사 계획 및 예산에 대해 알려주세요
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-3">
                4. 식사를 준비하는 대상을 선택해주세요
              </label>
              <div className="grid grid-cols-4 gap-3">
                {["1인", "2인", "3인", "4인 이상"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="mealTarget"
                      value={option}
                      checked={formData.mealTarget === option}
                      onChange={(e) =>
                        handleInputChange("mealTarget", e.target.value)
                      }
                      className="mr-3"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-3">
                5. 식단과 관련된 주요 목표를 선택해주세요
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "시간 절약",
                  "비용 절약",
                  "요리 단순화",
                  "건강 개선",
                  "스트레스 감소",
                ].map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="dietGoal"
                      value={option}
                      checked={formData.dietGoal === option}
                      onChange={(e) =>
                        handleInputChange("dietGoal", e.target.value)
                      }
                      className="mr-3"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-3">
                6. 주간 음식 지출 예산을 선택해주세요
              </label>
              <div className="space-y-3">
                {[
                  "50,000원 미만",
                  "50,000 - 100,000원",
                  "100,000원 - 150,000원",
                  "150,000원 - 250,000원",
                  "250,000원 이상",
                ].map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="weeklyBudget"
                      value={option}
                      checked={formData.weeklyBudget === option}
                      onChange={(e) =>
                        handleInputChange("weeklyBudget", e.target.value)
                      }
                      className="mr-3"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">음식 선호도</h2>
              <p className="text-gray-600">
                식품 선호도와 연락처를 입력해주세요
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-2">이메일 주소</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-lg"
                placeholder="example@email.com"
              />
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">🎉 설문조사 완료!</h3>
              <p className="text-sm text-gray-600">
                입력해주신 정보를 바탕으로 개인 맞춤형 건강식단을 분석하여 1-2일
                내에 이메일로 전달해드리겠습니다.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.age;
      case 2:
        return formData.activityLevel;
      case 3:
        return (
          formData.mealTarget && formData.dietGoal && formData.weeklyBudget
        );
      case 4:
        return formData.email && formData.email.includes("@");
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-orange-500"
            >
              ← 홈으로 돌아가기
            </button>
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {currentStep} / {totalSteps}
              </span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            {renderStep()}

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <Button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
              >
                이전
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid() || isSubmitting}
                  className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
                >
                  {isSubmitting ? "제출 중..." : "설문 완료"}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
                >
                  다음
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
