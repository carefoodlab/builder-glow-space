# 구글시트 연동 설정 가이드

설문조사 결과를 구글시트에 자동으로 저장하기 위한 설정 방법입니다.

## 1단계: 구글시트 생성

1. [구글시트](https://sheets.google.com)에서 새 스프레드시트를 생성합니다.
2. 첫 번째 행에 다음 헤더를 입력합니다:

```
제출시�� | 이름 | 나이 | 성별 | 키(cm) | 몸무게(kg) | 활동량 | 건강목표 | 알레르기 | 선호음식 | 피할음식 | 식사횟수 | 예산 | 요리시간 | 이메일
```

## 2단계: Google Apps Script 생성

1. 구글시트에서 `확장 프로그램` > `Apps Script`를 클릭합니다.
2. 기본 코드를 삭제하고 아래 코드를 붙여넣습니다:

```javascript
function doPost(e) {
  try {
    // 스프레드시트 ID를 여기에 입력하세요
    const SHEET_ID = "YOUR_GOOGLE_SHEET_ID"; // 실제 시트 ID로 변경
    const SHEET_NAME = "Sheet1"; // 시트 이름 (필요시 변경)

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);

    // 데이터를 행에 추가
    const row = [
      data.timestamp,
      data.name,
      data.age,
      data.gender,
      data.height,
      data.weight,
      data.activityLevel,
      data.healthGoal,
      data.allergies,
      data.preferredFoods,
      data.avoidFoods,
      data.mealFrequency,
      data.budget,
      data.cookingTime,
      data.email,
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput("SUCCESS").setMimeType(
      ContentService.MimeType.TEXT,
    );
  } catch (error) {
    console.error("Error:", error);
    return ContentService.createTextOutput(
      "ERROR: " + error.toString(),
    ).setMimeType(ContentService.MimeType.TEXT);
  }
}
```

3. `YOUR_GOOGLE_SHEET_ID`를 실제 구글시트 ID로 변경합니다.
   - 구글시트 URL에서 `/d/` 뒤와 `/edit` 앞의 긴 문자열이 시트 ID입니다.
   - 예: `https://docs.google.com/spreadsheets/d/1ABC123.../edit` → `1ABC123...`

## 3단계: Apps Script 배포

1. 우상단의 `배포` 버튼을 클릭합니다.
2. `새 배포`를 선택합니다.
3. 유형에서 `웹 앱`을 선택합니다.
4. 설정:
   - 설명: "설문조사 데이터 수집"
   - 다음 권한으로 실행: 나
   - 액세스 권한: 모든 사용자
5. `배포` 버튼을 클릭합니다.
6. 권한 승인을 완료합니다.
7. **웹앱 URL을 복사**합니다. (이것이 중요합니다!)

## 4단계: 환경변수 설정

복사한 웹앱 URL을 환경변수로 설정합니다:

```bash
# .env 파일에 추가 (로컬 개발용)
GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# 또는 배포 환경에서 환경변수로 설정
```

## 5단계: 테스트

1. 웹사이트에서 설문조사를 제출해봅니다.
2. 구글시트에 데이터가 자동으로 추가되는지 확인합니다.

## 문�� 해결

### 데이터가 저장되지 않는 경우:

1. **Apps Script 로그 확인**:

   - Apps Script 편집기에서 `실행` > `로그 보기`

2. **권한 확인**:

   - 웹앱 배포 시 "모든 사용자" 액세스 권한으로 설정했는지 확인

3. **환경변수 확인**:

   - `GOOGLE_SHEET_URL`이 올바르게 설정되었는지 확인

4. **시트 ID 확인**:
   - Apps Script의 `SHEET_ID`가 올바른지 확인

### 보안 고려사항:

1. 구글시트에는 민감한 개인정보가 저장되므로 적절한 권한 관리가 필요합니다.
2. 필요시 구글시트 공유 설정을 제한하세요.
3. 정기적으로 데이터를 백업하세요.

## 추가 기능 구현 아이디어:

1. **자동 이메일 발송**: Apps Script에서 Gmail API를 사용하여 고객에게 자동 확인 이메일 발송
2. **데이터 분석**: 구글시트의 차트 기능으로 설문 결과 분석
3. **알림 설정**: 새 설문이 제출될 때마다 관리자에게 알림 발송

이제 설문조사 시스템이 완성되었습니다! 🎉
