import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getSurveyResponses, getConnectionStatus } from "@/lib/supabase";
import type { SurveyResponse } from "@/lib/supabase";

export default function SurveyAdmin() {
  const [surveys, setSurveys] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const connectionStatus = getConnectionStatus();

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    setLoading(true);
    try {
      const result = await getSurveyResponses();
      if (result.success && result.data) {
        setSurveys(result.data);
      } else {
        setError("데이터 로딩 중 오류가 발생했습니다.");
      }
    } catch (err) {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (surveys.length === 0) return;

    const headers = [
      "ID",
      "생성일시",
      "나이",
      "진단받은 질환",
      "건강 관심사",
      "활동 수준",
      "식사 대상",
      "식단 목표",
      "주간 예산",
      "식이 제한사항",
      "영양 선호도",
      "요리 스타일",
      "선호 육류",
      "선호 해산물",
      "기피 음식",
      "이메일",
    ];

    const csvContent = [
      headers.join(","),
      ...surveys.map((survey) =>
        [
          survey.id,
          survey.created_at,
          survey.age,
          JSON.stringify(survey.diagnosed_diseases),
          JSON.stringify(survey.health_interests),
          survey.activity_level,
          survey.meal_target,
          survey.diet_goal,
          survey.weekly_budget,
          JSON.stringify(survey.dietary_restrictions),
          JSON.stringify(survey.nutrition_preferences),
          JSON.stringify(survey.cooking_styles),
          JSON.stringify(survey.preferred_meats),
          JSON.stringify(survey.preferred_seafoods),
          JSON.stringify(survey.avoid_foods),
          survey.email,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `survey_responses_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <Button
            onClick={loadSurveys}
            className="bg-orange-500 hover:bg-orange-600"
          >
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                설문조사 관리자 대시보드
              </h1>
              <div className="mt-1 flex items-center gap-2">
                <div
                  className={`px-2 py-1 text-xs rounded-full ${
                    connectionStatus.isConfigured
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {connectionStatus.isConfigured
                    ? "🟢 Supabase 연결됨"
                    : "🟡 로컬 모드"}
                </div>
                {connectionStatus.usingFallback && (
                  <span className="text-xs text-gray-500">
                    (데이터가 브라우저에 임시 저장됨)
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={loadSurveys}
                className="bg-blue-500 hover:bg-blue-600"
              >
                새로고침
              </Button>
              <Button
                onClick={exportToCSV}
                className="bg-green-500 hover:bg-green-600"
                disabled={surveys.length === 0}
              >
                CSV 내보내기
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-orange-600">
                {surveys.length}
              </div>
              <div className="text-sm text-gray-600">총 응답 수</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-blue-600">
                {new Set(surveys.map((s) => s.email)).size}
              </div>
              <div className="text-sm text-gray-600">고유 사용자</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-green-600">
                {
                  surveys.filter(
                    (s) =>
                      s.created_at &&
                      new Date(s.created_at) >
                        new Date(Date.now() - 24 * 60 * 60 * 1000),
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600">오늘 응답</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-purple-600">
                {
                  surveys.filter(
                    (s) =>
                      s.created_at &&
                      new Date(s.created_at) >
                        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600">이번 주 응답</div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              설문조사 응답 목록
            </h2>
          </div>

          {surveys.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              아직 설문조사 응답이 없습니다.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      제출일시
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      나이
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      활동 수준
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      식단 목표
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      이메일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      건강 관심사
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {surveys.map((survey) => (
                    <tr key={survey.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {survey.created_at
                          ? new Date(survey.created_at).toLocaleString("ko-KR")
                          : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {survey.age}세
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {survey.activity_level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {survey.diet_goal}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {survey.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex flex-wrap gap-1">
                          {survey.health_interests
                            ?.slice(0, 2)
                            .map((interest, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800"
                              >
                                {interest}
                              </span>
                            ))}
                          {survey.health_interests &&
                            survey.health_interests.length > 2 && (
                              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                                +{survey.health_interests.length - 2}
                              </span>
                            )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
