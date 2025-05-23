document.addEventListener('DOMContentLoaded', async () => {
    console.log("[ 초기화 ] DOMContentLoaded 이벤트 발생");

    // --- 타로 주제 이름표 (상수) ---
    const TAROT_TYPES = {
        TODAY_FORTUNE: "오늘의 운세는?",
        CURRENT_ENERGY: "현재 나의 기운은?",
        MONEY_FLOW: "돈의 기운이 느껴지나?",
        LOVE_LUCK: "두근두근 연애운",
        STUDY_ACADEMIC: "공부, 학업운",
        WORK_CAREER: "연봉 오르려나? 직장운",
        SOMEONES_HEALTH: "소중한 누군가의 건강운"
    };
    console.log("[ 초기화 ] 타로 주제 이름표 (TAROT_TYPES) 정의 완료");

    const RANDOM_CARD_FEELINGS = [
        "빛이 나 보여!", "느낌이 좋아.", "운명의 카드?", "따뜻한 기분",
        "차가운 느낌", "차분한 카드", "뜨거운 느낌", "시원한 느낌?",
        "사랑스러운..", "깊은 어둠..", "심연의 느낌", "그리운 느낌",
        "즐거운 느낌", "화려한 느낌", "빛나는걸?", "뜨거운걸?",
        "가장 멋져", "환상적..", "반가운 느낌", "새로운 기분",
        "새로운 느낌", "흐릿한 느낌", "더러운 카드",
        "지저분한 카드", "찢어진 카드"
    ];

    // --- 성운 및 싱크타입 데이터 ---
    const CONSTELLATIONS_DATA = {
        "루미네시아": { description: "🐟 깊은 감정의 바다에서 내면의 빛을 밝히는 싱크타입들이 모여있는 곳이지.", syncTypes: ["젠틀빔", "버블퍼프", "스텔라 터틀", "문 스눗", "스페이스 퍼프", "폴라로이드", "스타 가피", "기억안나"] },
        "이그니티오": { description: "🔥 타오르는 불꽃처럼 열정과 도전으로 가득 찬 싱크타입들이 모인 곳이야.", syncTypes: ["스타대셔", "코멧 캐이나인", "파이어 스프라우트", "스타훗", "펄사", "스월스", "젤로마이트", "기억안나"] },
        "카스텔라리스": { description: "🛡️ 강철 심장으로 원칙과 신념을 지키는 수호자 싱크타입들이 모인 곳이지.", syncTypes: ["가디언 로보베어", "스타하이브", "아머드 슬러그", "아이봇", "엘더스퀴드", "스테드패스트 로보베어", "플래로우", "기억안나"] },
        "크로니카": { description: "📜 시간의 지혜를 기록하고 성찰하는 싱크타입들이 모여있는 곳이야.", syncTypes: ["코스믹아이", "갤럭시캣", "스파이럴 셸러", "오르비터", "그래비톤", "스누터", "펄스피쉬", "기억안나"] },
        "코넥서스": { description: "🤝 관계의 연결고리가 되어 긍정 에너지로 세상을 밝히는 싱크타입들이 모인 곳이지.", syncTypes: ["아쿠아 독", "인터스텔라 캣", "스페이스 워크", "링비", "크리터넛", "루미스퀴드", "인터로퍼", "기억안나"] },
        "에오루스": { description: "💨 자유로운 바람처럼 변화와 모험을 즐기는 싱크타입들이 모여있는 곳이야.", syncTypes: ["코스믹 웜프", "아스트랄 버니", "플로터", "네뷸라 폭스", "스페이스 버드", "록키", "아우라밥", "기억안나"] },
        "인퀴지토": { description: "🔍 논리와 이성으로 진실을 파헤치는 탐구자 싱크타입들이 모인 곳이지.", syncTypes: ["아주르 코멧펍", "유풋", "오르비니어", "세팔론", "글로브로", "소나팟", "셀레스티레이", "기억안나"] },
        "움브라리스": { description: "🖤 심연의 그림자 속에서 재탄생하는 변혁가 싱크타입들이 모여있는 곳이야.", syncTypes: ["몰테나이트", "스푹코이드", "크레이터비스트", "인터스텔라 뱃", "톡실룸", "베노텅", "문죠", "기억안나"] },
        "에퀼리브리아": { description: "⚖️ 조화와 균형을 추구하며 평화를 지키는 싱크타입들이 모인 곳이지.", syncTypes: ["오르빗 이터", "코스미릴로", "플래니토이드", "스페이스 와플", "스페이스 스노우플레이크", "베누블럽", "라이트로덴트", "기억안나"] },
        "크레아티오": { description: "🎨 무한한 상상력으로 새로운 세계를 창조하는 싱크타입들이 모여있는 곳이야.", syncTypes: ["핑크 인베이더", "스페이스 젤리즈", "마이셀리안", "스파인더", "스타리 스키터", "젤리넛", "볼텍스 엘리멘탈", "기억안나"] },
        "실바니스": { description: "🌳 자연 속에서 고요한 성찰을 통해 평화를 찾는 싱크타입들이 모인 곳이지.", syncTypes: ["애스트로마이트", "더스티", "스페이스 슬러그", "스포어 블룸", "애스트로슈룸", "문 크리터", "젬크랩", "기억안나"] },
        "알비온 프라이머": { description: "✨ 순수한 호기심으로 새로운 시작을 맞이하는 싱크타입들이 모여있는 곳이야.", syncTypes: ["스페이스랫", "영 에일리언", "플록시", "코스몬", "루나링", "스타스프라이트", "스페이스 마이츠", "기억안나"] }
    };
    const ALL_CONSTELLATION_NAMES = Object.keys(CONSTELLATIONS_DATA);
    console.log("[ 초기화 ] 성운 및 싱크타입 데이터 (CONSTELLATIONS_DATA) 정의 완료");

    // --- 전체 타로 카드 ID 목록 (78장) ---
    const ALL_TAROT_CARD_IDS = [
        "major_00_fool_upright", "major_01_magician_upright", "major_02_high_priestess_upright", "major_03_empress_upright", "major_04_emperor_upright", "major_05_hierophant_upright", "major_06_lovers_upright", "major_07_chariot_upright", "major_08_justice_upright", "major_09_hermit_upright", "major_10_wheel_upright", "major_11_strength_upright", "major_12_hanged_man_upright", "major_13_death_upright", "major_14_temperance_upright", "major_15_devil_upright", "major_16_tower_upright", "major_17_star_upright", "major_18_moon_upright", "major_19_sun_upright", "major_20_judgement_upright", "major_21_world_upright",
        "wands_01_ace_upright", "wands_02_two_upright", "wands_03_three_upright", "wands_04_four_upright", "wands_05_five_upright", "wands_06_six_upright", "wands_07_seven_upright", "wands_08_eight_upright", "wands_09_nine_upright", "wands_10_ten_upright", "wands_11_page_upright", "wands_12_knight_upright", "wands_13_queen_upright", "wands_14_king_upright",
        "cups_01_ace_upright", "cups_02_two_upright", "cups_03_three_upright", "cups_04_four_upright", "cups_05_five_upright", "cups_06_six_upright", "cups_07_seven_upright", "cups_08_eight_upright", "cups_09_nine_upright", "cups_10_ten_upright", "cups_11_page_upright", "cups_12_knight_upright", "cups_13_queen_upright", "cups_14_king_upright",
        "swords_01_ace_upright", "swords_02_two_upright", "swords_03_three_upright", "swords_04_four_upright", "swords_05_five_upright", "swords_06_six_upright", "swords_07_seven_upright", "swords_08_eight_upright", "swords_09_nine_upright", "swords_10_ten_upright", "swords_11_page_upright", "swords_12_knight_upright", "swords_13_queen_upright", "swords_14_king_upright",
        "pentacles_01_ace_upright", "pentacles_02_two_upright", "pentacles_03_three_upright", "pentacles_04_four_upright", "pentacles_05_five_upright", "pentacles_06_six_upright", "pentacles_07_seven_upright", "pentacles_08_eight_upright", "pentacles_09_nine_upright", "pentacles_10_ten_upright", "pentacles_11_page_upright", "pentacles_12_knight_upright", "pentacles_13_queen_upright", "pentacles_14_king_upright",
        "major_00_fool_reversed", "major_01_magician_reversed", "major_02_high_priestess_reversed", "major_03_empress_reversed", "major_04_emperor_reversed", "major_05_hierophant_reversed", "major_06_lovers_reversed", "major_07_chariot_reversed", "major_08_justice_reversed", "major_09_hermit_reversed", "major_10_wheel_reversed", "major_11_strength_reversed", "major_12_hanged_man_reversed", "major_13_death_reversed", "major_14_temperance_reversed", "major_15_devil_reversed", "major_16_tower_reversed", "major_17_star_reversed", "major_18_moon_reversed", "major_19_sun_reversed", "major_20_judgement_reversed", "major_21_world_reversed",
        "wands_01_ace_reversed", "wands_02_two_reversed", "wands_03_three_reversed", "wands_04_four_reversed", "wands_05_five_reversed", "wands_06_six_reversed", "wands_07_seven_reversed", "wands_08_eight_reversed", "wands_09_nine_reversed", "wands_10_ten_reversed", "wands_11_page_reversed", "wands_12_knight_reversed", "wands_13_queen_reversed", "wands_14_king_reversed",
        "cups_01_ace_reversed", "cups_02_two_reversed", "cups_03_three_reversed", "cups_04_four_reversed", "cups_05_five_reversed", "cups_06_six_reversed", "cups_07_seven_reversed", "cups_08_eight_reversed", "cups_09_nine_reversed", "cups_10_ten_reversed", "cups_11_page_reversed", "cups_12_knight_reversed", "cups_13_queen_reversed", "cups_14_king_reversed",
        "swords_01_ace_reversed", "swords_02_two_reversed", "swords_03_three_reversed", "swords_04_four_reversed", "swords_05_five_reversed", "swords_06_six_reversed", "swords_07_seven_reversed", "swords_08_eight_reversed", "swords_09_nine_reversed", "swords_10_ten_reversed", "swords_11_page_reversed", "swords_12_knight_reversed", "swords_13_queen_reversed", "swords_14_king_reversed",
        "pentacles_01_ace_reversed", "pentacles_02_two_reversed", "pentacles_03_three_reversed", "pentacles_04_four_reversed", "pentacles_05_five_reversed", "pentacles_06_six_reversed", "pentacles_07_seven_reversed", "pentacles_08_eight_reversed", "pentacles_09_nine_reversed", "pentacles_10_ten_reversed", "pentacles_11_page_reversed", "pentacles_12_knight_reversed", "pentacles_13_queen_reversed", "pentacles_14_king_reversed"
    ];
    console.log(`[ 초기화 ] 전체 타로 카드 ID 목록 정의 완료. 총 ${ALL_TAROT_CARD_IDS.length}장`);

        const SYNC_TYPE_CHARACTER_CARD_IDS = [
        "planetoid_character_card", "interstellarcat_character_card", "stellarturtle_character_card",
        "spaceslug_character_card", "pulsar_character_card", "astralbunny_character_card",
        "nebulafox_character_card", "youngalien_character_card", "spacesnowflake_character_card",
        "spiralsheller_character_card", "interstellarbat_character_card", "spacebird_character_card",
        "firesprout_character_card", "spookoid_character_card", "eyebot_character_card",
        "jellynaut_character_card", "aquadog_character_card", "armoredslug_character_card",
        "vortexelemental_character_card", "bubblepuff_character_card", "orbiteeater_character_card",
        "astromite_character_card", "eldersquid_character_card", "spacejellies_character_card",
        "critternaut_character_card", "starryskitter_character_card", "pinkinvader_character_card",
        "lightrodent_character_card", "starhive_character_card", "spacewaffle_character_card",
        "graviton_character_card", "floater_character_card", "spacerat_character_card",
        "dusty_character_card", "rocky_character_card", "snooter_character_card",
        "cosmiceye_character_card", "mycelian_character_card", "craterbeast_character_card",
        "spacemites_character_card", "cosmicwump_character_card", "toxilum_character_card",
        "floxie_character_card", "spacewalk_character_card", "venotongue_character_card",
        "ufoot_character_card", "moltenite_character_card", "polaroid_character_card",
        "sporebloom_character_card", "gentlebeam_character_card", "orbiter_character_card",
        "starguppy_character_card", "celestiray_character_card", "sonarpod_character_card",
        "cephalon_character_card", "starsprite_character_card", "moonsnuut_character_card",
        "cosmon_character_card", "astroshroom_character_card", "cometcanine_character_card",
        "galaxycat_character_card", "starhoot_character_card", "venublub_character_card",
        "mooncritter_character_card", "spacepup_character_card", "lunaling_character_card",
        "globro_character_card", "azurecometpup_character_card", "gemcrab_character_card",
        "steadfast_robobear_character_card", "flarrow_character_card",
        "guardian_robobear_character_card", "pulsefeesh_character_card", "ringbee_character_card",
        "interloper_character_card", "orbineer_character_card", "swirlth_character_card",
        "aurabop_character_card", "cosmirillo_character_card", "lumisquid_character_card",
        "moonjaw_character_card", "stardasher_character_card", "jellomite_character_card",
        "spinder_character_card"
        // 여기에 모든 싱크타입 캐릭터 카드 파일명을 추가합니다. (확장자 제외)
    ];
    console.log(`[ 초기화 ] 싱크타입 캐릭터 카드 ID 목록 정의 완료. 총 ${SYNC_TYPE_CHARACTER_CARD_IDS.length}개`);

    // --- DOM 요소 선택 ---
    const section2 = document.getElementById('section2');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const tooltipElement = document.getElementById('tooltip');
    const newMessageButton = document.getElementById('newMessageButton');
    const container = document.querySelector('.container');
    const rubyImageElement = document.getElementById('rubyImage');
    const section5 = document.getElementById('section5');
    console.log("[ 초기화 ] 기본 DOM 요소 선택 완료");

    // --- 상태 변수 ---
    let currentConsultationStage = 1;
    let userProfile = initializeUserProfile();
    let conversationHistory = [];
    let lastShownRubyCardImageId = null;
    let lastUsedRubyExpressionId = null;
    let isApiLoading = false;
    let lastApiResponse = null;
    let isInputDisabledByInteraction = false;
    let messageBuffer = "";
        let isInitialApiCallAfterObjectiveTest = false; // 객관식 테스트 후 첫 API 호출인지 여부
    let isFirstBotMessageDisplayed = false; // ★★★ 추가: 첫 봇 메시지 표시 여부 플래그 ★★★
    let showStage10EntryEmoticon = false; // ★★★ 추가: 10단계 첫 진입 시 이모티콘 표시 여부 플래그 ★★★
    let isRequestingSyncTypeResult = false;
    let syncTypeResultRetryCount = 0;
    let tooltipTimer; // 입력창 포커스 시 툴팁 타이머 (기존)
    let originalSection2PaddingBottom = null;
    const TOOLTIP_TIMEOUT_DURATION = 2000; // 입력창 포커스 시 툴팁 표시 딜레이 (기존)
    let typingIndicatorElement = null;
    let userHasScrolledUp = false;
    const isNearBottomThreshold = 80;
    let suggestionButtonsContainer = null;
    let sendButtonLoadingIndicator = null;
    const originalSendButtonText = "보내기";
    let currentSelectedTarotType = null;
        let isRestartingFromObjective = null; // 'full_restart' 또는 'objective_restart' 또는 null

    let 주관식1질문텍스트 = null;
    let 주관식2질문텍스트 = null;
    let 주관식3질문텍스트 = null;
        let currentSuggestionButtonTexts = []; // ★★★ 추가: 현재 표시되어야 할 제안 버튼 텍스트 목록
    let currentSuggestionButtonHandler = null; // ★★★ 추가: 현재 제안 버튼의 클릭 핸들러
    let messageQueue = [];
    let autoSendTimerId = null;
    let tooltipTimerId = null; // 입력 대기 툴팁 타이머 ID (기존)
    let 현재표시된객관식질문들 = [];
    let 임시객관식답변들 = {};
    let tempSelectedConstellation = null;
    const profileKeys = Object.keys(initializeUserProfile());
    let currentObjectiveQuestionIndex = 0;
    const MAX_OBJECTIVE_QUESTIONS = 12; // ★★★ 수정: 객관식 질문 최대 개수 12로 변경 ★★★

        let 현재주관식질문인덱스 = 0; // ★★★ 추가: 현재 주관식 질문 인덱스 ★★★
    const MAX_SUBJECTIVE_QUESTIONS = 5; // ★★★ 추가: 주관식 질문 최대 개수 ★★★

    // --- 세션 타임아웃 관련 상태 변수 ---
    let sessionTimeoutTimerId = null;       // 3분 전체 타임아웃 타이머
    let inactivityWarningTimerId = null;    // 2분 경고 메시지 타이머
    const SESSION_TIMEOUT_DURATION = 120 * 60 * 1000; // 3분
    const INACTIVITY_WARNING_DURATION = 60 * 60 * 1000; // 2분
    let isSessionTimedOut = false; // 세션 종료 여부 플래그

    console.log("[ 초기화 ] 주요 상태 변수 초기화 완료. 현재 단계:", currentConsultationStage);

    // --- 상수 및 설정 ---
    const API_KEY = 'AIzaSyDSAA6rbNdD3tV1W_u0nIll0XyTe63rU_k'; // 실제 사용 시 환경 변수 등으로 관리 권장
    const MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
    console.log("[ 초기화 ] API 관련 상수 정의 완료");

    // --- 프롬프트 파일 맵 ---
    let loadedPrompts = {};
    const promptFileMap = {
        'globalprompts': 'prompts/globalprompts.ini',
        'synctyperesult': 'prompts/synctyperesult.ini', // 싱크타입 결과 요청용 프롬프트
        // 성운별 프롬프트 (영문 키 사용 권장)
        'Luminesia': 'prompts/Luminesia.ini',
        'Ignitio': 'prompts/Ignitio.ini',
        'Castellaris': 'prompts/Castellaris.ini',
        'Chronica': 'prompts/Chronica.ini',
        'Conexus': 'prompts/Conexus.ini',
        'Aeolus': 'prompts/Aeolus.ini',
        'Inquisito': 'prompts/Inquisito.ini',
        'Umbralis': 'prompts/Umbralis.ini',
        'Equilibria': 'prompts/Equilibria.ini',
        'Creatio': 'prompts/Creatio.ini',
        'Silvanis': 'prompts/Silvanis.ini',
        'AlbionPrima': 'prompts/AlbionPrima.ini' // Albion Prima는 띄어쓰기 없이
    };
    console.log("[ 초기화 ] 프롬프트 파일 맵 정의 완료 (성운별 프롬프트 포함)");

    // 한글 성운명과 영문 프롬프트 키 매핑 (CONSTELLATIONS_DATA 키 사용)
    const CONSTELLATION_PROMPT_KEY_MAP = {
        "루미네시아": "Luminesia",
        "이그니티오": "Ignitio",
        "카스텔라리스": "Castellaris",
        "크로니카": "Chronica",
        "코넥서스": "Conexus",
        "에오루스": "Aeolus",
        "인퀴지토": "Inquisito",
        "움브라리스": "Umbralis",
        "에퀼리브리아": "Equilibria",
        "크레아티오": "Creatio",
        "실바니스": "Silvanis",
        "알비온 프라이머": "AlbionPrima"
    };
    console.log("[ 초기화 ] 프롬프트 파일 맵 정의 완료 (globalprompts.ini 사용)");


// --- 질문 세트 (주관식, 객관식) ---
    const 주관식질문세트 = [ // ★★★ 수정: 새로운 주관식 질문 5개로 변경 ★★★
        "새로운 경험을 할 기회가 생겼을 때 나는…",
        "계획이 틀어졌을 때 나는…",
        "시간이 남을 때 나는…",
        "최근에 누군가를 도와준 적이 있나요?",
        "최근 감정이 요동쳤던 순간이 있나요?"
    ];
    // const 주관식1질문세트 = [...]; // 기존 주관식1,2,3 세트 제거
    // const 주관식2질문세트 = [...];
    // const 주관식3질문세트 = [...];

    const 객관식질문세트 = [ // ★★★ 수정: 새로운 DISC 기반 객관식 질문 12개로 변경 ★★★
        // D (주도형)
        { type: "D", question: "나는 목표를 달성하기 위해 주도적으로 상황을 통제하고 빠르게 결정을 내리는 편이다." },
        { type: "D", question: "나는 도전적인 과제에 직면했을 때, 어려움보다는 성취할 기회로 여기는 경향이 있다." },
        { type: "D", question: "나는 다른 사람들과의 경쟁에서 이기거나 원하는 결과를 얻는 것에 강한 동기 부여를 받는다." },
        // I (사교형)
        { type: "I", question: "나는 새로운 사람들과 쉽게 어울리고 대화를 통해 긍정적인 관계를 맺는 것을 즐긴다." },
        { type: "I", question: "나는 나의 생각이나 아이디어를 다른 사람들에게 열정적으로 설명하고 설득하는 것을 잘한다." },
        { type: "I", question: "나는 주변 사람들에게 인정받고 칭찬받을 때 큰 기쁨과 에너지를 얻는다." },
        // S (안정형)
        { type: "S", question: "나는 예측 가능하고 안정적인 환경에서 꾸준하게 일을 처리하는 것을 선호한다." },
        { type: "S", question: "나는 팀의 조화와 협력을 중요하게 생각하며, 다른 사람들을 서포트하는 역할에 만족감을 느낀다." },
        { type: "S", question: "나는 급격한 변화보다는 점진적인 개선을 선호하며, 익숙한 방식에 편안함을 느낀다." },
        // C (신중형)
        { type: "C", question: "나는 어떤 일을 시작하기 전에 정보를 철저히 분석하고 세부적인 계획을 세우는 것이 중요하다." },
        { type: "C", question: "나는 규칙이나 절차를 준수하고, 맡은 일을 정확하고 꼼꼼하게 처리하는 것을 중요하게 생각한다." },
        { type: "C", question: "나는 감정에 치우치기보다는 객관적인 사실과 데이터에 근거하여 신중하게 판단하려고 노력한다." }
    ];
    console.log("[ 초기화 ] 질문 세트 정의 완료");

    // --- 초기화 함수 ---
    async function initializeApp() {
        console.log("[initializeApp] 앱 초기화 시작");
        if (container) container.classList.remove('initial-hidden');
        adjustContainerHeight();

        if (section2) {
            const computedStyle = window.getComputedStyle(section2);
            originalSection2PaddingBottom = parseInt(computedStyle.paddingBottom, 10);
            if (isNaN(originalSection2PaddingBottom)) {
                originalSection2PaddingBottom = 15; // CSS 기본값
                console.warn(`[initializeApp] section2의 paddingBottom을 computedStyle에서 정확히 읽지 못했을 수 있어 기본값 ${originalSection2PaddingBottom}px 사용 고려.`);
            }
            console.log(`[initializeApp] section2 초기 paddingBottom: ${originalSection2PaddingBottom}px`);
        } else {
            console.error("[initializeApp] section2 요소를 찾을 수 없어 originalSection2PaddingBottom 초기화 실패.");
            originalSection2PaddingBottom = 15;
        }

        await loadAllPrompts();
        console.log("[initializeApp] 프롬프트 로드 완료");

        setupEventListeners();
        console.log("[initializeApp] 이벤트 리스너 설정 완료");

        displayCurrentStageUI();
        console.log("[initializeApp] 앱 초기화 완료. 1단계 UI 표시됨.");
    }

    // --- 사용자 프로필 초기화 함수 ---
function initializeUserProfile() {
    console.log("[initializeUserProfile] 사용자 프로필 객체 생성");
    return {
        "사용자이름": null, "사용자애칭": null, "사용자가좋아하는것": null, "사용자의마음을아프게하는것": null,
        "사용자가싫어하는것": null, "사용자의나이성별": null, "사용자의고민": null,

        "주관식질문1": null, "주관식답변1": null,
        "주관식질문2": null, "주관식답변2": null,
        "주관식질문3": null, "주관식답변3": null,
        "주관식질문4": null, "주관식답변4": null,
        "주관식질문5": null, "주관식답변5": null,

        "객관식질문과답변": [],
        "DISC_D_점수": 0,
        "DISC_I_점수": 0,
        "DISC_S_점수": 0,
        "DISC_C_점수": 0,

        "결정된싱크타입": null, "사용자소속성운": null, "사용자가성운에속한이유": null,
        "사용자의감정상태": null,
        "선택된타로카드들": [],
        "시나리오": null // ★★★ 추가된 필드 ★★★
    };
}
    // --- 프롬프트 로드 함수 ---
    async function loadAllPrompts() {
        console.log("[loadAllPrompts] 모든 프롬프트 파일 로딩 시작");
        const fetchPromises = Object.keys(promptFileMap).map(async (key) => {
            const url = promptFileMap[key];
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`파일 로드 실패: ${response.status} ${response.statusText}`);
                }
                const text = await response.text();
                loadedPrompts[key] = text;
                console.log(`[loadAllPrompts] 성공: ${url}`);
            } catch (error) {
                console.error(`[loadAllPrompts] 오류: ${url} 로드 중 - ${error.message}`);
                loadedPrompts[key] = `[오류: ${url} 로드 실패 - ${error.message}]`; // 오류 메시지 저장
            }
        });
        await Promise.all(fetchPromises);
        console.log("[loadAllPrompts] 모든 프롬프트 파일 로딩 시도 완료.");
        if (!loadedPrompts['globalprompts'] || loadedPrompts['globalprompts'].startsWith("[오류:")) {
            console.error("[loadAllPrompts] 치명적 오류: globalprompts.ini 로드 실패! API 호출이 정상적으로 이루어지지 않을 수 있습니다.");
            // 사용자에게 알림을 표시하거나 앱 초기화 중단 등의 처리를 고려할 수 있습니다.
            // 여기서는 콘솔 에러만 남깁니다.
        }
    }

    // --- UI 헬퍼 함수들 ---
