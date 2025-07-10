import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Step3Data {
  mealTarget: string;
  mealTargetNumber?: string;
  dietGoal: string;
  weeklyBudget: string;
}

export default function SurveyStep3() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Step3Data>({
    mealTarget: "",
    mealTargetNumber: "",
    dietGoal: "",
    weeklyBudget: "",
  });

  const handleInputChange = (field: keyof Step3Data, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // 여기서 데이터를 저장하거나 다음 단계로 전달
      console.log("Step 3 Data:", formData);

      // 4단계로 이동하거나 완료 처리
      navigate("/survey-step4", { state: { step3Data: formData } });
    } catch (error) {
      console.error("Error:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return formData.mealTarget && formData.dietGoal && formData.weeklyBudget;
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
                3단계: ��사 준비 및 예산
              </span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-health-orange h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-20 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/20">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-block px-6 py-2 bg-health-orange/10 rounded-full mb-6">
                  <span className="font-pretendard text-health-orange text-sm font-semibold">
                    🍽️ 식사 계획
                  </span>
                </div>
                <h1 className="font-pretendard text-health-gray text-[28px] sm:text-[36px] lg:text-[42px] font-bold mb-4">
                  식사 준비 및 예산 정보
                </h1>
                <p className="font-pretendard text-health-gray/70 text-base sm:text-lg">
                  라이프스타일에 맞는 식단을 제안해드��기 위해 필요합니다
                </p>
              </div>

              <div className="space-y-8">
                {/* 질문 5: 식사 준비 대상 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-2xl">
                  <label className="block font-pretendard text-health-gray font-bold text-lg sm:text-xl mb-4">
                    5. 식사를 준비하는 대상을 선택해주세요 *
                  </label>
                  <div className="space-y-4">
                    <label className="flex items-center p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-health-orange transition-all duration-300 cursor-pointer group">
                      <input
                        type="radio"
                        name="mealTarget"
                        value="1인"
                        checked={formData.mealTarget === "1인"}
                        onChange={(e) =>
                          handleInputChange("mealTarget", e.target.value)
                        }
                        className="mr-4 text-health-orange focus:ring-health-orange scale-125"
                      />
                      <span className="font-pretendard text-health-gray font-medium group-hover:text-health-orange transition-colors">
                        1인
                      </span>
                    </label>

                    <div className="flex items-center gap-4">
                      <label className="flex items-center p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-health-orange transition-all duration-300 cursor-pointer group flex-1">
                        <input
                          type="radio"
                          name="mealTarget"
                          value="1인+@"
                          checked={formData.mealTarget === "1인+@"}
                          onChange={(e) =>
                            handleInputChange("mealTarget", e.target.value)
                          }
                          className="mr-4 text-health-orange focus:ring-health-orange scale-125"
                        />
                        <span className="font-pretendard text-health-gray font-medium group-hover:text-health-orange transition-colors">
                          1인 +@
                        </span>
                      </label>
                      {formData.mealTarget === "1인+@" && (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={formData.mealTargetNumber}
                            onChange={(e) =>
                              handleInputChange(
                                "mealTargetNumber",
                                e.target.value,
                              )
                            }
                            className="w-20 p-3 border-2 border-gray-200 rounded-lg focus:border-health-orange focus:outline-none font-pretendard text-center"
                            placeholder="인원"
                            min="2"
                            max="10"
                          />
                          <span className="font-pretendard text-health-gray">
                            명
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 질문 6: 식단 관련 주요 목표 */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 sm:p-8 rounded-2xl">
                  <label className="block font-pretendard text-health-gray font-bold text-lg sm:text-xl mb-4">
                    6. 식단과 관련된 주요 목표를 선택해주세요 *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        value: "시간 절약",
                        icon: "⏰",
                        desc: "빠르고 간편한 식사 준비",
                      },
                      {
                        value: "비용 절약",
                        icon: "💰",
                        desc: "경제적인 식단 구성",
                      },
                      {
                        value: "요리 단순화",
                        icon: "🍳",
                        desc: "쉽고 간단한 요리법",
                      },
                      {
                        value: "건강 개선",
                        icon: "🌱",
                        desc: "영양소 균형 맞춤",
                      },
                      {
                        value: "스트레스 감소",
                        icon: "😌",
                        desc: "편안한 식사 계획",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-start p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-health-orange transition-all duration-300 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="dietGoal"
                          value={option.value}
                          checked={formData.dietGoal === option.value}
                          onChange={(e) =>
                            handleInputChange("dietGoal", e.target.value)
                          }
                          className="mr-4 mt-1 text-health-orange focus:ring-health-orange scale-125"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">{option.icon}</span>
                            <span className="font-pretendard text-health-gray font-semibold group-hover:text-health-orange transition-colors">
                              {option.value}
                            </span>
                          </div>
                          <p className="font-pretendard text-health-gray/70 text-sm">
                            {option.desc}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 질문 7: 주간 음식 지출 예산 */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 sm:p-8 rounded-2xl">
                  <label className="block font-pretendard text-health-gray font-bold text-lg sm:text-xl mb-4">
                    7. 주간 음식 지출 예산을 선택해주세요 *
                  </label>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      {
                        value: "50,000원 미만",
                        icon: "💚",
                        desc: "경제적인 예산",
                      },
                      {
                        value: "50,000 - 100,000원",
                        icon: "💛",
                        desc: "적당한 예산",
                      },
                      {
                        value: "100,000원 - 150,000원",
                        icon: "🧡",
                        desc: "여유로운 예산",
                      },
                      {
                        value: "150,000원 - 250,000원",
                        icon: "❤️",
                        desc: "넉넉한 예산",
                      },
                      {
                        value: "250,000원 이상",
                        icon: "💜",
                        desc: "프리미엄 예산",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-health-orange transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="weeklyBudget"
                            value={option.value}
                            checked={formData.weeklyBudget === option.value}
                            onChange={(e) =>
                              handleInputChange("weeklyBudget", e.target.value)
                            }
                            className="mr-4 text-health-orange focus:ring-health-orange scale-125"
                          />
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{option.icon}</span>
                            <div>
                              <span className="font-pretendard text-health-gray font-semibold group-hover:text-health-orange transition-colors">
                                {option.value}
                              </span>
                              <p className="font-pretendard text-health-gray/70 text-sm">
                                {option.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 진행률 표시 */}
                <div className="bg-health-orange/5 p-6 rounded-xl text-center">
                  <div className="mb-4">
                    <span className="font-pretendard text-health-orange font-semibold text-lg">
                      진행률: 75%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-health-orange to-orange-400 h-3 rounded-full w-3/4 transition-all duration-500"></div>
                  </div>
                  <p className="font-pretendard text-health-gray/70 text-sm mt-3">
                    거의 다 완성되었습니다! 마지막 단계만 남았어요 🎉
                  </p>
                </div>
              </div>

              {/* 제출 버튼 */}
              <div className="flex justify-center pt-8">
                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid() || isSubmitting}
                  className="px-12 py-4 bg-gradient-to-r from-health-orange to-orange-400 hover:from-orange-400 hover:to-health-orange text-black font-poppins font-bold text-lg rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      처리 중...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      다음 단계로
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
