import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SurveyData {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
  healthGoal: string;
  allergies: string;
  preferredFoods: string;
  avoidFoods: string;
  mealFrequency: string;
  budget: string;
  cookingTime: string;
  email: string;
}

export default function Survey() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SurveyData>({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    healthGoal: "",
    allergies: "",
    preferredFoods: "",
    avoidFoods: "",
    mealFrequency: "",
    budget: "",
    cookingTime: "",
    email: "",
  });

  const totalSteps = 5;

  const handleInputChange = (field: keyof SurveyData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("설문조사가 완료되었습니다! 맞춤 건강식단을 준비해드��겠습니다.");
        navigate("/");
      } else {
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
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
                기본 정보를 알려주세요
              </h2>
              <p className="font-pretendard text-health-gray/70 text-base sm:text-lg">
                개인 맞춤형 식단을 위해 필요한 정보입니다
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-2">
                  이름 *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-health-orange focus:outline-none transition-colors font-pretendard"
                  placeholder="성함을 입력해주세요"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-pretendard text-health-gray font-semibold mb-2">
                    나이 *
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:border-health-orange focus:outline-none transition-colors font-pretendard"
                    placeholder="만 나이"
                  />
                </div>

                <div>
                  <label className="block font-pretendard text-health-gray font-semibold mb-2">
                    성별 *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    className="w-full p-4 border border-gray-200 rounded-xl focus:border-health-orange focus:outline-none transition-colors font-pretendard"
                  >
                    <option value="">선택해주세요</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-pretendard text-health-gray font-semibold mb-2">
                    키 (cm) *
                  </label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) =>
                      handleInputChange("height", e.target.value)
                    }
                    className="w-full p-4 border border-gray-200 rounded-xl focus:border-health-orange focus:outline-none transition-colors font-pretendard"
                    placeholder="예: 170"
                  />
                </div>

                <div>
                  <label className="block font-pretendard text-health-gray font-semibold mb-2">
                    몸무게 (kg) *
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) =>
                      handleInputChange("weight", e.target.value)
                    }
                    className="w-full p-4 border border-gray-200 rounded-xl focus:border-health-orange focus:outline-none transition-colors font-pretendard"
                    placeholder="예: 65"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-pretendard text-health-gray text-[24px] sm:text-[32px] font-bold mb-4">
                활동량과 건강 목표
              </h2>
              <p className="font-pretendard text-health-gray/70 text-base sm:text-lg">
                운동량과 달성하고 싶은 건강 목표를 선택해주세요
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  평소 활동량은 어떠신가요? *
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      value: "low",
                      label: "낮음 (주로 앉아서 생활, 운동 거의 안함)",
                    },
                    { value: "moderate", label: "보통 (가벼운 운동 주 1-3회)" },
                    { value: "high", label: "높음 (규칙적인 운동 주 4-6회)" },
                    {
                      value: "very_high",
                      label: "매우 높음 (매일 운동하거나 육체적 활동이 많음)",
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-health-orange transition-colors cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="activityLevel"
                        value={option.value}
                        checked={formData.activityLevel === option.value}
                        onChange={(e) =>
                          handleInputChange("activityLevel", e.target.value)
                        }
                        className="mr-3 text-health-orange focus:ring-health-orange"
                      />
                      <span className="font-pretendard text-health-gray">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  건강 목표는 무엇인가요? *
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: "weight_loss", label: "체중 감량" },
                    { value: "weight_gain", label: "체중 증가" },
                    { value: "muscle_gain", label: "근육량 증가" },
                    { value: "maintenance", label: "현재 체중 유지" },
                    {
                      value: "health_improvement",
                      label: "전반적인 건강 개선",
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-health-orange transition-colors cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="healthGoal"
                        value={option.value}
                        checked={formData.healthGoal === option.value}
                        onChange={(e) =>
                          handleInputChange("healthGoal", e.target.value)
                        }
                        className="mr-3 text-health-orange focus:ring-health-orange"
                      />
                      <span className="font-pretendard text-health-gray">
                        {option.label}
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
                알레르기 및 식품 선호도
              </h2>
              <p className="font-pretendard text-health-gray/70 text-base sm:text-lg">
                안전한 식단을 위해 알레르기와 선호도를 알려주세요
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-2">
                  알레르기가 있는 식품이 있나요?
                </label>
                <textarea
                  value={formData.allergies}
                  onChange={(e) =>
                    handleInputChange("allergies", e.target.value)
                  }
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-health-orange focus:outline-none transition-colors font-pretendard resize-none h-24"
                  placeholder="예: 견과류, 새우, 달걀 등 (없으면 '없음'이라고 적어주세요)"
                />
              </div>

              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-2">
                  좋아하는 음식이나 자주 드시는 음식
                </label>
                <textarea
                  value={formData.preferredFoods}
                  onChange={(e) =>
                    handleInputChange("preferredFoods", e.target.value)
                  }
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-health-orange focus:outline-none transition-colors font-pretendard resize-none h-24"
                  placeholder="예: 닭가슴살, 브로콜리, 현미, 연어 등"
                />
              </div>

              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-2">
                  피하고 싶은 음식
                </label>
                <textarea
                  value={formData.avoidFoods}
                  onChange={(e) =>
                    handleInputChange("avoidFoods", e.target.value)
                  }
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-health-orange focus:outline-none transition-colors font-pretendard resize-none h-24"
                  placeholder="예: 매운 음식, 유제품, 기름진 음식 등"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-pretendard text-health-gray text-[24px] sm:text-[32px] font-bold mb-4">
                식사 패턴과 예산
              </h2>
              <p className="font-pretendard text-health-gray/70 text-base sm:text-lg">
                라이프스타일에 맞는 식단을 제안해드리기 위해 필요합니다
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  하루 몇 끼를 드시나요? *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { value: "2", label: "2끼" },
                    { value: "3", label: "3끼" },
                    { value: "4", label: "4끼" },
                    { value: "5+", label: "5끼 이상" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center justify-center p-4 border border-gray-200 rounded-xl hover:border-health-orange transition-colors cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="mealFrequency"
                        value={option.value}
                        checked={formData.mealFrequency === option.value}
                        onChange={(e) =>
                          handleInputChange("mealFrequency", e.target.value)
                        }
                        className="mr-2 text-health-orange focus:ring-health-orange"
                      />
                      <span className="font-pretendard text-health-gray">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  한 달 식비 예산은 어느 정도인가요? *
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: "under_30", label: "30만원 미만" },
                    { value: "30_50", label: "30-50만원" },
                    { value: "50_70", label: "50-70만원" },
                    { value: "over_70", label: "70만원 이상" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-health-orange transition-colors cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={option.value}
                        checked={formData.budget === option.value}
                        onChange={(e) =>
                          handleInputChange("budget", e.target.value)
                        }
                        className="mr-3 text-health-orange focus:ring-health-orange"
                      />
                      <span className="font-pretendard text-health-gray">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  요리에 투자할 수 있는 시간은? *
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: "under_15", label: "15분 미만 (간단한 조리)" },
                    { value: "15_30", label: "15-30분 (보통 조리)" },
                    { value: "30_60", label: "30-60분 (정성스런 조리)" },
                    { value: "over_60", label: "60분 이상 (요리를 즐김)" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-health-orange transition-colors cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="cookingTime"
                        value={option.value}
                        checked={formData.cookingTime === option.value}
                        onChange={(e) =>
                          handleInputChange("cookingTime", e.target.value)
                        }
                        className="mr-3 text-health-orange focus:ring-health-orange"
                      />
                      <span className="font-pretendard text-health-gray">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-pretendard text-health-gray text-[24px] sm:text-[32px] font-bold mb-4">
                연락처 정보
              </h2>
              <p className="font-pretendard text-health-gray/70 text-base sm:text-lg">
                맞춤 식단을 전달해드리기 위해 필요합니다
              </p>
            </div>

            <div className="space-y-4">
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
        return (
          formData.name &&
          formData.age &&
          formData.gender &&
          formData.height &&
          formData.weight
        );
      case 2:
        return formData.activityLevel && formData.healthGoal;
      case 3:
        return true; // 선택사항들이므로 통과
      case 4:
        return (
          formData.mealFrequency && formData.budget && formData.cookingTime
        );
      case 5:
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
        <div className="max-w-2xl mx-auto">
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