function adjustContainerHeight() {
    console.log("[adjustContainerHeight] 호출됨");
    if (!container) {
        console.warn("[adjustContainerHeight] container 요소를 찾을 수 없음.");
        return;
    }

    let currentSuggestionsHeight = 0;
    // 현재 제안 버튼 컨테이너가 화면에 보이고 있다면 그 높이를 가져옴
    if (suggestionButtonsContainer && suggestionButtonsContainer.classList.contains('visible')) {
        currentSuggestionsHeight = suggestionButtonsContainer.offsetHeight;
    }
    console.log(`[adjustContainerHeight] 현재 제안 버튼 높이 (currentSuggestionsHeight): ${currentSuggestionsHeight}px`);

    if (window.visualViewport) {
        const vv = window.visualViewport;
        const viewportHeight = vv.height;
        const windowInnerHeight = window.innerHeight;

        console.log(`[adjustContainerHeight] VisualViewport Height: ${viewportHeight}, Window InnerHeight: ${windowInnerHeight}, OffsetTop: ${vv.offsetTop}`);

        const isKeyboardUp = vv.offsetTop > 0 || (windowInnerHeight - viewportHeight > 20);

        if (isKeyboardUp) {
            container.style.height = `${viewportHeight}px`;
            console.log(`[adjustContainerHeight] 키보드 올라옴. 컨테이너 높이: ${viewportHeight}px`);

            if (section2 && originalSection2PaddingBottom !== null) {
                // ★★★ 키보드가 올라왔을 때: 제안 버튼이 있다면 그 높이를 포함하여 패딩 설정 ★★★
                const newPaddingBottom = (originalSection2PaddingBottom || 15) + currentSuggestionsHeight;
                section2.style.paddingBottom = `${newPaddingBottom}px`;
                console.log(`[adjustContainerHeight] 키보드 올라옴. section2 paddingBottom 설정: ${newPaddingBottom}px (기본: ${originalSection2PaddingBottom || 15}, 제안버튼: ${currentSuggestionsHeight})`);
            }
        } else {
            // 키보드가 내려간 상태 또는 초기 상태
            container.style.height = '100%';
            console.log(`[adjustContainerHeight] 키보드 내려감. 컨테이너 높이: 100%`);

            if (section2 && originalSection2PaddingBottom !== null) {
                // ★★★ 키보드가 내려갔을 때: 제안 버튼이 있다면 그 높이를 포함하여 패딩 설정 ★★★
                const newPaddingBottom = (originalSection2PaddingBottom || 15) + currentSuggestionsHeight;
                section2.style.paddingBottom = `${newPaddingBottom}px`;
                console.log(`[adjustContainerHeight] 키보드 내려감. section2 paddingBottom 설정: ${newPaddingBottom}px (기본: ${originalSection2PaddingBottom || 15}, 제안버튼: ${currentSuggestionsHeight})`);
            }
        }
    } else {
        // visualViewport API 미지원 시
        container.style.height = '100vh';
        console.log("[adjustContainerHeight] VisualViewport API 미지원. 컨테이너 높이: 100vh");
        if (section2 && originalSection2PaddingBottom !== null) {
            // ★★★ 미지원 시에도 제안 버튼 높이 고려 ★★★
            const newPaddingBottom = (originalSection2PaddingBottom || 15) + currentSuggestionsHeight;
            section2.style.paddingBottom = `${newPaddingBottom}px`;
            console.log(`[adjustContainerHeight] 미지원. section2 paddingBottom 설정: ${newPaddingBottom}px`);
        }
    }

    updateNewMessageButtonPosition();
    // adjustContainerHeight 호출 후 스크롤 조정은 상황에 따라 필요할 수 있음
    // 예를 들어, 키보드가 사라지면서 컨테이너가 커질 때 맨 아래로 스크롤
    // setTimeout(() => scrollToBottom(true), 150); // 약간의 딜레이 후
}
    function scrollToBottom(force = false) {
        //console.log(`[scrollToBottom] 호출. force: ${force}, userHasScrolledUp: ${userHasScrolledUp}`);
        if (!section2) return;
        if (force || !userHasScrolledUp) {
          //  console.log(`[scrollToBottom] 스크롤 실행! top: ${section2.scrollHeight}`);
            section2.scrollTo({
                top: section2.scrollHeight,
                behavior: 'smooth'
            });
            hideNewMessageButton();
        } else {
            console.log("[scrollToBottom] 사용자가 스크롤 중이거나 force가 false이므로 자동 스크롤 안 함.");
            if (section2.scrollHeight > section2.clientHeight + isNearBottomThreshold) {
                showNewMessageButton();
            }
        }
    }

    function showNewMessageButton() {
        if (newMessageButton && (newMessageButton.style.display === 'none' || !newMessageButton.classList.contains('visible'))) {
            newMessageButton.style.display = 'block';
            updateNewMessageButtonPosition();
            requestAnimationFrame(() => newMessageButton.classList.add('visible'));
        }
    }





    function hideNewMessageButton() {
        if (newMessageButton && newMessageButton.classList.contains('visible')) {
            newMessageButton.classList.remove('visible');
            const handler = () => {
                if (!newMessageButton.classList.contains('visible')) {
                    newMessageButton.style.display = 'none';
                    newMessageButton.removeEventListener('transitionend', handler);
                }
            };
            newMessageButton.addEventListener('transitionend', handler);
            setTimeout(() => {
                if (!newMessageButton.classList.contains('visible') && newMessageButton.style.display !== 'none') {
                    newMessageButton.style.display = 'none';
                    newMessageButton.removeEventListener('transitionend', handler);
                }
            }, 400);
        }
    }

    function updateNewMessageButtonPosition() {
        if (!section5 || !container) return;

        const section5Height = section5.offsetHeight || 80;
        let suggestionsActualHeight = 0;

        if (suggestionButtonsContainer && suggestionButtonsContainer.parentNode && suggestionButtonsContainer.classList.contains('visible')) {
            suggestionsActualHeight = suggestionButtonsContainer.offsetHeight;
            if (suggestionButtonsContainer.style.bottom !== `${section5Height}px`) {
                suggestionButtonsContainer.style.bottom = `${section5Height}px`;
            }
        }

        if (newMessageButton) {
            const totalUpwardShiftForNewMsg = section5Height + suggestionsActualHeight + 10;
            newMessageButton.style.bottom = `${totalUpwardShiftForNewMsg}px`;
        }

        if (tooltipElement) {
            const totalUpwardShiftForTooltip = section5Height + suggestionsActualHeight + 5;
            tooltipElement.style.bottom = `${totalUpwardShiftForTooltip}px`;
        }
        container.style.setProperty('--bottom-area-total-height', `${section5Height}px`);
    }

    function applyFadeIn(element) {
        if (!element) return;
        if (element.classList.contains('action-text-in-chat') || element.classList.contains('suggestion-button')) return;

        if (element.style.display === 'none') {
            element.style.display = element.classList.contains('visual-elements-frame') ? 'flex' : 'block';
        }
        requestAnimationFrame(() => setTimeout(() => {
            element.style.transition = 'opacity 0.5s ease-in-out';
            element.style.opacity = 1;
        }, 50));
    }

    function createTextMessageElement(message, isUser, isQuestionText = false) {
        const messageP = document.createElement('p');
        if (isUser) {
            messageP.classList.add('user-message');
            messageP.textContent = message || "";
        } else {
            if (isQuestionText) {
                messageP.classList.add('question-text');
            }
        }
        messageP.style.opacity = 0;
        return messageP;
    }

