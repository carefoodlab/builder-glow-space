import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getConnectionStatus, supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

export default function SupabaseStatus() {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const connectionStatus = getConnectionStatus();
  const navigate = useNavigate();

  const testConnection = async () => {
    setTesting(true);
    setTestResult(null);

    try {
      if (!supabase) {
        setTestResult("❌ Supabase 클라이언트가 초기화되지 않았습니다.");
        return;
      }

      // 간단한 연결 테스트
      const { data, error } = await supabase
        .from("survey_responses")
        .select("count")
        .limit(1);

      if (error) {
        setTestResult(`❌ 연결 오류: ${error.message}`);
      } else {
        setTestResult("✅ Supabase 연결 성공!");
      }
    } catch (error: any) {
      setTestResult(`❌ 테스트 오류: ${error.message}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Supabase 설정 상태
            </h1>
            <Button
              onClick={() => navigate("/")}
              className="bg-gray-500 hover:bg-gray-600"
            >
              홈으로
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* 현재 상태 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">현재 연결 상태</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    connectionStatus.hasUrl ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span>Supabase URL</span>
                <span className="text-sm text-gray-500">
                  {connectionStatus.hasUrl ? "설정됨" : "미설정"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    connectionStatus.hasKey ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span>Supabase Key</span>
                <span className="text-sm text-gray-500">
                  {connectionStatus.hasKey ? "설정됨" : "미설정"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    connectionStatus.isConfigured
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                ></div>
                <span>전체 설정</span>
                <span className="text-sm text-gray-500">
                  {connectionStatus.isConfigured
                    ? "완료"
                    : connectionStatus.usingFallback
                      ? "로컬 모드"
                      : "미완료"}
                </span>
              </div>
            </div>

            {connectionStatus.isConfigured && (
              <div className="mt-4">
                <Button
                  onClick={testConnection}
                  disabled={testing}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {testing ? "연결 테스트 중..." : "연결 테스트"}
                </Button>
                {testResult && (
                  <div className="mt-2 p-3 bg-gray-100 rounded text-sm">
                    {testResult}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 설정 가이드 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">설정 가이드</h2>

            {!connectionStatus.isConfigured && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 font-semibold mb-2">
                  ⚠️ Supabase가 설정되지 않았습니다
                </p>
                <p className="text-yellow-700 text-sm">
                  현재 로컬 스토리지를 사용하여 데이터를 임시 저장하고 있습니다.
                  실제 운영을 위해서는 Supabase 설정이 필요합니다.
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg">
                  1. Supabase 프로젝트 생성
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  <a
                    href="https://supabase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    supabase.com
                  </a>
                  에서 새 프로젝트를 생성하세요.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-lg">2. 환경 변수 설정</h3>
                <p className="text-gray-600 text-sm mt-1">
                  프로젝트 루트의{" "}
                  <code className="bg-gray-100 px-1 rounded">.env</code> 파일을
                  수정하세요:
                </p>
                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto">
                  {`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key`}
                </pre>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-lg">3. 데이터베이스 설정</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Supabase SQL Editor에서{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    supabase_setup.sql
                  </code>{" "}
                  파일의 내용을 실행하세요.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-lg">4. 개발 서버 재시작</h3>
                <p className="text-gray-600 text-sm mt-1">
                  환경 변수 변경 후 개발 서버를 재시작해주세요:
                </p>
                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs">
                  npm run dev
                </pre>
              </div>
            </div>
          </div>

          {/* 빠른 액션 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">빠른 액션</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => navigate("/survey")}
                className="bg-green-500 hover:bg-green-600"
              >
                📝 설문조사 테스트
              </Button>
              <Button
                onClick={() => navigate("/admin/surveys")}
                className="bg-blue-500 hover:bg-blue-600"
              >
                📊 관리자 대시보드
              </Button>
              <Button
                onClick={() => window.open("https://supabase.com", "_blank")}
                className="bg-purple-500 hover:bg-purple-600"
              >
                🚀 Supabase 가기
              </Button>
            </div>
          </div>

          {/* 환경 정보 (디버깅용) */}
          <details className="bg-white rounded-lg shadow">
            <summary className="p-4 cursor-pointer font-semibold">
              🔍 디버그 정보 (개발자용)
            </summary>
            <div className="p-4 border-t bg-gray-50">
              <pre className="text-xs overflow-x-auto">
                {JSON.stringify(
                  {
                    env: {
                      VITE_SUPABASE_URL:
                        import.meta.env.VITE_SUPABASE_URL || "미설정",
                      VITE_SUPABASE_ANON_KEY: import.meta.env
                        .VITE_SUPABASE_ANON_KEY
                        ? "설정됨 (***)"
                        : "미설정",
                    },
                    connectionStatus,
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
          </details>
        </div>
      </main>
    </div>
  );
}
