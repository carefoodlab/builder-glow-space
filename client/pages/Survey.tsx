import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SurveyData {
  // 기본 정보
  age: string;

  // 건강 관련 질문
  diagnosedDiseases: string[];
  healthInterests: string[];
  activityLevel: string;

  // 필요 재료 조사
  mealTarget: string;
  dietGoal: string;
  weeklyBudget: string;

  // 음식 선호도
  dietaryRestrictions: string[];
  nutritionPreferences: string[];
  cookingStyles: string[];
  preferredMeats: string[];
  preferredSeafoods: string[];
  avoidFoods: string[];

  // 연락처
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

  const handleInputChange = (
    field: keyof SurveyData,
    value: string | string[],
  ) => {
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

    handleInputChange(field, newArray);
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
      const cleanedData = {
        ...formData,
        diagnosedDiseases: formData.diagnosedDiseases || [],
        healthInterests: formData.healthInterests || [],
        dietaryRestrictions: formData.dietaryRestrictions || [],
        nutritionPreferences: formData.nutritionPreferences || [],
        cookingStyles: formData.cookingStyles || [],
        preferredMeats: formData.preferredMeats || [],
        preferredSeafoods: formData.preferredSeafoods || [],
        avoidFoods: formData.avoidFoods || [],
      };

      console.log("전송할 데이터:", cleanedData);

      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/diet-results", {
          state: {
            surveyData: cleanedData,
          },
        });
      } else {
        alert(result.message || "오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
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
              <h2 className="font-pretendard text-health-gray text-[24px] sm:text-[32px] font-bold mb-4">
                기본 정보 수집
              </h2>
              <p className="font-pretendard text-health-gray/70 text-base sm:text-lg">
                나이를 알려주세요
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-2">
                  나이를 설정을 입력해주세요
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-health-orange focus:outline-none transition-colors font-pretendard"
                  placeholder="만 나이"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-pretendard text-health-gray text-[24px] sm:text-[32px] font-bold mb-4">
                건강 관련 질문
              </h2>
              <p className="font-pretendard text-health-gray/70 text-base sm:text-lg">
                건강 상태 및 관심사를 알려주세요
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  1. 진단을 받았거나 주의가 필요한 질환을 우선 순위에 따라
                  선택해주세요 (최대 3개 선택 가능)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      className={`flex items-center p-3 border rounded-xl hover:border-health-orange transition-colors cursor-pointer ${
                        formData.diagnosedDiseases.includes(option)
                          ? "border-health-orange bg-health-orange/5"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.diagnosedDiseases.includes(option)}
                        onChange={() =>
                          handleMultiSelect("diagnosedDiseases", option, 3)
                        }
                        className="mr-3 text-health-orange focus:ring-health-orange"
                      />
                      <span className="font-pretendard text-health-gray text-sm">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-health-gray/60 mt-2">
                  선택된 항목: {formData.diagnosedDiseases.length}/3
                </p>
              </div>

              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  2. 관심 있는 건강 정보를 우선 순위에 따라 선택해주세요 (최대
                  3개 선택 가능)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      className={`flex items-center p-3 border rounded-xl hover:border-health-orange transition-colors cursor-pointer ${
                        formData.healthInterests.includes(option)
                          ? "border-health-orange bg-health-orange/5"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.healthInterests.includes(option)}
                        onChange={() =>
                          handleMultiSelect("healthInterests", option, 3)
                        }
                        className="mr-3 text-health-orange focus:ring-health-orange"
                      />
                      <span className="font-pretendard text-health-gray text-sm">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-health-gray/60 mt-2">
                  선택된 항목: {formData.healthInterests.length}/3
                </p>
              </div>

              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  3. 일상 활동 수준을 평가해주세요
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "매우 활동적 (일주일에 5일 이상 운동)",
                    "활동적 (일주일에 3-4일 운동)",
                    "약간 활동적 (일주일에 1-2일 운동)",
                    "비활동적 (운동 없음)",
                  ].map((option) => (
                    <label
                      key={option}
                      className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-health-orange transition-colors cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="activityLevel"
                        value={option}
                        checked={formData.activityLevel === option}
                        onChange={(e) =>
                          handleInputChange("activityLevel", e.target.value)
                        }
                        className="mr-3 text-health-orange focus:ring-health-orange"
                      />
                      <span className="font-pretendard text-health-gray">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-pretendard text-health-gray text-[24px] sm:text-[32px] font-bold mb-4">
                필요 재료 조사
              </h2>
              <p className="font-pretendard text-health-gray/70 text-base sm:text-lg">
                식사 계획 및 예산에 대해 알려주세요
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  4. 식사를 준비하는 대상을 선택해주세요
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["1인", "2인", "3인", "4인 이상"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-health-orange transition-colors cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="mealTarget"
                        value={option}
                        checked={formData.mealTarget === option}
                        onChange={(e) =>
                          handleInputChange("mealTarget", e.target.value)
                        }
                        className="mr-3 text-health-orange focus:ring-health-orange"
                      />
                      <span className="font-pretendard text-health-gray">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  5. 식단과 관련된 주요 목표를 선택해주세요
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "시간 절약",
                    "비용 절약",
                    "요리 단순화",
                    "건강 개선",
                    "스트레스 감소",
                  ].map((option) => (
                    <label
                      key={option}
                      className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-health-orange transition-colors cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="dietGoal"
                        value={option}
                        checked={formData.dietGoal === option}
                        onChange={(e) =>
                          handleInputChange("dietGoal", e.target.value)
                        }
                        className="mr-3 text-health-orange focus:ring-health-orange"
                      />
                      <span className="font-pretendard text-health-gray">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  6. 주간 음식 지출 예산을 선택해주세요
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "50,000원 미만",
                    "50,000 - 100,000원",
                    "100,000원 - 150,000원",
                    "150,000원 - 250,000원",
                    "250,000원 이상",
                  ].map((option) => (
                    <label
                      key={option}
                      className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-health-orange transition-colors cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="weeklyBudget"
                        value={option}
                        checked={formData.weeklyBudget === option}
                        onChange={(e) =>
                          handleInputChange("weeklyBudget", e.target.value)
                        }
                        className="mr-3 text-health-orange focus:ring-health-orange"
                      />
                      <span className="font-pretendard text-health-gray">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-pretendard text-health-gray text-[24px] sm:text-[32px] font-bold mb-4">
                음식 선호도
              </h2>
              <p className="font-pretendard text-health-gray/70 text-base sm:text-lg">
                식품 선호도와 연락처를 입력해주세요
              </p>
            </div>

            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  7. 식이 요구 사항을 선택해주세요
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "유제품 무함유",
                    "글루텐 무함유",
                    "��과류 무함유",
                    "달걀 무함유",
                    "건과류 무함유",
                    "달걀 무함유",
                    "베지테리언",
                    "비건",
                    "없음",
                  ].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center p-2 border rounded-lg hover:border-health-orange transition-colors cursor-pointer text-xs ${
                        formData.dietaryRestrictions.includes(option)
                          ? "border-health-orange bg-health-orange/5"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.dietaryRestrictions.includes(option)}
                        onChange={() =>
                          handleMultiSelect("dietaryRestrictions", option, 10)
                        }
                        className="mr-2 text-health-orange focus:ring-health-orange"
                      />
                      <span className="font-pretendard text-health-gray">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  8. 영양 선호도를 선택해주세요
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "저콜레스테롤",
                    "저당",
                    "저나트륨",
                    "고섬유",
                    "고단백",
                    "저탄수화물",
                    "저칼로리",
                    "없음",
                  ].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center p-2 border rounded-lg hover:border-health-orange transition-colors cursor-pointer text-xs ${
                        formData.nutritionPreferences.includes(option)
                          ? "border-health-orange bg-health-orange/5"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.nutritionPreferences.includes(option)}
                        onChange={() =>
                          handleMultiSelect("nutritionPreferences", option, 10)
                        }
                        className="mr-2 text-health-orange focus:ring-health-orange"
                      />
                      <span className="font-pretendard text-health-gray">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  9. 선호하는 요리 스타일을 선택해주세요
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["소고기", "돼지고기", "닭고기", "양고기", "없음"].map(
                    (option) => (
                      <label
                        key={option}
                        className={`flex items-center p-3 border rounded-lg hover:border-health-orange transition-colors cursor-pointer ${
                          formData.cookingStyles.includes(option)
                            ? "border-health-orange bg-health-orange/5"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.cookingStyles.includes(option)}
                          onChange={() =>
                            handleMultiSelect("cookingStyles", option, 10)
                          }
                          className="mr-3 text-health-orange focus:ring-health-orange"
                        />
                        <span className="font-pretendard text-health-gray text-sm">
                          {option}
                        </span>
                      </label>
                    ),
                  )}
                </div>
                <p className="text-xs text-health-gray/60 mt-2">
                  식재료 중심: 단맛, 짠맛, 쓴맛, 매운맛, 돼지고기, 동남아식,
                  내츄, 기타미, 오징어/쭈꾸미, 없음
                </p>
              </div>

              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  10. 섭취 불가 및 기피 음식을 선택해주세요
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "오이",
                    "가지",
                    "당근",
                    "피망",
                    "브로콜리",
                    "토마토",
                    "견과류",
                    "갑각류",
                    "없음",
                  ].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center p-2 border rounded-lg hover:border-health-orange transition-colors cursor-pointer text-sm ${
                        formData.avoidFoods.includes(option)
                          ? "border-health-orange bg-health-orange/5"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.avoidFoods.includes(option)}
                        onChange={() =>
                          handleMultiSelect("avoidFoods", option, 10)
                        }
                        className="mr-2 text-health-orange focus:ring-health-orange"
                      />
                      <span className="font-pretendard text-health-gray">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-health-gray/60 mt-2">
                  참고: 기피하면서도 건강에 도움이 되는 경우에는 적기를 추가로
                  반영하여 간편 안좌와 담담 발철적
                </p>
              </div>

              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-2">
                  이메일 주소 *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-health-orange focus:outline-none transition-colors font-pretendard"
                  placeholder="example@email.com"
                />
              </div>

              <div className="bg-orange-50 p-6 rounded-xl">
                <h3 className="font-pretendard text-health-gray font-semibold mb-3">
                  🎉 설문조사 완료!
                </h3>
                <p className="font-pretendard text-health-gray/80 text-sm leading-relaxed">
                  입력해주신 정보를 바탕으로 개인 맞춤형 건강식단을 분석하여
                  1-2일 내에 이메일로 전달해드리겠습니다. 건강한 라이프스타일의
                  시작을 응원합니다!
                </p>
              </div>
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
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-20 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-health-gray hover:text-health-orange transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="font-pretendard font-semibold">
                홈으로 돌아가기
              </span>
            </button>

            <div className="flex items-center gap-2">
              <span className="font-pretendard text-health-gray font-semibold">
                {currentStep} / {totalSteps}
              </span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-health-orange h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-20 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/20">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <Button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-gray-100 text-health-gray hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
              >
                이전
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid() || isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-health-orange to-orange-400 hover:from-orange-400 hover:to-health-orange text-black font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "제출 중..." : "설문 완료"}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="px-6 py-3 bg-gradient-to-r from-health-orange to-orange-400 hover:from-orange-400 hover:to-health-orange text-black font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
