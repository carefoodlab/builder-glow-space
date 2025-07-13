import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface Step4Data {
  dietaryRestrictions: string[];
  nutritionPreferences: string[];
  cookingStyles: string[];
  preferredTastes: string[];
  preferredMeats: string[];
  preferredSeafoods: string[];
  avoidFoods: string[];
  email: string;
}

export default function SurveyStep4() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Step4Data>({
    dietaryRestrictions: [],
    nutritionPreferences: [],
    cookingStyles: [],
    preferredTastes: [],
    preferredMeats: [],
    preferredSeafoods: [],
    avoidFoods: [],
    email: "",
  });

  const handleInputChange = (field: keyof Step4Data, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMultiSelect = (
    field: keyof Step4Data,
    value: string,
    maxSelections: number = 10,
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // 이전 단계 데이터와 합쳐서 최종 제출
      const step3Data = location.state?.step3Data || {};

      // 모든 배열 필드 안전성 확보
      const finalData = {
        ...step3Data,
        ...formData,
        // 기본값 설정
        age: step3Data.age || "0",
        gender: step3Data.gender || "male",
        diagnosedDiseases: [],
        familyDiseases: [],
        healthInterests: [],
        activityLevel: step3Data.activityLevel || "inactive",
        mealTarget: step3Data.mealTarget || "1인",
        dietGoal: step3Data.dietGoal || "건강 개선",
        weeklyBudget: step3Data.weeklyBudget || "50,000원 미만",
        dietaryRestrictions: formData.dietaryRestrictions || [],
        nutritionPreferences: formData.nutritionPreferences || [],
        cookingStyles: formData.cookingStyles || [],
        preferredTastes: formData.preferredTastes || [],
        preferredMeats: formData.preferredMeats || [],
        preferredSeafoods: formData.preferredSeafoods || [],
        avoidFoods: formData.avoidFoods || [],
        email: formData.email || "",
      };

      console.log("Final Survey Data:", finalData);

      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();

      if (response.ok) {
        // 설문 데이터와 함께 결과 페이지로 이동
        navigate("/diet-results", {
          state: {
            surveyData: finalData,
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

  const isFormValid = () => {
    return formData.email && formData.email.includes("@");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-20 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/survey-step3")}
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
              <span className="font-pretendard font-semibold">이전 단계로</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="font-pretendard text-health-gray font-semibold">
                4단계: 음식 선호도
              </span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-health-orange h-2 rounded-full w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-20 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/20">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-block px-6 py-2 bg-health-orange/10 rounded-full mb-6">
                  <span className="font-pretendard text-health-orange text-sm font-semibold">
                    🥗 마지막 단계
                  </span>
                </div>
                <h1 className="font-pretendard text-health-gray text-[28px] sm:text-[36px] lg:text-[42px] font-bold mb-4">
                  음식 선호도 및 연락처
                </h1>
                <p className="font-pretendard text-health-gray/70 text-base sm:text-lg">
                  맞춤형 식단을 위한 마지막 정보를 입력해주세요
                </p>
              </div>

              <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2">
                {/* 질문 8: 식이 요구 사항 */}
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl">
                  <label className="block font-pretendard text-health-gray font-bold text-lg mb-4">
                    8. 식이 요구 사항을 선택해주세요 (복수 선택 가능)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      "유제품 무함유",
                      "글루텐 무함유",
                      "대두 무함유",
                      "견과류 무함유",
                      "달걀 무함유",
                      "베지테리언",
                      "비건",
                      "기타",
                      "해당 없음",
                    ].map((option) => (
                      <label
                        key={option}
                        className={`flex items-center p-3 border-2 rounded-xl hover:border-health-orange transition-all cursor-pointer text-sm ${
                          formData.dietaryRestrictions.includes(option)
                            ? "border-health-orange bg-health-orange/10"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.dietaryRestrictions.includes(
                            option,
                          )}
                          onChange={() =>
                            handleMultiSelect("dietaryRestrictions", option, 10)
                          }
                          className="mr-2 text-health-orange focus:ring-health-orange"
                        />
                        <span className="font-pretendard text-health-gray font-medium">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 질문 9: 영양 선호도 */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl">
                  <label className="block font-pretendard text-health-gray font-bold text-lg mb-4">
                    9. 영양 선호도를 선택해주세요 (복수 선택 가능)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      "저콜레스테롤",
                      "저당",
                      "저나트륨",
                      "고섬유",
                      "고단백",
                      "저탄수화물",
                      "저칼로리",
                      "기타",
                    ].map((option) => (
                      <label
                        key={option}
                        className={`flex items-center p-3 border-2 rounded-xl hover:border-health-orange transition-all cursor-pointer text-sm ${
                          formData.nutritionPreferences.includes(option)
                            ? "border-health-orange bg-health-orange/10"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.nutritionPreferences.includes(
                            option,
                          )}
                          onChange={() =>
                            handleMultiSelect(
                              "nutritionPreferences",
                              option,
                              10,
                            )
                          }
                          className="mr-2 text-health-orange focus:ring-health-orange"
                        />
                        <span className="font-pretendard text-health-gray font-medium">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 질문 10: 선호하는 요리 스타일 */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl">
                  <label className="block font-pretendard text-health-gray font-bold text-lg mb-4">
                    10. 선호하는 요리 스타일을 선택해주세요 (복수 선택 가능)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: "한식(탕, 찌개)", emoji: "🍲" },
                      { name: "한식(탕, 찌개 외)", emoji: "🍱" },
                      { name: "일식", emoji: "🍣" },
                      { name: "중식", emoji: "🥢" },
                      { name: "양식", emoji: "🍝" },
                      { name: "동남아식", emoji: "🍜" },
                      { name: "인도식", emoji: "🍛" },
                    ].map((option) => (
                      <label
                        key={option.name}
                        className={`flex items-center p-4 border-2 rounded-xl hover:border-health-orange transition-all cursor-pointer ${
                          formData.cookingStyles.includes(option.name)
                            ? "border-health-orange bg-health-orange/10"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.cookingStyles.includes(option.name)}
                          onChange={() =>
                            handleMultiSelect("cookingStyles", option.name, 10)
                          }
                          className="mr-3 text-health-orange focus:ring-health-orange"
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{option.emoji}</span>
                          <span className="font-pretendard text-health-gray font-medium">
                            {option.name}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 질문 11: 선호하는 맛 */}
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-2xl">
                  <label className="block font-pretendard text-health-gray font-bold text-lg mb-4">
                    11. 선호하는 맛을 선택해주세요 (복수 선택 가능)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                      { name: "단맛", emoji: "🍯" },
                      { name: "매운맛", emoji: "🌶️" },
                      { name: "새콤한맛", emoji: "🍋" },
                      { name: "크리미", emoji: "🥛" },
                      { name: "치즈 맛", emoji: "🧀" },
                      { name: "허브", emoji: "🌿" },
                    ].map((option) => (
                      <label
                        key={option.name}
                        className={`flex items-center p-3 border-2 rounded-xl hover:border-health-orange transition-all cursor-pointer ${
                          formData.preferredTastes.includes(option.name)
                            ? "border-health-orange bg-health-orange/10"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.preferredTastes.includes(
                            option.name,
                          )}
                          onChange={() =>
                            handleMultiSelect(
                              "preferredTastes",
                              option.name,
                              10,
                            )
                          }
                          className="mr-2 text-health-orange focus:ring-health-orange"
                        />
                        <div className="text-center">
                          <div className="text-lg mb-1">{option.emoji}</div>
                          <span className="font-pretendard text-health-gray font-medium text-xs">
                            {option.name}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 질문 12: 선호하는 육류와 해산물 */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl">
                  <label className="block font-pretendard text-health-gray font-bold text-lg mb-4">
                    12. 선호하는 육류와 해산물을 선택해주세요 (복수 선택 가능)
                  </label>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-pretendard text-health-gray font-semibold mb-3 flex items-center gap-2">
                        <span className="text-xl">🥩</span> 육류
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {["소고기", "돼지고기", "닭고기", "양고기"].map(
                          (option) => (
                            <label
                              key={option}
                              className={`flex items-center p-3 border-2 rounded-xl hover:border-health-orange transition-all cursor-pointer ${
                                formData.preferredMeats.includes(option)
                                  ? "border-health-orange bg-health-orange/10"
                                  : "border-gray-200 bg-white"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={formData.preferredMeats.includes(
                                  option,
                                )}
                                onChange={() =>
                                  handleMultiSelect(
                                    "preferredMeats",
                                    option,
                                    10,
                                  )
                                }
                                className="mr-2 text-health-orange focus:ring-health-orange"
                              />
                              <span className="font-pretendard text-health-gray font-medium text-sm">
                                {option}
                              </span>
                            </label>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-pretendard text-health-gray font-semibold mb-3 flex items-center gap-2">
                        <span className="text-xl">🐟</span> 해산물
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          "연어",
                          "참치",
                          "송어",
                          "백색어류",
                          "등푸른생선",
                          "새우",
                          "가리비",
                          "오징어/쭈꾸미",
                        ].map((option) => (
                          <label
                            key={option}
                            className={`flex items-center p-3 border-2 rounded-xl hover:border-health-orange transition-all cursor-pointer ${
                              formData.preferredSeafoods.includes(option)
                                ? "border-health-orange bg-health-orange/10"
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.preferredSeafoods.includes(
                                option,
                              )}
                              onChange={() =>
                                handleMultiSelect(
                                  "preferredSeafoods",
                                  option,
                                  10,
                                )
                              }
                              className="mr-2 text-health-orange focus:ring-health-orange"
                            />
                            <span className="font-pretendard text-health-gray font-medium text-sm">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ��문 13: 섭취 불가 및 기피 음식 */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl">
                  <label className="block font-pretendard text-health-gray font-bold text-lg mb-4">
                    13. 섭취 불가 및 기피 음식을 선택해주세요 (복수 선택 가능)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      "오이",
                      "가지",
                      "당근",
                      "피망",
                      "브로콜리",
                      "토마토",
                      "견과류",
                      "갑각류",
                      "기타",
                    ].map((option) => (
                      <label
                        key={option}
                        className={`flex items-center p-3 border-2 rounded-xl hover:border-health-orange transition-all cursor-pointer text-sm ${
                          formData.avoidFoods.includes(option)
                            ? "border-health-orange bg-health-orange/10"
                            : "border-gray-200 bg-white"
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
                        <span className="font-pretendard text-health-gray font-medium">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 이메일 입력 */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl">
                  <label className="block font-pretendard text-health-gray font-bold text-lg mb-4">
                    ✉️ 이메일 주소 *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-health-orange focus:outline-none transition-all font-pretendard text-lg"
                    placeholder="example@email.com"
                  />
                  <p className="font-pretendard text-health-gray/70 text-sm mt-2">
                    맞춤 식단을 이메일로 전달해드립니다
                  </p>
                </div>

                {/* 완료 안내 */}
                <div className="bg-gradient-to-r from-health-orange/10 to-orange-100 p-8 rounded-2xl text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="font-pretendard text-health-gray font-bold text-xl mb-3">
                    설문조사 완료!
                  </h3>
                  <p className="font-pretendard text-health-gray/80 leading-relaxed">
                    입력해주신 정보를 바탕으로 개인 맞춤형 건강식단을 분석하여
                    <br />
                    <strong>1-2일 내에 이메일로 전달</strong>해드리겠습니다.
                    <br />
                    건강한 라이프스타일의 시작을 응원합니���!
                  </p>
                </div>
              </div>

              {/* 제출 버튼 */}
              <div className="flex justify-center pt-8">
                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid() || isSubmitting}
                  className="px-16 py-5 bg-gradient-to-r from-health-orange to-orange-400 hover:from-orange-400 hover:to-health-orange text-black font-poppins font-bold text-xl rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-105 shadow-2xl"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
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
                      설문 제출 중...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎯</span>
                      맞춤 식단 받기
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