function createCardImageElement(apiImageName) {
    if (typeof apiImageName !== 'string' || !apiImageName.trim()) {
        console.warn("[createCardImageElement] 유효하지 않은 이미지 이름:", apiImageName);
        const nullDiv = document.createElement('div');
        nullDiv.classList.add('image-balloon');
        nullDiv.innerHTML = `<p style="color:#f0c0c0; font-size:0.8em; text-align:center;">[이미지 정보 없음]</p>`;
        return nullDiv;
    }

    let foundCardId = null; // 코드 내 목록에서 찾은 최종 카드 ID
    let imagePathPrefix = 'images/'; // 기본 이미지 경로
    let isReversed = false;
    let isSyncCard = false;

    // API에서 받은 이미지 이름을 기본 정규화 (소문자, 양쪽 공백 제거)
    const normalizedApiImgName = apiImageName.toLowerCase().trim();

    // 1. 싱크타입 카드 목록에서 찾아보기
    // 싱크타입 카드 ID는 `_character_card`를 제거하고 비교
    const normalizedApiImgNameForSync = normalizedApiImgName.replace(/_character_card$/, '');
    for (const syncId of SYNC_TYPE_CHARACTER_CARD_IDS) {
        if (syncId.replace(/_character_card$/, '') === normalizedApiImgNameForSync) {
            foundCardId = syncId;
            imagePathPrefix = 'images/sync/';
            isSyncCard = true;
            break;
        }
    }

    // 2. 싱크타입 목록에서 못 찾았으면 타로 카드 목록에서 찾아보기
    if (!foundCardId) {
        // 타로 카드 ID는 `_upright` 또는 `_reversed`를 제거하고 비교
        const normalizedApiImgNameForTarot = normalizedApiImgName.replace(/_upright$/, '').replace(/_reversed$/, '');
        for (const tarotId of ALL_TAROT_CARD_IDS) {
            const baseTarotId = tarotId.replace(/_upright$/, '').replace(/_reversed$/, '');
            if (baseTarotId === normalizedApiImgNameForTarot) {
                // API에서 받은 이름에 _reversed가 포함되어 있으면 해당 버전 우선
                if (normalizedApiImgName.endsWith('_reversed') && tarotId.endsWith('_reversed')) {
                    foundCardId = tarotId;
                    isReversed = true;
                    break;
                }
                // API에서 받은 이름에 _upright가 포함되어 있거나, 접미사가 없으면 _upright 버전 우선
                if ((normalizedApiImgName.endsWith('_upright') || (!normalizedApiImgName.endsWith('_reversed'))) && tarotId.endsWith('_upright')) {
                    foundCardId = tarotId;
                    break;
                }
                // 위 조건에 안 맞지만 base 이름이 같다면, 일단 찾은 것으로 간주 (목록의 첫 번째 일치 항목)
                if (!foundCardId) foundCardId = tarotId; // fallback
            }
        }
        // 찾은 타로 ID가 있다면 isReversed 다시 확인
        if (foundCardId && foundCardId.endsWith('_reversed')) {
            isReversed = true;
        }
    }

    const balloonDiv = document.createElement('div');
    balloonDiv.classList.add('image-balloon');
    const img = document.createElement('img');
    let finalFilenameForDisplay; // alt 태그 및 콘솔용
    let finalSrc;

    if (foundCardId) {
        finalFilenameForDisplay = foundCardId;
        finalSrc = `${imagePathPrefix}${foundCardId}.png`;
        console.log(`[createCardImageElement] API 이미지명 '${apiImageName}'에 대해 코드 목록에서 '${foundCardId}'를 찾아 이미지 경로 설정: ${finalSrc}`);
    } else {
        // 코드 목록에서 일치하는 것을 찾지 못한 경우
        console.warn(`[createCardImageElement] API 이미지명 '${apiImageName}'에 일치하는 카드를 코드 내 목록에서 찾지 못함. null.png 표시.`);
        finalFilenameForDisplay = "정보 없음";
        // 기본 null.png는 images/ 폴더에 있다고 가정
        finalSrc = `images/null.png`;
        isSyncCard = false; // null.png는 일반 이미지로 취급
        isReversed = false;
    }

    img.src = finalSrc;
    const altTextContent = finalFilenameForDisplay.replace(/_character_card|_upright|_reversed/g, '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    img.alt = isSyncCard ? `캐릭터: ${altTextContent}` : (foundCardId ? `타로: ${altTextContent}` : `이미지 정보 없음`);

    if (isReversed && !isSyncCard) { // 싱크 카드는 역방향 없음
        img.classList.add('reversed-card');
    }

    img.onerror = () => {
        // 최종적으로 이미지 로드 실패 시 (null.png조차 없거나 경로 문제)
        console.error(`[createCardImageElement] 이미지 최종 로드 실패: ${img.src}`);
        balloonDiv.innerHTML = `<p style="color:#f0c0c0; font-size:0.8em; text-align:center;">[이미지 표시 오류]</p>`;
    };

    balloonDiv.appendChild(img);
    return balloonDiv;
}

    function createRubyExpressionElement(expressionId) {
        if (!expressionId) return null;
        const imgElement = document.createElement('img');
        const imageName = String(expressionId).replace(/[\W_]+/g, "_") + ".png";
        imgElement.src = `expressions/${imageName}`;
        imgElement.alt = `루비 표현 ${expressionId}`;
        imgElement.onerror = () => {
            console.error(`[createRubyExpressionElement] 루비 표현 이미지 로드 오류: expressions/${imageName}`);
            return null;
        };
        return imgElement;
    }

    async function createActionTextElement(actionText) {
        if (!actionText) return null;
        const actionP = document.createElement('p');
        actionP.classList.add('action-text-in-chat');
        return actionP;
    }

    async function animateActionText(element, text) {
        if (!element || !text || text.length === 0) return;
        element.textContent = ''; element.style.opacity = 1;
        const delayPerChar = 40, transitionDuration = '0.2s';
        const characters = text.split('');
        for (let i = 0; i < characters.length; i++) {
            const span = document.createElement('span');
            span.innerHTML = characters[i] === ' ' ? ' ' : characters[i];
            span.style.opacity = 0; span.style.transition = `opacity ${transitionDuration} ease-out`; span.style.display = 'inline-block';
            element.appendChild(span);
            await new Promise(resolve => requestAnimationFrame(() => setTimeout(resolve, 1)));
            setTimeout(() => span.style.opacity = 1, i * delayPerChar);
        }
        const totalAnimationTime = characters.length * delayPerChar + parseFloat(transitionDuration) * 1000 + 100;
        return new Promise(resolve => setTimeout(resolve, totalAnimationTime));
    }

async function animateBotMessageText(pElement, fullTextWithTags) {
    if (!pElement || typeof fullTextWithTags !== 'string') {
        console.warn("[animateBotMessageText] pElement 또는 fullTextWithTags가 유효하지 않음.");
        if (pElement && typeof fullTextWithTags === 'string') pElement.innerHTML = fullTextWithTags || "";
        else if (pElement) pElement.innerHTML = "";
        return;
    }

    pElement.innerHTML = '';
    pElement.style.opacity = 1;

    const segments = fullTextWithTags.split(/(\[exp\d{3}\]|<br\s*\/?>|<b\s*(?:style="[^"]*")?\s*>.*?<\/b>|\n)/g).filter(Boolean);

    const wordFadeInDelay = 70;
    const wordFadeInDuration = '0.15s';
    let currentPNodeForAnimation = pElement;

    async function animateTextChunk(targetElement, textChunk) {
        const wordsAndSpaces = textChunk.split(/(\s+)/g).filter(s => s.length > 0);
        for (const part of wordsAndSpaces) {
            if (part.match(/^\s+$/)) {
                targetElement.insertAdjacentText('beforeend', part);
            } else {
                const wordSpan = document.createElement('span');
                wordSpan.textContent = part;
                wordSpan.style.opacity = 0;
                wordSpan.style.display = 'inline-block';
                wordSpan.style.transition = `opacity ${wordFadeInDuration} ease-out, transform ${wordFadeInDuration} ease-out`;
                wordSpan.style.transform = 'translateY(3px)';
                targetElement.appendChild(wordSpan);
                await new Promise(resolve => setTimeout(resolve, wordFadeInDelay));
                requestAnimationFrame(() => {
                    wordSpan.style.opacity = 1;
                    wordSpan.style.transform = 'translateY(0px)';
                });
            }
        }
    }

    for (const segment of segments) {
        if (!currentPNodeForAnimation && !(segment.match(/^\[exp\d{3}\]$/) || segment.match(/<br\s*\/?>/i) || segment === '\n') ) {
            currentPNodeForAnimation = createTextMessageElement("", false);
            section2.appendChild(currentPNodeForAnimation);
            applyFadeIn(currentPNodeForAnimation);
            console.log("[animateBotMessageText] New <p> created for text segment after image/break.");
        }

        if (segment.match(/^\[exp\d{3}\]$/)) { // [expNNN] 태그 처리
            // ★★★ 수정: 첫 번째 봇 메시지가 아닐 경우 이미지 생성 건너뛰기 ★★★
            if (isFirstBotMessageDisplayed) {
                console.log(`[animateBotMessageText] 첫 번째 봇 메시지 이후이므로 [expNNN] (${segment}) 이미지 표시 안 함.`);
                // 필요하다면 태그를 공백으로 대체하거나 아무것도 안 할 수 있음
                // currentPNodeForAnimation?.insertAdjacentText('beforeend', ' '); // 예: 공백으로 대체
                await new Promise(resolve => setTimeout(resolve, 50)); // 약간의 딜레이만 줌
            } else {
                // 첫 번째 봇 메시지이거나, 이모티콘을 항상 표시하고 싶다면 이 로직 실행
                await hideTypingIndicator();
                const expressionId = segment.slice(1, -1);
                const rubyImgElement = createRubyExpressionElement(expressionId);
                if (rubyImgElement) {
                    const frame = document.createElement('div');
                    frame.classList.add('visual-elements-frame');
                    frame.appendChild(rubyImgElement);
                    if (currentPNodeForAnimation && currentPNodeForAnimation.parentNode === section2) {
                        section2.insertBefore(frame, currentPNodeForAnimation.nextSibling || null);
                    } else {
                        section2.appendChild(frame);
                    }
                    applyFadeIn(frame);
                    lastUsedRubyExpressionId = expressionId;
                    currentPNodeForAnimation = null;
                    scrollToBottom();
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
            }
        } else if (segment.match(/<br\s*\/?>/i) || segment === '\n') {
            if (!currentPNodeForAnimation) {
                currentPNodeForAnimation = createTextMessageElement("", false);
                section2.appendChild(currentPNodeForAnimation);
                applyFadeIn(currentPNodeForAnimation);
            }
            currentPNodeForAnimation.insertAdjacentHTML('beforeend', '<br>');
            scrollToBottom();
            await new Promise(resolve => setTimeout(resolve, 30));
        } else if (segment.startsWith('<b') && segment.endsWith('</b>')) {
             if (!currentPNodeForAnimation) {
                currentPNodeForAnimation = createTextMessageElement("", false);
                section2.appendChild(currentPNodeForAnimation);
                applyFadeIn(currentPNodeForAnimation);
            }
            const bElement = document.createElement('b');
            const styleMatch = segment.match(/style="([^"]*)"/);
            if (styleMatch && styleMatch[1]) {
                bElement.style.cssText = styleMatch[1];
            }
            const innerText = segment.replace(/<b\s*(?:style="[^"]*")?\s*>/i, "").replace(/<\/b>/i, "");
            currentPNodeForAnimation.appendChild(bElement);
            await animateTextChunk(bElement, innerText);
            scrollToBottom();
        } else { // 일반 텍스트 세그먼트
            if (!currentPNodeForAnimation) {
                currentPNodeForAnimation = createTextMessageElement("", false);
                section2.appendChild(currentPNodeForAnimation);
                applyFadeIn(currentPNodeForAnimation);
            }
            await animateTextChunk(currentPNodeForAnimation, segment);
            scrollToBottom();
        }
    }

    // ★★★ 이 함수가 성공적으로 봇 메시지를 표시한 후 플래그 업데이트 ★★★
    if (pElement.textContent.trim() !== '' || section2.querySelector('.visual-elements-frame img[src^="expressions/"]')) {
        // 텍스트 내용이 있거나, 이모티콘 이미지가 실제로 생성된 경우 (첫 메시지일 때)
        if (!isFirstBotMessageDisplayed) {
             isFirstBotMessageDisplayed = true;
             console.log("[animateBotMessageText] isFirstBotMessageDisplayed 플래그 true로 설정됨.");
        }
    }


    await new Promise(resolve => setTimeout(resolve, 150));
    console.log("[animateBotMessageText] 어절 단위 페이드 인 애니메이션 완료.");
}
    async function animateSuggestionButtons(containerElement) {
        if (!containerElement) return;
        const buttons = containerElement.querySelectorAll('.suggestion-button');
        if (buttons.length === 0) return;

        const delayPerButton = 80;
        for (let i = 0; i < buttons.length; i++) {
            await new Promise(resolve => setTimeout(resolve, delayPerButton));
            requestAnimationFrame(() => {
                buttons[i].style.opacity = 1;
                buttons[i].style.transform = 'translateY(0)';
            });
        }
        console.log("[animateSuggestionButtons] 제안 버튼 내부 아이템 애니메이션 완료");
        updateNewMessageButtonPosition();
        scrollToBottom();
    }

function createSuggestionButtons(texts, buttonClickHandler) {
    console.log("[createSuggestionButtons] 생성 시작. 텍스트:", texts);
    if (!container || !texts || texts.length === 0) {
        console.warn("[createSuggestionButtons] 컨테이너 없거나 텍스트 비어있음. 생성 중단.");
        currentSuggestionButtonTexts = [];
        currentSuggestionButtonHandler = null;
        // 이전 버튼 컨테이너가 있었다면 패딩 복원 시도 (만약의 경우 대비)
        if (section2 && originalSection2PaddingBottom !== null &&
            parseInt(window.getComputedStyle(section2).paddingBottom, 10) > originalSection2PaddingBottom) {
            section2.style.paddingBottom = `${originalSection2PaddingBottom}px`;
            console.log("[createSuggestionButtons] (생성 중단 시) 이전 패딩 복원 시도.");
            scrollToBottom(true);
        }
        return;
    }

    currentSuggestionButtonTexts = [...texts];
    currentSuggestionButtonHandler = buttonClickHandler;

    // 이전 suggestionButtonsContainer가 있다면 먼저 완전히 제거 (패딩 복원 포함)
    if (suggestionButtonsContainer && suggestionButtonsContainer.parentNode) {
        suggestionButtonsContainer.remove();
        suggestionButtonsContainer = null;
        if (section2 && originalSection2PaddingBottom !== null) {
             section2.style.paddingBottom = `${originalSection2PaddingBottom}px`;
             console.log("[createSuggestionButtons] 이전 제안 버튼 제거하며 패딩 복원.");
        }
    }

    suggestionButtonsContainer = document.createElement('div');
    suggestionButtonsContainer.id = 'suggestionButtons';
    suggestionButtonsContainer.classList.add('suggestion-buttons-container');

    // section5의 현재 높이를 가져옴
    const section5Height = section5 ? section5.offsetHeight : 80; // section5 없으면 기본값
    // 제안 버튼 컨테이너의 bottom 위치를 section5 바로 위로 설정
    suggestionButtonsContainer.style.bottom = `${section5Height}px`;

    texts.forEach(text => {
        const button = document.createElement('div');
        button.classList.add('suggestion-button');
        button.textContent = text;
        button.addEventListener('click', () => {
            hideSuggestionButtons(true); // 클릭 시 현재 버튼들 제거 및 패딩 복원
            currentSuggestionButtonTexts = [];
            currentSuggestionButtonHandler = null;
            buttonClickHandler(text);
        });
        suggestionButtonsContainer.appendChild(button);
    });

    container.appendChild(suggestionButtonsContainer);
    console.log("[createSuggestionButtons] DOM에 제안 버튼 컨테이너 삽입 완료.");

    // DOM에 삽입 후, 다음 프레임에서 스타일 변경 및 높이 계산 (정확한 높이 측정을 위해)
    requestAnimationFrame(() => {
        // 버튼 컨테이너를 보이게 하고 애니메이션 시작
        // (CSS에서 transform: translateY(100%)로 숨겨져 있고, visible 클래스로 보이게 함)
        if (suggestionButtonsContainer) {
            suggestionButtonsContainer.classList.add('visible'); // CSS transition으로 부드럽게 나타남
            animateSuggestionButtons(suggestionButtonsContainer); // 내부 버튼들 애니메이션 (선택적)

            // ★★★ 제안 버튼 컨테이너의 높이를 정확히 측정한 후 section2 패딩 조절 ★★★
            // .visible 클래스가 적용되어 화면에 나타난 후 높이를 측정해야 정확함.
            // 애니메이션 시간을 고려하여 약간의 딜레이 후 높이 측정 및 패딩 적용.
            setTimeout(() => {
                if (suggestionButtonsContainer && suggestionButtonsContainer.classList.contains('visible')) {
                    const suggestionsHeight = suggestionButtonsContainer.offsetHeight;
                    console.log(`[createSuggestionButtons] 측정된 제안 버튼 컨테이너 높이: ${suggestionsHeight}px`);

                    if (section2 && suggestionsHeight > 0) {
                        // originalSection2PaddingBottom은 키보드나 다른 UI 요소가 없을 때의 section2 기본 하단 패딩.
                        // 여기에 suggestionsHeight를 더해줘서, section2의 스크롤 가능한 내용이
                        // 제안 버튼들 위로 끝나도록 함.
                        const newPaddingBottom = (originalSection2PaddingBottom || 15) + suggestionsHeight;
                        section2.style.paddingBottom = `${newPaddingBottom}px`;
                        console.log(`[createSuggestionButtons] section2 paddingBottom 업데이트: ${newPaddingBottom}px (기본: ${originalSection2PaddingBottom || 15}, 추가: ${suggestionsHeight})`);

                        // 패딩 변경 후 스크롤을 맨 아래로 이동시켜 변경된 레이아웃을 즉시 반영
                        // section2.offsetHeight; // Reflow 강제 (필요한 경우)
                        requestAnimationFrame(() => { // 다음 프레임에서 스크롤
                            scrollToBottom(true);
                            console.log("[createSuggestionButtons] 패딩 적용 후 scrollToBottom(true) 호출.");
                        });
                    } else if (section2 && suggestionsHeight === 0) {
                        // 버튼 컨테이너 높이가 0이면 (예: 내용물이 없는 경우), 원래 패딩으로 복원.
                        // 하지만 이 경우는 거의 발생하지 않아야 함.
                        section2.style.paddingBottom = `${originalSection2PaddingBottom || 15}px`;
                        console.log(`[createSuggestionButtons] 제안 버튼 높이 0. section2 paddingBottom 원래대로: ${originalSection2PaddingBottom || 15}px`);
                        scrollToBottom(true);
                    }
                }
            }, 350); // CSS transition duration (0.3s) 보다 약간 긴 시간 후 실행 (버튼이 완전히 나타난 후)
        }
    });

    console.log("[createSuggestionButtons] 제안 버튼 표시 및 애니메이션 시작됨.");
    hideTooltip(); // 툴팁 숨기기
    updateNewMessageButtonPosition(); // 새 메시지 버튼 위치 업데이트 (제안 버튼 높이 반영 전일 수 있음)
}
function hideSuggestionButtons(restorePadding = true) {
    console.log(`[hideSuggestionButtons] 숨김 시도. restorePadding: ${restorePadding}`);

    if (suggestionButtonsContainer && suggestionButtonsContainer.parentNode) { // 컨테이너가 DOM에 있는지 확인
        if (suggestionButtonsContainer.classList.contains('visible')) {
            suggestionButtonsContainer.classList.remove('visible');
            console.log("[hideSuggestionButtons] 제안 버튼 컨테이너 .visible 클래스 제거.");
        }

        // ★★★ 수정: restorePadding이 true일 때만 DOM에서 제거하고 패딩 복원 ★★★
        if (restorePadding) {
            const transitionDuration = 300; // CSS transition과 일치
            // visible 클래스 제거 후, transition이 끝나고 DOM에서 제거되도록 타이머 사용
            // 또는, 즉시 제거하고 싶다면 아래 setTimeout 없이 바로 remove
            setTimeout(() => {
                // 타이머 실행 시점에도 suggestionButtonsContainer가 여전히 존재하고,
                // .visible이 없는지 (즉, 숨겨진 상태가 유지되는지) 다시 한번 확인하는 것이 안전할 수 있음
                // 여기서는 일단 restorePadding 플래그에 따라 제거 결정
                if (suggestionButtonsContainer && suggestionButtonsContainer.parentNode) {
                    suggestionButtonsContainer.remove();
                    suggestionButtonsContainer = null; // 참조 제거
                    console.log("[hideSuggestionButtons] 제안 버튼 DOM에서 제거 완료 (restorePadding=true).");
                }

                if (section2) {
                    section2.style.paddingBottom = `${originalSection2PaddingBottom || 15}px`;
                    console.log(`[hideSuggestionButtons] section2 paddingBottom 복원: ${originalSection2PaddingBottom || 15}px`);
                    section2.offsetHeight;
                    requestAnimationFrame(() => {
                        scrollToBottom(true);
                    });
                }
                updateNewMessageButtonPosition();
                // restorePadding이 true면, 버튼이 완전히 사라지는 것이므로 관련 정보 초기화
                currentSuggestionButtonTexts = [];
                currentSuggestionButtonHandler = null;

            }, restorePadding ? transitionDuration : 0); // restorePadding이 false면 즉시 다음 로직 (제거 안 함)
        } else {
            // restorePadding이 false면 DOM에서 제거하지 않고, .visible 클래스만 제거된 상태로 둠.
            // 패딩도 복원하지 않음.
            console.log("[hideSuggestionButtons] 제안 버튼 DOM 유지, .visible 클래스만 제거 (restorePadding=false).");
            updateNewMessageButtonPosition(); // 위치 업데이트는 필요
        }
    } else {
        console.log("[hideSuggestionButtons] 제안 버튼 컨테이너가 없거나 이미 숨겨져 있음.");
        // 이 경우에도 restorePadding이 true이고 section2 패딩이 늘어나 있다면 복원 시도
        if (restorePadding && section2 && parseInt(window.getComputedStyle(section2).paddingBottom, 10) > (originalSection2PaddingBottom || 15)) {
            section2.style.paddingBottom = `${originalSection2PaddingBottom || 15}px`;
            console.log(`[hideSuggestionButtons] (컨테이너 없음) section2 paddingBottom 복원 시도: ${originalSection2PaddingBottom || 15}px`);
            updateNewMessageButtonPosition();
        }
    }
}

function setChatInputDisabled(disabled, placeholderText = "메시지를 입력하세요...", forceDisable = false) {
    console.log(`[setChatInputDisabled] 입력창 상태 변경 요청. disabled: ${disabled}, placeholder: "${placeholderText}", forceDisable: ${forceDisable}`);
    
    let actualDisabled = disabled;

    // ★★★ 수정: API 로딩 중이라도, 강제 비활성화(forceDisable)가 아니거나,
    //           객관식 후 첫 API 호출(isInitialApiCallAfterObjectiveTest)이 아니라면,
    //           그리고 현재 대화 단계(10)라면 입력창을 비활성화하지 않음. ★★★
    if (isApiLoading && !forceDisable && !isInitialApiCallAfterObjectiveTest && currentConsultationStage === 10) {
        actualDisabled = false; // 일반 대화 중 API 로딩 시에는 입력창 활성화 유지
        if (disabled) { // 비활성화 요청이었으나, 조건에 의해 활성화 유지하는 경우
            console.log("[setChatInputDisabled] API 로딩 중이나, 일반 대화 단계이므로 입력창 활성화 유지.");
        }
    }

    if (chatInput) {
        if (chatInput.disabled !== actualDisabled) { // 실제 상태가 변경될 때만 로깅 및 처리
            console.log(`[setChatInputDisabled] 입력창 실제 비활성화 상태 변경: ${actualDisabled}, 플레이스홀더: "${placeholderText}"`);
            chatInput.disabled = actualDisabled;
        }
        // 플레이스홀더는 요청된 값으로 항상 업데이트 (비활성화 상태와 별개로 메시지 전달 목적)
        chatInput.placeholder = placeholderText;

        if (actualDisabled) {
            chatInput.blur();
            if (chatInput.value !== "") { // 비활성화 시 내용이 있었다면 삭제
                chatInput.value = "";
                handleChatInput(); // 입력창 값 변경에 따른 후속 처리
            }
        }
    }
    // isInputDisabledByInteraction는 UI 상호작용(버튼 선택 등)에 의한 비활성화 여부
    // API 로딩이나 forceDisable에 의한 비활성화와는 별개로 관리될 수 있음.
    // 여기서는 전달된 disabled 값을 기준으로 isInputDisabledByInteraction를 설정하지 않고,
    // 이 함수를 호출하는 다른 곳(주로 displayCurrentStageUI)에서 isInputDisabledByInteraction를 직접 제어하도록 함.
    // isInputDisabledByInteraction = actualDisabled; // 이 줄은 제거하거나 신중히 관리

    manageSendButtonState(); 
}

    function setSendButtonLoading(isLoading, isUiProcessing = false) {
        console.log(`[setSendButtonLoading] 호출됨. isLoading: ${isLoading}, isUiProcessing: ${isUiProcessing}`);
        if (!sendButton) {
            console.error("[setSendButtonLoading] sendButton 요소를 찾을 수 없습니다.");
            return;
        }

        const shouldShowButtonAsLoading = isLoading || isUiProcessing;
        const isDisabledByInteractionFlag = isInputDisabledByInteraction && ![4, 5, 6, 10].includes(currentConsultationStage); // stage 10 (대화 단계)에서는 isInputDisabledByInteraction이 false여야 함

        sendButton.disabled = shouldShowButtonAsLoading || isDisabledByInteractionFlag || isSessionTimedOut; // 세션 종료 시에도 비활성화

        if (shouldShowButtonAsLoading) {
            sendButton.style.pointerEvents = 'none';
            sendButton.style.backgroundColor = '#5a4a8f';
            sendButton.textContent = '';

            if (!sendButtonLoadingIndicator || !sendButton.contains(sendButtonLoadingIndicator)) {
                if (sendButtonLoadingIndicator && sendButtonLoadingIndicator.parentNode) {
                    sendButtonLoadingIndicator.remove();
                }
                sendButtonLoadingIndicator = createSendButtonLoadingIndicator();
                sendButton.appendChild(sendButtonLoadingIndicator);
            }
            sendButtonLoadingIndicator.style.display = 'flex';
        } else {
            if (sendButton.disabled) { // isInputDisabledByInteractionFlag 또는 isSessionTimedOut 때문
                sendButton.style.pointerEvents = 'none';
                sendButton.style.backgroundColor = '#5a4a8f';
            } else {
                sendButton.style.pointerEvents = 'auto';
                sendButton.style.backgroundColor = '#7A5AF1';
            }

            if (sendButtonLoadingIndicator) {
                sendButtonLoadingIndicator.style.display = 'none';
            }
            sendButton.textContent = originalSendButtonText;
        }
    }

    function manageSendButtonState() {
        if (sendButton) {
            setSendButtonLoading(isApiLoading);
        }
    }

    function createSendButtonLoadingIndicator() {
        const indicatorWrapper = document.createElement('div');
        indicatorWrapper.classList.add('send-loading-indicator');
        indicatorWrapper.innerHTML = '<span></span><span></span><span></span>';
        return indicatorWrapper;
    }

    function showTypingIndicator() {
        if (typingIndicatorElement) return;
        typingIndicatorElement = document.createElement('div');
        typingIndicatorElement.classList.add('typing-indicator-wrapper');
        const indicatorDots = document.createElement('div'); indicatorDots.classList.add('typing-indicator');
        indicatorDots.innerHTML = '<span></span><span></span><span></span>';
        typingIndicatorElement.appendChild(indicatorDots);

        if (section2) {
            section2.appendChild(typingIndicatorElement);
            requestAnimationFrame(() => { if (typingIndicatorElement) typingIndicatorElement.style.opacity = 1; });
        }
        console.log("[showTypingIndicator] 표시됨");
        scrollToBottom(true);
    }

    async function hideTypingIndicator() {
        return new Promise((resolve) => {
            if (!typingIndicatorElement) { resolve(); return; }
            const el = typingIndicatorElement;
            el.style.opacity = 0;
            const handler = () => {
                if (el && el.style.opacity == 0) {
                    if (el.parentNode) el.parentNode.removeChild(el);
                    if (typingIndicatorElement === el) typingIndicatorElement = null;
                    el.removeEventListener('transitionend', handler);
                    console.log("[hideTypingIndicator] 숨김 완료 (transitionend)");
                }
                resolve();
            };
            el.addEventListener('transitionend', handler);
            setTimeout(() => {
                if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                    if (typingIndicatorElement === el) typingIndicatorElement = null;
                    console.log("[hideTypingIndicator] 숨김 완료 (fallback timeout)");
                }
                resolve();
            }, 450);
        });
    }

    function showTooltip() { if (tooltipElement) tooltipElement.classList.add('visible'); }
    function hideTooltip() { if (tooltipElement) tooltipElement.classList.remove('visible'); }

    function updateUserProfile(profileUpdates) {
        console.log("[updateUserProfile] 프로필 업데이트 시도:", profileUpdates);
        if (profileUpdates && typeof profileUpdates === 'object') {
            for (const key in profileUpdates) {
                if (userProfile.hasOwnProperty(key)) {
                    userProfile[key] = profileUpdates[key];
                    console.log(`[updateUserProfile] ${key} 업데이트:`, userProfile[key]);
                } else {
                    console.warn(`[updateUserProfile] 프로필에 없는 키: ${key}`);
                }
            }
            console.log("[updateUserProfile] 업데이트 후 전체 프로필:", userProfile);
        }
    }

function extractAndParseJson(modelGeneratedText) {
    if (typeof modelGeneratedText !== 'string' || modelGeneratedText.trim() === "") {
        console.error("[extractAndParseJson] 모델 응답 텍스트 비어있거나 문자열 아님:", modelGeneratedText);
        // 오류 객체 반환 (재시도 트리거 가능하도록)
        return {
            error: "모델 응답 비어있음",
            action: "고개를 갸웃하며",
            assistantmsg: "모델 응답이 비어있어요. [exp008] 다시 시도해볼까요?",
            img: null,
            proceed_to_next_stage: false,
            force_stage: null,
            user_profile_update: {}
        };
    }

    let textToParse = modelGeneratedText.trim();
    const markdownMatch = textToParse.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (markdownMatch && markdownMatch[1]) {
        textToParse = markdownMatch[1].trim();
    }

    // 여러 JSON 객체가 붙어 있는 경우, 첫 번째 유효한 JSON 객체만 추출 시도
    let firstJsonObjectString = textToParse;
    if (textToParse.startsWith("{") && textToParse.includes("}{")) {
        let balance = 0;
        let endIndex = -1;
        for (let i = 0; i < textToParse.length; i++) {
            if (textToParse[i] === '{') {
                balance++;
            } else if (textToParse[i] === '}') {
                balance--;
                if (balance === 0) {
                    endIndex = i;
                    break;
                }
            }
        }
        if (endIndex !== -1) {
            firstJsonObjectString = textToParse.substring(0, endIndex + 1);
            console.log("[extractAndParseJson] 여러 JSON 감지, 첫 번째 추출 시도:", firstJsonObjectString);
        }
    }


    try {
        const parsed = JSON.parse(firstJsonObjectString);
        console.log("[extractAndParseJson] JSON 파싱 성공:", parsed);
        if (parsed.sampleanswer && typeof parsed.sampleanswer !== 'string') {
            console.warn("[extractAndParseJson] sampleanswer가 문자열이 아님. 무시:", parsed.sampleanswer);
            delete parsed.sampleanswer;
        }
        return parsed;
    } catch (error) {
        console.error("[extractAndParseJson] JSON 파싱 실패:", error, "원문 (일부):", modelGeneratedText.substring(0, 200) + "...", "파싱 시도 (일부):", firstJsonObjectString.substring(0, 200) + "...");
        // 오류 객체 반환 (재시도 트리거 가능하도록)
        return {
            error: "JSON 파싱 실패", // 재시도 판단을 위한 에러 플래그
            action: "고개를 갸웃하며", // 이 action/assistantmsg는 재시도 실패 후 최종적으로 사용될 수 있음
            assistantmsg: "앗, 루비가 응답을 이해하는 데 어려움을 겪고 있어요. (JSON 파싱 오류). [exp008] 다시 시도해 주시겠어요?",
            img: null,
            proceed_to_next_stage: false,
            force_stage: null,
            user_profile_update: {}
        };
    }
}

    // getSystemPromptForStage 함수는 이제 globalprompts.ini 내용만 반환 (또는 sendApiRequest에서 직접 사용)
    function getGlobalSystemPrompt() {
        console.log(`[getGlobalSystemPrompt] 글로벌 프롬프트 요청`);
        const globalPromptText = loadedPrompts['globalprompts'];
        if (!globalPromptText || globalPromptText.startsWith("[오류:")) {
            console.error(`[getGlobalSystemPrompt] 글로벌 프롬프트 로드 실패 또는 내용 없음:`, globalPromptText);
            // 기본 프롬프트 또는 에러 메시지 반환
            return "You are Ruby, a friendly tarot reader. Please respond in JSON format. Include emotion tags like [exp001] in your messages. [Error: Global prompt not loaded]";
        }
        const tagInstruction = "\n\n[이모티콘 사용 지침]\n루비의 감정 표현은 메시지 중간에 `[expNNN]` 형식의 태그로 직접 포함시켜 주세요. (예: 안녕하세요! [exp001] 만나서 반갑습니다.) 사용 가능한 표현 ID는 exp001부터 exp008까지 입니다. 상황에 맞게 적절히 사용해주세요.\n";
        return globalPromptText + tagInstruction;
    }

        function getActiveSystemPrompt(isRequestingSyncTypeResult = false) {
        console.log(`[getActiveSystemPrompt] 호출. isRequestingSyncTypeResult: ${isRequestingSyncTypeResult}`);
        const tagInstruction = "\n\n[이모티콘 사용 지침]\n루비의 감정 표현은 메시지 중간에 `[expNNN]` 형식의 태그로 직접 포함시켜 주세요. (예: 안녕하세요! [exp001] 만나서 반갑습니다.) 사용 가능한 표현 ID는 exp001부터 exp008까지 입니다. 상황에 맞게 적절히 사용해주세요.\n";

        if (isRequestingSyncTypeResult) {
            const syncTypeResultPrompt = loadedPrompts['synctyperesult'];
            if (!syncTypeResultPrompt || syncTypeResultPrompt.startsWith("[오류:")) {
                console.error("[getActiveSystemPrompt] synctyperesult.ini 프롬프트 로드 실패 또는 내용 없음:", syncTypeResultPrompt);
                // 기본 대체 프롬프트 또는 에러 메시지 반환
                return "You are an AI assistant. Based on user's answers, determine their constellation. Respond in JSON format with a 'determined_constellation' field. [Error: synctyperesult.ini not loaded]" + tagInstruction;
            }
            console.log("[getActiveSystemPrompt] synctyperesult.ini 프롬프트 사용.");
            return syncTypeResultPrompt + tagInstruction;
        }

        const globalPrompt = loadedPrompts['globalprompts'];
        if (!globalPrompt || globalPrompt.startsWith("[오류:")) {
            console.error("[getActiveSystemPrompt] globalprompts.ini 프롬프트 로드 실패 또는 내용 없음:", globalPrompt);
            return "You are Ruby, a friendly tarot reader. Please respond in JSON format. Include emotion tags like [exp001] in your messages. [Error: Global prompt not loaded]" + tagInstruction;
        }

        const userConstellationKorean = userProfile.사용자소속성운;
        if (userConstellationKorean && CONSTELLATION_PROMPT_KEY_MAP[userConstellationKorean]) {
            const constellationPromptKey = CONSTELLATION_PROMPT_KEY_MAP[userConstellationKorean];
            const constellationPrompt = loadedPrompts[constellationPromptKey];

            if (constellationPrompt && !constellationPrompt.startsWith("[오류:")) {
                console.log(`[getActiveSystemPrompt] 글로벌 프롬프트와 ${constellationPromptKey}.ini 프롬프트 결합 사용.`);
                // 결합 순서: 글로벌 프롬프트가 먼저, 그 다음 성운별 특화 프롬프트
                return globalPrompt + "\n\n--- " + constellationPromptKey + " Specific Instructions ---\n" + constellationPrompt + tagInstruction;
            } else {
                console.warn(`[getActiveSystemPrompt] ${constellationPromptKey}.ini 프롬프트 로드 실패 또는 내용 없음. 글로벌 프롬프트만 사용.`);
                return globalPrompt + tagInstruction;
            }
        } else {
            console.log("[getActiveSystemPrompt] 사용자 소속 성운 정보 없음. 글로벌 프롬프트만 사용.");
            return globalPrompt + tagInstruction;
        }
    }

    function advanceConsultationStage(newStage, fromApi = false) {
        const previousStage = currentConsultationStage;
        console.log(`[advanceConsultationStage] 요청. 이전 단계: ${previousStage}, 새 단계 요청: ${newStage}, API로부터: ${fromApi}`);

        let actualNewStage = currentConsultationStage;

        if (newStage !== null && newStage !== undefined) {
            actualNewStage = newStage;
        } else if (fromApi && lastApiResponse) {
            if (lastApiResponse.force_stage !== null && lastApiResponse.force_stage !== undefined) {
                actualNewStage = lastApiResponse.force_stage;
            } else if (lastApiResponse.proceed_to_next_stage === true && currentConsultationStage < 10 ) {
                actualNewStage = currentConsultationStage + 1;
            }
        }

        if (previousStage !== actualNewStage) {
            console.log(`[advanceConsultationStage] 단계 변경 실행: ${previousStage} → ${actualNewStage}`);
            currentConsultationStage = actualNewStage;
            isSessionTimedOut = false;

            // ★★★ 10단계로 처음 진입하는 경우에만 showStage10EntryEmoticon 플래그를 true로 설정 ★★★
            if (currentConsultationStage === 10 && previousStage !== 10) {
                showStage10EntryEmoticon = true;
                console.log("[advanceConsultationStage] 10단계로 처음 진입. showStage10EntryEmoticon = true 설정.");
            }
            // else if (currentConsultationStage !== 10) {
                // 10단계에서 벗어날 때 false로 할 필요는 없음. displayCurrentStageUI에서 사용 후 false로 바뀜.
            // }


            if (currentConsultationStage === 10) {
                resetSessionTimers();
            } else {
                clearSessionTimers();
            }
            displayCurrentStageUI(); // 변경된 단계의 UI 표시
        } else {
            console.log(`[advanceConsultationStage] 단계 변경 없음. 현재 단계: ${currentConsultationStage}`);
        }
    }

    // --- 메시지 버퍼링 및 자동 전송 관련 함수 ---
    function addToMessageQueueAndStartTimer(message) {
        if (isSessionTimedOut) {
            console.log("[MessageQueue] 세션 종료됨. 메시지 추가 안 함.");
            return;
        }
        if (message.trim() === "") return;

        messageQueue.push(message);
        console.log("[MessageQueue] 메시지 추가:", message, "현재 큐:", messageQueue);

        if (autoSendTimerId) {
            clearTimeout(autoSendTimerId);
            autoSendTimerId = null;
        }

        autoSendTimerId = setTimeout(() => {
            processMessageQueue();
            autoSendTimerId = null;
        }, 2000);
        console.log("[AutoSendTimer] 2초 자동 전송 타이머 시작/재시작.");
    }

    async function processMessageQueue() {
        if (isSessionTimedOut) {
            console.log("[MessageQueue] 세션 종료됨. 메시지 전송 안 함.");
            messageQueue = []; // 큐 비우기
            return;
        }
        if (isApiLoading) {
            console.log("[MessageQueue] API 로딩 중. 메시지 전송 대기.");
            return;
        }

        if (messageQueue.length > 0) {
            const messagesToSend = messageQueue.join('\n');
            messageQueue = [];
            console.log("[MessageQueue] 전송할 메시지:", messagesToSend);

            if ([4, 5, 6].includes(currentConsultationStage)) {
                console.log(`[MessageQueue] 주관식 답변 단계 (${currentConsultationStage}). API 호출 없이 진행.`);
                if (currentConsultationStage === 4) {
                    updateUserProfile({ "싱크타입답변1": messagesToSend }); advanceConsultationStage(5);
                } else if (currentConsultationStage === 5) {
                    updateUserProfile({ "싱크타입답변2": messagesToSend }); advanceConsultationStage(6);
                } else if (currentConsultationStage === 6) {
                    updateUserProfile({ "싱크타입답변3": messagesToSend }); advanceConsultationStage(7);
                }
            } else {
                messageBuffer = messagesToSend;
                await sendApiRequest();
            }
        } else {
            console.log("[MessageQueue] 전송할 메시지 없음.");
        }

        if (autoSendTimerId) {
            clearTimeout(autoSendTimerId);
            autoSendTimerId = null;
        }
    }

    function resetAutoSendTimer() {
        if (autoSendTimerId) {
            clearTimeout(autoSendTimerId);
            autoSendTimerId = null;
            console.log("[AutoSendTimer] 자동 전송 타이머 취소됨.");
        }
    }

    // --- 입력 대기 툴팁 관련 함수 ---
    const INPUT_TOOLTIP_DELAY = 2000;

    function showInputTooltip(message = "메시지 입력을 기다리고 있어요.") {
        if (isSessionTimedOut) return;
        if (tooltipElement) {
            tooltipElement.textContent = message;
            tooltipElement.classList.add('visible');
            console.log("[InputTooltip] 표시:", message);
        }
    }

    function hideInputTooltip() {
        if (tooltipElement) {
            tooltipElement.classList.remove('visible');
            console.log("[InputTooltip] 숨김.");
        }
    }

    // --- chatInput 이벤트 핸들러 ---
function handleChatInput() {
    if (isSessionTimedOut) return;

    if (tooltipTimerId) {
        clearTimeout(tooltipTimerId);
        tooltipTimerId = null;
    }
    hideInputTooltip();

    if (chatInput.value.trim() !== "" && sendButton && !sendButton.disabled) {
        tooltipTimerId = setTimeout(() => {
            if (sendButton && !sendButton.disabled) {
                showInputTooltip();
            }
        }, INPUT_TOOLTIP_DELAY);
    }

    if (chatInput.value.trim() !== "") {
        resetAutoSendTimer(); // 입력이 있으면 자동 전송 타이머 리셋 (새 타이머 시작은 addToMessageQueueAndStartTimer에서)
    } else { // 입력창이 비워졌을 때
        if (messageQueue.length > 0) { // 큐에 메시지가 있다면 (즉, 입력했다가 지웠지만 보낼 내용이 남아있다면)
            if (autoSendTimerId) clearTimeout(autoSendTimerId);
            autoSendTimerId = setTimeout(() => {
                processMessageQueue();
                autoSendTimerId = null;
            }, 2000);
            console.log("[AutoSendTimer] 입력창 비워짐 & 큐에 메시지 존재. 자동 전송 타이머 재시작.");
        } else { // 큐에도 메시지가 없다면 (완전히 새로 입력 대기 상태)
            // 여기서 이전에 숨겨진 제안 버튼을 다시 표시할지 여부 결정
        }
    }

    if ([4, 5, 6, 10].includes(currentConsultationStage)) {
        if (chatInput.value.trim() !== "") {
            // 입력 내용이 있으면 제안 버튼 숨김
            if (suggestionButtonsContainer && suggestionButtonsContainer.classList.contains('visible')) {
                suggestionButtonsContainer.classList.remove('visible');
                console.log("[handleChatInput] 입력으로 인해 제안 버튼 숨김 (CSS .visible 클래스 제거).");
            }
        } else {
            // ★★★ 수정: 입력 내용이 없을 때 자동으로 제안 버튼을 다시 표시하는 로직 제거 ★★★
            // 제안 버튼은 createSuggestionButtons가 호출될 때만 나타나도록 함.
            // 사용자가 입력을 시작해서 버튼이 숨겨지면, 그 버튼 세트는 사용자가 입력을 지워도 다시 나타나지 않음.
            // 새로운 제안은 API 응답이나 다음 단계 UI 표시 시에만 나타남.
            console.log("[handleChatInput] 입력창 비워짐. 제안 버튼 자동 복원 안 함.");
        }
    }

    if (currentConsultationStage === 10) {
        resetSessionTimers();
    }
}
    // --- 세션 타임아웃 관련 함수 ---
    function resetSessionTimers() {
        if (isSessionTimedOut) return; // 이미 타임아웃된 세션은 타이머 리셋 안 함

        console.log("[SessionTimer] 세션 타이머 리셋 시도.");
        clearSessionTimers(); // 기존 타이머 모두 제거

        inactivityWarningTimerId = setTimeout(showInactivityWarning, INACTIVITY_WARNING_DURATION);
        sessionTimeoutTimerId = setTimeout(handleSessionTimeout, SESSION_TIMEOUT_DURATION);
        console.log(`[SessionTimer] 경고 타이머 (${INACTIVITY_WARNING_DURATION/1000}초) 및 세션 종료 타이머 (${SESSION_TIMEOUT_DURATION/1000}초) 설정됨.`);
    }

    function clearSessionTimers() {
        if (inactivityWarningTimerId) {
            clearTimeout(inactivityWarningTimerId);
            inactivityWarningTimerId = null;
            console.log("[SessionTimer] 경고 타이머 해제됨.");
        }
        if (sessionTimeoutTimerId) {
            clearTimeout(sessionTimeoutTimerId);
            sessionTimeoutTimerId = null;
            console.log("[SessionTimer] 세션 종료 타이머 해제됨.");
        }
    }

    async function showInactivityWarning() {
        if (isSessionTimedOut || currentConsultationStage !== 10) return; // 이미 타임아웃되었거나 대화 단계가 아니면 경고 안 함
        console.log("[SessionTimer] 비활성 경고 표시!");
        const warningMsg = "약 1시간 후에는 대화가 자동으로 종료될 거야 😭";
        // 기존 메시지 위에 시스템 메시지처럼 표시하거나, 루비가 말하는 것처럼 표시
        // 여기서는 displayHardcodedUIElements를 사용하여 루비가 말하는 것처럼 표시
        await displayHardcodedUIElements("루비가 걱정스러운 듯 주위를 살피며", warningMsg, [], handleButtonClick);
        // 경고 후에는 사용자가 다시 입력할 때까지 세션 종료 타이머는 계속 진행됨
    }

async function handleSessionTimeout() {
    if (isSessionTimedOut || currentConsultationStage !== 10) return; 

    console.log("[SessionTimer] 세션 타임아웃! 대화 종료 처리 시작.");
    isSessionTimedOut = true; 
    clearSessionTimers(); 

    setChatInputDisabled(true, "대화가 종료되었습니다.");
    hideSuggestionButtons(true); // 제안 버튼도 숨김 (패딩 복원 포함)

    const timeoutMsg = "바쁜 일이 있는거지? 내일 다시 보자 😁";
    // displayHardcodedUIElements는 section2에 메시지를 추가하므로, clearChatArea 이후에 호출하면 안 됨.
    // 따라서, 새로운 상담 시작 버튼을 누르기 *전*에 이 메시지가 표시되어야 함.
    // 만약 이 메시지까지 지우고 싶다면, clearChatArea를 버튼 핸들러 가장 처음에 호출.
    // 여기서는 이 메시지는 남기고, 버튼 클릭 시 이전 대화 내용만 지우는 것으로 가정.
    
    // 기존 대화 내용 위에 이 메시지를 표시하기 위해,
    // clearChatArea를 호출하기 전에 이 메시지를 표시하거나,
    // 아니면 clearChatArea 후 이 메시지만 다시 표시하는 방법이 있음.
    // 여기서는 버튼 클릭 시 이전 대화 내용을 지우고, 초기화 후 1단계 UI를 표시하는 흐름.
    // 따라서, 이 timeoutMsg는 clearChatArea 호출 전에 표시되어야 함.
    // 하지만, "새로운 상담 시작하기" 버튼을 누르면 어차피 1단계 UI가 새로 그려지므로,
    // 이 메시지가 clearChatArea로 지워져도 큰 문제는 없을 수 있음.
    // 좀 더 명확하게 하려면, clearChatArea를 버튼 핸들러의 가장 처음에 호출.

    // 일단 현재 구조에서는 timeoutMsg가 표시된 후 버튼이 나오고,
    // 버튼을 누르면 clearChatArea가 호출되는 순서.
    await displayHardcodedUIElements("루비가 아쉬운 표정으로 꼬리를 흔들며", timeoutMsg, ["새로운 상담 시작하기"], async (buttonText) => { // async 추가
        if (buttonText === "새로운 상담 시작하기") {
            console.log("[SessionTimer] 새로운 상담 시작 요청.");
            
            // ★★★ 추가: 채팅 영역 UI 내용 전체 삭제 ★★★
            clearChatArea(); 
            
            // 상태 초기화
            conversationHistory = [];
            userProfile = initializeUserProfile();
            currentConsultationStage = 0; 
            isSessionTimedOut = false; 
            // clearSessionTimers(); // advanceConsultationStage에서 처리됨
            
            // 1단계로 이동하여 새로운 상담 UI 표시
            advanceConsultationStage(1); 
        }
    });
    console.log("[SessionTimer] 세션 타임아웃 처리 완료.");
}

function clearChatArea() {
    console.log("[clearChatArea] 채팅 영역 내용 전체 삭제 시도.");
    if (section2) {
        // 기존에 동적으로 추가된 특정 ID의 컨테이너들도 여기서 함께 제거할 수 있음
        // 예를 들어, 객관식 질문 컨테이너, 타로 카드 선택 UI 등
        const objectiveQuestionsContainer = section2.querySelector('.objective-questions-container');
        if (objectiveQuestionsContainer) objectiveQuestionsContainer.remove();

        const tarotSelectionArea = document.getElementById('tarotSelectionArea');
        if (tarotSelectionArea && tarotSelectionArea.parentNode === section2) tarotSelectionArea.remove();
        
        const confirmationMessage = document.getElementById('confirmationMessage');
        if (confirmationMessage && confirmationMessage.parentNode === section2) confirmationMessage.remove();

        // section2의 모든 자식 p, div 등을 제거
        while (section2.firstChild) {
            section2.removeChild(section2.firstChild);
        }
        console.log("[clearChatArea] 채팅 영역 내용 삭제 완료.");
    } else {
        console.warn("[clearChatArea] section2 요소를 찾을 수 없어 채팅 영역을 비울 수 없습니다.");
    }
    // 제안 버튼도 확실히 숨김 (패딩 복원 포함)
    hideSuggestionButtons(true);
}

async function displayCurrentStageUI() {
    console.log(`[displayCurrentStageUI] START - currentConsultationStage: ${currentConsultationStage}`);
    let actionText = null;
    let assistantMsgWithTags = null;
    let suggestionTexts = [];

    if (!isSessionTimedOut && currentConsultationStage !== 10) {
        clearSessionTimers();
    }

    if (currentConsultationStage !== 8) {
        const existingObjectiveContainers = section2.querySelectorAll('.objective-questions-container');
        if (existingObjectiveContainers.length > 0) {
            console.log("[displayCurrentStageUI] Clearing existing objective question containers.");
            existingObjectiveContainers.forEach(container => container.remove());
        }
    }

    switch (currentConsultationStage) {
        case 1:
            hideSuggestionButtons(true);
            console.log("[displayCurrentStageUI] Processing stage 1");
            actionText = "루비가 당신을 발견하고 환하게 웃어요.";
            assistantMsgWithTags = "[exp001] 어서 와! 기다리고 있었어!<br>오늘은 어떤 <b>운명의 카드</b> 가 궁금해서 나를 찾아왔어?";
            suggestionTexts = Object.values(TAROT_TYPES);
            setChatInputDisabled(true, "버튼으로 타로 종류를 선택해주세요.");
            if (rubyImageElement) rubyImageElement.classList.remove('blurred');
            await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);
            createSuggestionButtons(suggestionTexts, handleButtonClick);
            break;

        case 2:
            hideSuggestionButtons(true);
            console.log("[displayCurrentStageUI] Processing stage 2");
            if (!currentSelectedTarotType) {
                advanceConsultationStage(1); return;
            }
            actionText = "루비가 눈을 반짝이며";
            switch (currentSelectedTarotType) {
                case TAROT_TYPES.TODAY_FORTUNE: assistantMsgWithTags = "오늘의 운세가 궁금하구나? 좋아, 그럼 살펴볼까? ✨"; break;
                case TAROT_TYPES.CURRENT_ENERGY: assistantMsgWithTags = "우주의 기운을 모아 지금 너란 사람에 대해 알아보자! 🔮"; break;
                case TAROT_TYPES.MONEY_FLOW: assistantMsgWithTags = "오.. 뭔가 느낌이 좋은걸? 💰 바로 알아보자!"; break;
                case TAROT_TYPES.LOVE_LUCK: assistantMsgWithTags = "사랑하는 사람이 있구나? 좋아, 알아보자! 🥰"; break;
                case TAROT_TYPES.STUDY_ACADEMIC: assistantMsgWithTags = "혹시 중요한 시험을 앞두고 있니? 📚 좋아, 알아보자!"; break;
                case TAROT_TYPES.WORK_CAREER: assistantMsgWithTags = "느껴진다, 느껴져! 🚀 너의 직장운! ..을 볼까? (머쓱)"; break;
                case TAROT_TYPES.SOMEONES_HEALTH: assistantMsgWithTags = "좋은 기운을 받길 우주에 기원하며, 지금 바로 알아보자! 🙏"; break;
                default: assistantMsgWithTags = "선택한 주제에 대해 알아볼까? 🤔";
            }
            suggestionTexts = ["응", "다시 선택할래"];
            setChatInputDisabled(true, "버튼으로 답변해주세요.");
            await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);
            createSuggestionButtons(suggestionTexts, handleButtonClick);
            break;

        case 3:
            hideSuggestionButtons(true);
            console.log("[displayCurrentStageUI] Processing stage 3");
            actionText = null;
            assistantMsgWithTags = "아, 그런데 혹시...🤔 <b>싱크타입</b> 이라고 알고 있어?";
            suggestionTexts = ["당연하지", "그게뭐야?"];
            setChatInputDisabled(true, "버튼으로 답변해주세요.");
            await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);
            createSuggestionButtons(suggestionTexts, handleButtonClick);
            break;

        case 3.5:
            hideSuggestionButtons(true);
            console.log("[displayCurrentStageUI] Processing stage 3.5");
            if (!tempSelectedConstellation) {
                actionText = "루비가 귀를 쫑긋하며";
                assistantMsgWithTags = "그래 좋아! 그럼 너의 성운은 어디였어? 🌠";
                suggestionTexts = [...ALL_CONSTELLATION_NAMES, "기억안나 (성운)"];
            } else {
                actionText = null;
                const constellationData = CONSTELLATIONS_DATA[tempSelectedConstellation];
                if (constellationData) {
                    assistantMsgWithTags = `오 ${tempSelectedConstellation} 성운이구나! <br>${constellationData.description}<br>그러면 너의 싱크타입은..?`;
                    suggestionTexts = constellationData.syncTypes.map(st => st === "기억안나" ? "기억안나 (싱크타입)" : st);
                } else {
                    actionText = "루비가 고개를 갸웃하며";
                    assistantMsgWithTags = "음... 성운 정보에 문제가 있는 것 같아. [exp007] 다시 시도해줄래?";
                    suggestionTexts = ["처음으로 돌아가기"];
                    tempSelectedConstellation = null;
                }
            }
            setChatInputDisabled(true, "아래에서 선택해주세요.");
            await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);
            createSuggestionButtons(suggestionTexts, handleButtonClick);
            break;

        case 4:
            hideSuggestionButtons(true);
            console.log(`[displayCurrentStageUI] Processing stage 4 (Subjective question ${현재주관식질문인덱스 + 1})`);
            if (현재주관식질문인덱스 === 0) {
                actionText = "루비가 테스트 준비를 하며";
                assistantMsgWithTags = `좋아 그럼 바로 테스트를 시작하자!<br><br>테스트는 <b>주관식 질문 ${MAX_SUBJECTIVE_QUESTIONS}개와, 객관식 질문 ${MAX_OBJECTIVE_QUESTIONS}개</b> 답변으로 진행돼.<br><br>BigFive 성격심리학과, 융의 감정이론, 그리고 다양한 내부적 요인에 따라 너의 싱크타입을 선택받게 될거야.<br><br>그럼.. 첫번째 질문을 바로 시작할게!<br>신중히 대답해줘!<br><br>`;
            } else {
                actionText = "루비가 다음 질문을 보며";
                assistantMsgWithTags = `좋아, 다음 질문이야.<br><br>`;
            }

            if (현재주관식질문인덱스 < MAX_SUBJECTIVE_QUESTIONS) {
                const currentQuestionText = 주관식질문세트[현재주관식질문인덱스];
                updateUserProfile({ [`주관식질문${현재주관식질문인덱스 + 1}`]: currentQuestionText });
                assistantMsgWithTags += `<b style="color:#FFD700;">${currentQuestionText}</b><br><br>※채팅으로 신중하게 입력해주세요`;
                if (현재주관식질문인덱스 === 0) {
                    suggestionTexts = ["아니 잠깐! 싱크타입이 뭐라구?"];
                    await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);
                    createSuggestionButtons(suggestionTexts, handleButtonClick);
                } else {
                    await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);
                }
                setChatInputDisabled(false, "여기에 답변을 입력해주세요...");
                setTimeout(() => { if (chatInput && !isSessionTimedOut) chatInput.focus(); }, 100);
            } else {
                console.log("[displayCurrentStageUI] All subjective questions answered. Advancing to stage 7 (Objective intro).");
                advanceConsultationStage(7);
            }
            break;

        case 7:
            hideSuggestionButtons(true);
            console.log("[displayCurrentStageUI] Processing stage 7 (Objective intro)");
            actionText = "루비가 만족스러운 표정으로";
            assistantMsgWithTags = `주관식 질문에 모두 답해줘서 고마워! 😊<br><br>이제 마지막으로 ${MAX_OBJECTIVE_QUESTIONS}개의 객관식 질문에 답해주면 싱크타입 테스트는 끝이야.<br>준비됐으면 알려줘!`;
            suggestionTexts = ["좋아! 시작하자 ✨"];
            setChatInputDisabled(true, "버튼으로 알려주세요.");
            await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);
            console.log("[displayCurrentStageUI] Stage 7: Creating '좋아! 시작하자 ✨' button.");
            createSuggestionButtons(suggestionTexts, handleButtonClick);
            break;

        case 8:
            hideSuggestionButtons(true);
            console.log("[displayCurrentStageUI] Processing stage 8 (Objective questions start)");
            const existingObjectiveContainersForCase8 = section2.querySelectorAll('.objective-questions-container');
            if (existingObjectiveContainersForCase8.length > 0) {
                console.log("[displayCurrentStageUI] Case 8: Clearing existing objective question containers before drawing new ones.");
                existingObjectiveContainersForCase8.forEach(container => container.remove());
            }

            actionText = "루비가 눈을 반짝이며";
            assistantMsgWithTags = `좋아! 그럼 첫 번째 객관식 질문이야.<br>각 질문에 대해 가장 가깝다고 생각하는 답변을 선택해줘!`;

            현재표시된객관식질문들 = [...객관식질문세트];
            currentObjectiveQuestionIndex = 0;
            console.log(`[displayCurrentStageUI] Case 8: Initialized currentObjectiveQuestionIndex to ${currentObjectiveQuestionIndex}`);

            userProfile.DISC_D_점수 = 0; userProfile.DISC_I_점수 = 0;
            userProfile.DISC_S_점수 = 0; userProfile.DISC_C_점수 = 0;
            userProfile.객관식질문과답변 = [];
            console.log("[displayCurrentStageUI] Case 8: User profile for objective questions reset.");

            await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);

            if (현재표시된객관식질문들.length > 0 && currentObjectiveQuestionIndex < MAX_OBJECTIVE_QUESTIONS) {
                console.log("[displayCurrentStageUI] Case 8: Calling displayCurrentObjectiveQuestion for the first question.");
                await displayCurrentObjectiveQuestion();
            } else {
                console.error("[displayCurrentStageUI] Case 8: No objective questions to display or index issue.");
                advanceConsultationStage(9);
            }
            setChatInputDisabled(true, "질문에 답변해주세요.");
            break;

        case 9:
            hideSuggestionButtons(true);
            console.log("[displayCurrentStageUI] Processing stage 9 (Sync Type result API call wait)");
            actionText = "루비가 두 손을 모아 기도하며";
            assistantMsgWithTags = "정말 고생많았어! 😉 모든 질문에 답해줬네.<br><br>그럼 이제 너의 선택을 종이에 적어서 우주로 띄워 보낼게 🌠 <br><br>잠시만 기다려줘.. 너의 싱크타입을 찾아서 올게!"; // 메시지 변경
            suggestionTexts = ["응, 찾아줘!"]; // 버튼 텍스트 변경
            setChatInputDisabled(true, "아래 버튼을 눌러주세요.");
            await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);
            createSuggestionButtons(suggestionTexts, handleButtonClick); // 이 버튼 누르면 handleButtonClick에서 싱크타입 결정 API 호출
            break;

        case 10:
            console.log(`[displayCurrentStageUI] Processing stage 10 (Conversation).`);
            if (isSessionTimedOut) {
                console.log("[displayCurrentStageUI] Session timed out. Skipping UI display for stage 10.");
                return;
            }
            // 이모티콘 표시는 sendApiRequest 내부에서 API 응답 후 처리됨.

            if (!isApiLoading) { // API 로딩 중이 아닐 때만 입력창 상태 관리
                const hasSampleAnswerCurrently = lastApiResponse && lastApiResponse.sampleanswer && String(lastApiResponse.sampleanswer).trim() !== "";
                if (hasSampleAnswerCurrently) {
                     setChatInputDisabled(false, "직접 루비에게 메세지를 보낼 수도 있어요 ✨");
                     console.log("[displayCurrentStageUI] Stage 10: Sample answer likely present. Input enabled, no auto-focus here.");
                } else {
                     setChatInputDisabled(false, "루비에게 하고 싶은 말을 전해주세요. ✨");
                     console.log("[displayCurrentStageUI] Stage 10: Normal conversation. Input enabled, attempting focus.");
                     setTimeout(() => { if (chatInput && !chatInput.disabled && !isSessionTimedOut) chatInput.focus(); }, 100);
                }
            } else {
                 console.log("[displayCurrentStageUI] Stage 10: API is loading. Input state managed by sendApiRequest.");
            }
            resetSessionTimers();
            break;

        default:
            hideSuggestionButtons(true);
            console.warn(`[displayCurrentStageUI] Unknown stage: ${currentConsultationStage}. Resetting to stage 1.`);
            actionText = "루비가 어리둥절하며";
            assistantMsgWithTags = "앗, 길을 잃은 것 같아요! [exp007] 처음부터 다시 시작해볼까요?";
            suggestionTexts = ["응, 처음으로"];

            currentConsultationStage = 1;
            isSessionTimedOut = false;
            isFirstBotMessageDisplayed = false;
            showStage10EntryEmoticon = false;
            isInitialApiCallAfterObjectiveTest = false;
            clearSessionTimers();
            updateUserProfile({ "사용자소속성운": null, "결정된싱크타입": null }); // 알 수 없는 단계 진입 시 성운 정보 초기화

            setChatInputDisabled(true, "아래 버튼을 눌러주세요.");
            await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);
            createSuggestionButtons(suggestionTexts, handleButtonClick);
            break;
    }
    manageSendButtonState();
    console.log(`[displayCurrentStageUI] END - currentConsultationStage: ${currentConsultationStage} UI display complete.`);
}
    async function displayHardcodedUIElements(action, messageWithTags, suggestionButtonTexts = [], buttonClickHandler) {
        console.log("[displayHardcodedUIElements] 표시 시작. 액션:", action, "메시지(태그포함):", messageWithTags ? messageWithTags.substring(0,30)+"..." : "없음");
        if (isSessionTimedOut && !(action && action.includes("아쉬운 표정으로"))) { // 세션 종료 메시지는 표시 허용
             console.log("[displayHardcodedUIElements] 세션 타임아웃. UI 요소 표시 건너뜀.");
             return;
        }

        setSendButtonLoading(isApiLoading, true);

        try {
            if (action || messageWithTags) {
                showTypingIndicator();
                await new Promise(resolve => setTimeout(resolve, 500));
                await hideTypingIndicator();
            }

            if (action) {
                const actionEl = await createActionTextElement(action);
                if(section2) section2.appendChild(actionEl);
                await animateActionText(actionEl, action);
                scrollToBottom();
                await new Promise(resolve => setTimeout(resolve, 50));
            }

            if (messageWithTags) {
                const initialParagraphElement = createTextMessageElement("", false);
                if(section2) section2.appendChild(initialParagraphElement);
                applyFadeIn(initialParagraphElement);
                await animateBotMessageText(initialParagraphElement, messageWithTags);
                // 하드코딩된 메시지도 대화 기록에 추가 (모델 응답처럼)
                // 단, API 응답과 구분하기 위해 role을 다르게 하거나, content 형식을 다르게 할 수 있음
                // 여기서는 일단 모델 응답처럼 기록 (필요시 수정)
                conversationHistory.push({ role: "model", parts: [{ text: JSON.stringify({ action: action, assistantmsg: messageWithTags }) }] });
                console.log("[displayHardcodedUIElements] 대화 기록에 하드코딩된 모델 턴 추가");
            }

            await new Promise(resolve => setTimeout(resolve, 100));

            if (suggestionButtonTexts && suggestionButtonTexts.length > 0) {
                createSuggestionButtons(suggestionButtonTexts, buttonClickHandler);
            }
        } finally {
            setSendButtonLoading(isApiLoading, false);
            console.log("[displayHardcodedUIElements] UI 처리 완료, 버튼 상태 복원 시도.");
        }
    }

