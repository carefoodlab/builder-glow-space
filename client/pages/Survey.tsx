import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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

export default function Survey() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SurveyData>({
    age: "",
    gender: "",
    diagnosedDiseases: [],
    familyDiseases: [],
    healthInterests: [],
    activityLevel: "",
    mealTarget: "",
    mealTargetNumber: "",
    dietGoal: "",
    weeklyBudget: "",
    dietaryRestrictions: [],
    nutritionPreferences: [],
    cookingStyles: [],
    preferredTastes: [],
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
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("설문조사가 완료되었습니다! 맞춤 건강식단을 준비해드리겠습니다.");
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
                기본 정보 및 건강 상태
              </h2>
              <p className="font-pretendard text-health-gray/70 text-base sm:text-lg">
                나이, 성별 및 건강 관련 정보를 알려주세요
              </p>
            </div>

            <div className="space-y-6">
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

              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  1. 병원이나 건강검진에서 진단 받은 질환을 선택해주세요 (최대
                  3개)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "고혈압",
                    "당뇨병",
                    "고지혈증",
                    "비만",
                    "심혈관 질환",
                    "만성 위장장애",
                    "호흡기 질환",
                    "간 질환",
                    "기타",
                    "해당 없음",
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
                  2. 가족 중 주요 질환을 가진 사람이 있습니까? (최대 3개)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "고혈압",
                    "당뇨병",
                    "고지혈증",
                    "비만",
                    "심혈관 질환",
                    "만성 위장장애",
                    "호흡기 질환",
                    "간 질환",
                    "기타",
                    "해당 없음",
                  ].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center p-3 border rounded-xl hover:border-health-orange transition-colors cursor-pointer ${
                        formData.familyDiseases.includes(option)
                          ? "border-health-orange bg-health-orange/5"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.familyDiseases.includes(option)}
                        onChange={() =>
                          handleMultiSelect("familyDiseases", option, 3)
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
                  선택된 항목: {formData.familyDiseases.length}/3
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-pretendard text-health-gray text-[24px] sm:text-[32px] font-bold mb-4">
                건강 관심사 및 활동 수준
              </h2>
              <p className="font-pretendard text-health-gray/70 text-base sm:text-lg">
                관심 있는 건강 정보와 활동 수준을 알려주세요
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  3. 관심 있는 건강 정보를 선택해주세요 (최대 3개)
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
                    "기타",
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
                  4. 일상 활동 수준을 평가해주세요 *
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      value: "very_active",
                      label: "매우 활동적 (일주일에 5일 이상 운동)",
                    },
                    { value: "active", label: "활동적 (일주일에 3-4일 운동)" },
                    {
                      value: "slightly_active",
                      label: "약간 활동적 (일주일에 1-2일 운동)",
                    },
                    { value: "inactive", label: "비활동적 (운동 없음)" },
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
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-pretendard text-health-gray text-[24px] sm:text-[32px] font-bold mb-4">
                식사 준비 및 예산 정보
              </h2>
              <p className="font-pretendard text-health-gray/70 text-base sm:text-lg">
                식사 계획 및 예산에 대해 알려주세요
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  5. 식사를 준비하는 대상을 선택해주세요 *
                </label>
                <div className="grid grid-cols-1 gap-3">
                  <label className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-health-orange transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name="mealTarget"
                      value="1인"
                      checked={formData.mealTarget === "1인"}
                      onChange={(e) =>
                        handleInputChange("mealTarget", e.target.value)
                      }
                      className="mr-3 text-health-orange focus:ring-health-orange"
                    />
                    <span className="font-pretendard text-health-gray">
                      1인
                    </span>
                  </label>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-health-orange transition-colors cursor-pointer flex-1">
                      <input
                        type="radio"
                        name="mealTarget"
                        value="1인+@"
                        checked={formData.mealTarget === "1인+@"}
                        onChange={(e) =>
                          handleInputChange("mealTarget", e.target.value)
                        }
                        className="mr-3 text-health-orange focus:ring-health-orange"
                      />
                      <span className="font-pretendard text-health-gray">
                        1인 +@
                      </span>
                    </label>
                    {formData.mealTarget === "1인+@" && (
                      <input
                        type="number"
                        value={formData.mealTargetNumber}
                        onChange={(e) =>
                          handleInputChange("mealTargetNumber", e.target.value)
                        }
                        className="w-20 p-2 border border-gray-200 rounded-lg focus:border-health-orange focus:outline-none"
                        placeholder="인원"
                        min="2"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  6. 식단과 관련된 주요 목표를 선택해주세요 *
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
                  7. 주간 음식 지출 예산을 선택해주세요 *
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
                음식 선호도 및 연락처
              </h2>
              <p className="font-pretendard text-health-gray/70 text-base sm:text-lg">
                식품 선호도와 연락처를 입력해주세요
              </p>
            </div>

            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  8. 식이 요구 사항을 선택해주세요 (복수 선택 가능)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                  9. 영양 선호도를 선택해주세요 (복수 선택 가능)
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
                    "기타",
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
                  10. 선호하는 요리 스타일을 선택해주세요 (복수 선택 가능)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "한식(탕, 찌개)",
                    "한식(탕, 찌개 외)",
                    "일식",
                    "중식",
                    "양식",
                    "동남아식",
                    "인도식",
                  ].map((option) => (
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
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  11. 선호하는 맛을 선택해주세요 (복수 선택 가능)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "단맛",
                    "매운맛",
                    "새콤한맛",
                    "크리미",
                    "치즈 맛",
                    "허브",
                  ].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center p-2 border rounded-lg hover:border-health-orange transition-colors cursor-pointer text-sm ${
                        formData.preferredTastes.includes(option)
                          ? "border-health-orange bg-health-orange/5"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.preferredTastes.includes(option)}
                        onChange={() =>
                          handleMultiSelect("preferredTastes", option, 10)
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
                  12. 선호하는 육류와 해산물을 선택해주세요 (복수 선택 가능)
                </label>
                <div className="space-y-3">
                  <div>
                    <p className="font-pretendard text-health-gray font-medium mb-2">
                      육류
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {["소고기", "돼지고기", "닭고기", "양고기"].map(
                        (option) => (
                          <label
                            key={option}
                            className={`flex items-center p-2 border rounded-lg hover:border-health-orange transition-colors cursor-pointer ${
                              formData.preferredMeats.includes(option)
                                ? "border-health-orange bg-health-orange/5"
                                : "border-gray-200"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.preferredMeats.includes(option)}
                              onChange={() =>
                                handleMultiSelect("preferredMeats", option, 10)
                              }
                              className="mr-2 text-health-orange focus:ring-health-orange"
                            />
                            <span className="font-pretendard text-health-gray text-sm">
                              {option}
                            </span>
                          </label>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="font-pretendard text-health-gray font-medium mb-2">
                      해산물
                    </p>
                    <div className="grid grid-cols-2 gap-2">
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
                          className={`flex items-center p-2 border rounded-lg hover:border-health-orange transition-colors cursor-pointer ${
                            formData.preferredSeafoods.includes(option)
                              ? "border-health-orange bg-health-orange/5"
                              : "border-gray-200"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.preferredSeafoods.includes(
                              option,
                            )}
                            onChange={() =>
                              handleMultiSelect("preferredSeafoods", option, 10)
                            }
                            className="mr-2 text-health-orange focus:ring-health-orange"
                          />
                          <span className="font-pretendard text-health-gray text-sm">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-pretendard text-health-gray font-semibold mb-3">
                  13. 섭취 불가 및 기피 음식을 선택해주세요 (복수 선택 가능)
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
                    "기타",
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
        return formData.age && formData.gender;
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
