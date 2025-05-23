// 이 함수는 Vercel 서버리스 함수로 배포됩니다.
// 클라이언트는 /api/callGoogleAPI 엔드포인트로 이 함수를 호출합니다.

export default async function handler(req, res) {
    // 1. Vercel 환경 변수에서 API 키 가져오기
    const apiKey = process.env.MY_GOOGLE_API_KEY; // Vercel에 MY_GOOGLE_API_KEY로 저장했다고 가정

    if (!apiKey) {
        return res.status(500).json({ error: "API 키가 설정되지 않았습니다." });
    }

    // 2. 클라이언트로부터 요청 본문(payload) 받기
    //    클라이언트가 POST 요청으로 필요한 데이터를 보냈다고 가정
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const clientPayload = req.body; // 예: { contents: [...], generationConfig: {...} }

    // 3. Google Generative AI API 엔드포인트 URL
    const MODEL_NAME = 'gemini-2.5-flash-preview-04-17'; // 사용하는 모델명
    const GOOGLE_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

    try {
        // 4. Google API로 요청 보내기
        const googleApiResponse = await fetch(GOOGLE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientPayload), // 클라이언트에서 받은 payload 그대로 전달
        });

        const responseData = await googleApiResponse.json();

        if (!googleApiResponse.ok) {
            // Google API에서 에러 응답을 받은 경우
            console.error("Google API Error:", responseData);
            return res.status(googleApiResponse.status).json({ 
                error: "Google API 요청 실패", 
                details: responseData 
            });
        }

        // 5. Google API 응답을 클라이언트에 전달
        return res.status(200).json(responseData);

    } catch (error) {
        console.error("서버리스 함수 내부 오류:", error);
        return res.status(500).json({ error: "서버 내부 오류 발생" });
    }
}