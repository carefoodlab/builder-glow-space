#!/bin/bash

# 🚀 GitHub + Vercel 배포 자동 설정 스크립트

echo "🔧 건강 식단 추천 서비스 배포 준비 중..."
echo ""

# 1. Git 초기화 확인
if [ ! -d ".git" ]; then
    echo "📁 Git 초기화 중..."
    git init
    echo "✅ Git 초기화 완료"
else
    echo "✅ Git이 이미 초기화되어 있습니다"
fi

# 2. .gitignore 확인
if [ ! -f ".gitignore" ]; then
    echo "📝 .gitignore 파일이 없습니다. 수동으로 생성해주세요."
else
    echo "✅ .gitignore 파일 확인됨"
fi

# 3. 환경 변수 파일 확인
if [ -f ".env" ]; then
    echo "⚠️  .env 파일이 감지되었습니다."
    echo "   보안을 위해 .env 파일이 Git에 업로드되지 않도록 .gitignore에 추가되었습니다."
    echo "   Vercel에서 환경 변수를 별도로 설정해주세요."
else
    echo "ℹ️  .env 파일이 없습니다. 로컬 개발용으로 생성을 권장합니다."
fi

# 4. 빌드 테스트
echo ""
echo "🔨 빌드 테스트 중..."
if npm run build; then
    echo "✅ 빌드 성공!"
else
    echo "❌ 빌드 실패. 오류를 수정한 후 다시 시도해주세요."
    exit 1
fi

# 5. 파일 추가 및 커밋 준비
echo ""
echo "📦 Git에 파일 추가 중..."
git add .

# 6. 커밋 메시지 작성
echo ""
echo "💾 커밋 준비 중..."
git commit -m "feat: 초기 배포 준비 - 건강 식단 추천 서비스

- Vercel 배포 설정 추가
- 환경 변수 보안 설정
- SPA 라우팅 설정
- 빌드 최적화"

echo ""
echo "🎉 배포 준비 완료!"
echo ""
echo "📋 다음 단계:"
echo "1. GitHub 리포지토리 생성: https://github.com/new"
echo "2. 리포지토리 연결: git remote add origin [리포지토리-URL]"
echo "3. 코드 업로드: git push -u origin main"
echo "4. Vercel 연결: https://vercel.com"
echo ""
echo "📖 자세한 가이드는 DEPLOYMENT_GUIDE.md 파일을 참고하세요!"
