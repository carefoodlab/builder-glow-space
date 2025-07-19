import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-white">
      {/* Hero Section */}
      <section
        className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[660px] bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/2d102990e86d9c5bf4b979ceedc594e1baeb0013?width=3840')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-20 h-full flex flex-col justify-center">
          <div
            className={`max-w-2xl transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-white/20 shadow-2xl">
              <h1 className="font-pretendard text-white text-[22px] sm:text-[28px] md:text-[36px] lg:text-[50px] font-bold leading-[130%] mb-4 sm:mb-6 drop-shadow-lg">
                간단 데이터를 나에게 딱 맞는
                <br />
                <span className="text-health-orange drop-shadow-lg">
                  건강한 한 끼
                </span>
                를 추천해요
              </h1>
              <Button
                onClick={() => navigate("/survey")}
                className="group bg-gradient-to-r from-health-orange to-orange-400 hover:from-orange-400 hover:to-health-orange text-black font-poppins font-semibold px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base rounded-[88px] h-auto transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  건강 식단 추천받기
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 transform transition-transform group-hover:translate-x-1"
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
                </span>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-[120px] px-4 sm:px-6 md:px-8 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-50/20 to-transparent"></div>
        <div className="container mx-auto max-w-[1280px] relative z-10">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <div className="inline-block px-4 sm:px-6 py-2 bg-health-orange/10 rounded-full mb-4 sm:mb-6">
              <span className="font-pretendard text-health-orange text-xs sm:text-sm font-semibold">
                4단계 프로세스
              </span>
            </div>
            <h2 className="font-pretendard text-health-gray text-[20px] sm:text-[28px] md:text-[36px] lg:text-[50px] font-bold leading-[130%] px-2">
              나의 건강상태를 분석해서
              <br />
              <span className="bg-gradient-to-r from-health-orange to-orange-500 bg-clip-text text-transparent">
                개인 맞춤형 식단
              </span>
              을 제공해요
            </h2>
          </div>

          <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20">
            {/* Feature 1 */}
            <div className="group flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-[70px] transform transition-all duration-700 hover:scale-[1.02]">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl w-full lg:w-auto">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b18a4fcc02f9e0d73ef6046672e562c074d02a9e?width=1140"
                  alt="건강검진 데이터 입력"
                  className="w-full lg:w-[570px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[390px] object-cover transform transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-health-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                  1
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left px-4 sm:px-0">
                <div className="mb-3 sm:mb-4 flex justify-center lg:justify-start">
                  <span className="inline-block w-8 sm:w-12 h-1 bg-gradient-to-r from-health-orange to-orange-400 rounded-full"></span>
                </div>
                <h3 className="font-pretendard text-health-gray text-[18px] sm:text-[24px] md:text-[28px] lg:text-[40px] font-bold leading-[140%] mb-3 sm:mb-4 group-hover:text-health-orange transition-colors duration-300">
                  건강검진 데이터 입력
                </h3>
                <p className="font-pretendard text-health-gray/80 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-[140%]">
                  간단히 결과를 업로드 하거나 주요 정보를 입력합니다
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group flex flex-col lg:flex-row-reverse items-center gap-6 sm:gap-8 lg:gap-[70px] transform transition-all duration-700 hover:scale-[1.02]">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl w-full lg:w-auto">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/354f7dbcfc61f98bb717eef174e7c00e7e1bc16e?width=1140"
                  alt="개인 건강 상태 분석"
                  className="w-full lg:w-[570px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[390px] object-cover transform transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                  2
                </div>
              </div>
              <div className="flex-1 text-center lg:text-right px-4 sm:px-0">
                <div className="mb-3 sm:mb-4 flex justify-center lg:justify-end">
                  <span className="inline-block w-8 sm:w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></span>
                </div>
                <h3 className="font-pretendard text-health-gray text-[18px] sm:text-[24px] md:text-[28px] lg:text-[40px] font-bold leading-[140%] mb-3 sm:mb-4 group-hover:text-blue-500 transition-colors duration-300">
                  개인 건강 상태 분석
                </h3>
                <p className="font-pretendard text-health-gray/80 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-[140%]">
                  AI가 혈압, 혈당, 등 주요 데이터를 이해하여 현재 개인의
                  건강상태를 자세히 분석하여 보여줍니다
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-[70px] transform transition-all duration-700 hover:scale-[1.02]">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl w-full lg:w-auto">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d2ce213cff8303c1967cc3f05fd664732005ae3?width=1140"
                  alt="맞춤형 음식 추천"
                  className="w-full lg:w-[570px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[390px] object-cover transform transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div
                  className="absolute top-3 sm:top-4 w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg"
                  style={{ left: "465px", top: "19px" }}
                >
                  3
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left px-4 sm:px-0">
                <div className="mb-3 sm:mb-4 flex justify-center lg:justify-start">
                  <span className="inline-block w-8 sm:w-12 h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full"></span>
                </div>
                <h3 className="font-pretendard text-health-gray text-[18px] sm:text-[24px] md:text-[28px] lg:text-[40px] font-bold leading-[140%] mb-3 sm:mb-4 group-hover:text-green-500 transition-colors duration-300">
                  맞춤형 음식 추천
                </h3>
                <p className="font-pretendard text-health-gray/80 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-[140%]">
                  내 건강 상태에 적합한 음식은 무엇이 있고, 나만의 맞춤형 건강
                  식단 레시피는 어떤것이 있는 추천합니다.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group flex flex-col lg:flex-row-reverse items-center gap-6 sm:gap-8 lg:gap-[70px] transform transition-all duration-700 hover:scale-[1.02]">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl w-full lg:w-auto">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/572b6b00b44d2e666b50f92ef35781608c132207?width=1140"
                  alt="신선한 식재료 배송"
                  className="w-full lg:w-[570px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[390px] object-cover transform transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                  4
                </div>
              </div>
              <div className="flex-1 text-center lg:text-right px-4 sm:px-0">
                <div className="mb-3 sm:mb-4 flex justify-center lg:justify-end">
                  <span className="inline-block w-8 sm:w-12 h-1 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"></span>
                </div>
                <h3 className="font-pretendard text-health-gray text-[18px] sm:text-[24px] md:text-[28px] lg:text-[40px] font-bold leading-[140%] mb-3 sm:mb-4 group-hover:text-purple-500 transition-colors duration-300">
                  신선한 식재료 배송
                </h3>
                <p className="font-pretendard text-health-gray/80 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-[140%]">
                  내 건강 상태에 적합한 음식은 무엇이 있고, 나만의 맞춤형 건강
                  식단 레시피는 어떤것이 있는 추천합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-[120px] px-4 sm:px-6 md:px-8 lg:px-20 bg-gradient-to-br from-orange-50/30 via-white to-orange-50/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-health-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto max-w-[1280px] relative z-10">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <div className="inline-block px-4 sm:px-6 py-2 bg-green-100 rounded-full mb-4 sm:mb-6">
              <span className="font-pretendard text-green-600 text-xs sm:text-sm font-semibold">
                고객 만족도 98%
              </span>
            </div>
            <h2 className="font-pretendard text-health-gray text-[20px] sm:text-[28px] md:text-[36px] lg:text-[50px] font-bold leading-[130%] px-2">
              많은 분들이 간편하고
              <br />
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                건강 맞춤 식단
              </span>
              을 받고 있어요
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Review 1 */}
            <div className="group p-4 sm:p-6 md:p-8 lg:p-10 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-health-orange to-orange-400 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
                  <span className="text-sm sm:text-lg">🍽️</span>
                </div>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="font-pretendard text-health-gray text-base sm:text-lg lg:text-xl font-bold">
                    김**
                  </span>
                  <span className="font-pretendard text-health-gray text-base sm:text-lg lg:text-xl font-normal">
                    님
                  </span>
                </div>
                <div className="flex gap-0.5 sm:gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="font-pretendard text-health-gray/80 text-sm sm:text-base font-normal leading-[150%] relative">
                <span className="text-health-orange text-2xl sm:text-3xl lg:text-4xl font-bold absolute -top-1 sm:-top-2 -left-1 sm:-left-2">
                  "
                </span>
                예전에는 하루 세끼 뭘 먹어야 할지 늘 고민이었어요. 그런데 제
                식습관과 취향에 맞춰서 매일 식단을 추천해주니까, 지금은 그냥
                알려주는 대로 따라만 해도 되니까 너무 편해요. 식재료도 흔한
                것들이고, 요리법도 간단해서 바쁠 때도 부담이 없어요!
                <span className="text-health-orange text-2xl sm:text-3xl lg:text-4xl font-bold">
                  "
                </span>
              </p>
            </div>

            {/* Review 2 */}
            <div className="group p-4 sm:p-6 md:p-8 lg:p-10 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
                  <span className="text-sm sm:text-lg">🧘‍♀️</span>
                </div>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="font-pretendard text-health-gray text-base sm:text-lg lg:text-xl font-bold">
                    설**
                  </span>
                  <span className="font-pretendard text-health-gray text-base sm:text-lg lg:text-xl font-normal">
                    님
                  </span>
                </div>
                <div className="flex gap-0.5 sm:gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="font-pretendard text-health-gray/80 text-sm sm:text-base font-normal leading-[150%] relative">
                <span className="text-green-500 text-2xl sm:text-3xl lg:text-4xl font-bold absolute -top-1 sm:-top-2 -left-1 sm:-left-2">
                  "
                </span>
                이제는 건강 좀 챙겨야지 하면서도 늘 작심삼일이었는데, 처음으로
                루틴이 생겼어요. 제게 딱 맞는 식단이 도착하고, 따라 하기 쉬운
                요리법까지 알려주니까 자연스럽게 실천하게 되더라고요. 2주 정도
                지나니까 몸이 덜 붓고, 피부도 뭔가 정돈된 느낌이에요. 내 몸이
                변화하고 있다는 걸 확실히 느껴요
                <span className="text-green-500 text-2xl sm:text-3xl lg:text-4xl font-bold">
                  "
                </span>
              </p>
            </div>

            {/* Review 3 */}
            <div className="group p-4 sm:p-6 md:p-8 lg:p-10 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
                  <span className="text-sm sm:text-lg">🧑‍💻</span>
                </div>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="font-pretendard text-health-gray text-base sm:text-lg lg:text-xl font-bold">
                    김**
                  </span>
                  <span className="font-pretendard text-health-gray text-base sm:text-lg lg:text-xl font-normal">
                    님
                  </span>
                </div>
                <div className="flex gap-0.5 sm:gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="font-pretendard text-health-gray/80 text-sm sm:text-base font-normal leading-[150%] relative">
                <span className="text-blue-500 text-2xl sm:text-3xl lg:text-4xl font-bold absolute -top-1 sm:-top-2 -left-1 sm:-left-2">
                  "
                </span>
                저는 요리에는 자신도 없고, 건강식 하면 뭔가 복잡하고 맛없는
                음식이라는 이미지가 있었어요. 그런데 추천받은 레시피들은 재료도
                최소한이고, 만드는 데 15분도 안 걸리는데 정말 맛있더라고요. 매일
                새��운 아이디어가 떠오르는 느낌이라 재미도 있어요. 이젠 혼자
                사는 친구들한테도 추천하게 됐어요.
                <span className="text-blue-500 text-2xl sm:text-3xl lg:text-4xl font-bold">
                  "
                </span>
              </p>
            </div>

            {/* Review 4 */}
            <div className="group p-4 sm:p-6 md:p-8 lg:p-10 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
                  <span className="text-sm sm:text-lg">👵</span>
                </div>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="font-pretendard text-health-gray text-base sm:text-lg lg:text-xl font-bold">
                    이**
                  </span>
                  <span className="font-pretendard text-health-gray text-base sm:text-lg lg:text-xl font-normal">
                    님
                  </span>
                </div>
                <div className="flex gap-0.5 sm:gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="font-pretendard text-health-gray/80 text-sm sm:text-base font-normal leading-[150%] relative">
                <span className="text-purple-500 text-2xl sm:text-3xl lg:text-4xl font-bold absolute -top-1 sm:-top-2 -left-1 sm:-left-2">
                  "
                </span>
                요즘 부모님 건강이 예전 같지 않아서 늘 ��정이 많았거든요. 그런데
                나이와 생활 습관에 맞춘 식단을 제안해줘서 처음엔 '귀찮다'고
                하시던 엄마가 요즘은 '이거 덕분에 속도 편하고 혈압도 좀 내려간
                것 같다'고 하시더라고요. 매일 뭘 챙겨드리긴 어렵지만, 이런
                서비스가 있어서 정말 마음이 놓여요
                <span className="text-purple-500 text-2xl sm:text-3xl lg:text-4xl font-bold">
                  "
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-[120px] px-4 sm:px-6 md:px-8 lg:px-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="container mx-auto max-w-[1280px]">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <div className="inline-block px-4 sm:px-6 py-2 bg-blue-100 rounded-full mb-4 sm:mb-6">
              <span className="font-pretendard text-blue-600 text-xs sm:text-sm font-semibold">
                자주 묻는 질문
              </span>
            </div>
            <h2 className="font-pretendard text-health-gray text-[20px] sm:text-[28px] md:text-[36px] lg:text-[50px] font-bold leading-[130%] px-2">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                궁금한 것들
              </span>
              을 확인해보세요
            </h2>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl border border-white/20">
            <Accordion type="multiple" className="space-y-4 sm:space-y-6">
              <AccordionItem
                value="item-1"
                className="border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-health-orange/30 transition-all duration-300 hover:shadow-lg"
              >
                <AccordionTrigger className="font-pretendard text-health-gray text-base sm:text-lg md:text-xl font-bold leading-[140%] text-left hover:no-underline hover:text-health-orange transition-colors duration-300">
                  Q. 어떤 건강 정보를 입력해야 하나요?
                </AccordionTrigger>
                <AccordionContent className="font-pretendard text-health-gray/80 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-[140%] pt-4 sm:pt-6 border-t border-gray-100 mt-3 sm:mt-4">
                  A. 기본적으로 알레���기 정보, 건강 목표(다이어트, 근육 증가,
                  균형 잡힌 식단 등), 선호하는 음식 등을 입력하면 됩니다.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
              >
                <AccordionTrigger className="font-pretendard text-health-gray text-base sm:text-lg md:text-xl font-bold leading-[140%] text-left hover:no-underline hover:text-blue-500 transition-colors duration-300">
                  Q. 레시피 추천은 얼마나 자주 받을 수 있나요?
                </AccordionTrigger>
                <AccordionContent className="font-pretendard text-health-gray/80 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-[140%] pt-4 sm:pt-6 border-t border-gray-100 mt-3 sm:mt-4">
                  A. 원하는 빈도를 설정할 수 있으며, 매일 또는 주 3~4회 등
                  선택이 가능합니다.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-green-300 transition-all duration-300 hover:shadow-lg"
              >
                <AccordionTrigger className="font-pretendard text-health-gray text-base sm:text-lg md:text-xl font-bold leading-[140%] text-left hover:no-underline hover:text-green-500 transition-colors duration-300">
                  Q. 제공되는 레시피는 모두 건강한 음식인가요?
                </AccordionTrigger>
                <AccordionContent className="font-pretendard text-health-gray/80 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-[140%] pt-4 sm:pt-6 border-t border-gray-100 mt-3 sm:mt-4">
                  A. 네! 사용자의 건강 상태에 맞춘 균형 잡힌 식단을 제공합니다.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-purple-300 transition-all duration-300 hover:shadow-lg"
              >
                <AccordionTrigger className="font-pretendard text-health-gray text-base sm:text-lg md:text-xl font-bold leading-[140%] text-left hover:no-underline hover:text-purple-500 transition-colors duration-300">
                  Q. 비건/채식 식단도 지원하나요?
                </AccordionTrigger>
                <AccordionContent className="font-pretendard text-health-gray/80 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-[140%] pt-4 sm:pt-6 border-t border-gray-100 mt-3 sm:mt-4">
                  A. 네! 사용자의 건강 상태에 맞춘 균형 잡힌 식단을 제공합니다.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section
        className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[660px] bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/14d40dfab2b73591a102ae20ab90989930334150?width=3840')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-health-orange/60 via-orange-400/40 to-transparent"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-20 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-white/20 shadow-2xl">
              <h2 className="font-pretendard text-white text-[20px] sm:text-[28px] md:text-[36px] lg:text-[50px] font-bold leading-[130%] mb-6 sm:mb-8 md:mb-10 drop-shadow-lg">
                지금 시작해도 늦지 않았어요
                <br />
                <span className="text-yellow-300">건강하고 즐겁게</span>{" "}
                살기위한 첫 단계
              </h2>
              <Button
                onClick={() => navigate("/survey")}
                className="group bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-health-orange font-poppins font-semibold px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base rounded-[88px] h-auto transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  내 건강식단 찾아보기
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 transform transition-transform group-hover:translate-x-1"
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
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
