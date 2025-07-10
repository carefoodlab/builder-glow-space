import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ThankYou() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-white relative overflow-hidden">
      {/* 배경 요소들 */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-health-orange/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-green-400/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 bg-blue-400/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-purple-400/10 rounded-full blur-xl"></div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div
            className={`transform transition-all duration-1000 ${showConfetti ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            {/* 아이콘 */}
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-health-orange to-orange-400 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                {/* 스파클 효과 */}
                <div
                  className={`absolute -top-2 -right-2 w-6 h-6 text-yellow-400 ${showConfetti ? "animate-bounce" : ""}`}
                >
                  ✨
                </div>
                <div
                  className={`absolute -bottom-1 -left-3 w-5 h-5 text-green-400 ${showConfetti ? "animate-pulse" : ""}`}
                >
                  🌟
                </div>
              </div>
            </div>

            {/* 메인 메시지 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20 mb-8">
              <h1 className="font-pretendard text-health-gray text-[28px] sm:text-[36px] lg:text-[48px] font-bold leading-[130%] mb-6">
                설문조사 완료!
              </h1>

              <div className="text-4xl sm:text-6xl mb-6">🎉</div>

              <p className="font-pretendard text-health-gray text-lg sm:text-xl leading-relaxed mb-6">
                소중한 시간을 내어 설문조사에 참여해주셔서
                <br />
                <span className="text-health-orange font-semibold">
                  진심으로 감사드립니다!
                </span>
              </p>

              <div className="bg-gradient-to-r from-health-orange/10 to-orange-100 rounded-2xl p-6 mb-6">
                <h2 className="font-pretendard text-health-gray font-bold text-lg sm:text-xl mb-4">
                  🍽️ 다음 단계 안내
                </h2>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-health-orange rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <p className="font-pretendard text-health-gray text-sm sm:text-base">
                      <strong>데이터 분석:</strong> 입력해주신 정보를 바탕으로
                      개인 맞춤형 건강식단을 분석합니다
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-health-orange rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <p className="font-pretendard text-health-gray text-sm sm:text-base">
                      <strong>전문가 검토:</strong> 영양 전문가가 귀하의 건강
                      상태와 선호도를 검토합니다
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-health-orange rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <p className="font-pretendard text-health-gray text-sm sm:text-base">
                      <strong>맞춤 식단 전달:</strong> 1-2일 내에 이메일로 개인
                      맞춤 건강식단을 보내드립니다
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
                <h3 className="font-pretendard text-health-gray font-bold text-lg mb-3 flex items-center justify-center gap-2">
                  <span className="text-2xl">📧</span>
                  이메일을 확인해주세요!
                </h3>
                <p className="font-pretendard text-health-gray/80 text-sm sm:text-base">
                  스팸함도 꼭 확인해보시고, 궁금한 점이 있으시면 언제든
                  문의해주세요.
                  <br />
                  건강한 식단으로 더 나은 라이프스타일을 만들어보세요! 💚
                </p>
              </div>

              {/* 버튼들 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate("/")}
                  className="px-8 py-4 bg-gradient-to-r from-health-orange to-orange-400 hover:from-orange-400 hover:to-health-orange text-black font-poppins font-bold text-lg rounded-2xl transform transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  <span className="flex items-center gap-2">
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    홈으로 돌아가기
                  </span>
                </Button>

                <Button
                  onClick={() => navigate("/survey")}
                  className="px-8 py-4 bg-white border-2 border-health-orange text-health-orange hover:bg-health-orange hover:text-black font-poppins font-bold text-lg rounded-2xl transform transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center gap-2">
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    추가 설문하기
                  </span>
                </Button>
              </div>
            </div>

            {/* 소셜 공유 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="font-pretendard text-health-gray/70 text-sm mb-4">
                친구들에게도 건강한 식단을 추천해주세요! 🤝
              </p>
              <div className="flex justify-center gap-4">
                <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  📘
                </button>
                <button className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  📱
                </button>
                <button className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  📨
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