function displayTarotSelectionUI(numberOfCardsToSelect, selectionCallback) {
    console.log(`[displayTarotSelectionUI] ${numberOfCardsToSelect}장 카드 선택 UI (취소 버튼 추가)`);
    if (isSessionTimedOut) {
        console.log("[displayTarotSelectionUI] 세션 타임아웃. UI 표시 안 함.");
        return;
    }

    const existingTarotArea = document.getElementById('tarotSelectionArea');
    if (existingTarotArea) existingTarotArea.remove();
    const existingAutoSelectButtons = document.getElementById('autoSelectButtonsContainer');
    if (existingAutoSelectButtons) existingAutoSelectButtons.remove();
    hideSuggestionButtons(true);


    const uiContainer = document.createElement('div');
    uiContainer.classList.add('tarot-selection-container');
    uiContainer.id = 'tarotSelectionArea';

    const cardListElement = document.createElement('div');
    cardListElement.classList.add('tarot-card-list');
    let selectedCards = [];
    let cardItemElements = {};

    const cardsToDisplayCount = Math.min(78, Math.max(numberOfCardsToSelect + 10, 40));
    const availableCards = [...ALL_TAROT_CARD_IDS].sort(() => 0.5 - Math.random()).slice(0, cardsToDisplayCount);

    availableCards.forEach(actualCardId => {
        const cardItemDiv = document.createElement('div');
        cardItemDiv.classList.add('tarot-card-item');
        cardItemDiv.dataset.cardId = actualCardId;
        cardItemElements[actualCardId] = cardItemDiv;
        const cardImg = document.createElement('img');
        cardImg.src = `images/card_back.png`;
        cardImg.alt = "타로 카드 뒷면";
        cardItemDiv.appendChild(cardImg);
        const cardNameOverlay = document.createElement('div');
        cardNameOverlay.classList.add('card-name-overlay');
        const randomFeeling = getRandomItem(RANDOM_CARD_FEELINGS);
        cardNameOverlay.textContent = randomFeeling || "어떤 카드일까?";
        cardItemDiv.appendChild(cardNameOverlay);
        cardItemDiv.addEventListener('click', () => handleCardItemClick(actualCardId));
        cardListElement.appendChild(cardItemDiv);
    });
    uiContainer.appendChild(cardListElement);

    const confirmButton = document.createElement('button');
    confirmButton.classList.add('tarot-selection-confirm-button');
    confirmButton.textContent = `이 카드들 선택하기 (0/${numberOfCardsToSelect})`;
    confirmButton.disabled = true;
    uiContainer.appendChild(confirmButton);

    if (section2) {
        section2.appendChild(uiContainer);
    } else {
        console.error("[displayTarotSelectionUI] section2 요소를 찾을 수 없어 카드 선택 UI 표시 불가.");
        return;
    }

    const autoSelectButtonsContainer = document.createElement('div');
    autoSelectButtonsContainer.id = 'autoSelectButtonsContainer';
    autoSelectButtonsContainer.style.display = 'flex';
    autoSelectButtonsContainer.style.justifyContent = 'center';
    autoSelectButtonsContainer.style.gap = '10px';
    autoSelectButtonsContainer.style.padding = '10px 0';
    autoSelectButtonsContainer.style.width = '100%';

    const autoSelectOneButton = document.createElement('div');
    autoSelectOneButton.classList.add('suggestion-button');
    autoSelectOneButton.textContent = "1장 선택해줘";
    autoSelectOneButton.style.opacity = '1';
    autoSelectOneButton.style.transform = 'translateY(0)';
    autoSelectOneButton.addEventListener('click', () => handleAutoSelectButtonClick("1장 선택해줘"));
    autoSelectButtonsContainer.appendChild(autoSelectOneButton);

    const autoSelectRemainingButton = document.createElement('div');
    autoSelectRemainingButton.classList.add('suggestion-button');
    autoSelectRemainingButton.textContent = "남은 장수만큼 선택"; // 텍스트 변경
    autoSelectRemainingButton.style.opacity = '1';
    autoSelectRemainingButton.style.transform = 'translateY(0)';
    autoSelectRemainingButton.addEventListener('click', () => handleAutoSelectButtonClick("남은 장수만큼 선택"));
    autoSelectButtonsContainer.appendChild(autoSelectRemainingButton);

    // "취소" 버튼 추가
    const cancelLastSelectionButton = document.createElement('div');
    cancelLastSelectionButton.classList.add('suggestion-button');
    cancelLastSelectionButton.textContent = "취소";
    cancelLastSelectionButton.style.opacity = '1';
    cancelLastSelectionButton.style.transform = 'translateY(0)';
    cancelLastSelectionButton.addEventListener('click', () => handleCancelLastSelectionClick());
    autoSelectButtonsContainer.appendChild(cancelLastSelectionButton);


    if (section2) {
        if (uiContainer.nextSibling) {
            section2.insertBefore(autoSelectButtonsContainer, uiContainer.nextSibling);
        } else {
            section2.appendChild(autoSelectButtonsContainer);
        }
    }
    scrollToBottom(true);


    function updateMainConfirmButtonState() {
        confirmButton.textContent = `이 카드들 선택하기 (${selectedCards.length}/${numberOfCardsToSelect})`;
        confirmButton.disabled = selectedCards.length !== numberOfCardsToSelect;
    }

    function scrollToLastSelectedCard(lastSelectedCardId) {
        if (lastSelectedCardId && cardItemElements[lastSelectedCardId] && cardListElement) {
            cardItemElements[lastSelectedCardId].scrollIntoView({
                behavior: 'smooth', block: 'nearest', inline: 'nearest'
            });
        }
    }

    function updateDedicatedAutoSelectButtonsState() {
        const canSelectMore = selectedCards.length < numberOfCardsToSelect;
        const unselectedCardIds = availableCards.filter(id => !selectedCards.includes(id));

        if (canSelectMore && unselectedCardIds.length > 0) {
            autoSelectOneButton.disabled = false;
            autoSelectOneButton.style.opacity = '1';
            autoSelectOneButton.style.pointerEvents = 'auto';
            autoSelectOneButton.style.cursor = 'pointer';
        } else {
            autoSelectOneButton.disabled = true;
            autoSelectOneButton.style.opacity = '0.5';
            autoSelectOneButton.style.pointerEvents = 'none';
            autoSelectOneButton.style.cursor = 'not-allowed';
        }

        if (canSelectMore && unselectedCardIds.length > 0) {
            autoSelectRemainingButton.disabled = false;
            autoSelectRemainingButton.style.opacity = '1';
            autoSelectRemainingButton.style.pointerEvents = 'auto';
            autoSelectRemainingButton.style.cursor = 'pointer';
        } else {
            autoSelectRemainingButton.disabled = true;
            autoSelectRemainingButton.style.opacity = '0.5';
            autoSelectRemainingButton.style.pointerEvents = 'none';
            autoSelectRemainingButton.style.cursor = 'not-allowed';
        }

        // "취소" 버튼 상태 업데이트
        if (selectedCards.length > 0) {
            cancelLastSelectionButton.disabled = false;
            cancelLastSelectionButton.style.opacity = '1';
            cancelLastSelectionButton.style.pointerEvents = 'auto';
            cancelLastSelectionButton.style.cursor = 'pointer';
        } else {
            cancelLastSelectionButton.disabled = true;
            cancelLastSelectionButton.style.opacity = '0.5';
            cancelLastSelectionButton.style.pointerEvents = 'none';
            cancelLastSelectionButton.style.cursor = 'not-allowed';
        }
    }


    function handleCardItemClick(cardId) {
        if (isSessionTimedOut) return;

        const cardDiv = cardItemElements[cardId];
        if (!cardDiv) return;
        let lastInteractedCardId = cardId;
        const index = selectedCards.indexOf(cardId);

        if (index > -1) {
            selectedCards.splice(index, 1);
            cardDiv.classList.remove('selected');
            lastInteractedCardId = null;
        } else {
            if (selectedCards.length < numberOfCardsToSelect) {
                selectedCards.push(cardId);
                cardDiv.classList.add('selected');
            } else {
                lastInteractedCardId = null;
            }
        }
        updateMainConfirmButtonState();
        updateDedicatedAutoSelectButtonsState();
        if (lastInteractedCardId) {
            scrollToLastSelectedCard(lastInteractedCardId);
        }
    }

    function handleAutoSelectButtonClick(buttonText) {
        if (isSessionTimedOut) return;

        if (buttonText === "1장 선택해줘" && autoSelectOneButton.disabled) return;
        if (buttonText === "남은 장수만큼 선택" && autoSelectRemainingButton.disabled) return;

        const unselectedCardIds = availableCards.filter(id => !selectedCards.includes(id));
        let lastAutoSelectedId = null;

        if (buttonText === "1장 선택해줘") {
            if (selectedCards.length < numberOfCardsToSelect && unselectedCardIds.length > 0) {
                const cardToSelect = unselectedCardIds[Math.floor(Math.random() * unselectedCardIds.length)];
                if (cardToSelect && !selectedCards.includes(cardToSelect)) {
                    selectedCards.push(cardToSelect);
                    cardItemElements[cardToSelect].classList.add('selected');
                    lastAutoSelectedId = cardToSelect;
                }
            }
        } else if (buttonText === "남은 장수만큼 선택") { // 텍스트 변경 반영
            const remainingNeeded = numberOfCardsToSelect - selectedCards.length;
            if (remainingNeeded > 0 && unselectedCardIds.length > 0) {
                const cardsToSelectMultiple = unselectedCardIds
                    .sort(() => 0.5 - Math.random())
                    .slice(0, Math.min(remainingNeeded, unselectedCardIds.length));
                cardsToSelectMultiple.forEach(cardId => {
                    if (!selectedCards.includes(cardId)) {
                        selectedCards.push(cardId);
                        cardItemElements[cardId].classList.add('selected');
                        lastAutoSelectedId = cardId;
                    }
                });
            }
        }
        updateMainConfirmButtonState();
        updateDedicatedAutoSelectButtonsState();
        if (lastAutoSelectedId) {
            scrollToLastSelectedCard(lastAutoSelectedId);
        }
    }

    // "취소" 버튼 클릭 핸들러 함수
    function handleCancelLastSelectionClick() {
        if (isSessionTimedOut || cancelLastSelectionButton.disabled) return;

        if (selectedCards.length > 0) {
            const lastSelectedCardIdToCancel = selectedCards.pop(); // 마지막 요소 제거 및 반환
            if (cardItemElements[lastSelectedCardIdToCancel]) {
                cardItemElements[lastSelectedCardIdToCancel].classList.remove('selected');
                // 취소된 카드로 스크롤 (선택적)
                // scrollToLastSelectedCard(lastSelectedCardIdToCancel);
            }
        }
        updateMainConfirmButtonState();
        updateDedicatedAutoSelectButtonsState();
    }

    updateDedicatedAutoSelectButtonsState();


    confirmButton.onclick = async () => {
        if (isSessionTimedOut) return;
        if (selectedCards.length === numberOfCardsToSelect) {
            console.log("[displayTarotSelectionUI] 카드 선택 완료. section2에 최종 확인 질문 표시 시도.");
            if (autoSelectButtonsContainer && autoSelectButtonsContainer.parentNode) {
                autoSelectButtonsContainer.remove();
            }

            confirmButton.disabled = true;
            cardListElement.querySelectorAll('.tarot-card-item').forEach(item => {
                item.style.pointerEvents = 'none';
            });

            const oldQuestionP = document.getElementById('tarotSelectionQuestionP');
            if (oldQuestionP) oldQuestionP.remove();

            const questionPElement = createTextMessageElement("", false);
            questionPElement.id = 'tarotSelectionQuestionP';
            if (section2) {
                section2.appendChild(questionPElement);
                applyFadeIn(questionPElement);
                await animateBotMessageText(questionPElement, "선택 완료한거지? 🤔");
                scrollToBottom(true);
            } else {
                console.error("[displayTarotSelectionUI] section2 없음. 확인 메시지 표시 불가");
                return;
            }

            const finalConfirmSuggestionTexts = ["응!", "아니, 다시 고를래"];
            createSuggestionButtons(finalConfirmSuggestionTexts, async (clickedText) => {
                if (isSessionTimedOut) return;

                if (clickedText === "아니, 다시 고를래") {
                    console.log("[displayTarotSelectionUI] 최종 확인: '아니, 다시 고를래' 선택됨.");
                    if (questionPElement && questionPElement.parentNode) {
                        questionPElement.remove();
                    }
                    confirmButton.disabled = false;
                    cardListElement.querySelectorAll('.tarot-card-item').forEach(item => {
                        item.style.pointerEvents = 'auto';
                    });
                    updateMainConfirmButtonState();
                    if (section2 && !document.getElementById('autoSelectButtonsContainer')) {
                        if (uiContainer.nextSibling) {
                             section2.insertBefore(autoSelectButtonsContainer, uiContainer.nextSibling);
                        } else {
                             section2.appendChild(autoSelectButtonsContainer);
                        }
                    }
                    updateDedicatedAutoSelectButtonsState();
                    if (uiContainer) {
                        uiContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                } else if (clickedText === "응!") {
                    console.log("[displayTarotSelectionUI] 최종 확인: '응!' 선택됨.");
                    const userMessageElement = createTextMessageElement("응!", true);
                    if (section2) {
                        section2.appendChild(userMessageElement);
                        applyFadeIn(userMessageElement);
                        scrollToBottom(true);
                    }
                    conversationHistory.push({ role: "user", parts: [{ text: "응!" }] });
                    selectionCallback(selectedCards);
                }
            });
        }
    };
}


async function handleObjectiveOptionSelection(selectedValue, questionType, questionIndex) {
    console.log(`[handleObjectiveOptionSelection] START - questionIndex: ${questionIndex}, selectedValue: ${selectedValue}, type: ${questionType}`);
    if (isSessionTimedOut) {
        console.log("[handleObjectiveOptionSelection] 세션 타임아웃. 처리 중단.");
        return;
    }

    const currentQuestionText = 현재표시된객관식질문들[questionIndex].question;
    const objectiveAnswerText = `(객관식 답변 ${questionIndex + 1}) 질문 "${currentQuestionText}"에 대해 "${selectedValue}" 선택`;

    // conversationHistory 업데이트
    const existingAnswerIndexInHistory = conversationHistory.findIndex(
        item => item.role === "user" && item.isObjectiveAnswer === true && item.questionIndex === questionIndex
    );
    if (existingAnswerIndexInHistory > -1) {
        conversationHistory[existingAnswerIndexInHistory].parts = [{ text: objectiveAnswerText }];
        console.log(`[handleObjectiveOptionSelection] Conversation history updated for questionIndex: ${questionIndex}`);
    } else {
        conversationHistory.push({
            role: "user", isObjectiveAnswer: true, questionIndex: questionIndex,
            parts: [{ text: objectiveAnswerText }]
        });
        console.log(`[handleObjectiveOptionSelection] New entry in conversation history for questionIndex: ${questionIndex}`);
    }

    const isFirstTimeAnsweringThisQuestion = !userProfile.객관식질문과답변.some(ans => ans.questionIndex === questionIndex);
    console.log(`[handleObjectiveOptionSelection] questionIndex: ${questionIndex}, isFirstTimeAnsweringThisQuestion: ${isFirstTimeAnsweringThisQuestion}`);

    const profileAnswerIndex = userProfile.객관식질문과답변.findIndex(item => item.questionIndex === questionIndex);
    if (profileAnswerIndex > -1) {
        userProfile.객관식질문과답변[profileAnswerIndex].answer = selectedValue;
        console.log(`[handleObjectiveOptionSelection] User profile answer updated for questionIndex: ${questionIndex}`);
    } else {
        userProfile.객관식질문과답변.push({
            questionIndex: questionIndex, question: currentQuestionText,
            type: questionType, answer: selectedValue
        });
        console.log(`[handleObjectiveOptionSelection] New answer added to user profile for questionIndex: ${questionIndex}`);
    }

    userProfile.DISC_D_점수 = 0; userProfile.DISC_I_점수 = 0;
    userProfile.DISC_S_점수 = 0; userProfile.DISC_C_점수 = 0;
    userProfile.객관식질문과답변.forEach(item => {
        let score = 0;
        switch (item.answer) {
            case "매우 그렇다": score = 5; break; case "그렇다": score = 4; break;
            case "보통이다": score = 3; break; case "아니다": score = 2; break;
            case "전혀 그렇지 않다": score = 1; break; default: score = 0;
        }
        switch (item.type) {
            case "D": userProfile.DISC_D_점수 += score; break; case "I": userProfile.DISC_I_점수 += score; break;
            case "S": userProfile.DISC_S_점수 += score; break; case "C": userProfile.DISC_C_점수 += score; break;
        }
    });
    console.log(`[handleObjectiveOptionSelection] Recalculated DISC scores: D=${userProfile.DISC_D_점수}, I=${userProfile.DISC_I_점수}, S=${userProfile.DISC_S_점수}, C=${userProfile.DISC_C_점수}`);

    if (isFirstTimeAnsweringThisQuestion) {
        console.log(`[handleObjectiveOptionSelection] First time answering question ${questionIndex + 1}. Checking if next question should be displayed.`);
        if (questionIndex < MAX_OBJECTIVE_QUESTIONS - 1) {
            const nextQuestionIndexToDisplay = questionIndex + 1;
            console.log(`[handleObjectiveOptionSelection] Preparing to display next question: ${nextQuestionIndexToDisplay + 1}`);
            const nextQuestionContainerId = `objective_question_container_${nextQuestionIndexToDisplay}`;
            if (!document.getElementById(nextQuestionContainerId)) {
                currentObjectiveQuestionIndex = nextQuestionIndexToDisplay;
                console.log(`[handleObjectiveOptionSelection] Global currentObjectiveQuestionIndex updated to: ${currentObjectiveQuestionIndex}`);
                await displayCurrentObjectiveQuestion();
            } else {
                console.log(`[handleObjectiveOptionSelection] Next question UI (for index ${nextQuestionIndexToDisplay}) already exists. Skipping draw.`);
            }
        } else {
            console.log(`[handleObjectiveOptionSelection] This was the last question (index ${questionIndex}). No next question to display automatically.`);
        }
    } else {
        console.log(`[handleObjectiveOptionSelection] Not the first time answering question ${questionIndex + 1}. Not displaying next question automatically.`);
    }

    const allQuestionsAnsweredOnce = userProfile.객관식질문과답변.length === MAX_OBJECTIVE_QUESTIONS;
    console.log(`[handleObjectiveOptionSelection] allQuestionsAnsweredOnce: ${allQuestionsAnsweredOnce}`);

    if (allQuestionsAnsweredOnce) {
        // ★★★ 수정된 버튼 표시 로직 ★★★
        const existingCompletionButtons = document.querySelector('#suggestionButtons .completion-option-button');

        if (!existingCompletionButtons) { // "선택 완료" 관련 버튼이 아직 없다면 생성
            hideSuggestionButtons(true); // 다른 종류의 제안 버튼이 있었다면 제거
            console.log("[handleObjectiveOptionSelection] All questions answered. Displaying final confirmation options FOR THE FIRST TIME.");
            const finalObjectiveOptions = ["선택 완료! ✨", "객관식만 다시 할래", "테스트 처음부터 다시"];
            createSuggestionButtons(finalObjectiveOptions, async (buttonText) => {
                // 버튼에 식별용 클래스 추가 (버튼 생성 시점에 한 번만)
                // 이 부분은 createSuggestionButtons 내부에서 처리하거나, 여기서 DOM 조작으로 추가할 수 있으나,
                // createSuggestionButtons가 매번 새로 버튼을 만들므로, buttonText로 구분하는 것이 더 간단할 수 있음.
                // 여기서는 버튼 클릭 핸들러 내에서 처리하도록 유지.

                if (isSessionTimedOut) return;
                const userResponseElement = createTextMessageElement(buttonText, true);
                if(section2) section2.appendChild(userResponseElement);
                applyFadeIn(userResponseElement);
                scrollToBottom(true);
                conversationHistory.push({ role: "user", parts: [{ text: buttonText }] });
                hideSuggestionButtons(true); // 어떤 버튼을 누르든 현재 제안 버튼 세트는 제거

                if (buttonText === "선택 완료! ✨") {
                    advanceConsultationStage(9);
                } else if (buttonText === "객관식만 다시 할래") {
                    const existingObjectiveContainers = section2.querySelectorAll('.objective-questions-container');
                    existingObjectiveContainers.forEach(container => container.remove());
                    currentConsultationStage = 8;
                    await displayCurrentStageUI(); // displayCurrentStageUI의 case 8에서 초기화
                } else if (buttonText === "테스트 처음부터 다시") {
                    const existingObjectiveContainers = section2.querySelectorAll('.objective-questions-container');
                    existingObjectiveContainers.forEach(container => container.remove());
                    for (let i = 1; i <= MAX_SUBJECTIVE_QUESTIONS; i++) {
                        userProfile[`주관식질문${i}`] = null; userProfile[`주관식답변${i}`] = null;
                    }
                    현재주관식질문인덱스 = 0;
                    advanceConsultationStage(4);
                }
            });
            // 생성된 버튼에 식별용 클래스 추가 (createSuggestionButtons 호출 후)
            if (suggestionButtonsContainer) {
                const buttons = suggestionButtonsContainer.querySelectorAll('.suggestion-button');
                buttons.forEach(btn => btn.classList.add('completion-option-button'));
                suggestionButtonsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            // 이미 "선택 완료" 관련 버튼들이 있다면, 숨기지 않고 그대로 둠.
            // (사용자가 답변을 수정해도 이 버튼들은 계속 보여야 함)
            console.log("[handleObjectiveOptionSelection] Completion buttons already visible. Doing nothing to them.");
            // 필요하다면 스크롤만 조정
            if (suggestionButtonsContainer && suggestionButtonsContainer.classList.contains('visible')) {
                 suggestionButtonsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    } else {
        // 아직 모든 질문에 답변하지 않았다면, "선택 완료" 관련 버튼이 없어야 함.
        // 만약 이전에 표시되었다가 (예: 모든 질문 답변 후 일부를 다시 미답변 상태로 만들 수는 없지만, 이론상)
        // 다시 이 조건으로 왔다면, 해당 버튼들을 숨김.
        const existingCompletionButtons = document.querySelector('#suggestionButtons .completion-option-button');
        if (existingCompletionButtons) {
            console.log("[handleObjectiveOptionSelection] Not all questions answered, but completion buttons exist. Hiding them.");
            hideSuggestionButtons(true);
        }
    }
    console.log(`[handleObjectiveOptionSelection] END - questionIndex: ${questionIndex}`);
}



    async function displayCurrentObjectiveQuestion() {
        console.log(`[displayCurrentObjectiveQuestion] START - Drawing UI for question index: ${currentObjectiveQuestionIndex}`);

        if (isSessionTimedOut) {
            console.log("[displayCurrentObjectiveQuestion] 세션 타임아웃. 처리 중단.");
            return;
        }

        const questionIndexToDraw = currentObjectiveQuestionIndex;

        const existingQuestionContainerId = `objective_question_container_${questionIndexToDraw}`;
        const existingQuestionContainer = document.getElementById(existingQuestionContainerId);
        if (existingQuestionContainer) {
            console.log(`[displayCurrentObjectiveQuestion] Question UI for index ${questionIndexToDraw} already exists. Skipping draw.`);
            return;
        }

        if (questionIndexToDraw >= 현재표시된객관식질문들.length || questionIndexToDraw >= MAX_OBJECTIVE_QUESTIONS) {
            console.error(`[displayCurrentObjectiveQuestion] Invalid question index to draw: ${questionIndexToDraw}`);
            return;
        }

        const qData = 현재표시된객관식질문들[questionIndexToDraw];
        if (!qData) {
            console.error(`[displayCurrentObjectiveQuestion] No question data for index ${questionIndexToDraw}`);
            return;
        }

        console.log(`[displayCurrentObjectiveQuestion] Drawing question: "${qData.question}"`);

        const questionOuterContainer = document.createElement('div');
        questionOuterContainer.id = `objective_question_container_${questionIndexToDraw}`;
        questionOuterContainer.classList.add('objective-questions-container');

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('objective-question-item');
        const questionTextP = createTextMessageElement(`${questionIndexToDraw + 1}. ${qData.question}`, false, true);
        questionTextP.innerHTML = `${questionIndexToDraw + 1}. ${qData.question}`;
        questionDiv.appendChild(questionTextP);
        questionOuterContainer.appendChild(questionDiv);

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options-group');
        const commonOptions = ["매우 그렇다", "그렇다", "보통이다", "아니다", "전혀 그렇지 않다"];
        const optionElements = [];

        commonOptions.forEach(optionText => {
            const label = document.createElement('label');
            label.classList.add('radio-label');

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `objective_q_${questionIndexToDraw}`;
            radio.value = optionText;

            const previousAnswer = userProfile.객관식질문과답변.find(ans => ans.questionIndex === questionIndexToDraw);
            if (previousAnswer && previousAnswer.answer === optionText) {
                radio.checked = true;
            }

            // ★★★ 여기가 중요: handleObjectiveOptionSelection 함수가 이 스코프에서 접근 가능한지 확인 ★★★
            radio.onchange = (e) => {
                if (isSessionTimedOut) return;
                // handleObjectiveOptionSelection 함수가 전역 스코프 또는 이 함수와 같은 스코프에 정의되어 있어야 함.
                handleObjectiveOptionSelection(e.target.value, qData.type, questionIndexToDraw);
            };

            label.appendChild(radio);
            label.appendChild(document.createTextNode(optionText));
            optionsDiv.appendChild(label);
            optionElements.push(label);
        });

        questionDiv.appendChild(optionsDiv);

        if(section2) section2.appendChild(questionOuterContainer);
        applyFadeIn(questionTextP);
        optionElements.forEach(el => {
            el.style.opacity = 0;
            applyFadeIn(el);
        });

        scrollToBottom(true);
        console.log(`[displayCurrentObjectiveQuestion] END - Question UI for index ${questionIndexToDraw} created.`);
    }
    async function handleButtonClick(buttonText) {
        console.log(`[handleButtonClick] 버튼 클릭됨: "${buttonText}", 현재 단계: ${currentConsultationStage}`);
        if (isSessionTimedOut && buttonText !== "새로운 상담 시작하기") {
            console.log("[handleButtonClick] 세션 타임아웃. 버튼 클릭 무시.");
            return;
        }

        userHasScrolledUp = false;
        scrollToBottom(true);
        hideSuggestionButtons();
        const userMessageElement = createTextMessageElement(buttonText, true);
        if(section2) section2.appendChild(userMessageElement);
        applyFadeIn(userMessageElement);
        conversationHistory.push({ role: "user", parts: [{ text: buttonText }] });
        console.log("[handleButtonClick] 대화 기록에 사용자 턴 추가:", buttonText);

        if (currentConsultationStage === 10 && buttonText !== "새로운 상담 시작하기") {
            resetSessionTimers();
        }

        let nextStage = null;
        let hardcodedAction = null;
        let hardcodedMsgWithTags = null;
        let hardcodedSuggestions = [];
        let shouldDisplayHardcodedUI = false;

        // 시나리오 값 설정을 위한 임시 변수
        let scenarioToSet = null;

        if (currentConsultationStage === 1) {
            currentSelectedTarotType = buttonText;
            if (rubyImageElement && !rubyImageElement.classList.contains('blurred')) {
                rubyImageElement.classList.add('blurred');
            }
            nextStage = 2;
        } else if (currentConsultationStage === 2) {
            if (buttonText === "응") {
                updateUserProfile({ "사용자의고민": currentSelectedTarotType });
                nextStage = 3;
            } else {
                hardcodedAction = "루비가 미소지으며";
                hardcodedMsgWithTags = "그래 좋아, 그럼 오늘은 어떤 타로를 보고싶어?";
                hardcodedSuggestions = Object.values(TAROT_TYPES);
                shouldDisplayHardcodedUI = true;
                currentConsultationStage = 1;
            }
        } else if (currentConsultationStage === 3) {
            if (buttonText === "당연하지") {
                tempSelectedConstellation = null;
                nextStage = 3.5;
            } else if (buttonText === "그게뭐야?") {
                hardcodedMsgWithTags = "헤헤 모르는구나? 그럼 싱크타입에 대해 설명해 줄게 😊<br><br>싱크타입은 타로 해석의 정확도를 높이기 위한 과정이야.<br><br>다양한 이론, 통계, 그리고 심리 분석을 바탕으로 너에게 가장 강하게 <b>'이끌리는 성운'</b> 과 그 성운 안에서 <b>'너의 고유한 타입'</b> 을 결정하게 돼.<br><br>이렇게 너의 싱크타입이 명확해지면, 그 특성에 맞춰 타로 카드의 의미를 더 깊이 있고 정확하게 해석할 수 있어.<br><br>타로에는 <b>너의 믿음과 현재의 기운이 반영되는 게</b> 중요하거든.<br>그럼 이 테스트를 통해 너의 싱크타입을 알아볼래?";
                hardcodedSuggestions = ["오오 정말? 좋아!", "바쁘니깐 나중에할게"];
                shouldDisplayHardcodedUI = true;
            } else if (buttonText === "오오 정말? 좋아!") {
                현재주관식질문인덱스 = 0;
                nextStage = 4;
            } else if (buttonText === "바쁘니깐 나중에할게") {
                // 시나리오 3
                scenarioToSet = "시나리오 3 - 바쁜가보다 그럼 빨리 봐보자 라고 말하며 타로 진행";
                updateUserProfile({ "시나리오": scenarioToSet });
                console.log(`[handleButtonClick] 시나리오 설정: ${scenarioToSet}`);

                hardcodedAction = "루비가 아쉬워하며";
                hardcodedMsgWithTags = "에고 그렇구나.. 좋아 그러면 바로 타로를 시작하자!";
                await displayHardcodedUIElements(hardcodedAction, hardcodedMsgWithTags, [], handleButtonClick);

                currentConsultationStage = 10;
                showStage10EntryEmoticon = true;
                isInitialApiCallAfterObjectiveTest = true;
                messageBuffer = "사용자가 싱크타입 테스트를 건너뛰고 타로를 바로 시작합니다. (시나리오 3)";
                await sendApiRequest(0);
                return;
            }
        } else if (currentConsultationStage === 3.5) {
            if (!tempSelectedConstellation) {
                if (ALL_CONSTELLATION_NAMES.includes(buttonText)) {
                    tempSelectedConstellation = buttonText;
                    displayCurrentStageUI(); return;
                } else if (buttonText === "기억안나 (성운)") {
                    hardcodedAction = "루비가 안타까워하며";
                    hardcodedMsgWithTags = "성운이 기억나지 않는구나 😂 그럼 싱크타입 테스트를 다시 진행해볼까?";
                    hardcodedSuggestions = ["응, 다시 테스트할게", "아니, 그냥 타로 볼래"];
                    shouldDisplayHardcodedUI = true;
                } else if (buttonText === "처음으로 돌아가기") {
                    nextStage = 1;
                }
            } else { // tempSelectedConstellation이 설정된 후 (즉, 성운 선택 후 싱크타입 선택 단계)
                const constellationData = CONSTELLATIONS_DATA[tempSelectedConstellation];
                const cleanButtonText = buttonText.replace(" (싱크타입)", "");
                if (constellationData && constellationData.syncTypes.includes(cleanButtonText)) {
                    if (cleanButtonText === "기억안나") { // 싱크타입을 "기억안나"로 선택
                        hardcodedAction = "루비가 고개를 갸웃하며";
                        hardcodedMsgWithTags = `이런, ${tempSelectedConstellation} 성운의 싱크타입도 기억나지 않는구나. 그럼 싱크타입 테스트를 다시 진행해볼까?`;
                        hardcodedSuggestions = ["응, 다시 테스트할게", "아니, 그냥 타로 볼래"];
                        shouldDisplayHardcodedUI = true;
                        tempSelectedConstellation = null; // 다음 선택을 위해 초기화
                    } else { // 특정 싱크타입 선택 완료 (시나리오 4)
                        scenarioToSet = "시나리오 4 - 네가 기억해줘서 정말 기쁘다고 말하며 타로 진행";
                        updateUserProfile({
                            "사용자소속성운": tempSelectedConstellation,
                            "결정된싱크타입": cleanButtonText,
                            "시나리오": scenarioToSet
                        });
                        console.log(`[handleButtonClick] 시나리오 설정: ${scenarioToSet}`);
                        tempSelectedConstellation = null;

                        hardcodedAction = "루비가 기뻐하며";
                        hardcodedMsgWithTags = `좋아! 너의 정보가 업데이트되었어. 그럼 이제 바로 타로를 시작해보자!`;
                        await displayHardcodedUIElements(hardcodedAction, hardcodedMsgWithTags, [], handleButtonClick);

                        currentConsultationStage = 10;
                        showStage10EntryEmoticon = true;
                        isInitialApiCallAfterObjectiveTest = true;
                        messageBuffer = `사용자가 자신의 성운(${userProfile.사용자소속성운})과 싱크타입(${userProfile.결정된싱크타입})을 입력하고 타로를 시작합니다. (시나리오 4)`;
                        await sendApiRequest(0);
                        return;
                    }
                } else { // 잘못된 싱크타입 선택 (오류)
                     hardcodedAction = "루비가 당황하며";
                     hardcodedMsgWithTags = "앗, 뭔가 잘못 선택된 것 같아. [exp008] 다시 한번 골라줄래?";
                     displayCurrentStageUI(); return; // 현재 3.5 단계 UI 다시 표시
                }
            }
            // 공통 처리: "응, 다시 테스트할게" 또는 "아니, 그냥 타로 볼래" 버튼 클릭 시
            if (buttonText === "응, 다시 테스트할게") { // 싱크타입 테스트로 돌아감
                tempSelectedConstellation = null;
                현재주관식질문인덱스 = 0;
                nextStage = 4;
            } else if (buttonText === "아니, 그냥 타로 볼래") { // 시나리오 2
                scenarioToSet = "시나리오 2 - 기억이 안날수도 있다고 위로하며 타로 진행";
                updateUserProfile({ "시나리오": scenarioToSet });
                console.log(`[handleButtonClick] 시나리오 설정: ${scenarioToSet}`);
                tempSelectedConstellation = null;

                hardcodedAction = "루비가 알겠다는 듯";
                hardcodedMsgWithTags = "그렇구나.. 😭 알았어. 그럼 바로 타로를 보자!";
                await displayHardcodedUIElements(hardcodedAction, hardcodedMsgWithTags, [], handleButtonClick);

                currentConsultationStage = 10;
                showStage10EntryEmoticon = true;
                isInitialApiCallAfterObjectiveTest = true;
                messageBuffer = "사용자가 싱크타입 정보를 기억하지 못해 바로 타로를 시작합니다. (시나리오 2)";
                await sendApiRequest(0);
                return;
            }
        } else if (currentConsultationStage === 4) { // 주관식 질문 단계
            if (buttonText === "아니 잠깐! 싱크타입이 뭐라구?") {
                hardcodedAction = "루비가 다시 한번 설명하며";
                hardcodedMsgWithTags = "싱크타입에 대해 다시 한번 설명해 줄게. 😊<br><br>이건 <b>다양한 심리학 이론과 우주의 기운</b>을 통해 너의 <b>본질적인 유형</b>을 찾아내는 과정이야.<br>이렇게 발견된 너의 <b>'영혼의 쌍둥이'</b> 같은 싱크타입은 타로 카드의 해석 정확도를 높이는 데 중요한 역할을 해. ✨<br><br>바로 테스트를 통해 너의 싱크타입을 알아볼래?";
                hardcodedSuggestions = ["오오 정말? 좋아!", "바쁘니깐 나중에할게"];
                shouldDisplayHardcodedUI = true;
                setChatInputDisabled(true, "아래 버튼으로 답변해주세요.");
            } else if (buttonText === "오오 정말? 좋아!") {
                 현재주관식질문인덱스 = 0;
                 displayCurrentStageUI(); return; // 4단계 UI 다시 표시 (첫 질문부터)
            } else if (buttonText === "바쁘니깐 나중에할게") { // 시나리오 3
                 scenarioToSet = "시나리오 3 - 바쁜가보다 그럼 빨리 봐보자 라고 말하며 타로 진행";
                 updateUserProfile({ "시나리오": scenarioToSet });
                 console.log(`[handleButtonClick] 시나리오 설정: ${scenarioToSet}`);

                 hardcodedAction = "루비가 아쉬워하며";
                 hardcodedMsgWithTags = "에고 그렇구나.. [exp007] 좋아 그러면 바로 타로를 시작하자!";
                 await displayHardcodedUIElements(hardcodedAction, hardcodedMsgWithTags, [], handleButtonClick);

                 currentConsultationStage = 10;
                 showStage10EntryEmoticon = true;
                 isInitialApiCallAfterObjectiveTest = true;
                 messageBuffer = "사용자가 싱크타입 테스트를 건너뛰고 타로를 바로 시작합니다. (시나리오 3)";
                 await sendApiRequest(0);
                 return;
            }
        } else if (currentConsultationStage === 7) { // 객관식 질문 시작 전
            if (buttonText === "좋아! 시작하자 ✨") {
                nextStage = 8;
            }
        } else if (currentConsultationStage === 9 && (buttonText === "응, 보내줘!" || buttonText === "응, 찾아줘!")) { // 시나리오 1
            console.log(`[handleButtonClick] 9단계 '${buttonText}' 클릭. 싱크타입 결정 API 호출 시작.`);
            
            // 시나리오 1 설정은 sendApiRequest 내에서 싱크타입 결정 성공 후 다음 일반 API 호출 준비 시점에 하는 것이 더 적절.
            // 여기서 미리 설정하면 싱크타입 결정 API 자체에 영향을 줄 수 있음.
            // isRequestingSyncTypeResult = true; // sendApiRequest가 이 플래그를 사용함
            // syncTypeResultRetryCount = 0;

            isRequestingSyncTypeResult = true;
            syncTypeResultRetryCount = 0;
            // 시나리오 1은 싱크타입 결정 *후*의 첫 일반 API 호출에 적용되므로, 여기서는 설정하지 않음.
            // updateUserProfile({ "시나리오": "시나리오 1 - 싱크타입 테스트 풀이 필요" }); // 여기서 하면 안됨
            
            currentConsultationStage = 10;
            showStage10EntryEmoticon = false; 
            isInitialApiCallAfterObjectiveTest = false; 
            messageBuffer = ""; // 싱크타입 결정 API는 프로필만 사용
            console.log(`[handleButtonClick] isRequestingSyncTypeResult set to: ${isRequestingSyncTypeResult}`);
            await sendApiRequest(0); // 싱크타입 결정 API 호출
            return;
        } else if (currentConsultationStage === 10 && !shouldDisplayHardcodedUI && !nextStage) {
            // 10단계에서 사용자가 제안 버튼(sampleanswer)을 클릭한 경우
            console.log(`[handleButtonClick] 대화 단계(10) API 응답 버튼 클릭됨: "${buttonText}"`);
            // 이 경우, userProfile.시나리오 값은 이미 이전 단계에서 설정되어 있어야 함.
            // 여기서는 messageBuffer만 설정하고 API 호출
            messageBuffer = buttonText;
            await sendApiRequest(0); 
            return;
        }


        if (shouldDisplayHardcodedUI) {
            if (nextStage !== null && nextStage !== currentConsultationStage) {
                advanceConsultationStage(nextStage);
            } else {
                await displayHardcodedUIElements(hardcodedAction, hardcodedMsgWithTags, hardcodedSuggestions, handleButtonClick);
            }
        } else if (nextStage !== null) {
            advanceConsultationStage(nextStage);
        } else {
            console.log(`[handleButtonClick] 버튼 "${buttonText}" 처리 완료. nextStage: ${nextStage}, shouldDisplayHardcodedUI: ${shouldDisplayHardcodedUI}. 현 단계(${currentConsultationStage}) 유지 또는 추가 액션 없음.`);
        }
    }
    async function processUserInput() {
        console.log(`[processUserInput] 사용자 입력 처리 시작, isApiLoading: ${isApiLoading}, isSessionTimedOut: ${isSessionTimedOut}`);
        if (isSessionTimedOut) {
            console.log("[processUserInput] 세션 타임아웃. 입력 처리 안 함.");
            chatInput.value = '';
            return;
        }

        userHasScrolledUp = false;
        scrollToBottom(true);

        if (isInputDisabledByInteraction && ![4, 10].includes(currentConsultationStage)) {
            console.log("[processUserInput] UI 상호작용으로 입력이 막힌 단계입니다.");
            return;
        }

        const userInput = chatInput.value.trim();

        if (userInput) {
            console.log(`[processUserInput] 사용자 입력: "${userInput}", 현재 단계: ${currentConsultationStage}`);
            chatInput.value = '';
            hideInputTooltip();
            if (tooltipTimerId) clearTimeout(tooltipTimerId);

            const userMessageElement = createTextMessageElement(userInput, true);
            if(section2) section2.appendChild(userMessageElement);
            applyFadeIn(userMessageElement);
            conversationHistory.push({ role: "user", parts: [{ text: userInput }] });
            scrollToBottom(true);

            if (currentConsultationStage === 10) {
                resetSessionTimers();
            }

            if (currentConsultationStage === 4 && 현재주관식질문인덱스 < MAX_SUBJECTIVE_QUESTIONS) {
                console.log(`[processUserInput] 주관식 ${현재주관식질문인덱스 + 1} 답변: ${userInput}`);
                updateUserProfile({ [`주관식답변${현재주관식질문인덱스 + 1}`]: userInput });
                현재주관식질문인덱스++;

                if (현재주관식질문인덱스 < MAX_SUBJECTIVE_QUESTIONS) {
                    displayCurrentStageUI();
                } else {
                    console.log("[processUserInput] 모든 주관식 답변 완료. 객관식 전환 안내 단계(7)로 이동.");
                    advanceConsultationStage(7); // ★★★ 이 부분이 7로 되어 있는지 확인 ★★★
                }
            } else if (currentConsultationStage === 10) {
                addToMessageQueueAndStartTimer(userInput);
            } else {
                console.log(`[processUserInput] 현재 단계(${currentConsultationStage})에서는 사용자 텍스트 입력이 예상되지 않거나, addToMessageQueueAndStartTimer를 사용하지 않습니다.`);
            }

        } else {
            if (messageQueue.length > 0 && currentConsultationStage === 10) {
                console.log("[processUserInput] 입력 없이 보내기 액션 (대화 단계). 큐 강제 전송.");
                resetAutoSendTimer();
                await processMessageQueue();
            } else {
                console.log("[processUserInput] 입력 내용 없음 & (큐 비어있거나 대화 단계 아님). 무시.");
            }
        }
        handleChatInput();
    }


    async function displayCurrentObjectiveQuestion() {
        console.log(`[displayCurrentObjectiveQuestion] START - Drawing UI for question index: ${currentObjectiveQuestionIndex}`);

        if (isSessionTimedOut) {
            console.log("[displayCurrentObjectiveQuestion] 세션 타임아웃. 처리 중단.");
            return;
        }

        const questionIndexToDraw = currentObjectiveQuestionIndex;

        const existingQuestionContainerId = `objective_question_container_${questionIndexToDraw}`;
        const existingQuestionContainer = document.getElementById(existingQuestionContainerId);
        if (existingQuestionContainer) {
            console.log(`[displayCurrentObjectiveQuestion] Question UI for index ${questionIndexToDraw} already exists. Skipping draw.`);
            return;
        }

        if (questionIndexToDraw >= 현재표시된객관식질문들.length || questionIndexToDraw >= MAX_OBJECTIVE_QUESTIONS) {
            console.error(`[displayCurrentObjectiveQuestion] Invalid question index to draw: ${questionIndexToDraw}`);
            return;
        }

        const qData = 현재표시된객관식질문들[questionIndexToDraw];
        if (!qData) {
            console.error(`[displayCurrentObjectiveQuestion] No question data for index ${questionIndexToDraw}`);
            return;
        }

        console.log(`[displayCurrentObjectiveQuestion] Drawing question: "${qData.question}"`);

        const questionOuterContainer = document.createElement('div');
        questionOuterContainer.id = `objective_question_container_${questionIndexToDraw}`;
        questionOuterContainer.classList.add('objective-questions-container');

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('objective-question-item');
        const questionTextP = createTextMessageElement(`${questionIndexToDraw + 1}. ${qData.question}`, false, true);
        questionTextP.innerHTML = `${questionIndexToDraw + 1}. ${qData.question}`;
        questionDiv.appendChild(questionTextP);
        questionOuterContainer.appendChild(questionDiv);

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options-group');
        const commonOptions = ["매우 그렇다", "그렇다", "보통이다", "아니다", "전혀 그렇지 않다"];
        const optionElements = [];

        commonOptions.forEach(optionText => {
            const label = document.createElement('label');
            label.classList.add('radio-label');

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `objective_q_${questionIndexToDraw}`;
            radio.value = optionText;

            const previousAnswer = userProfile.객관식질문과답변.find(ans => ans.questionIndex === questionIndexToDraw);
            if (previousAnswer && previousAnswer.answer === optionText) {
                radio.checked = true;
            }

            radio.onchange = (e) => {
                if (isSessionTimedOut) return;
                handleObjectiveOptionSelection(e.target.value, qData.type, questionIndexToDraw);
            };

            label.appendChild(radio);
            label.appendChild(document.createTextNode(optionText));
            optionsDiv.appendChild(label);
            optionElements.push(label);
        });

        questionDiv.appendChild(optionsDiv);

        if(section2) section2.appendChild(questionOuterContainer);
        applyFadeIn(questionTextP);
        optionElements.forEach(el => {
            el.style.opacity = 0;
            applyFadeIn(el);
        });

        scrollToBottom(true);
        console.log(`[displayCurrentObjectiveQuestion] END - Question UI for index ${questionIndexToDraw} created.`);
    }
async function handleMultipleCardSelection(selectedCardIds) {
    if (isSessionTimedOut) {
        console.log("[handleMultipleCardSelection] 세션 타임아웃. 카드 선택 처리 안 함.");
        return;
    }

    // API가 요청한 카드 수 (displayTarotSelectionUI에 전달된 numberOfCardsToSelect와 같아야 함)
    // lastApiResponse를 통해 cards_to_select 값을 가져오거나,
    // displayTarotSelectionUI에서 전달받은 numberOfCardsToSelect 값을 사용해야 함.
    // 여기서는 selectedCardIds.length로 실제 선택된 카드 수를 사용.
    const numberOfSelectedCards = selectedCardIds.length;

    if (selectedCardIds && numberOfSelectedCards > 0) { // 최소 1장 이상 선택되었을 때
        console.log(`[handleMultipleCardSelection] 선택된 타로 카드 ${numberOfSelectedCards}장:`, selectedCardIds);
        
        // ★★★ 수정: userProfile 업데이트 방식 변경 ★★★
        updateUserProfile({
            "선택된타로카드들": [...selectedCardIds] // 배열 전체를 복사하여 저장
        });

        // ★★★ 제거: 선택된 카드를 화면에 다시 이미지로 보여주는 로직 제거 ★★★
        /*
        const confirmationFrame = document.createElement('div');
        // ... (이전 카드 표시 로직 전체 주석 처리 또는 삭제) ...
        if (confirmationFrame.childElementCount > 0) {
            if(section2) section2.appendChild(confirmationFrame);
            applyFadeIn(confirmationFrame);
        }
        */

        // ★★★ 수정: 카드 선택 완료 메시지를 간단하게 표시 (또는 생략 가능) ★★★
        // const msgEl = createTextMessageElement("", false);
        // if(section2) section2.appendChild(msgEl);
        // applyFadeIn(msgEl);
        // await animateBotMessageText(msgEl, `좋아! ${numberOfSelectedCards}장의 카드를 선택했구나! [exp001]`);
        // scrollToBottom(true);
        // 위 메시지는 displayTarotSelectionUI의 확인 질문 후 루비의 반응으로 대체될 수 있음.

        // 카드 선택 완료 시 세션 타이머 리셋 (단계 10에서만 의미 있음)
        if (currentConsultationStage === 10) {
            resetSessionTimers();
        }

        messageBuffer = `타로 카드 ${numberOfSelectedCards}장을 모두 선택했습니다. 해석해주세요.`;
        await sendApiRequest();

    } else {
        console.error("[handleMultipleCardSelection] 카드 선택 오류 또는 취소됨 (선택된 카드 없음)");
        const tarotArea = document.getElementById('tarotSelectionArea');
        if (tarotArea) tarotArea.remove();
        // API가 요청한 카드 수를 다시 가져와서 UI를 표시해야 함.
        // lastApiResponse.cards_to_select 또는 기본값 사용.
        const cardsToRetry = (lastApiResponse && typeof lastApiResponse.cards_to_select === 'number' && lastApiResponse.cards_to_select > 0) ? lastApiResponse.cards_to_select : 3;
        displayHardcodedUIElements("루비가 갸웃하며", `카드를 정확히 ${cardsToRetry}장 선택해야 해. [exp003] 다시 시도해볼까?`, [], handleButtonClick)
        .then(() => displayTarotSelectionUI(cardsToRetry, handleMultipleCardSelection));
    }
}
async function sendApiRequest(retryCount = 0, isInternalRecursiveCall = false) { // isInternalRecursiveCall 파라미터 추가
    const MAX_RETRIES = 3;
    const MAX_SYNC_TYPE_RETRIES = 3;
    const RETRY_DELAY_BASE = 3000;

    if (isApiLoading && retryCount === 0 && !isRequestingSyncTypeResult && !isInternalRecursiveCall) {
        console.log("[sendApiRequest] 이전 API 요청 처리 중 (외부 최초 호출 시 중복 방지). 새 요청 무시.");
        return;
    }

    if (isSessionTimedOut) {
        console.log("[sendApiRequest] 세션 타임아웃. API 요청 안 함.");
        return;
    }

    let currentEffectiveRetry = isRequestingSyncTypeResult ? syncTypeResultRetryCount : retryCount;
    let maxEffectiveRetries = isRequestingSyncTypeResult ? MAX_SYNC_TYPE_RETRIES : MAX_RETRIES;
    const isFirstAttemptForThisType = currentEffectiveRetry === 0;

    console.log(`[sendApiRequest] API 호출 시작. isRequestingSyncTypeResult: ${isRequestingSyncTypeResult}, 시도: ${currentEffectiveRetry + 1}/${maxEffectiveRetries}`);
    isApiLoading = true;

    if (currentEffectiveRetry > 0) { // 재시도 시 (싱크타입이든 일반이든)
        const retryActionText = "잠시만요 교신에 문제가 생겼나봐요..! 📡";
        // (이하 액션 텍스트 표시 로직 - 이전과 동일)
        const actionEl = await createActionTextElement(retryActionText);
        if (section2 && actionEl) {
            section2.appendChild(actionEl);
            await animateActionText(actionEl, retryActionText);
            scrollToBottom(true);
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }


    if (isFirstAttemptForThisType) {
        setChatInputDisabled(true, isRequestingSyncTypeResult ? "너의 싱크타입을 찾는 중... ✨" : "우주에서 메세지를 받아오는중.. 🎉.", true);
        showTypingIndicator();
    }
    setSendButtonLoading(true);

    const userMessageForApi = messageBuffer.trim() || (isRequestingSyncTypeResult ? "" : "진행해주세요.");
    let parsedResponse = null;
    let modelGeneratedText = "";
    const currentIsRequestingSyncType = isRequestingSyncTypeResult; // 현재 호출 사이클의 요청 타입

    try {
        console.log(`[sendApiRequest] 실제 API 요청 전송 시도. 현재 단계: ${currentConsultationStage}, isRequestingSyncTypeResult (호출 시점): ${currentIsRequestingSyncType}`);
        const systemInstructionText = getActiveSystemPrompt(currentIsRequestingSyncType);

        // ... (userProfileItemsString, currentUserTurnTextForApiContent, contentsForAPI, requestBodyContent 생성 로직 - 이전과 동일, userProfile.시나리오 자동 포함됨)
        let userProfileItemsString = "";
        const profileKeysToIterate = Object.keys(userProfile);
        profileKeysToIterate.forEach(key => {
            const value = userProfile[key];
            let displayValue;
            if (key === "객관식질문과답변" && Array.isArray(value)) {
                if (value.length > 0) {
                    displayValue = "\n";
                    value.forEach((item, index) => {
                        displayValue += `  - 질문 ${index + 1} (${item.type}타입): ${item.question.substring(0, 30)}... / 답변: ${item.answer}\n`;
                    });
                } else {
                    displayValue = "수집안됨";
                }
            } else if (key.startsWith("DISC_") && typeof value === 'number') {
                displayValue = `${value}점`;
            } else if (key.startsWith("주관식답변") && value) {
                const questionNumber = key.replace("주관식답변", "");
                const questionKey = `주관식질문${questionNumber}`;
                const questionText = userProfile[questionKey] || "해당 질문 없음";
                displayValue = `(질문: ${questionText.substring(0,30)}...) ${String(value).trim() || "답변 없음"}`;
            } else if (key.startsWith("주관식질문")) { // 주관식 질문 자체는 API 요청에 포함하지 않음 (답변만 포함)
                return;
            } else {
                displayValue = (value !== null && value !== undefined && String(value).trim() !== "") ? String(value).trim() : "수집안됨";
            }
            userProfileItemsString += `${key}: ${displayValue}\n`;
        });

        const discSummary = `DISC 점수: D=${userProfile.DISC_D_점수}, I=${userProfile.DISC_I_점수}, S=${userProfile.DISC_S_점수}, C=${userProfile.DISC_C_점수}`;

        let currentUserTurnTextForApiContent = `
[현재 상담 단계]: ${currentConsultationStage}단계
[사용자 현재 정보]
${userProfileItemsString.trim()}
${discSummary}
루비가최근에보여준카드이미지: ${lastShownRubyCardImageId || "없음"}`;
// userProfile.시나리오도 userProfileItemsString에 자동으로 포함됨.

        if (!currentIsRequestingSyncType && userMessageForApi) {
            currentUserTurnTextForApiContent += `\n[사용자 발화]\n${userMessageForApi}`;
        }

        const contentsForAPI = [];
        if (currentIsRequestingSyncType) {
            contentsForAPI.push({ role: "user", parts: [{ text: currentUserTurnTextForApiContent }] });
        } else {
            contentsForAPI.push(...conversationHistory.map(turn => ({ role: turn.role, parts: turn.parts })));
            contentsForAPI.push({ role: "user", parts: [{ text: currentUserTurnTextForApiContent }] });
        }

        const requestBodyContent = {
            system_instruction: { parts: [{ text: systemInstructionText }] },
            contents: contentsForAPI,
            generationConfig: { temperature: 0.2 },
        };


        if (isFirstAttemptForThisType) {
            console.log(`================ API REQUEST BODY (isRequestingSyncTypeResult: ${currentIsRequestingSyncType}) START ================`);
            console.log("[sendApiRequest] API 요청 본문 전체 (JSON):", JSON.stringify(requestBodyContent, null, 2));
            console.log("================ API REQUEST BODY END ==================");
        }

        if (!currentIsRequestingSyncType && suggestionButtonsContainer && suggestionButtonsContainer.classList.contains('visible')) {
            hideSuggestionButtons(true);
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBodyContent)
        });

        const responseTextRaw = await response.text();
        if (isFirstAttemptForThisType) {
            console.log("================ API RESPONSE RAW START ================");
            console.log("[sendApiRequest] API 원본 응답 (Raw Text):", responseTextRaw);
            console.log("================ API RESPONSE RAW END ==================");
        }
        console.log("[sendApiRequest] API 응답 상태 코드:", response.status);

        // ... (HTTP 에러 처리 및 파싱/구조 에러 재시도 로직 - 이전과 동일)
        if (!response.ok) { // HTTP 에러 (4xx, 5xx 등)
            const errorDetail = `HTTP 상태 ${response.status}: ${response.statusText}. 응답 미리보기: ${responseTextRaw.substring(0, 200)}...`;
            if (response.status >= 500 && response.status <= 599) { // 5xx 서버 에러
                if (currentEffectiveRetry < maxEffectiveRetries - 1) { // 재시도 가능
                    console.warn(`[sendApiRequest] HTTP ${response.status} 오류. 재시도 (${currentEffectiveRetry + 2}/${maxEffectiveRetries})...`);
                    if (typingIndicatorElement) await hideTypingIndicator(); 
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_BASE * (currentEffectiveRetry + 1)));
                    if (currentIsRequestingSyncType) { syncTypeResultRetryCount++; return sendApiRequest(retryCount, true); } 
                    else { return sendApiRequest(retryCount + 1, true); } // isInternalRecursiveCall true
                }
            }
            throw new Error(errorDetail); // 재시도 불가 또는 5xx 아닌 에러
        }

        try { // 내용 파싱
            const responseData = JSON.parse(responseTextRaw);
            if (responseData.candidates && responseData.candidates[0] && responseData.candidates[0].content &&
                responseData.candidates[0].content.parts && responseData.candidates[0].content.parts[0] &&
                typeof responseData.candidates[0].content.parts[0].text === 'string') {
                modelGeneratedText = responseData.candidates[0].content.parts[0].text;
            } else { throw new Error("모델 응답 구조 이상, 유효 텍스트 없음"); }
        } catch (e) { // JSON 파싱 실패 또는 위에서 throw된 "모델 응답 구조 이상"
            console.warn(`[sendApiRequest] 응답 내용 파싱/구조 오류: ${e.message}. 재시도 가능한지 확인...`);
            if (currentEffectiveRetry < maxEffectiveRetries - 1) { // 재시도 가능
                console.warn(`[sendApiRequest] 응답 내용 오류. 재시도 (${currentEffectiveRetry + 2}/${maxEffectiveRetries})...`);
                if (typingIndicatorElement) await hideTypingIndicator();
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_BASE * (currentEffectiveRetry + 1)));
                if (currentIsRequestingSyncType) { syncTypeResultRetryCount++; return sendApiRequest(retryCount, true); } 
                else { return sendApiRequest(retryCount + 1, true); }
            }
            throw new Error(`API 응답 파싱/구조 최종 오류: ${e.message}`);
        }
        
        parsedResponse = extractAndParseJson(modelGeneratedText);

        if (parsedResponse && parsedResponse.error) { // extractAndParseJson 내부에서 발생한 에러
            console.warn(`[sendApiRequest] extractAndParseJson 오류: ${parsedResponse.error}. 재시도 가능한지 확인...`);
            if (currentEffectiveRetry < maxEffectiveRetries - 1) { // 재시도 가능
                console.warn(`[sendApiRequest] extractAndParseJson 오류. 재시도 (${currentEffectiveRetry + 2}/${maxEffectiveRetries})...`);
                if (typingIndicatorElement) await hideTypingIndicator();
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_BASE * (currentEffectiveRetry + 1)));
                if (currentIsRequestingSyncType) { syncTypeResultRetryCount++; return sendApiRequest(retryCount, true); } 
                else { return sendApiRequest(retryCount + 1, true); }
            }
            console.warn(`[sendApiRequest] extractAndParseJson 최종 오류: ${parsedResponse.error}.`);
            // 최종 재시도 실패 시 parsedResponse는 에러 객체를 가짐. 이 객체를 다음 로직으로 전달.
        }


        lastApiResponse = parsedResponse;

        if (currentIsRequestingSyncType) {
            console.log("[sendApiRequest] 싱크타입 결정 API 응답 처리 중:", parsedResponse);
            const profileUpdate = parsedResponse ? parsedResponse.user_profile_update : null;
            let apiReceivedConstellationRaw = profileUpdate ? String(profileUpdate.사용자소속성운 || "").trim() : null;
            let apiReceivedConstellation = apiReceivedConstellationRaw;
            if (apiReceivedConstellationRaw && apiReceivedConstellationRaw.includes(" (")) {
                apiReceivedConstellation = apiReceivedConstellationRaw.substring(0, apiReceivedConstellationRaw.indexOf(" (")).trim();
            }
            const apiReceivedSyncType = profileUpdate ? String(profileUpdate.결정된싱크타입 || "").trim() : null;
            const apiReceivedReason = profileUpdate ? String(profileUpdate.사용자가성운에속한이유 || "").trim() : null;

            console.log(`[sendApiRequest_Debug] API 응답에서 추출된 사용자소속성운 (원본): '${apiReceivedConstellationRaw}'`);
            console.log(`[sendApiRequest_Debug] API 응답에서 추출된 사용자소속성운 (정제 후): '${apiReceivedConstellation}'`);
            const isValidConstellationName = apiReceivedConstellation && CONSTELLATIONS_DATA.hasOwnProperty(apiReceivedConstellation);
            console.log(`[sendApiRequest_Debug] CONSTELLATIONS_DATA에 정제된 값 ('${apiReceivedConstellation}') 키 존재 여부: ${isValidConstellationName}`);

            if (parsedResponse && !parsedResponse.error && profileUpdate && 
                apiReceivedConstellation && isValidConstellationName && 
                apiReceivedSyncType && apiReceivedReason) {
                
                // ★★★ 시나리오 1 설정 ★★★
                const scenario1 = "시나리오 1 - 싱크타입 테스트 풀이 필요";
                profileUpdate.시나리오 = scenario1; // API 응답에 시나리오 필드가 없으므로 직접 추가
                updateUserProfile(profileUpdate);
                console.log(`[sendApiRequest] 싱크타입 결정 성공 및 시나리오 1 설정. 프로필 업데이트:`, userProfile);


                isRequestingSyncTypeResult = false; 
                syncTypeResultRetryCount = 0; 
                showStage10EntryEmoticon = true; // 다음 일반 대화 시작 시 이모티콘 표시
                isInitialApiCallAfterObjectiveTest = true; // 다음이 10단계 첫 일반 API 호출임을 알림

                messageBuffer = `나의 싱크타입은 '${userProfile.결정된싱크타입}'(${userProfile.사용자소속성운} 성운)이구나! 나는 ${userProfile.시나리오} 상황이야. 내 성향에 맞는 타로 운세를 봐줘!`;
                
                if (typingIndicatorElement) await hideTypingIndicator();
                isApiLoading = false; 
                console.log("[sendApiRequest] 싱크타입 결정 후 일반 API 호출 직전, isApiLoading = false");
                return sendApiRequest(0, true); // 일반 API 호출, isInternalRecursiveCall = true

            } else { // 싱크타입 결정 로직 실패 (내용 불일치 등)
                let failureReason = "알 수 없는 이유";
                // ... (failureReason 설정 로직 - 이전과 동일)
                if (parsedResponse && parsedResponse.error) failureReason = `응답 파싱/내용 오류: ${parsedResponse.error}`;
                else if (!profileUpdate) failureReason = "user_profile_update 필드 없음";
                else if (!apiReceivedConstellationRaw) failureReason = "사용자소속성운 필드 없음 또는 빈 값 (원본)";
                else if (!apiReceivedConstellation) failureReason = "사용자소속성운 값 정제 후 빈 값";
                else if (!isValidConstellationName) failureReason = `정제된 성운 '${apiReceivedConstellation}'이(가) CONSTELLATIONS_DATA에 정의되지 않음`;
                else if (!apiReceivedSyncType) failureReason = "결정된싱크타입 필드 없음 또는 빈 값";
                else if (!apiReceivedReason) failureReason = "사용자가성운에속한이유 필드 없음 또는 빈 값";
                
                console.error(`[sendApiRequest] 싱크타입 결정 실패 (내용 검증): ${failureReason}. 응답:`, parsedResponse);

                if (syncTypeResultRetryCount < MAX_SYNC_TYPE_RETRIES - 1) {
                    syncTypeResultRetryCount++;
                    console.log(`[sendApiRequest] 싱크타입 결정 내용 검증 실패. 재시도 (${syncTypeResultRetryCount + 1}/${MAX_SYNC_TYPE_RETRIES})`);
                    if (typingIndicatorElement) await hideTypingIndicator();
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_BASE * (syncTypeResultRetryCount)));
                    return sendApiRequest(retryCount, true); // isInternalRecursiveCall = true
                } else {
                    syncTypeResultRetryCount = 0; 
                    throw new Error(`싱크타입 결정 API 최종 실패 (내용 검증): ${failureReason}`);
                }
            }
        } else { // 일반 API 응답 처리 (currentIsRequestingSyncType is false)
            // ... (이전과 동일한 일반 API 응답 처리 로직) ...
            if (parsedResponse && !parsedResponse.error && parsedResponse.user_profile_update) {
                // 일반 API 응답에서는 시나리오를 덮어쓰지 않도록 주의 (필요하다면 조건 추가)
                if (parsedResponse.user_profile_update.시나리오 === undefined || parsedResponse.user_profile_update.시나리오 === null) {
                    // API 응답에 시나리오가 없다면 기존 값 유지를 위해 delete 또는 값 복사 방지
                    // delete parsedResponse.user_profile_update.시나리오; // 이렇게 하면 기존 시나리오 유지됨
                }
                updateUserProfile(parsedResponse.user_profile_update);
            }

            if (parsedResponse && !parsedResponse.error && currentConsultationStage === 10 && showStage10EntryEmoticon) {
                console.log("[sendApiRequest] Stage 10 first entry (일반): Displaying exp002 before API response message.");
                await hideTypingIndicator();
                const rubyImgElementForStage10 = createRubyExpressionElement('exp002');
                if (rubyImgElementForStage10) {
                    const frame = document.createElement('div');
                    frame.classList.add('visual-elements-frame');
                    frame.appendChild(rubyImgElementForStage10);
                    if(section2) section2.appendChild(frame);
                    applyFadeIn(frame);
                    lastUsedRubyExpressionId = 'exp002';
                    scrollToBottom(true);
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
                showStage10EntryEmoticon = false;
                console.log("[sendApiRequest] showStage10EntryEmoticon set to false (일반 응답 처리).");
            }

            if (typingIndicatorElement) await hideTypingIndicator();
            await displayApiResponseElements(parsedResponse); 
            
            if (parsedResponse && !parsedResponse.error) {
                 conversationHistory.push({ role: "model", parts: [{ text: modelGeneratedText }] });
            }

            if (currentConsultationStage === 10) {
                resetSessionTimers();
            }

            let nextStageFromApi = null;
            if (parsedResponse && !parsedResponse.error) {
                if (parsedResponse.force_stage !== null && parsedResponse.force_stage !== undefined) {
                    nextStageFromApi = parsedResponse.force_stage;
                } else if (parsedResponse.proceed_to_next_stage === true && currentConsultationStage < 10 ) {
                     nextStageFromApi = currentConsultationStage + 1;
                }
            }

            if (nextStageFromApi !== null && nextStageFromApi !== currentConsultationStage) {
                console.log(`[sendApiRequest] API 응답에 따라 단계 변경 시도: ${currentConsultationStage} -> ${nextStageFromApi}`);
                advanceConsultationStage(nextStageFromApi, true);
            } else if (parsedResponse && !parsedResponse.error && currentConsultationStage === 10) {
                 const hasSampleAnswer = parsedResponse.sampleanswer && String(parsedResponse.sampleanswer).trim() !== "";
                 if (hasSampleAnswer) {
                    setChatInputDisabled(false, "직접 루비에게 메세지를 보낼 수도 있어요 ✨");
                 } else {
                    setChatInputDisabled(false, "루비에게 하고 싶은 말을 전해주세요. ✨");
                    setTimeout(() => { if (chatInput && !chatInput.disabled && !isSessionTimedOut) chatInput.focus(); }, 100);
                 }
            }
        }

    } catch (error) { // 모든 종류의 최종 에러 처리
        console.error(`[sendApiRequest] API 호출 또는 응답 처리 중 최종 오류 (시도: ${currentEffectiveRetry + 1}/${maxEffectiveRetries}):`, error);
        if (typingIndicatorElement) await hideTypingIndicator();
        const finalErrorMsgWithTags = `앗, 내부 시스템에 작은 문제가 생겼나 봐요! [exp008]<br>잠시 후 다시 시도해주시겠어요?<br><small>(오류: ${error.message.substring(0,120)}...)</small>`;
        let errorSuggestion = ["처음으로 돌아갈래요"];
        const wasRequestingSyncTypeOnError = currentIsRequestingSyncType; 
        isRequestingSyncTypeResult = false;
        syncTypeResultRetryCount = 0;
        await displayHardcodedUIElements("루비가 매우 당황하며", finalErrorMsgWithTags, errorSuggestion, async (txt) => {
            if(txt === "처음으로 돌아갈래요" || txt === "테스트 처음부터 다시 하기") {
                clearChatArea(); conversationHistory = []; userProfile = initializeUserProfile(); currentConsultationStage = 0;
                isSessionTimedOut = false; isFirstBotMessageDisplayed = false; showStage10EntryEmoticon = false; isInitialApiCallAfterObjectiveTest = false;
                if (wasRequestingSyncTypeOnError) { loadedPrompts = {}; await initializeApp(); } 
                else { advanceConsultationStage(1); }
            } else if (txt === "싱크타입 없이 진행하기") {
                currentConsultationStage = 10; showStage10EntryEmoticon = true; isInitialApiCallAfterObjectiveTest = true;
                messageBuffer = "싱크타입 테스트 없이 바로 타로 상담을 진행합니다.";
                updateUserProfile({ "시나리오": "시나리오 X - 싱크타입 없이 진행 (오류 후 선택)"}); // 임시 시나리오
                if (typingIndicatorElement) await hideTypingIndicator();
                isApiLoading = false;
                await sendApiRequest(0, true);
            }
        });
        isApiLoading = false; 
    } finally {
        console.log("[sendApiRequest] finally 블록 실행.");
        const isStillRecursiveCallPending = (currentIsRequestingSyncType && !isRequestingSyncTypeResult); // 현재 호출은 싱크타입이었고, 다음 호출은 일반 API일 예정

        if (!isStillRecursiveCallPending) {
            isApiLoading = false;
            setSendButtonLoading(false);
            if (isInitialApiCallAfterObjectiveTest && !currentIsRequestingSyncType) {
                isInitialApiCallAfterObjectiveTest = false;
                console.log("[sendApiRequest] finally: isInitialApiCallAfterObjectiveTest 플래그 최종 해제.");
            }
        } else {
            console.log("[sendApiRequest] finally: 다음 일반 API 호출 예정. isApiLoading은 다음 호출 시작 시 관리됨.");
        }

        if (typingIndicatorElement && !isApiLoading) {
             await hideTypingIndicator();
        }
    }
}
async function displayApiResponseElements(parsedResp) {
    console.log("[displayApiResponseElements] API 응답 UI 표시 시작:", parsedResp);
    if (isSessionTimedOut) {
        console.log("[displayApiResponseElements] 세션 타임아웃. UI 요소 표시 건너뜀.");
        return;
    }

    try {
        // 1. 액션 텍스트 표시
        if (parsedResp.action) {
            const actionEl = await createActionTextElement(parsedResp.action);
            if(section2) section2.appendChild(actionEl);
            await animateActionText(actionEl, parsedResp.action);
            scrollToBottom();
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        // 2. 이미지(카드) 표시
        const cardImageId = parsedResp.img;
        if (cardImageId) {
            const cardEl = createCardImageElement(cardImageId);
            if (cardEl) {
                const frame = document.createElement('div');
                frame.classList.add('visual-elements-frame');
                frame.appendChild(cardEl);
                if(section2) section2.appendChild(frame);
                applyFadeIn(frame);
                lastShownRubyCardImageId = cardImageId;
                scrollToBottom();
                await new Promise(resolve => setTimeout(resolve, 200));
            }
        }
        if (cardImageId === null && lastShownRubyCardImageId !== null) {
            lastShownRubyCardImageId = null;
        }

        // 3. 루비 메시지 표시
        let assistantMsgWithTags = parsedResp.assistantmsg; // 원본 메시지
        if (assistantMsgWithTags && typeof assistantMsgWithTags === 'string') {
            // ★★★ 마크다운 ** 제거 로직 추가 ★★★
            // 정규식을 사용하여 **단어** 형태를 찾아 단어만 남김.
            // 전역 검색(g)과 여러 줄(m) 옵션 사용.
            // **로 감싸진 내용을 찾아서 $1 (첫 번째 캡처 그룹, 즉 ** 사이의 내용)으로 대체.
            // 만약 ** 자체를 완전히 없애고 싶다면, 단순히 replaceAll('**', '') 사용.
            // 여기서는 **내용** -> 내용 으로 변경 (<b> 태그와 유사한 효과를 CSS 없이 구현)
            // 또는, **내용** -> <b>내용</b> 으로 변환하여 기존 <b> 태그 처리 로직 활용 가능.
            // 여기서는 **를 단순히 제거하는 것으로 처리.
            assistantMsgWithTags = assistantMsgWithTags.replace(/\*\*(.*?)\*\*/gm, '$1');
            // 또는, 만약 **를 <b> 태그로 변환하고 싶다면:
            // assistantMsgWithTags = assistantMsgWithTags.replace(/\*\*(.*?)\*\*/gm, '<b>$1</b>');
            // 이렇게 하면 animateBotMessageText에서 <b> 태그를 이미 처리하므로 자연스럽게 굵게 표시됨.
            // 현재 프롬프트에서는 <b> 태그 사용을 권장하고 있으므로, **를 <b>로 변환하는 것이 더 일관성 있을 수 있음.
            // 일단은 ** 완전 제거로 진행.

            console.log("[displayApiResponseElements] 마크다운 처리 후 assistantmsg:", assistantMsgWithTags.substring(0, 50) + "...");

            const initialParagraphElement = createTextMessageElement("", false);
            if(section2) section2.appendChild(initialParagraphElement);
            applyFadeIn(initialParagraphElement);
            await animateBotMessageText(initialParagraphElement, assistantMsgWithTags); // 처리된 메시지로 애니메이션
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        // 4. API 응답에 따른 추가 UI 처리
        if (parsedResp.tarocardview === true) {
            console.log("[displayApiResponseElements] tarocardview: true. 타로 카드 선택 UI 표시.");
            const cardsToSelect = (typeof parsedResp.cards_to_select === 'number' && parsedResp.cards_to_select > 0) ? parsedResp.cards_to_select : 3;
            displayTarotSelectionUI(cardsToSelect, handleMultipleCardSelection);
            setChatInputDisabled(true, `카드를 ${cardsToSelect}장 선택해주세요.`, true);
        } else if (parsedResp.sampleanswer && String(parsedResp.sampleanswer).split('|').map(s => s.trim()).filter(s => s).length > 0) {
            console.log(`[displayApiResponseElements] sampleanswer ('${parsedResp.sampleanswer}') 발견. 제안 버튼 생성 시도.`);
            setChatInputDisabled(false, "직접 루비에게 메세지를 보낼 수도 있어요 ✨");
            const suggestionTexts = String(parsedResp.sampleanswer).split('|').map(s => s.trim()).filter(s => s);
            createSuggestionButtons(suggestionTexts, (clickedText) => {
                if (isSessionTimedOut) return;
                chatInput.value = clickedText;
                processUserInput();
            });
            console.log("[displayApiResponseElements] 샘플 답변 버튼 표시 완료. 입력창 자동 포커스 안 함.");
        } else if (currentConsultationStage === 10) {
            console.log("[displayApiResponseElements] Stage 10: 일반 대화 응답. 입력창 활성화 및 포커스 시도.");
            setChatInputDisabled(false, "루비에게 하고 싶은 말을 전해주세요. ✨");
            if (chatInput && !chatInput.disabled && !isSessionTimedOut) {
                setTimeout(() => chatInput.focus(), 50);
            }
        } else {
            console.log(`[displayApiResponseElements] 현재 단계 ${currentConsultationStage}. sampleanswer 없고, tarocardview false. 입력창 상태는 displayCurrentStageUI 설정 따름.`);
        }

    } finally {
        console.log("[displayApiResponseElements] UI 처리 완료.");
    }
}
    function getRandomItem(arr) {
        if (!arr || arr.length === 0) return null;
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function setupEventListeners() {
        if (sendButton) sendButton.addEventListener('click', () => {
            if (isSessionTimedOut) {
                console.log("[SendButtonClick] 세션 타임아웃. 보내기 버튼 동작 안 함.");
                return;
            }
            processUserInput();
        });

        if (chatInput) {
            chatInput.addEventListener('keypress', (event) => {
                if (isSessionTimedOut) {
                    event.preventDefault();
                    return;
                }
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    if (!sendButton.disabled) {
                        processUserInput();
                    } else {
                        console.log("[EnterKey] 보내기 버튼 비활성화 상태. 메시지 전송 무시.");
                    }
                }
            });
            chatInput.addEventListener('input', handleChatInput);

            // ★★★ 입력창 포커스 시 레이아웃 조정 및 스크롤 ★★★
            chatInput.addEventListener('focus', () => {
                console.log("[chatInput Focus] 입력창 포커스됨. 레이아웃 조정 및 스크롤 시도.");
                // visualViewport가 변경될 때 adjustContainerHeight가 호출되지만,
                // focus 시점에도 한번 호출해주면 즉각적인 반응에 도움될 수 있음.
                // 또는, focus 시점에는 스크롤만 처리하고, 실제 높이 조정은 vv.resize에 맡김.
                // adjustContainerHeight(); // 이미 vv.resize에서 처리될 것이므로 중복 호출 피할 수 있음

                // 키보드가 올라오는 약간의 시간 후 스크롤 맨 아래로 이동
                // (adjustContainerHeight가 비동기적으로 뷰포트 변경을 반영할 수 있으므로 약간의 딜레이)
                setTimeout(() => {
                    scrollToBottom(true); // 강제로 맨 아래로 스크롤
                    // 입력창 자체가 보이도록 스크롤 (더 정확할 수 있음)
                    // chatInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    console.log("[chatInput Focus] scrollToBottom(true) 호출됨.");
                }, 300); // 딜레이 값은 테스트하며 조정
            });

            // (선택적) 입력창 블러 시 (키보드 내려갈 때) 추가 처리
            // chatInput.addEventListener('blur', () => {
            //     console.log("[chatInput Blur] 입력창 블러됨.");
            //     // 키보드가 내려가면 visualViewport.height가 원래대로 돌아오고,
            //     // adjustContainerHeight가 호출되어 컨테이너 높이가 복원됨.
            //     // 특별히 추가할 작업이 없다면 생략 가능.
            // });
        }

        if (section2) {
            section2.addEventListener('scroll', () => {
                if (isSessionTimedOut) return;
                const isAtBottom = section2.scrollHeight - section2.scrollTop - section2.clientHeight < isNearBottomThreshold;
                userHasScrolledUp = !isAtBottom;
                if (isAtBottom) {
                    hideNewMessageButton();
                } else if (section2.scrollHeight > section2.clientHeight + isNearBottomThreshold) {
                    showNewMessageButton();
                }
            });
        }

        if (newMessageButton) newMessageButton.addEventListener('click', () => {
            if (isSessionTimedOut) return;
            scrollToBottom(true);
        });

        // VisualViewport API 이벤트 리스너 (중요)
        if (window.visualViewport) {
            console.log("[setupEventListeners] VisualViewport API 지원됨. resize 이벤트 리스너 등록.");
            window.visualViewport.addEventListener('resize', () => {
                console.log("[VisualViewport Resize Event] VisualViewport 크기 변경 감지.");
                adjustContainerHeight(); // 뷰포트 크기 변경 시 컨테이너 높이 조정
                // 리사이즈 후에도 스크롤을 맨 아래로 보내는 것이 좋을 수 있음 (특히 키보드가 사라질 때)
                // 하지만 입력 중에는 사용자가 의도적으로 스크롤했을 수 있으므로 주의.
                // 여기서는 adjustContainerHeight 내부에서 스크롤을 직접 제어하지 않고,
                // 입력창 focus 시 또는 새 메시지 추가 시 스크롤을 제어하는 것이 일반적.
                // 만약 키보드가 사라질 때 항상 맨 아래로 가고 싶다면 아래 주석 해제
                // setTimeout(() => scrollToBottom(true), 100);
            });
        } else {
            // Fallback: visualViewport 미지원 시 window resize 이벤트 사용 (덜 정확함)
            console.log("[setupEventListeners] VisualViewport API 미지원. window resize 이벤트 리스너 등록.");
            window.addEventListener('resize', adjustContainerHeight);
        }
        console.log("[setupEventListeners] 모든 이벤트 리스너 설정 완료");
    }

    initializeApp();

}); // END DOMContentLoaded