import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative w-full h-[500px] md:h-[660px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/2d102990e86d9c5bf4b979ceedc594e1baeb0013?width=3840')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-20 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="font-pretendard text-white text-[28px] md:text-[40px] lg:text-[50px] font-bold leading-[130%] mb-6">
              간단 데이터를 나에게 딱 맞는
              <br />
              건강한 한 끼를 추천해요
            </h1>
            <Button className="bg-health-orange hover:bg-health-orange/90 text-black font-poppins font-semibold px-6 md:px-10 py-4 md:py-5 text-sm md:text-base rounded-[88px] h-auto">
              건강 식단 추천받기
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 lg:py-[120px] px-4 md:px-8 lg:px-20">
        <div className="container mx-auto max-w-[1280px]">
          <div className="mb-12 md:mb-16">
            <h2 className="font-pretendard text-health-gray text-[28px] md:text-[40px] lg:text-[50px] font-bold leading-[130%]">
              나의 건강상태를 분석해서
              <br />
              개인 맞춤형 식단을 제공해요
            </h2>
          </div>

          <div className="space-y-12 md:space-y-16">
            {/* Feature 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-[70px]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b18a4fcc02f9e0d73ef6046672e562c074d02a9e?width=1140"
                alt="건강검진 데이터 입력"
                className="w-full lg:w-[570px] h-[250px] md:h-[300px] lg:h-[390px] object-cover rounded-lg"
              />
              <div className="flex-1 text-center lg:text-left">
                <h3 className="font-pretendard text-health-gray text-[24px] md:text-[32px] lg:text-[40px] font-bold leading-[140%] mb-4">
                  건강검진 데이터 입력
                </h3>
                <p className="font-pretendard text-health-gray text-lg md:text-xl font-normal leading-[140%]">
                  간단히 결과를 업로드 하거나 주요 정보를 입력합니다
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-[70px]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/354f7dbcfc61f98bb717eef174e7c00e7e1bc16e?width=1140"
                alt="개인 건강 상태 분석"
                className="w-full lg:w-[570px] h-[250px] md:h-[300px] lg:h-[390px] object-cover rounded-lg"
              />
              <div className="flex-1 text-center lg:text-left">
                <h3 className="font-pretendard text-health-gray text-[24px] md:text-[32px] lg:text-[40px] font-bold leading-[140%] mb-4">
                  개인 건강 상태 분석
                </h3>
                <p className="font-pretendard text-health-gray text-lg md:text-xl font-normal leading-[140%]">
                  AI가 혈압, 혈당, 등 주요 데이터를 이해하여 현재 개인의
                  건강상태를 자세히 분석하여 보여줍니다
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-[70px]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d2ce213cff8303c1967cc3f05fd664732005ae3?width=1140"
                alt="맞춤형 음식 추천"
                className="w-full lg:w-[570px] h-[250px] md:h-[300px] lg:h-[390px] object-cover rounded-lg"
              />
              <div className="flex-1 text-center lg:text-left">
                <h3 className="font-pretendard text-health-gray text-[24px] md:text-[32px] lg:text-[40px] font-bold leading-[140%] mb-4">
                  맞춤형 음식 추천
                </h3>
                <p className="font-pretendard text-health-gray text-lg md:text-xl font-normal leading-[140%]">
                  내 건강 상태에 적합한 음식은 무엇이 있고,
                  <br className="hidden lg:block" />
                  나만의 맞춤형 건강 식단 레시피는 어떤것이 있는 추천합니다.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-[70px]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/572b6b00b44d2e666b50f92ef35781608c132207?width=1140"
                alt="신선한 식재료 배송"
                className="w-full lg:w-[570px] h-[250px] md:h-[300px] lg:h-[390px] object-cover rounded-lg"
              />
              <div className="flex-1 text-center lg:text-left">
                <h3 className="font-pretendard text-health-gray text-[24px] md:text-[32px] lg:text-[40px] font-bold leading-[140%] mb-4">
                  신선한 식재료 배송
                </h3>
                <p className="font-pretendard text-health-gray text-lg md:text-xl font-normal leading-[140%]">
                  내 건강 상태에 적합한 음식은 무엇이 있고,
                  <br className="hidden lg:block" />
                  나만의 맞춤형 건강 식단 레시피는 어떤것이 있는 추천합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 lg:py-[120px] px-4 md:px-8 lg:px-20 bg-white">
        <div className="container mx-auto max-w-[1280px]">
          <div className="mb-12 md:mb-16">
            <h2 className="font-pretendard text-health-gray text-[28px] md:text-[40px] lg:text-[50px] font-bold leading-[130%]">
              많은 분들이 간편하고
              <br />
              건강 맞춤 식단을 받고 있어요
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Review 1 */}
            <div className="p-10 border border-health-gray-light rounded-[20px]">
              <div className="flex items-center gap-4 mb-7">
                <div className="w-10 h-10 bg-health-orange-light rounded-full flex items-center justify-center">
                  🍽️
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-pretendard text-health-gray text-xl font-bold">
                    김**
                  </span>
                  <span className="font-pretendard text-health-gray text-xl font-normal">
                    님
                  </span>
                </div>
              </div>
              <p className="font-pretendard text-health-gray text-base font-normal leading-[150%]">
                예전에는 하루 세끼 뭘 먹어야 할지 늘 고민이었어요. 그런데 제
                식습관과 취향에 맞춰서 매일 식단을 추천해주니까, 지금은 그냥
                알려주는 대로 따라만 해도 되니까 너무 편해요. 식재료도 흔한
                것들이고, 요리법도 간���해서 바쁠 때도 부담이 없어요!
              </p>
            </div>

            {/* Review 2 */}
            <div className="p-10 border border-health-gray-light rounded-[20px]">
              <div className="flex items-center gap-4 mb-7">
                <div className="w-10 h-10 bg-health-orange-light rounded-full flex items-center justify-center">
                  🧘‍♀️
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-pretendard text-health-gray text-xl font-bold">
                    설**
                  </span>
                  <span className="font-pretendard text-health-gray text-xl font-normal">
                    님
                  </span>
                </div>
              </div>
              <p className="font-pretendard text-health-gray text-base font-normal leading-[150%]">
                이제는 건강 좀 챙겨야지 하면서도 늘 작심삼일이었는데, 처음으로
                루틴이 생겼어요. 제게 딱 맞는 식단이 도착하고, 따라 하기 쉬운
                요리법까지 알려주니까 자연스럽게 실천하게 되더라고요. 2주 정도
                지나니까 몸이 덜 붓고, 피부도 뭔가 정돈된 느낌이에��. 내 몸이
                변화하고 있다는 걸 확실히 느껴요
              </p>
            </div>

            {/* Review 3 */}
            <div className="p-10 border border-health-gray-light rounded-[20px]">
              <div className="flex items-center gap-4 mb-7">
                <div className="w-10 h-10 bg-health-orange-light rounded-full flex items-center justify-center">
                  🧑‍💻
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-pretendard text-health-gray text-xl font-bold">
                    김**
                  </span>
                  <span className="font-pretendard text-health-gray text-xl font-normal">
                    님
                  </span>
                </div>
              </div>
              <p className="font-pretendard text-health-gray text-base font-normal leading-[150%]">
                저는 요리에는 자신도 없고, 건강식 하면 뭔가 복잡하고 맛없는
                음식이라는 이미지가 있었어요. 그런데 추천받은 레시피들은 재료도
                최소한이고, 만드는 데 15분도 안 걸리는데 정말 맛있더라고요. 매일
                새로운 아이디어가 떠오르는 ���낌이라 재미도 있어요. 이젠 혼자
                사는 친구들한테도 추천하게 됐어요.
              </p>
            </div>

            {/* Review 4 */}
            <div className="p-10 border border-health-gray-light rounded-[20px]">
              <div className="flex items-center gap-4 mb-7">
                <div className="w-10 h-10 bg-health-orange-light rounded-full flex items-center justify-center">
                  👵
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-pretendard text-health-gray text-xl font-bold">
                    이**
                  </span>
                  <span className="font-pretendard text-health-gray text-xl font-normal">
                    님
                  </span>
                </div>
              </div>
              <p className="font-pretendard text-health-gray text-base font-normal leading-[150%]">
                요즘 부모님 건강이 예전 같지 않아서 늘 걱정이 많았거든요. 그런데
                나이와 생활 습관에 맞춘 식단을 제안해줘서 처음엔 '귀찮다'고
                하시던 엄마가 요즘은 '이거 덕분에 속도 편하고 혈압도 좀 내려간
                것 같다'고 하시더라고요. 매일 뭘 챙겨드리긴 어렵지만, 이런
                서비스가 있어서 정말 마음이 놓여요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 lg:py-[120px] px-4 md:px-8 lg:px-20">
        <div className="container mx-auto max-w-[1280px]">
          <div className="mb-12 md:mb-16">
            <h2 className="font-pretendard text-health-gray text-[28px] md:text-[40px] lg:text-[50px] font-bold leading-[130%]">
              자주 묻는 질문
            </h2>
          </div>

          <Accordion type="multiple" className="space-y-8">
            <AccordionItem
              value="item-1"
              className="border-b border-health-gray-light pb-8"
            >
              <AccordionTrigger className="font-pretendard text-health-gray text-lg md:text-xl font-bold leading-[140%] text-left hover:no-underline">
                Q. 어떤 건강 정보를 입력해야 하나요?
              </AccordionTrigger>
              <AccordionContent className="font-pretendard text-health-gray text-lg md:text-xl font-normal leading-[140%] pt-7">
                A. 기본적으로 알레르기 정보, 건강 목표(다이어트, 근육 증가, 균형
                잡힌 식단 등), 선호하는 음식 등을 입력하면 됩니다.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border-b border-health-gray-light pb-8"
            >
              <AccordionTrigger className="font-pretendard text-health-gray text-lg md:text-xl font-bold leading-[140%] text-left hover:no-underline">
                Q. 레시피 추천은 얼마나 자주 받을 수 있나요?
              </AccordionTrigger>
              <AccordionContent className="font-pretendard text-health-gray text-lg md:text-xl font-normal leading-[140%] pt-7">
                A. 원하는 빈도를 설정할 수 있으며, 매일 또는 주 3~4회 등 선택이
                가능합니다.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border-b border-health-gray-light pb-8"
            >
              <AccordionTrigger className="font-pretendard text-health-gray text-lg md:text-xl font-bold leading-[140%] text-left hover:no-underline">
                Q. 제공되는 레시피는 모두 건강한 음식인가요?
              </AccordionTrigger>
              <AccordionContent className="font-pretendard text-health-gray text-lg md:text-xl font-normal leading-[140%] pt-7">
                A. 네! 사용자의 건강 상태에 맞춘 균형 잡힌 식단을 제공합니다.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border-b border-health-gray-light pb-8"
            >
              <AccordionTrigger className="font-pretendard text-health-gray text-lg md:text-xl font-bold leading-[140%] text-left hover:no-underline">
                Q. 비건/채식 식단도 지원하나요?
              </AccordionTrigger>
              <AccordionContent className="font-pretendard text-health-gray text-lg md:text-xl font-normal leading-[140%] pt-7">
                A. 네! 사용자의 건강 상태에 맞춘 균형 잡힌 식단을 제공합니다.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section
        className="relative w-full h-[500px] md:h-[660px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/14d40dfab2b73591a102ae20ab90989930334150?width=3840')`,
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-20 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h2 className="font-pretendard text-health-orange text-[28px] md:text-[40px] lg:text-[50px] font-bold leading-[130%] mb-8 md:mb-10">
              지금 시작해도 늦지 않았어요
              <br />
              건강하고 즐겁게 살기위한 첫 단계
            </h2>
            <Button className="bg-health-orange hover:bg-health-orange/90 text-black font-poppins font-semibold px-6 md:px-10 py-4 md:py-5 text-sm md:text-base rounded-[88px] h-auto">
              내 건강식단 찾아보기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
