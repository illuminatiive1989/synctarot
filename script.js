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

    // ★★★ 신규: 싱크타입별 설명 데이터 (모든 싱크타입 포함) ★★★
    const SYNC_TYPE_DESCRIPTIONS = {
        // 루미네시아
        "젠틀빔": "설명이 들어갈 부분입니다.",
        "버블퍼프": "설명이 들어갈 부분입니다.",
        "스텔라 터틀": "설명이 들어갈 부분입니다.",
        "문 스눗": "설명이 들어갈 부분입니다.",
        "스페이스 퍼프": "설명이 들어갈 부분입니다.",
        "폴라로이드": "설명이 들어갈 부분입니다.",
        "스타 가피": "설명이 들어갈 부분입니다.",
        // 이그니티오
        "스타대셔": "설명이 들어갈 부분입니다.",
        "코멧 캐이나인": "설명이 들어갈 부분입니다.",
        "파이어 스프라우트": "설명이 들어갈 부분입니다.",
        "스타훗": "설명이 들어갈 부분입니다.",
        "펄사": "설명이 들어갈 부분입니다.",
        "스월스": "설명이 들어갈 부분입니다.",
        "젤로마이트": "설명이 들어갈 부분입니다.",
        // 카스텔라리스
        "가디언 로보베어": "설명이 들어갈 부분입니다.",
        "스타하이브": "설명이 들어갈 부분입니다.",
        "아머드 슬러그": "설명이 들어갈 부분입니다.",
        "아이봇": "설명이 들어갈 부분입니다.",
        "엘더스퀴드": "설명이 들어갈 부분입니다.",
        "스테드패스트 로보베어": "설명이 들어갈 부분입니다.",
        "플래로우": "설명이 들어갈 부분입니다.",
        // 크로니카
        "코스믹아이": "설명이 들어갈 부분입니다.",
        "갤럭시캣": "설명이 들어갈 부분입니다.",
        "스파이럴 셸러": "설명이 들어갈 부분입니다.",
        "오르비터": "설명이 들어갈 부분입니다.",
        "그래비톤": "설명이 들어갈 부분입니다.",
        "스누터": "설명이 들어갈 부분입니다.",
        "펄스피쉬": "설명이 들어갈 부분입니다.",
        // 코넥서스
        "아쿠아 독": "설명이 들어갈 부분입니다.",
        "인터스텔라 캣": "설명이 들어갈 부분입니다.",
        "스페이스 워크": "설명이 들어갈 부분입니다.",
        "링비": "설명이 들어갈 부분입니다.",
        "크리터넛": "설명이 들어갈 부분입니다.",
        "루미스퀴드": "설명이 들어갈 부분입니다.",
        "인터로퍼": "설명이 들어갈 부분입니다.",
        // 에오루스
        "코스믹 웜프": "설명이 들어갈 부분입니다.",
        "아스트랄 버니": "설명이 들어갈 부분입니다.",
        "플로터": "설명이 들어갈 부분입니다.",
        "네뷸라 폭스": "설명이 들어갈 부분입니다.",
        "스페이스 버드": "설명이 들어갈 부분입니다.",
        "록키": "설명이 들어갈 부분입니다.",
        "아우라밥": "설명이 들어갈 부분입니다.",
        // 인퀴지토
        "아주르 코멧펍": "설명이 들어갈 부분입니다.",
        "유풋": "설명이 들어갈 부분입니다.",
        "오르비니어": "설명이 들어갈 부분입니다.",
        "세팔론": "설명이 들어갈 부분입니다.",
        "글로브로": "설명이 들어갈 부분입니다.",
        "소나팟": "설명이 들어갈 부분입니다.",
        "셀레스티레이": "설명이 들어갈 부분입니다.",
        // 움브라리스
        "몰테나이트": "설명이 들어갈 부분입니다.",
        "스푹코이드": "설명이 들어갈 부분입니다.",
        "크레이터비스트": "설명이 들어갈 부분입니다.",
        "인터스텔라 뱃": "설명이 들어갈 부분입니다.",
        "톡실룸": "설명이 들어갈 부분입니다.",
        "베노텅": "설명이 들어갈 부분입니다.",
        "문죠": "설명이 들어갈 부분입니다.",
        // 에퀼리브리아
        "오르빗 이터": "설명이 들어갈 부분입니다.",
        "코스미릴로": "설명이 들어갈 부분입니다.",
        "플래니토이드": "설명이 들어갈 부분입니다.",
        "스페이스 와플": "설명이 들어갈 부분입니다.",
        "스페이스 스노우플레이크": "설명이 들어갈 부분입니다.",
        "베누블럽": "설명이 들어갈 부분입니다.",
        "라이트로덴트": "설명이 들어갈 부분입니다.",
        // 크레아티오
        "핑크 인베이더": "설명이 들어갈 부분입니다.",
        "스페이스 젤리즈": "설명이 들어갈 부분입니다.",
        "마이셀리안": "설명이 들어갈 부분입니다.",
        "스파인더": "설명이 들어갈 부분입니다.",
        "스타리 스키터": "설명이 들어갈 부분입니다.",
        "젤리넛": "설명이 들어갈 부분입니다.",
        "볼텍스 엘리멘탈": "설명이 들어갈 부분입니다.",
        // 실바니스
        "애스트로마이트": "설명이 들어갈 부분입니다.",
        "더스티": "설명이 들어갈 부분입니다.",
        "스페이스 슬러그": "설명이 들어갈 부분입니다.",
        "스포어 블룸": "설명이 들어갈 부분입니다.",
        "애스트로슈룸": "설명이 들어갈 부분입니다.",
        "문 크리터": "설명이 들어갈 부분입니다.",
        "젬크랩": "설명이 들어갈 부분입니다.",
        // 알비온 프라이머
        "스페이스랫": "설명이 들어갈 부분입니다.",
        "영 에일리언": "설명이 들어갈 부분입니다.",
        "플록시": "설명이 들어갈 부분입니다.",
        "코스몬": "설명이 들어갈 부분입니다.",
        "루나링": "설명이 들어갈 부분입니다.",
        "스타스프라이트": "설명이 들어갈 부분입니다.",
        "스페이스 마이츠": "설명이 들어갈 부분입니다."
    };
    console.log(`[ 초기화 ] 싱크타입 설명 데이터 (SYNC_TYPE_DESCRIPTIONS) 정의 완료. 총 ${Object.keys(SYNC_TYPE_DESCRIPTIONS).length}개`);

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


    // ★★★ 신규: 싱크타입 한글 이름과 영문 카드 ID 매핑 객체 ★★★
    const SYNC_TYPE_KOR_TO_ID_MAP = {};

    // CONSTELLATIONS_DATA와 SYNC_TYPE_CHARACTER_CARD_IDS를 기반으로 매핑 객체 자동 생성
    // 및 매칭되지 않은 항목 확인용 배열
    const unmappedKoreanSyncTypes = [];
    const allKoreanSyncTypesFromConstellations = [];

    try {
        Object.values(CONSTELLATIONS_DATA).forEach(constellation => {
            constellation.syncTypes.forEach(korName => {
                if (korName !== "기억안나") {
                    if (!allKoreanSyncTypesFromConstellations.includes(korName)) {
                        allKoreanSyncTypesFromConstellations.push(korName);
                    }

                    if (!SYNC_TYPE_KOR_TO_ID_MAP[korName]) { // 아직 매핑되지 않은 경우에만 시도
                        // 1차 시도: 한글 이름을 모두 소문자화하고 공백 제거 후 매칭
                        let probableIdPart = korName.toLowerCase().replace(/\s+/g, '');
                        let foundId = SYNC_TYPE_CHARACTER_CARD_IDS.find(engId =>
                            engId.startsWith(probableIdPart) && engId.endsWith('_character_card')
                        );

                        // 2차 시도: 1차 실패 시, 한글 이름을 소문자화하고 공백을 언더스코어로 변경 후 매칭
                        if (!foundId) {
                            probableIdPart = korName.toLowerCase().split(' ').join('_');
                            foundId = SYNC_TYPE_CHARACTER_CARD_IDS.find(engId =>
                                engId.startsWith(probableIdPart) && engId.endsWith('_character_card')
                            );
                        }
                        
                        // 3차 시도: (특정 단어 예외 처리 - 예: '로보베어' -> 'robobear')
                        // 더 복잡한 규칙이 있다면 여기에 추가 가능
                        // 예시: '가디언 로보베어' -> 'guardian_robobear_character_card'
                        if (!foundId && korName.includes("로보베어")) {
                            probableIdPart = korName.toLowerCase().replace("로보베어", "robobear").split(' ').join('_');
                             foundId = SYNC_TYPE_CHARACTER_CARD_IDS.find(engId =>
                                engId.startsWith(probableIdPart) && engId.endsWith('_character_card')
                            );
                        }


                        if (foundId) {
                            SYNC_TYPE_KOR_TO_ID_MAP[korName] = foundId;
                        }
                        // else {
                        //    // 자동 매핑 실패 시 unmappedKoreanSyncTypes에 추가 (아래에서 일괄 처리)
                        // }
                    }
                }
            });
        });

        // 모든 한글 싱크타입에 대해 매핑되었는지 최종 확인
        allKoreanSyncTypesFromConstellations.forEach(korName => {
            if (!SYNC_TYPE_KOR_TO_ID_MAP[korName]) {
                unmappedKoreanSyncTypes.push(korName);
            }
        });

        // 수동 매핑 (자동 매핑이 완벽하지 않을 경우를 대비하여 우선순위 높게 처리)
        // 여기에 확실하게 알고 있는 매핑을 추가하면 자동 매핑보다 우선됩니다.
        // 또는, 자동 매핑 후 누락된 것들만 추가합니다.
        // 예시: (만약 자동 매핑이 '엘더스퀴드'를 못찾는다면)
        // if (!SYNC_TYPE_KOR_TO_ID_MAP["엘더스퀴드"]) SYNC_TYPE_KOR_TO_ID_MAP["엘더스퀴드"] = "eldersquid_character_card";

        // 자동 매핑으로 대부분 처리될 것으로 기대되나, 특수한 경우 여기에 수동 매핑 추가:
        SYNC_TYPE_KOR_TO_ID_MAP["젠틀빔"] = "gentlebeam_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["버블퍼프"] = "bubblepuff_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스텔라 터틀"] = "stellarturtle_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["문 스눗"] = "moonsnuut_character_card"; // moonsnuut
        SYNC_TYPE_KOR_TO_ID_MAP["스페이스 퍼프"] = "spacepup_character_card"; // ID가 spacepup 임
        SYNC_TYPE_KOR_TO_ID_MAP["폴라로이드"] = "polaroid_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스타 가피"] = "starguppy_character_card"; // starguppy
        SYNC_TYPE_KOR_TO_ID_MAP["스타대셔"] = "stardasher_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["코멧 캐이나인"] = "cometcanine_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["파이어 스프라우트"] = "firesprout_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스타훗"] = "starhoot_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["펄사"] = "pulsar_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스월스"] = "swirlth_character_card"; // swirlth
        SYNC_TYPE_KOR_TO_ID_MAP["젤로마이트"] = "jellomite_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["가디언 로보베어"] = "guardian_robobear_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스타하이브"] = "starhive_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["아머드 슬러그"] = "armoredslug_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["아이봇"] = "eyebot_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["엘더스퀴드"] = "eldersquid_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스테드패스트 로보베어"] = "steadfast_robobear_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["플래로우"] = "flarrow_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["코스믹아이"] = "cosmiceye_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["갤럭시캣"] = "galaxycat_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스파이럴 셸러"] = "spiralsheller_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["오르비터"] = "orbiter_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["그래비톤"] = "graviton_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스누터"] = "snooter_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["펄스피쉬"] = "pulsefeesh_character_card"; // pulsefeesh
        SYNC_TYPE_KOR_TO_ID_MAP["아쿠아 독"] = "aquadog_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["인터스텔라 캣"] = "interstellarcat_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스페이스 워크"] = "spacewalk_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["링비"] = "ringbee_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["크리터넛"] = "critternaut_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["루미스퀴드"] = "lumisquid_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["인터로퍼"] = "interloper_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["코스믹 웜프"] = "cosmicwump_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["아스트랄 버니"] = "astralbunny_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["플로터"] = "floater_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["네뷸라 폭스"] = "nebulafox_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스페이스 버드"] = "spacebird_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["록키"] = "rocky_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["아우라밥"] = "aurabop_character_card"; // aurabop
        SYNC_TYPE_KOR_TO_ID_MAP["아주르 코멧펍"] = "azurecometpup_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["유풋"] = "ufoot_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["오르비니어"] = "orbineer_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["세팔론"] = "cephalon_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["글로브로"] = "globro_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["소나팟"] = "sonarpod_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["셀레스티레이"] = "celestiray_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["몰테나이트"] = "moltenite_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스푹코이드"] = "spookoid_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["크레이터비스트"] = "craterbeast_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["인터스텔라 뱃"] = "interstellarbat_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["톡실룸"] = "toxilum_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["베노텅"] = "venotongue_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["문죠"] = "moonjaw_character_card"; // moonjaw
        SYNC_TYPE_KOR_TO_ID_MAP["오르빗 이터"] = "orbiteeater_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["코스미릴로"] = "cosmirillo_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["플래니토이드"] = "planetoid_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스페이스 와플"] = "spacewaffle_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스페이스 스노우플레이크"] = "spacesnowflake_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["베누블럽"] = "venublub_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["라이트로덴트"] = "lightrodent_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["핑크 인베이더"] = "pinkinvader_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스페이스 젤리즈"] = "spacejellies_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["마이셀리안"] = "mycelian_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스파인더"] = "spinder_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스타리 스키터"] = "starryskitter_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["젤리넛"] = "jellynaut_character_card"; // jellynaut
        SYNC_TYPE_KOR_TO_ID_MAP["볼텍스 엘리멘탈"] = "vortexelemental_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["애스트로마이트"] = "astromite_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["더스티"] = "dusty_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스페이스 슬러그"] = "spaceslug_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스포어 블룸"] = "sporebloom_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["애스트로슈룸"] = "astroshroom_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["문 크리터"] = "mooncritter_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["젬크랩"] = "gemcrab_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스페이스랫"] = "spacerat_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["영 에일리언"] = "youngalien_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["플록시"] = "floxie_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["코스몬"] = "cosmon_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["루나링"] = "lunaling_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스타스프라이트"] = "starsprite_character_card";
        SYNC_TYPE_KOR_TO_ID_MAP["스페이스 마이츠"] = "spacemites_character_card";

        // 최종 검증 및 로그 출력
        const finalUnmapped = [];
        allKoreanSyncTypesFromConstellations.forEach(korName => {
            if (!SYNC_TYPE_KOR_TO_ID_MAP[korName]) {
                finalUnmapped.push(korName);
            }
        });

        if (finalUnmapped.length > 0) {
            console.warn(`[초기화 최종 경고] 다음 한글 싱크타입 이름에 대한 영문 카드 ID를 찾지 못했습니다. 수동 매핑이 필요합니다:`, finalUnmapped);
        } else {
            console.log("[초기화] 모든 한글 싱크타입 이름이 영문 카드 ID와 성공적으로 매핑되었습니다.");
        }
        console.log(`[ 초기화 ] 싱크타입 한글-영문ID 매핑 (SYNC_TYPE_KOR_TO_ID_MAP) 최종 생성 완료. 총 매핑된 수: ${Object.keys(SYNC_TYPE_KOR_TO_ID_MAP).length} / 전체 한글 싱크타입 수: ${allKoreanSyncTypesFromConstellations.length}`);
        // console.log("SYNC_TYPE_KOR_TO_ID_MAP:", JSON.stringify(SYNC_TYPE_KOR_TO_ID_MAP, null, 2)); // 필요시 전체 매핑 객체 콘솔 출력

    } catch (e) {
        console.error("[초기화 오류] SYNC_TYPE_KOR_TO_ID_MAP 생성 중 오류:", e);
    }



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
        console.log("[initializeUserProfile] 사용자 프로필 객체 생성 시도.");
        let defaultProfile = {
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
            "시나리오": null
        };

        const loadedProfile = loadUserProfileFromLocal();
        if (loadedProfile) {
            console.log("[initializeUserProfile] 로드된 프로필을 기본 프로필에 병합합니다.");
            // 로드된 프로필의 각 키에 대해 기본 프로필을 업데이트
            // 이렇게 하면 나중에 defaultProfile에 새 키가 추가되어도, 로컬에는 없는 이전 프로필 로드시 오류 방지
            Object.keys(defaultProfile).forEach(key => {
                if (loadedProfile.hasOwnProperty(key)) {
                    defaultProfile[key] = loadedProfile[key];
                }
            });
            // 로드된 프로필에만 있는 (defaultProfile에 없는) 추가적인 키도 병합 (미래 확장 대비)
            Object.keys(loadedProfile).forEach(key => {
                if (!defaultProfile.hasOwnProperty(key)) {
                    defaultProfile[key] = loadedProfile[key];
                }
            });
             console.log("[initializeUserProfile] 병합된 프로필:", defaultProfile);
        } else {
            console.log("[initializeUserProfile] 로드된 프로필 없음. 기본 프로필 사용.");
        }
        return defaultProfile;
    }

    // ★★★ 신규 함수 ★★★
    function saveUserProfileToLocal() {
        console.log("[saveUserProfileToLocal] 사용자 프로필 로컬 스토리지에 저장 시도.");
        if (userProfile) {
            try {
                const profileToSave = JSON.stringify(userProfile);
                localStorage.setItem('rubyChatUserProfile', profileToSave);
                console.log("[saveUserProfileToLocal] 사용자 프로필 저장 완료.");
            } catch (error) {
                console.error("[saveUserProfileToLocal] 프로필 저장 중 오류 발생:", error);
            }
        }
    }


       // ★★★ 신규 함수 ★★★
    function loadUserProfileFromLocal() {
        console.log("[loadUserProfileFromLocal] 로컬 스토리지에서 사용자 프로필 로드 시도.");
        try {
            const savedProfile = localStorage.getItem('rubyChatUserProfile');
            if (savedProfile) {
                const parsedProfile = JSON.parse(savedProfile);
                console.log("[loadUserProfileFromLocal] 저장된 프로필 로드 성공:", parsedProfile);
                return parsedProfile;
            }
            console.log("[loadUserProfileFromLocal] 저장된 프로필 없음.");
            return null;
        } catch (error) {
            console.error("[loadUserProfileFromLocal] 프로필 로드 또는 파싱 중 오류 발생:", error);
            localStorage.removeItem('rubyChatUserProfile'); // 오류 발생 시 손상된 데이터 제거
            return null;
        }
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

    let foundCardIdInList = null; // 코드 내 목록에서 찾은 최종 카드 ID (upright/reversed 포함)
    let baseCardIdForImageFile = null; // 실제 이미지 파일명을 위한 ID (upright 또는 기본)
    let imagePathPrefix = 'images/';
    let isReversedByApiName = false;
    let isSyncCard = false;

    const normalizedApiImgName = apiImageName.toLowerCase().trim();

    // 1. 싱크타입 카드 목록에서 찾아보기
    const normalizedApiImgNameForSync = normalizedApiImgName.replace(/_character_card$/, '');
    for (const syncId of SYNC_TYPE_CHARACTER_CARD_IDS) {
        if (syncId.replace(/_character_card$/, '') === normalizedApiImgNameForSync) {
            foundCardIdInList = syncId;
            baseCardIdForImageFile = syncId; // 싱크 카드는 역방향 없음
            imagePathPrefix = 'images/sync/';
            isSyncCard = true;
            break;
        }
    }

    // 2. 싱크타입 목록에서 못 찾았으면 타로 카드 목록에서 찾아보기
    if (!foundCardIdInList) {
        isReversedByApiName = normalizedApiImgName.endsWith('_reversed');
        const baseNameFromApi = normalizedApiImgName.replace(/_upright$/, '').replace(/_reversed$/, '');

        // ALL_TAROT_CARD_IDS 목록에서 API로 받은 이름과 가장 유사한 것을 찾음
        // (정방향/역방향 모두 고려)
        let bestMatch = null;
        let exactMatchFound = false;

        for (const tarotIdInList of ALL_TAROT_CARD_IDS) {
            if (tarotIdInList === normalizedApiImgName) { // API 이름과 정확히 일치하는 ID가 목록에 존재
                bestMatch = tarotIdInList;
                exactMatchFound = true;
                break;
            }
            // API 이름의 기본형과 목록 ID의 기본형이 일치하는 경우 (예: API='xxx_reversed', list='xxx_upright')
            if (tarotIdInList.replace(/_upright$/, '').replace(/_reversed$/, '') === baseNameFromApi) {
                if (!bestMatch) bestMatch = tarotIdInList; // 첫 번째 일치 항목 우선 저장
            }
        }
        
        if (exactMatchFound) { // API 이름(예: 'xxx_reversed')이 목록에 그대로 있으면 사용
            foundCardIdInList = bestMatch;
            if (isReversedByApiName) {
                 // 실제 파일은 upright 버전을 사용하고 CSS로 회전
                baseCardIdForImageFile = foundCardIdInList.replace('_reversed', '_upright');
                // 만약 upright 버전도 없다면, _reversed를 제거한 기본 이름 시도
                if (!ALL_TAROT_CARD_IDS.includes(baseCardIdForImageFile)) {
                    baseCardIdForImageFile = foundCardIdInList.replace('_reversed', '');
                }
            } else { // upright거나 접미사 없는 경우
                baseCardIdForImageFile = foundCardIdInList;
            }
        } else if (bestMatch) { // 정확히 일치하진 않지만 기본 이름이 일치하는 경우 (예: API는 _reversed인데 목록에는 _upright만 있음)
            foundCardIdInList = apiImageName; // API가 준 이름을 기준으로 판단 (alt 태그 등)
            if (isReversedByApiName) {
                baseCardIdForImageFile = bestMatch.endsWith('_upright') ? bestMatch : bestMatch.replace('_reversed', '_upright');
                 if (!ALL_TAROT_CARD_IDS.includes(baseCardIdForImageFile)) {
                    baseCardIdForImageFile = baseNameFromApi + '_upright'; // 강제로 upright 시도
                     if (!ALL_TAROT_CARD_IDS.includes(baseCardIdForImageFile)) {
                         baseCardIdForImageFile = baseNameFromApi; // 최후의 수단
                     }
                 }
            } else { // API 이름이 _upright거나 접미사 없을 때
                baseCardIdForImageFile = bestMatch.endsWith('_upright') ? bestMatch : baseNameFromApi + '_upright';
                if (!ALL_TAROT_CARD_IDS.includes(baseCardIdForImageFile)) {
                    baseCardIdForImageFile = baseNameFromApi;
                }
            }
        } else { // 목록에서 어떤 형태로도 찾지 못한 경우
             foundCardIdInList = apiImageName; // API가 준 이름 그대로 사용 (오류 처리를 위해)
             baseCardIdForImageFile = apiImageName; // 일단 API 이름 그대로 시도 (null.png로 갈 가능성 높음)
        }

        // baseCardIdForImageFile이 여전히 _reversed를 포함하고 있다면, _upright로 변경 시도
        if (baseCardIdForImageFile.endsWith('_reversed')) {
            let uprightVersion = baseCardIdForImageFile.replace('_reversed', '_upright');
            // upright 버전이 ALL_TAROT_CARD_IDS 목록에 실제로 존재하는지 확인하는 것이 더 정확하지만,
            // 여기서는 일단 파일명 규칙으로 변환.
            // 또는, ALL_TAROT_CARD_IDS 목록에서 해당 base 이름의 _upright 버전을 찾아야 함.
            // 이 로직은 위에서 bestMatch 찾을 때 이미 어느정도 커버됨.
            // 만약 baseCardIdForImageFile이 여전히 _reversed라면, 파일 시스템에 _reversed.png가 있어야 함.
            // 우리의 전략은 _upright.png를 사용하고 CSS로 회전하는 것이므로, _reversed를 제거하거나 _upright로 바꿔야 함.
            
            // 더 확실한 방법: 목록에서 baseNameFromApi + "_upright" 을 찾는다.
            const uprightVersionInList = ALL_TAROT_CARD_IDS.find(id => id === baseNameFromApi + "_upright");
            if (uprightVersionInList) {
                baseCardIdForImageFile = uprightVersionInList;
            } else {
                // upright 버전이 목록에 없다면, 그냥 baseName (접미사 없는)으로 시도
                const baseVersionInList = ALL_TAROT_CARD_IDS.find(id => id === baseNameFromApi && !id.endsWith("_reversed") && !id.endsWith("_upright"));
                if (baseVersionInList) {
                    baseCardIdForImageFile = baseVersionInList;
                } else {
                     // 최후: API가 준 이름에서 _reversed만 제거 (이 파일이 존재할 가능성은 낮음)
                    baseCardIdForImageFile = baseNameFromApi;
                }
            }
        }
    }


    const balloonDiv = document.createElement('div');
    balloonDiv.classList.add('image-balloon');
    const img = document.createElement('img');
    let finalFilenameForDisplay = foundCardIdInList || apiImageName; // alt 태그 및 콘솔용
    let finalSrc;

    if (baseCardIdForImageFile && !isSyncCard) { // 타로 카드인 경우
        finalSrc = `${imagePathPrefix}${baseCardIdForImageFile}.png`;
        console.log(`[createCardImageElement] API 이미지명 '${apiImageName}'에 대해, 실제 파일은 '${baseCardIdForImageFile}.png' 사용. 경로: ${finalSrc}`);
    } else if (baseCardIdForImageFile && isSyncCard) { // 싱크 카드인 경우
        finalSrc = `${imagePathPrefix}${baseCardIdForImageFile}.png`;
        console.log(`[createCardImageElement] 싱크 카드 '${apiImageName}' 경로: ${finalSrc}`);
    }
    else { // 목록에서 일치하는 것을 찾지 못한 경우 또는 baseCardIdForImageFile이 설정 안된 경우
        console.warn(`[createCardImageElement] API 이미지명 '${apiImageName}'에 적합한 이미지 파일 ID를 결정하지 못함. null.png 표시.`);
        finalFilenameForDisplay = "정보 없음";
        finalSrc = `images/null.png`;
        isSyncCard = false;
        isReversedByApiName = false; // null.png는 역방향 없음
    }

    img.src = finalSrc;
    const altTextContent = finalFilenameForDisplay.replace(/_character_card|_upright|_reversed/g, '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    img.alt = isSyncCard ? `캐릭터: ${altTextContent}` : (baseCardIdForImageFile && !baseCardIdForImageFile.includes("null") ? `타로: ${altTextContent}` : `이미지 정보 없음`);


    // isReversedByApiName는 API가 _reversed를 포함해서 줬는지 여부
    if (isReversedByApiName && !isSyncCard) {
        img.classList.add('reversed-card'); // CSS로 회전
    }

    img.onerror = () => {
        console.error(`[createCardImageElement] 이미지 최종 로드 실패: ${img.src}. null.png으로 대체 시도.`);
        // 에러 발생 시 null.png (기본 폴더)으로 강제 설정
        img.src = `images/null.png`;
        img.alt = `이미지 표시 오류`;
        img.classList.remove('reversed-card'); // null.png는 회전 안 함
        // balloonDiv.innerHTML = `<p style="color:#f0c0c0; font-size:0.8em; text-align:center;">[이미지 표시 오류]</p>`;
        // 이미지를 null.png로 대체했으므로, 이 ballonDiv.innerHTML 설정은 필요 없을 수 있음.
        // 만약 null.png 조차 로드 실패하면 이 메시지가 유용할 수 있지만, 그 경우는 드묾.
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
        let updated = false;
        if (profileUpdates && typeof profileUpdates === 'object') {
            for (const key in profileUpdates) {
                if (userProfile.hasOwnProperty(key)) {
                    if (userProfile[key] !== profileUpdates[key]) { // 실제 변경이 있을 때만
                        userProfile[key] = profileUpdates[key];
                        console.log(`[updateUserProfile] ${key} 업데이트:`, userProfile[key]);
                        updated = true;
                    }
                } else {
                    // userProfile에 없는 키라도, profileUpdates에 있다면 추가 (예: API가 새로운 필드를 줄 경우)
                    // 하지만 initializeUserProfile에서 정의된 키만 사용하는 것이 더 엄격한 관리 방식일 수 있음
                    // 여기서는 일단 없는 키도 추가되도록 열어둠 (필요시 수정)
                    userProfile[key] = profileUpdates[key];
                    console.warn(`[updateUserProfile] 프로필에 없던 키 ${key} 추가됨:`, userProfile[key]);
                    updated = true;
                }
            }

            if (updated) {
                console.log("[updateUserProfile] 업데이트 후 전체 프로필:", userProfile);
                saveUserProfileToLocal(); // ★★★ 로컬 스토리지에 저장 ★★★
            } else {
                console.log("[updateUserProfile] 실제 변경된 내용 없음. 저장 건너뜀.");
            }
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

            if (currentConsultationStage === 10 && previousStage !== 10) {
                showStage10EntryEmoticon = true;
                console.log("[advanceConsultationStage] 10단계로 처음 진입. showStage10EntryEmoticon = true 설정.");
            }


            if (currentConsultationStage === 10) {
                resetSessionTimers();
            } else {
                clearSessionTimers();
            }
            displayCurrentStageUI(); 
        } else {
            console.log(`[advanceConsultationStage] 단계 변경 없음. 현재 단계: ${currentConsultationStage}`);
        }
        manageSyncRetestButtonVisibility(); // ★★★ 변경된 함수 호출 ★★★
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


    // ★★★ 신규 함수 (싱크타입 재테스트 플로우 시작) ★★★
    async function handleSyncTypeRetestRequest() {
        console.log("[handleSyncTypeRetestRequest] 싱크타입 재테스트 요청 시작.");
        if (isSessionTimedOut) return;

        const userMessageText = "싱크타입 테스트 다시하고 싶어";
        const userMessageElement = createTextMessageElement(userMessageText, true);
        if (section2) section2.appendChild(userMessageElement);
        applyFadeIn(userMessageElement);
        conversationHistory.push({ role: "user", parts: [{ text: userMessageText }] });
        scrollToBottom(true);

        hideSuggestionButtons(true); // 기존 제안 버튼 숨김

        const rubyAction = null; // 또는 "루비가 너를 바라보며" 등
        const rubyMsg = "그래? 한번 정해진 싱크타입 이름은 다시 되돌릴 수 없는데, 싱크타입 카드는 저장했어?";
        const suggestions = ["응", "싱크타입 카드 저장은 어떻게해?"];

        await displayHardcodedUIElements(rubyAction, rubyMsg, suggestions, handleSyncTypeRetestConfirmation);
    }


    // ★★★ 신규 함수 (싱크타입 재테스트 확인/안내 플로우) ★★★
    async function handleSyncTypeRetestConfirmation(buttonText) {
        console.log(`[handleSyncTypeRetestConfirmation] 버튼 클릭: "${buttonText}"`);
        if (isSessionTimedOut) return;

        const userMessageElement = createTextMessageElement(buttonText, true);
        if (section2) section2.appendChild(userMessageElement);
        applyFadeIn(userMessageElement);
        conversationHistory.push({ role: "user", parts: [{ text: buttonText }] });
        scrollToBottom(true);

        hideSuggestionButtons(true); // 기존 제안 버튼 숨김

        let rubyAction = null;
        let rubyMsg = "";
        let nextSuggestions = [];
        let nextButtonHandler = null;

        if (buttonText === "응") { // "싱크타입 카드는 저장했어?" -> "응"
            rubyMsg = "알았어 그러면 다시 테스트를 해보자!";
            // 재테스트 시작 전 프로필 초기화 및 저장
            updateUserProfile({
                "주관식질문1": null, "주관식답변1": null, "주관식질문2": null, "주관식답변2": null,
                "주관식질문3": null, "주관식답변3": null, "주관식질문4": null, "주관식답변4": null,
                "주관식질문5": null, "주관식답변5": null, "객관식질문과답변": [],
                "DISC_D_점수": 0, "DISC_I_점수": 0, "DISC_S_점수": 0, "DISC_C_점수": 0,
                "결정된싱크타입": null, "사용자소속성운": null, "사용자가성운에속한이유": null,
                "시나리오": null // 시나리오도 초기화
            });
            현재주관식질문인덱스 = 0;
            currentObjectiveQuestionIndex = 0; // 객관식 인덱스도 초기화
            // 대화내용은 안지우기로 했으므로 clearChatArea()는 호출 안함

            await displayHardcodedUIElements(rubyAction, rubyMsg, [], handleButtonClick); // 버튼 없이 메시지만 표시
            advanceConsultationStage(4); // 주관식 1번으로 이동

        } else if (buttonText === "싱크타입 카드 저장은 어떻게해?") {
            rubyMsg = "🦴버튼을 눌러서 2번째 페이지에서 싱크타입카드 저장 버튼을 누르면 저장될거야!";
            nextSuggestions = ["응 테스트 다시 해줘!", "다시 본론으로 돌아가자"];
            nextButtonHandler = handleSyncTypeRetestFinalDecision; // 다음 핸들러 지정
            await displayHardcodedUIElements(rubyAction, rubyMsg, nextSuggestions, nextButtonHandler);

        }
    }

    // ★★★ 신규 함수 (싱크타입 재테스트 최종 결정 플로우) ★★★
    async function handleSyncTypeRetestFinalDecision(buttonText) {
        console.log(`[handleSyncTypeRetestFinalDecision] 버튼 클릭: "${buttonText}"`);
        if (isSessionTimedOut) return;

        const userMessageElement = createTextMessageElement(buttonText, true);
        if (section2) section2.appendChild(userMessageElement);
        applyFadeIn(userMessageElement);
        conversationHistory.push({ role: "user", parts: [{ text: buttonText }] });
        scrollToBottom(true);

        hideSuggestionButtons(true); // 기존 제안 버튼 숨김

        if (buttonText === "응 테스트 다시 해줘!") {
            const rubyMsg = "좋아, 다시 시작하자!"; // 선택적 루비 응답
             // 재테스트 시작 전 프로필 초기화 및 저장
            updateUserProfile({
                "주관식질문1": null, "주관식답변1": null, "주관식질문2": null, "주관식답변2": null,
                "주관식질문3": null, "주관식답변3": null, "주관식질문4": null, "주관식답변4": null,
                "주관식질문5": null, "주관식답변5": null, "객관식질문과답변": [],
                "DISC_D_점수": 0, "DISC_I_점수": 0, "DISC_S_점수": 0, "DISC_C_점수": 0,
                "결정된싱크타입": null, "사용자소속성운": null, "사용자가성운에속한이유": null,
                "시나리오": null
            });
            현재주관식질문인덱스 = 0;
            currentObjectiveQuestionIndex = 0;

            await displayHardcodedUIElements(null, rubyMsg, [], handleButtonClick);
            advanceConsultationStage(4); // 주관식 1번으로 이동

        } else if (buttonText === "다시 본론으로 돌아가자") {
            // 루비가 응답 없이 바로 API 호출로 넘어가도 되고, 간단한 응답 후 넘어가도 됨
            // const rubyMsg = "알겠어, 이야기하던 걸 계속하자!";
            // await displayHardcodedUIElements(null, rubyMsg, [], handleButtonClick);

            messageBuffer = "싱크타입 테스트 다시 하지 않고, 기존 상담 이어가자!"; // API로 보낼 메시지
            await sendApiRequest(); // 현재 10단계이므로, 이대로 API 호출
        }
        // 이 버튼 클릭 후에는 '싱크타입 테스트 다시해 다시하고 싶어' 버튼은 어차피 manage 함수에서 조건에 따라 숨겨짐
        manageSyncRetestButtonVisibility(); // 상태 변경 후 버튼 가시성 업데이트
    }

    // ★★★ 신규 함수명 변경 및 로직 수정: 독립적인 싱크타입 재테스트 버튼 관리 ★★★
    function manageSyncRetestButtonVisibility() {
        const container = document.getElementById('syncRetestButtonContainer');
        if (!container) {
            console.warn("[manageSyncRetestButtonVisibility] syncRetestButtonContainer 요소를 찾을 수 없습니다.");
            return;
        }

        const section5Height = section5 ? section5.offsetHeight : 80;
        container.style.bottom = `${section5Height}px`;

        let targetVisibleSlideIndexForPage2 = -1;
        if (visibleFloatingMenuSlides === 3) {
            targetVisibleSlideIndexForPage2 = 1; 
        } else if (visibleFloatingMenuSlides === 2) {
            targetVisibleSlideIndexForPage2 = 0; 
        }

        const shouldShow = isFloatingMenuOpen &&
                           currentFloatingMenuSlideIndex === targetVisibleSlideIndexForPage2 &&
                           currentConsultationStage === 10 &&
                           userProfile.결정된싱크타입 &&
                           userProfile.사용자소속성운;
        
        let button = container.querySelector('.sync-retest-action-button');

        if (shouldShow) {
            console.log("[manageSyncRetestButtonVisibility] 조건 충족. 버튼 표시/갱신 시도.");
            if (!button) { // 버튼이 아예 없으면 새로 생성
                console.log("[manageSyncRetestButtonVisibility] 버튼 없음. 새로 생성합니다.");
                button = document.createElement('div');
                button.classList.add('sync-retest-action-button');
                button.textContent = "싱크타입 테스트 다시하고 싶어";
                button.addEventListener('click', async () => {
                    if (isSessionTimedOut) return;
                    
                    // 버튼 클릭 시 애니메이션과 함께 숨김 처리
                    button.style.opacity = '0';
                    button.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        if(container.classList.contains('visible')) container.classList.remove('visible');
                    }, 300); // CSS transition과 일치
                    
                    hideFloatingMenu(); // 플로팅 메뉴도 닫음
                    await handleSyncTypeRetestRequest();
                });
                container.innerHTML = ''; // 기존 내용 확실히 비우기
                container.appendChild(button);
            }
            
            // 버튼(재생성되었거나 기존 버튼)에 애니메이션 효과를 주며 보이게 함
            // visible 클래스 추가 전에 opacity와 transform을 초기화해야 애니메이션이 반복됨
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
            
            if (!container.classList.contains('visible')) {
                container.classList.add('visible');
            }
            
            requestAnimationFrame(() => {
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            });

        } else {
            // console.log(`[manageSyncRetestButtonVisibility] 조건 미충족. 버튼 숨김. isFloatingMenuOpen: ${isFloatingMenuOpen}, currentSlide: ${currentFloatingMenuSlideIndex}, targetSlide: ${targetVisibleSlideIndexForPage2}, stage: ${currentConsultationStage}`);
            if (container.classList.contains('visible')) {
                if (button) { // 버튼이 존재하면 숨김 애니메이션 적용
                    button.style.opacity = '0';
                    button.style.transform = 'translateY(20px)';
                }
                setTimeout(() => {
                    // shouldShow 조건을 다시 확인 (타이머 실행 시점에 상태가 바뀌었을 수 있으므로)
                    const recheckShouldShow = isFloatingMenuOpen &&
                                           currentFloatingMenuSlideIndex === targetVisibleSlideIndexForPage2 &&
                                           currentConsultationStage === 10 &&
                                           userProfile.결정된싱크타입 &&
                                           userProfile.사용자소속성운;
                    if (container && !recheckShouldShow) { 
                        container.classList.remove('visible');
                        // 버튼 자체를 DOM에서 제거할 필요는 없음. 다음 표시 때 재사용.
                        // container.innerHTML = ''; // 이 줄은 버튼을 계속 유지하기 위해 주석 처리
                    }
                }, 300); 
            }
        }
    }
    // ★★★ 신규 함수: 독립적인 싱크타입 재테스트 버튼 표시/숨김 ★★★
    function displayIndependentSyncRetestButton() {
        const container = document.getElementById('independentActionButtonContainer');
        if (!container) {
            console.warn("[displayIndependentSyncRetestButton] independentActionButtonContainer 요소를 찾을 수 없습니다.");
            return;
        }

        // 조건: 10단계이고, 프로필에 싱크타입과 성운 정보가 있을 때
        const shouldShow = currentConsultationStage === 10 &&
                           userProfile.결정된싱크타입 &&
                           userProfile.사용자소속성운;

        if (shouldShow) {
            console.log("[displayIndependentSyncRetestButton] 조건 충족. 버튼 표시 시도.");
            // 버튼이 이미 있다면 중복 생성 방지
            if (!container.querySelector('.custom-action-button')) {
                const button = document.createElement('div');
                button.classList.add('custom-action-button'); // CSS 스타일 적용을 위함
                button.textContent = "싱크타입 테스트 다시하고 싶어";
                button.addEventListener('click', async () => {
                    if (isSessionTimedOut) return;
                    // 버튼 클릭 시, 이 독립 버튼은 일단 숨김 (재테스트 플로우 시작 시 다른 UI가 나옴)
                    container.classList.remove('visible');
                    await handleSyncTypeRetestRequest();
                });
                container.innerHTML = ''; // 기존 내용 비우기 (혹시 모를 중복 방지)
                container.appendChild(button);
            }
            if (!container.classList.contains('visible')) {
                container.classList.add('visible');
            }
        } else {
            console.log("[displayIndependentSyncRetestButton] 조건 미충족 또는 해당 단계 아님. 버튼 숨김.");
            if (container.classList.contains('visible')) {
                container.classList.remove('visible');
                // 버튼 숨길 때 내용도 비워주는 것이 깔끔할 수 있음 (선택적)
                // setTimeout(() => { if(!container.classList.contains('visible')) container.innerHTML = ''; }, 300); // transition 후
            }
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
    updateFloatingMenuVisibility();
    let actionText = null;
    let assistantMsgWithTags = null;

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
            console.log("[displayCurrentStageUI] Processing stage 1");
            actionText = "루비가 당신을 발견하고 환하게 웃어요.";
            assistantMsgWithTags = "[exp001] 어서 와! 기다리고 있었어!<br>오늘은 어떤 <b>운명의 카드</b> 가 궁금해서 나를 찾아왔어?";
            setChatInputDisabled(true, "궁금한 타로 주제를 메뉴에서 선택해주세요.");
            if (rubyImageElement) rubyImageElement.classList.remove('blurred');
            await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);
            if (!isFloatingMenuOpen) {
                showFloatingMenu();
            }
            break;

        case 2:
            hideSuggestionButtons(true);
            console.log("[displayCurrentStageUI] Processing stage 2");
            if (!currentSelectedTarotType) {
                console.warn("[displayCurrentStageUI] Stage 2 entered without currentSelectedTarotType.");
                advanceConsultationStage(1);
                return;
            }
            actionText = null;
            assistantMsgWithTags = `선택한 주제 '${currentSelectedTarotType}'에 대해 더 자세히 알아볼까?`;
            const suggestionTextsStage2 = ["응", "다시 선택할래"];
            setChatInputDisabled(true, "버튼으로 답변해주세요.");
            await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);
            createSuggestionButtons(suggestionTextsStage2, handleButtonClick);
            break;

        case 3:
            hideSuggestionButtons(true);
            console.log("[displayCurrentStageUI] Processing stage 3");
            actionText = null;
            assistantMsgWithTags = "아, 그런데 혹시...🤔 <b>싱크타입</b> 이라고 알고 있어?";
            const suggestionTextsStage3 = ["당연하지", "그게뭐야?"];
            setChatInputDisabled(true, "버튼으로 답변해주세요.");
            await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);
            createSuggestionButtons(suggestionTextsStage3, handleButtonClick);
            break;

        case 3.5:
            hideSuggestionButtons(true);
            console.log("[displayCurrentStageUI] Processing stage 3.5");
            let suggestionTextsStage3_5 = [];
            if (!tempSelectedConstellation) {
                actionText = "루비가 귀를 쫑긋하며";
                assistantMsgWithTags = "그래 좋아! 그럼 너의 성운은 어디였어? 🌠";
                suggestionTextsStage3_5 = [...ALL_CONSTELLATION_NAMES, "기억안나 (성운)"];
            } else {
                actionText = null;
                const constellationData = CONSTELLATIONS_DATA[tempSelectedConstellation];
                if (constellationData) {
                    assistantMsgWithTags = `오 ${tempSelectedConstellation} 성운이구나! <br>${constellationData.description}<br>그러면 너의 싱크타입은..?`;
                    suggestionTextsStage3_5 = constellationData.syncTypes.map(st => st === "기억안나" ? "기억안나 (싱크타입)" : st);
                } else {
                    actionText = "루비가 고개를 갸웃하며";
                    assistantMsgWithTags = "음... 성운 정보에 문제가 있는 것 같아. [exp007] 다시 시도해줄래?";
                    suggestionTextsStage3_5 = ["처음으로 돌아가기"];
                    tempSelectedConstellation = null;
                }
            }
            setChatInputDisabled(true, "아래에서 선택해주세요.");
            await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);
            createSuggestionButtons(suggestionTextsStage3_5, handleButtonClick);
            break;

        case 4:
            hideSuggestionButtons(true);
            console.log(`[displayCurrentStageUI] Processing stage 4 (Subjective question ${현재주관식질문인덱스 + 1})`);
            let suggestionTextsStage4 = [];
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
                    suggestionTextsStage4 = ["아니 잠깐! 싱크타입이 뭐라구?"];
                    await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);
                    createSuggestionButtons(suggestionTextsStage4, handleButtonClick);
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
            const suggestionTextsStage7 = ["좋아! 시작하자 ✨"];
            setChatInputDisabled(true, "버튼으로 알려주세요.");
            await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);
            console.log("[displayCurrentStageUI] Stage 7: Creating '좋아! 시작하자 ✨' button.");
            createSuggestionButtons(suggestionTextsStage7, handleButtonClick);
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

            updateUserProfile({
                "객관식질문과답변": [], "DISC_D_점수": 0, "DISC_I_점수": 0, "DISC_S_점수": 0, "DISC_C_점수": 0
            });
            console.log("[displayCurrentStageUI] Case 8: User profile for objective questions reset and saved.");


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
            assistantMsgWithTags = "정말 고생많았어! 😉 모든 질문에 답해줬네.<br><br>그럼 이제 너의 선택을 종이에 적어서 우주로 띄워 보낼게 🌠 <br><br>잠시만 기다려줘.. 너의 싱크타입을 찾아서 올게!";
            const suggestionTextsStage9 = ["응, 찾아줘!"];
            setChatInputDisabled(true, "아래 버튼을 눌러주세요.");
            await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);
            createSuggestionButtons(suggestionTextsStage9, handleButtonClick);
            break;

        case 10:
            console.log(`[displayCurrentStageUI] Processing stage 10 (Conversation).`);
            if (isSessionTimedOut) {
                console.log("[displayCurrentStageUI] Session timed out. Skipping UI display for stage 10.");
                manageSyncRetestButtonVisibility(); // ★★★ 세션 타임아웃 시에도 버튼 상태 관리 ★★★
                return;
            }
            hideSuggestionButtons(true);

            if (!isApiLoading) {
                const hasSampleAnswerCurrently = lastApiResponse && lastApiResponse.sampleanswer && String(lastApiResponse.sampleanswer).trim() !== "";
                if (hasSampleAnswerCurrently) {
                     setChatInputDisabled(false, "직접 루비에게 메세지를 보낼 수도 있어요 ✨");
                     console.log("[displayCurrentStageUI] Stage 10: Sample answer likely present. Input enabled.");
                     const suggestionTextsFromApi = String(lastApiResponse.sampleanswer).split('|').map(s => s.trim()).filter(s => s);
                     createSuggestionButtons(suggestionTextsFromApi, (clickedText) => {
                        if (isSessionTimedOut) return;
                        chatInput.value = clickedText;
                        processUserInput();
                     });
                } else {
                     setChatInputDisabled(false, "루비에게 하고 싶은 말을 전해주세요. ✨");
                     console.log("[displayCurrentStageUI] Stage 10: Normal conversation. Input enabled, attempting focus.");
                     setTimeout(() => { if (chatInput && !chatInput.disabled && !isSessionTimedOut) chatInput.focus(); }, 100);
                }
            } else {
                 console.log("[displayCurrentStageUI] Stage 10: API is loading. Input state managed by sendApiRequest.");
            }
            resetSessionTimers();
            manageSyncRetestButtonVisibility(); // ★★★ 변경된 함수 호출 ★★★
            break;

        default:
            hideSuggestionButtons(true);
            console.warn(`[displayCurrentStageUI] Unknown stage: ${currentConsultationStage}. Resetting to stage 1.`);
            actionText = "루비가 어리둥절하며";
            assistantMsgWithTags = "앗, 길을 잃은 것 같아요! [exp007] 처음부터 다시 시작해볼까요?";
            const suggestionTextsDefault = ["응, 처음으로"];

            currentConsultationStage = 1;
            isSessionTimedOut = false;
            isFirstBotMessageDisplayed = false;
            showStage10EntryEmoticon = false;
            isInitialApiCallAfterObjectiveTest = false;
            clearSessionTimers();

            updateUserProfile({ "사용자소속성운": null, "결정된싱크타입": null, "사용자가성운에속한이유": null, "시나리오": null });


            setChatInputDisabled(true, "아래 버튼을 눌러주세요.");
            await displayHardcodedUIElements(actionText, assistantMsgWithTags, [], handleButtonClick);
            createSuggestionButtons(suggestionTextsDefault, handleButtonClick);
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
    
    saveUserProfileToLocal(); // ★★★ 객관식 답변 및 점수 변경 후 저장 ★★★

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
        const existingCompletionButtons = document.querySelector('#suggestionButtons .completion-option-button');

        if (!existingCompletionButtons) { 
            hideSuggestionButtons(true); 
            console.log("[handleObjectiveOptionSelection] All questions answered. Displaying final confirmation options FOR THE FIRST TIME.");
            const finalObjectiveOptions = ["선택 완료! ✨", "객관식만 다시 할래", "테스트 처음부터 다시"];
            createSuggestionButtons(finalObjectiveOptions, async (buttonText) => {
                if (isSessionTimedOut) return;
                const userResponseElement = createTextMessageElement(buttonText, true);
                if(section2) section2.appendChild(userResponseElement);
                applyFadeIn(userResponseElement);
                scrollToBottom(true);
                conversationHistory.push({ role: "user", parts: [{ text: buttonText }] });
                hideSuggestionButtons(true); 

                if (buttonText === "선택 완료! ✨") {
                    advanceConsultationStage(9);
                } else if (buttonText === "객관식만 다시 할래") {
                    const existingObjectiveContainers = section2.querySelectorAll('.objective-questions-container');
                    existingObjectiveContainers.forEach(container => container.remove());
                    currentConsultationStage = 8; 
                    await displayCurrentStageUI(); 
                } else if (buttonText === "테스트 처음부터 다시") {
                    const existingObjectiveContainers = section2.querySelectorAll('.objective-questions-container');
                    existingObjectiveContainers.forEach(container => container.remove());
                    for (let i = 1; i <= MAX_SUBJECTIVE_QUESTIONS; i++) {
                        userProfile[`주관식질문${i}`] = null; userProfile[`주관식답변${i}`] = null;
                    }
                    현재주관식질문인덱스 = 0;
                    // ★★★ 프로필 초기화 후 저장 ★★★
                    updateUserProfile({ // updateUserProfile을 통해 변경사항 일괄 적용 및 저장
                        "객관식질문과답변": [], "DISC_D_점수": 0, "DISC_I_점수": 0, "DISC_S_점수": 0, "DISC_C_점수": 0
                    });
                    advanceConsultationStage(4);
                }
            });
            if (suggestionButtonsContainer) {
                const buttons = suggestionButtonsContainer.querySelectorAll('.suggestion-button');
                buttons.forEach(btn => btn.classList.add('completion-option-button'));
                suggestionButtonsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            console.log("[handleObjectiveOptionSelection] Completion buttons already visible. Doing nothing to them.");
            if (suggestionButtonsContainer && suggestionButtonsContainer.classList.contains('visible')) {
                 suggestionButtonsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    } else {
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
    let scenarioToSet = null;

    if (currentConsultationStage === 2) {
        if (buttonText === "응") {
            if (userProfile.사용자소속성운 && userProfile.결정된싱크타입) { // 사용자가성운에속한이유 조건 제외
                console.log("[handleButtonClick] Stage 2 '응': 기존 싱크타입 정보(성운,타입) 감지. 시나리오 4로 진입 시도.");
                updateUserProfile({ "시나리오": "시나리오 4 - 네가 기억해줘서 정말 기쁘다고 말하며 타로 진행" });
                
                currentConsultationStage = 10; 
                showStage10EntryEmoticon = true;
                isInitialApiCallAfterObjectiveTest = true; 
                
                messageBuffer = `이전에 저장된 싱크타입 정보(성운: ${userProfile.사용자소속성운}, 싱크타입: ${userProfile.결정된싱크타입})를 바탕으로 선택한 주제 '${currentSelectedTarotType}'에 대한 타로 상담을 시작합니다. (시나리오 4)`;
                await sendApiRequest(0);
                manageSyncRetestButtonVisibility(); // ★★★ 변경된 함수 호출 ★★★
                return; 
            } else {
                nextStage = 3; 
            }
        } else if (buttonText === "다시 선택할래") {
            hardcodedMsgWithTags = "그래! 그럼 다시 🦴 버튼을 눌러서 선택해줘!";
            await displayHardcodedUIElements(hardcodedAction, hardcodedMsgWithTags, [], handleButtonClick);
            currentConsultationStage = 1;
            if (rubyImageElement) rubyImageElement.classList.remove('blurred');
            currentSelectedTarotType = null;
            updateUserProfile({ "사용자의고민": null });
            advanceConsultationStage(1);
            return;
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
            manageSyncRetestButtonVisibility(); // ★★★ 변경된 함수 호출 ★★★
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
        } else {
            const constellationData = CONSTELLATIONS_DATA[tempSelectedConstellation];
            const cleanButtonText = buttonText.replace(" (싱크타입)", "");
            if (constellationData && constellationData.syncTypes.includes(cleanButtonText)) {
                if (cleanButtonText === "기억안나") {
                    hardcodedAction = "루비가 고개를 갸웃하며";
                    hardcodedMsgWithTags = `이런, ${tempSelectedConstellation} 성운의 싱크타입도 기억나지 않는구나. 그럼 싱크타입 테스트를 다시 진행해볼까?`;
                    hardcodedSuggestions = ["응, 다시 테스트할게", "아니, 그냥 타로 볼래"];
                    shouldDisplayHardcodedUI = true;
                    tempSelectedConstellation = null;
                } else {
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
                    manageSyncRetestButtonVisibility(); // ★★★ 변경된 함수 호출 ★★★
                    return;
                }
            } else {
                 hardcodedAction = "루비가 당황하며";
                 hardcodedMsgWithTags = "앗, 뭔가 잘못 선택된 것 같아. [exp008] 다시 한번 골라줄래?";
                 await displayHardcodedUIElements(hardcodedAction, hardcodedMsgWithTags, [], handleButtonClick);
                 displayCurrentStageUI(); 
                 return;
            }
        }
        if (buttonText === "응, 다시 테스트할게") {
            tempSelectedConstellation = null;
            현재주관식질문인덱스 = 0;
            nextStage = 4;
        } else if (buttonText === "아니, 그냥 타로 볼래") {
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
            manageSyncRetestButtonVisibility(); // ★★★ 변경된 함수 호출 ★★★
            return;
        }
    } else if (currentConsultationStage === 4) {
        if (buttonText === "아니 잠깐! 싱크타입이 뭐라구?") {
            hardcodedAction = "루비가 다시 한번 설명하며";
            hardcodedMsgWithTags = "싱크타입에 대해 다시 한번 설명해 줄게. 😊<br><br>이건 <b>다양한 심리학 이론과 우주의 기운</b>을 통해 너의 <b>본질적인 유형</b>을 찾아내는 과정이야.<br>이렇게 발견된 너의 <b>'영혼의 쌍둥이'</b> 같은 싱크타입은 타로 카드의 해석 정확도를 높이는 데 중요한 역할을 해. ✨<br><br>바로 테스트를 통해 너의 싱크타입을 알아볼래?";
            hardcodedSuggestions = ["오오 정말? 좋아!", "바쁘니깐 나중에할게"];
            shouldDisplayHardcodedUI = true;
            setChatInputDisabled(true, "아래 버튼으로 답변해주세요.");
        } else if (buttonText === "오오 정말? 좋아!") {
             현재주관식질문인덱스 = 0;
             displayCurrentStageUI();
             return;
        } else if (buttonText === "바쁘니깐 나중에할게") {
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
             manageSyncRetestButtonVisibility(); // ★★★ 변경된 함수 호출 ★★★
             return;
        }
    } else if (currentConsultationStage === 7) {
        if (buttonText === "좋아! 시작하자 ✨") {
            nextStage = 8;
        }
    } else if (currentConsultationStage === 9 && (buttonText === "응, 보내줘!" || buttonText === "응, 찾아줘!")) {
        console.log(`[handleButtonClick] 9단계 '${buttonText}' 클릭. 싱크타입 결정 API 호출 시작.`);
        isRequestingSyncTypeResult = true;
        syncTypeResultRetryCount = 0;
        currentConsultationStage = 10; 
        showStage10EntryEmoticon = false; 
        isInitialApiCallAfterObjectiveTest = false; 
        messageBuffer = ""; 
        console.log(`[handleButtonClick] isRequestingSyncTypeResult set to: ${isRequestingSyncTypeResult}`);
        await sendApiRequest(0);
        return;
    } else if (currentConsultationStage === 10 && !shouldDisplayHardcodedUI && !nextStage) {
        console.log(`[handleButtonClick] 대화 단계(10) API 응답 버튼(sampleanswer) 클릭됨: "${buttonText}"`);
        messageBuffer = buttonText;
        await sendApiRequest(0);
        manageSyncRetestButtonVisibility(); // ★★★ 변경된 함수 호출 ★★★
        return;
    }


    if (shouldDisplayHardcodedUI) {
        if (nextStage !== null && nextStage !== currentConsultationStage) {
            await displayHardcodedUIElements(hardcodedAction, hardcodedMsgWithTags, hardcodedSuggestions, handleButtonClick);
            advanceConsultationStage(nextStage);
        } else {
            await displayHardcodedUIElements(hardcodedAction, hardcodedMsgWithTags, hardcodedSuggestions, handleButtonClick);
        }
    } else if (nextStage !== null) {
        advanceConsultationStage(nextStage);
    } else {
        console.log(`[handleButtonClick] 버튼 "${buttonText}" 처리 완료. nextStage: ${nextStage}, shouldDisplayHardcodedUI: ${shouldDisplayHardcodedUI}. 현 단계(${currentConsultationStage}) 유지 또는 추가 액션 없음.`);
    }
    manageSyncRetestButtonVisibility(); // ★★★ 변경된 함수 호출 ★★★
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
                // ★★★ updateUserProfile을 사용하므로 여기서 자동 저장됨 ★★★
                updateUserProfile({ [`주관식답변${현재주관식질문인덱스 + 1}`]: userInput });
                현재주관식질문인덱스++;

                if (현재주관식질문인덱스 < MAX_SUBJECTIVE_QUESTIONS) {
                    displayCurrentStageUI();
                } else {
                    console.log("[processUserInput] 모든 주관식 답변 완료. 객관식 전환 안내 단계(7)로 이동.");
                    advanceConsultationStage(7);
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
async function sendApiRequest(retryCount = 0, isInternalRecursiveCall = false) {
    const MAX_RETRIES = 3;
    const MAX_SYNC_TYPE_RETRIES = 3;
    const RETRY_DELAY_BASE = 3000;

    // Vercel 서버리스 함수 엔드포인트 (새로 추가 또는 변경)
    const PROXY_API_URL = '/api/callGoogleAPI'; // 실제 생성한 서버리스 함수 경로로 변경하세요.

    // API_KEY 상수는 클라이언트에서 더 이상 직접 사용하지 않습니다.
    // const API_KEY = 'AIzaSyDSAA6rbNdD3tV1W_u0nIll0XyTe63rU_k'; // 이 줄 삭제 또는 주석 처리
    // const MODEL_NAME = 'gemini-2.5-flash-preview-04-17'; // 모델명은 서버리스 함수 또는 여기서 관리 가능 (여기서는 유지)
    // const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`; // 이 줄 삭제 또는 주석 처리


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

    if (currentEffectiveRetry > 0) {
        const retryActionText = "잠시만요 교신에 문제가 생겼나봐요..! 📡";
        const actionEl = await createActionTextElement(retryActionText);
        if (section2 && actionEl) {
            section2.appendChild(actionEl);
            await animateActionText(actionEl, retryActionText);
            scrollToBottom(true);
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }

    if (isFirstAttemptForThisType) {
        setChatInputDisabled(true, isRequestingSyncTypeResult ? "너의 싱크타입을 찾는 중... ✨" : "루비의 메세지를 받아오는중... 🎉", true);
        showTypingIndicator();
    }
    setSendButtonLoading(true);

    const userMessageForApi = messageBuffer.trim() || (isRequestingSyncTypeResult ? "" : "진행해주세요.");
    let parsedResponse = null;
    let modelGeneratedText = "";
    const currentIsRequestingSyncType = isRequestingSyncTypeResult;

    try {
        console.log(`[sendApiRequest] 실제 API 요청 전송 시도. 현재 단계: ${currentConsultationStage}, isRequestingSyncTypeResult (호출 시점): ${currentIsRequestingSyncType}`);
        const systemInstructionText = getActiveSystemPrompt(currentIsRequestingSyncType); // 이 systemInstructionText는 requestBodyContent에 포함됨

        let userProfileItemsString = "";
        const profileKeysToIterate = Object.keys(userProfile);
        profileKeysToIterate.forEach(key => {
            const value = userProfile[key];
            let displayValue;
            if (key === "객관식질문과답변" && Array.isArray(value)) {
                if (value.length > 0) { displayValue = "\n"; value.forEach((item, index) => { displayValue += `  - 질문 ${index + 1} (${item.type}타입): ${item.question.substring(0, 30)}... / 답변: ${item.answer}\n`; }); }
                else { displayValue = "수집안됨"; }
            } else if (key.startsWith("DISC_") && typeof value === 'number') { displayValue = `${value}점`; }
            else if (key.startsWith("주관식답변") && value) { const questionNumber = key.replace("주관식답변", ""); const questionKey = `주관식질문${questionNumber}`; const questionText = userProfile[questionKey] || "해당 질문 없음"; displayValue = `(질문: ${questionText.substring(0,30)}...) ${String(value).trim() || "답변 없음"}`; }
            else if (key.startsWith("주관식질문")) { return; }
            else { displayValue = (value !== null && value !== undefined && String(value).trim() !== "") ? String(value).trim() : "수집안됨"; }
            userProfileItemsString += `${key}: ${displayValue}\n`;
        });
        const discSummary = `DISC 점수: D=${userProfile.DISC_D_점수}, I=${userProfile.DISC_I_점수}, S=${userProfile.DISC_S_점수}, C=${userProfile.DISC_C_점수}`;
        let currentUserTurnTextForApiContent = `
[현재 상담 단계]: ${currentConsultationStage}단계
[사용자 현재 정보]
${userProfileItemsString.trim()}
${discSummary}
루비가최근에보여준카드이미지: ${lastShownRubyCardImageId || "없음"}`;
        if (!currentIsRequestingSyncType && userMessageForApi) { currentUserTurnTextForApiContent += `\n[사용자 발화]\n${userMessageForApi}`; }

        const contentsForAPI = [];
        if (currentIsRequestingSyncType) { contentsForAPI.push({ role: "user", parts: [{ text: currentUserTurnTextForApiContent }] }); }
        else { contentsForAPI.push(...conversationHistory.map(turn => ({ role: turn.role, parts: turn.parts }))); contentsForAPI.push({ role: "user", parts: [{ text: currentUserTurnTextForApiContent }] }); }

        // requestBodyContent는 이제 서버리스 함수로 전달될 페이로드입니다.
        // 서버리스 함수가 Google API에 필요한 형식으로 이를 가공하거나 그대로 전달합니다.
        const requestBodyContent = {
            system_instruction: { parts: [{ text: systemInstructionText }] }, // 서버리스 함수가 이 부분을 사용하거나, 아니면 contents만 받을 수도 있음
            contents: contentsForAPI,
            generationConfig: { temperature: 0.7, topP: 0.9 }, // 이 부분도 서버리스 함수로 전달
            
        };

        if (isFirstAttemptForThisType) {
            console.log(`================ API REQUEST BODY (isRequestingSyncTypeResult: ${currentIsRequestingSyncType}) START ================`);
            console.log("[sendApiRequest] API 요청 본문 전체 (JSON) - 서버리스 함수로 전달될 내용:", JSON.stringify(requestBodyContent, null, 2));
            console.log("================ API REQUEST BODY END ==================");
        }

        if (!currentIsRequestingSyncType && suggestionButtonsContainer && suggestionButtonsContainer.classList.contains('visible')) { hideSuggestionButtons(true); }

        // ★★★ 여기가 핵심 변경: fetch 대상이 PROXY_API_URL로 변경 ★★★
        const response = await fetch(PROXY_API_URL, { // 서버리스 함수 호출
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBodyContent) // 서버리스 함수로 전송할 데이터
        });

        const responseTextRaw = await response.text(); // 서버리스 함수의 응답을 받음
        if (isFirstAttemptForThisType) {
            console.log("================ API RESPONSE RAW (FROM PROXY) START ================");
            console.log("[sendApiRequest] API 원본 응답 (프록시로부터):", responseTextRaw);
            console.log("================ API RESPONSE RAW (FROM PROXY) END ==================");
        }
        console.log("[sendApiRequest] API 응답 상태 코드 (프록시로부터):", response.status);

        // --- 이하 재시도 및 응답 처리 로직은 이전과 거의 동일하게 유지 ---
        // (단, 에러 발생 시 재귀 호출 시 isInternalRecursiveCall = true 전달)

        if (!response.ok) {
            const errorDetail = `HTTP 상태 ${response.status} (프록시): ${response.statusText}. 응답 미리보기: ${responseTextRaw.substring(0, 200)}...`;
            if (response.status >= 500 && response.status <= 599) {
                if (currentEffectiveRetry < maxEffectiveRetries - 1) {
                    console.warn(`[sendApiRequest] 프록시 HTTP ${response.status} 오류. 재시도 (${currentEffectiveRetry + 2}/${maxEffectiveRetries})...`);
                    if (typingIndicatorElement) await hideTypingIndicator(); 
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_BASE * (currentEffectiveRetry + 1)));
                    if (currentIsRequestingSyncType) { syncTypeResultRetryCount++; return sendApiRequest(retryCount, true); } 
                    else { return sendApiRequest(retryCount + 1, true); }
                }
            }
            throw new Error(errorDetail);
        }

        try {
            const responseData = JSON.parse(responseTextRaw); // 서버리스 함수의 응답을 파싱 (Google API 응답과 동일한 구조여야 함)
            if (responseData.candidates && responseData.candidates[0] && responseData.candidates[0].content &&
                responseData.candidates[0].content.parts && responseData.candidates[0].content.parts[0] &&
                typeof responseData.candidates[0].content.parts[0].text === 'string') {
                modelGeneratedText = responseData.candidates[0].content.parts[0].text;
            } else { throw new Error("프록시 응답 모델 구조 이상, 유효 텍스트 없음"); }
        } catch (e) {
            console.warn(`[sendApiRequest] 프록시 응답 내용 파싱/구조 오류: ${e.message}. 재시도 가능한지 확인...`);
            if (currentEffectiveRetry < maxEffectiveRetries - 1) {
                console.warn(`[sendApiRequest] 프록시 응답 내용 오류. 재시도 (${currentEffectiveRetry + 2}/${maxEffectiveRetries})...`);
                if (typingIndicatorElement) await hideTypingIndicator();
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_BASE * (currentEffectiveRetry + 1)));
                if (currentIsRequestingSyncType) { syncTypeResultRetryCount++; return sendApiRequest(retryCount, true); } 
                else { return sendApiRequest(retryCount + 1, true); }
            }
            throw new Error(`프록시 API 응답 파싱/구조 최종 오류: ${e.message}`);
        }
        
        parsedResponse = extractAndParseJson(modelGeneratedText);

        if (parsedResponse && parsedResponse.error) {
            console.warn(`[sendApiRequest] extractAndParseJson 오류 (프록시 응답): ${parsedResponse.error}. 재시도 가능한지 확인...`);
            if (currentEffectiveRetry < maxEffectiveRetries - 1) {
                console.warn(`[sendApiRequest] extractAndParseJson 오류. 재시도 (${currentEffectiveRetry + 2}/${maxEffectiveRetries})...`);
                if (typingIndicatorElement) await hideTypingIndicator();
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_BASE * (currentEffectiveRetry + 1)));
                if (currentIsRequestingSyncType) { syncTypeResultRetryCount++; return sendApiRequest(retryCount, true); } 
                else { return sendApiRequest(retryCount + 1, true); }
            }
            console.warn(`[sendApiRequest] extractAndParseJson 최종 오류 (프록시 응답): ${parsedResponse.error}.`);
        }

        lastApiResponse = parsedResponse;

        // --- 이하 싱크타입 결정 / 일반 응답 처리 로직 ---
        if (currentIsRequestingSyncType) {
            // ... (싱크타입 결정 성공/실패/재시도 로직 - 이전과 동일) ...
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
                
                const scenario1 = "시나리오 1 - 싱크타입 테스트 풀이 필요";
                profileUpdate.시나리오 = scenario1;
                updateUserProfile(profileUpdate);
                console.log(`[sendApiRequest] 싱크타입 결정 성공 및 시나리오 1 설정. 프로필 업데이트:`, userProfile);

                isRequestingSyncTypeResult = false; 
                syncTypeResultRetryCount = 0; 
                showStage10EntryEmoticon = true;
                isInitialApiCallAfterObjectiveTest = true;
                messageBuffer = `나의 싱크타입은 '${userProfile.결정된싱크타입}'(${userProfile.사용자소속성운} 성운)이구나! 나는 ${userProfile.시나리오} 상황이야. 내 성향에 맞는 타로 운세를 봐줘!`;
                
                if (typingIndicatorElement) await hideTypingIndicator();
                isApiLoading = false; 
                console.log("[sendApiRequest] 싱크타입 결정 후 일반 API 호출 직전, isApiLoading = false");
                return sendApiRequest(0, true); // 일반 API 호출, isInternalRecursiveCall = true

            } else { 
                let failureReason = "알 수 없는 이유";
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
                    return sendApiRequest(retryCount, true); 
                } else {
                    syncTypeResultRetryCount = 0; 
                    throw new Error(`싱크타입 결정 API 최종 실패 (내용 검증): ${failureReason}`);
                }
            }
        } else { 
            // ... (일반 API 응답 처리 로직 - 이전과 동일) ...
            if (parsedResponse && !parsedResponse.error && parsedResponse.user_profile_update) {
                if (parsedResponse.user_profile_update.시나리오 === undefined || parsedResponse.user_profile_update.시나리오 === null) {
                    // delete parsedResponse.user_profile_update.시나리오;
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

            if (currentConsultationStage === 10) { resetSessionTimers(); }

            let nextStageFromApi = null;
            if (parsedResponse && !parsedResponse.error) {
                if (parsedResponse.force_stage !== null && parsedResponse.force_stage !== undefined) { nextStageFromApi = parsedResponse.force_stage; }
                else if (parsedResponse.proceed_to_next_stage === true && currentConsultationStage < 10 ) { nextStageFromApi = currentConsultationStage + 1; }
            }

            if (nextStageFromApi !== null && nextStageFromApi !== currentConsultationStage) {
                console.log(`[sendApiRequest] API 응답에 따라 단계 변경 시도: ${currentConsultationStage} -> ${nextStageFromApi}`);
                advanceConsultationStage(nextStageFromApi, true);
            } else if (parsedResponse && !parsedResponse.error && currentConsultationStage === 10) {
                 const hasSampleAnswer = parsedResponse.sampleanswer && String(parsedResponse.sampleanswer).trim() !== "";
                 if (hasSampleAnswer) { setChatInputDisabled(false, "직접 루비에게 메세지를 보낼 수도 있어요 ✨"); }
                 else { setChatInputDisabled(false, "루비에게 하고 싶은 말을 전해주세요. ✨"); setTimeout(() => { if (chatInput && !chatInput.disabled && !isSessionTimedOut) chatInput.focus(); }, 100); }
            }
        }

    } catch (error) { // 최종 에러 처리
        console.error(`[sendApiRequest] API 호출 또는 응답 처리 중 최종 오류 (시도: ${currentEffectiveRetry + 1}/${maxEffectiveRetries}):`, error);
        if (typingIndicatorElement) await hideTypingIndicator();
        const finalErrorMsgWithTags = `앗, 내부 시스템에 작은 문제가 생겼나 봐요! [exp008]<br>잠시 후 다시 시도해주시겠어요?<br><small>(오류: ${error.message.substring(0,120)}...)</small>`;
        let errorSuggestion = ["처음으로 돌아갈래요"];
        const wasRequestingSyncTypeOnError = currentIsRequestingSyncType; 
        isRequestingSyncTypeResult = false; syncTypeResultRetryCount = 0;
        await displayHardcodedUIElements("루비가 매우 당황하며", finalErrorMsgWithTags, errorSuggestion, async (txt) => {
            if(txt === "처음으로 돌아갈래요" || txt === "테스트 처음부터 다시 하기") {
                clearChatArea(); conversationHistory = []; userProfile = initializeUserProfile(); currentConsultationStage = 0;
                isSessionTimedOut = false; isFirstBotMessageDisplayed = false; showStage10EntryEmoticon = false; isInitialApiCallAfterObjectiveTest = false;
                if (wasRequestingSyncTypeOnError) { loadedPrompts = {}; await initializeApp(); } 
                else { advanceConsultationStage(1); }
            } else if (txt === "싱크타입 없이 진행하기") {
                currentConsultationStage = 10; showStage10EntryEmoticon = true; isInitialApiCallAfterObjectiveTest = true;
                messageBuffer = "싱크타입 테스트 없이 바로 타로 상담을 진행합니다.";
                updateUserProfile({ "시나리오": "시나리오 X - 싱크타입 없이 진행 (오류 후 선택)"});
                if (typingIndicatorElement) await hideTypingIndicator();
                isApiLoading = false; await sendApiRequest(0, true);
            }
        });
        isApiLoading = false; 
    } finally {
        console.log("[sendApiRequest] finally 블록 실행.");
        const isStillRecursiveCallPending = (currentIsRequestingSyncType && !isRequestingSyncTypeResult); // 현재가 싱크타입이었고, 다음이 일반 API일 예정

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
        manageSyncRetestButtonVisibility(); // ★★★ 세션 타임아웃 시에도 버튼 상태 관리 ★★★
        return;
    }

    try {
        if (parsedResp.action) {
            const actionEl = await createActionTextElement(parsedResp.action);
            if(section2) section2.appendChild(actionEl);
            await animateActionText(actionEl, parsedResp.action);
            scrollToBottom();
            await new Promise(resolve => setTimeout(resolve, 50));
        }

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

        let assistantMsgWithTags = parsedResp.assistantmsg;
        if (assistantMsgWithTags && typeof assistantMsgWithTags === 'string') {
            assistantMsgWithTags = assistantMsgWithTags.replace(/\*\*(.*?)\*\*/gm, '$1');
            console.log("[displayApiResponseElements] 마크다운 처리 후 assistantmsg:", assistantMsgWithTags.substring(0, 50) + "...");

            const initialParagraphElement = createTextMessageElement("", false);
            if(section2) section2.appendChild(initialParagraphElement);
            applyFadeIn(initialParagraphElement);
            await animateBotMessageText(initialParagraphElement, assistantMsgWithTags);
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        // 일반 제안 버튼(sampleanswer)과 싱크타입 재테스트 버튼은 서로 독립적으로 표시될 수 있음
        // (단, CSS에서 위치가 겹치지 않도록 잘 조정해야 함. 현재는 동일 위치에 z-index로 구분)

        if (parsedResp.tarocardview === true) {
            hideSuggestionButtons(true); // 타로 카드 선택 UI가 나올 때는 일반 제안 버튼 숨김
            console.log("[displayApiResponseElements] tarocardview: true. 타로 카드 선택 UI 표시.");
            const cardsToSelect = (typeof parsedResp.cards_to_select === 'number' && parsedResp.cards_to_select > 0) ? parsedResp.cards_to_select : 3;
            displayTarotSelectionUI(cardsToSelect, handleMultipleCardSelection);
            setChatInputDisabled(true, `카드를 ${cardsToSelect}장 선택해주세요.`, true);
        } else if (parsedResp.sampleanswer && String(parsedResp.sampleanswer).split('|').map(s => s.trim()).filter(s => s).length > 0) {
            // sampleanswer가 있으면, 기존처럼 suggestionButtonsContainer에 버튼 생성
            console.log(`[displayApiResponseElements] sampleanswer ('${parsedResp.sampleanswer}') 발견. 제안 버튼 생성 시도.`);
            setChatInputDisabled(false, "직접 루비에게 메세지를 보낼 수도 있어요 ✨");
            const suggestionTexts = String(parsedResp.sampleanswer).split('|').map(s => s.trim()).filter(s => s);
            createSuggestionButtons(suggestionTexts, (clickedText) => {
                if (isSessionTimedOut) return;
                chatInput.value = clickedText;
                processUserInput();
            });
            console.log("[displayApiResponseElements] 샘플 답변 버튼 표시 완료.");
        } else if (currentConsultationStage === 10) {
            // sampleanswer 없고 10단계면, 일반 제안 버튼은 없음. 입력창만 활성화.
            console.log("[displayApiResponseElements] Stage 10: 일반 대화 응답 (샘플 답변 없음). 입력창 활성화 및 포커스 시도.");
            setChatInputDisabled(false, "루비에게 하고 싶은 말을 전해주세요. ✨");
            if (chatInput && !chatInput.disabled && !isSessionTimedOut) {
                setTimeout(() => chatInput.focus(), 50);
            }
        } else {
            // 10단계가 아니면서 sampleanswer도 없고 tarocardview도 false인 경우
            // (예: 단계 이동을 위한 중간 메시지)
            // 이 경우 일반 제안 버튼은 표시하지 않음.
            hideSuggestionButtons(true); // 확실히 숨김
            console.log(`[displayApiResponseElements] 현재 단계 ${currentConsultationStage}. sampleanswer 없고, tarocardview false. 입력창 상태는 displayCurrentStageUI 설정 따름.`);
        }

    } finally {
        console.log("[displayApiResponseElements] UI 처리 완료.");
        if (currentConsultationStage === 10) { 
            manageSyncRetestButtonVisibility(); // ★★★ 변경된 함수 호출 ★★★
        } else {
            // 10단계가 아니면 싱크타입 재테스트 버튼은 무조건 숨김
            const container = document.getElementById('syncRetestButtonContainer');
            if (container && container.classList.contains('visible')) {
                container.classList.remove('visible');
            }
        }
    }
}
    // --- 플로팅 메뉴 관련 함수 ---
    let isFloatingMenuOpen = false;

    function toggleFloatingMenu() {
        if (isFloatingMenuOpen) {
            hideFloatingMenu();
        } else {
            showFloatingMenu();
        }
    }

    function showFloatingMenu() {
        const menuContainer = document.getElementById('floatingMenuContainer');
        const overlay = document.getElementById('menuOverlay');
        const mainContainer = document.querySelector('.container');
        const allSlides = document.querySelectorAll('.floating-menu-slider .floating-menu');

        if (menuContainer && overlay && mainContainer && allSlides.length > 0) {
            updateFloatingMenuVisibility();

            allSlides.forEach(slide => {
                slide.style.opacity = '0';
            });

            menuContainer.classList.add('visible');
            overlay.classList.add('visible');
            mainContainer.classList.add('menu-open-blur');
            isFloatingMenuOpen = true;
            console.log("[FloatingMenu] 메뉴 열림");

            // --- #floatingMenuPage2 내용 설정 부분 수정 ---
            const floatingMenuPage2 = document.getElementById('floatingMenuPage2');
            const page2Title = floatingMenuPage2.querySelector('.floating-menu-title');
            const page2ImageContainer = floatingMenuPage2.querySelector('.sync-type-image-container'); // 수정된 선택자
            const page2DescriptionContent = floatingMenuPage2.querySelector('.sync-type-description-content'); // 수정된 선택자

            // 기존 내용 초기화
            if (page2ImageContainer) page2ImageContainer.innerHTML = '';
            if (page2DescriptionContent) page2DescriptionContent.innerHTML = '';


            if (userProfile.결정된싱크타입 && userProfile.사용자소속성운) {
                if (page2Title) page2Title.textContent = `나의 싱크타입: ${userProfile.결정된싱크타입}`;

                if (page2ImageContainer && page2DescriptionContent) { // 두 컨테이너 모두 있는지 확인
                    const userSyncTypeKorean = userProfile.결정된싱크타입;
                    const syncTypeCardId = SYNC_TYPE_KOR_TO_ID_MAP[userSyncTypeKorean];

                    if (syncTypeCardId) {
                        const syncImg = document.createElement('img');
                        syncImg.src = `images/sync/${syncTypeCardId}.png`;
                        syncImg.alt = `${userProfile.결정된싱크타입} 이미지`;
                        syncImg.dataset.action = "show_my_synctype_info"; // 이미지 클릭 시 액션
                        page2ImageContainer.appendChild(syncImg);

                        const syncDescText = SYNC_TYPE_DESCRIPTIONS[userProfile.결정된싱크타입] || "이 싱크타입에 대한 설명이 아직 준비되지 않았어요.";
                        // 설명을 p 태그로 감싸거나, 줄바꿈을 <br>로 변환하여 삽입
                        // 각 줄을 p 태그로 감싸면 CSS에서 p 태그에 대한 스타일링(예: margin)을 추가로 할 수 있습니다.
                        page2DescriptionContent.innerHTML = syncDescText.split('\n').map(line => `<p>${line || ' '}</p>`).join(''); // 빈 줄도 p태그로 감싸 공간 유지
                    } else {
                        // 이미지를 불러올 수 없을 때 표시할 내용 (선택적)
                        page2ImageContainer.innerHTML = '<p style="font-size:0.8em; color:#ccc; text-align:center; padding:10px;">싱크타입 이미지를<br>표시할 수 없습니다.</p>';
                        page2DescriptionContent.innerHTML = '<p style="font-size:0.8em; color:#ccc; text-align:center; padding:10px;">세부 정보 없음</p>';
                        console.warn(`[FloatingMenu] 싱크타입 '${userProfile.결정된싱크타입}'에 대한 카드 ID를 SYNC_TYPE_KOR_TO_ID_MAP에서 찾지 못했습니다.`);
                    }
                }
            } else {
                if (page2Title) page2Title.textContent = "나의 성운과 싱크타입"; // 기본 타이틀
                if (page2ImageContainer && page2DescriptionContent) { // 두 컨테이너 모두 있는지 확인
                    const defaultImg = document.createElement('img');
                    defaultImg.src = "images/menu/recommended_tarot_today.png"; // 기본 이미지
                    defaultImg.alt = "싱크타입 정보가 아직 없어요. 테스트를 통해 알아보세요!";
                    defaultImg.dataset.action = "start_sync_type_test_from_menu";
                    page2ImageContainer.appendChild(defaultImg);

                    page2DescriptionContent.innerHTML = '<p>아직 싱크타입 정보가 없어요.<br>테스트를 통해 알아보세요!</p>';
                }
            }
            // --- #floatingMenuPage2 내용 설정 부분 수정 끝 ---


            const slider = document.querySelector('.floating-menu-slider');
            const indicators = document.querySelectorAll('.floating-menu-indicator-dot');
            let initialTargetIndex = 0;
            let initialDomIndex = 0;

            if (visibleFloatingMenuSlides === 2) {
                initialDomIndex = 1;
                slider.style.transform = `translateX(0%)`;
            } else {
                initialDomIndex = 0;
                slider.style.transform = `translateX(0%)`;
            }

            if (allSlides[initialDomIndex]) {
                allSlides[initialDomIndex].style.opacity = '1';
            }
            currentFloatingMenuSlideIndex = initialTargetIndex;

            let visibleIndicatorCount = 0;
            indicators.forEach((dot) => {
                if (dot.style.display !== 'none') {
                    dot.classList.toggle('active', visibleIndicatorCount === initialTargetIndex);
                    visibleIndicatorCount++;
                }
            });

            if (chatInput) chatInput.blur();
            hideTooltip();
            manageSyncRetestButtonVisibility();
        }
    }
    function hideFloatingMenu() {
        const menuContainer = document.getElementById('floatingMenuContainer');
        const overlay = document.getElementById('menuOverlay');
        const mainContainer = document.querySelector('.container');

        if (menuContainer && overlay && mainContainer) {
            menuContainer.classList.remove('visible');
            overlay.classList.remove('visible');
            mainContainer.classList.remove('menu-open-blur'); 
            isFloatingMenuOpen = false;
            console.log("[FloatingMenu] 메뉴 닫힘");
            manageSyncRetestButtonVisibility(); // ★★★ 메뉴 닫힐 때 버튼 상태 업데이트 (숨김) ★★★
        }
    }
    function getRandomItem(arr) {
        if (!arr || arr.length === 0) return null;
        return arr[Math.floor(Math.random() * arr.length)];
    }

    async function handleFloatingMenuItemClick(action) {
        console.log(`[FloatingMenu] 메뉴 아이템 클릭: ${action}`);
        hideFloatingMenu(); 

        let userMessageText = "";
        let rubyActionText = null;
        let rubyAssistantMsg = "";
        let selectedTarotTypeForProfile = null;

        switch (action) {
            // ... (기존 case 'tarot_today_fortune' 부터 'tarot_salary_increase' 까지 동일하게 유지) ...
            case 'tarot_today_fortune':
                userMessageText = "오늘, 좋은일이 생길까?";
                rubyActionText = "루비가 눈을 반짝이며";
                rubyAssistantMsg = "당연하지! 타로로 한번 살펴보자 🎉";
                selectedTarotTypeForProfile = TAROT_TYPES.TODAY_FORTUNE;
                break;
            case 'tarot_love_crush':
                userMessageText = "그 애가 날 좋아할까?";
                rubyActionText = "루비의 눈이 하트가 됐어요";
                rubyAssistantMsg = "😍 확실한건 너는 정말 매력적이란거야!<br>타로로 그 분의 마음을 확인해볼까?";
                selectedTarotTypeForProfile = TAROT_TYPES.LOVE_LUCK;
                break;
            case 'tarot_pet_mood':
                userMessageText = "반려동물의 오늘 기분이 궁금해";
                rubyActionText = "루비가 꼬리를 살랑거리며";
                rubyAssistantMsg = "😁 분명 기분이 좋을거야! 타로로 알아볼까?";
                selectedTarotTypeForProfile = "반려동물 기분";
                break;
            case 'tarot_lotto':
                userMessageText = "로또번호가 진짜 궁금해";
                rubyActionText = "루비가 눈을 반짝거려요";
                rubyAssistantMsg = "🎩 그럼 오늘의 '루또' 를 마법으로 들여다 보자!";
                selectedTarotTypeForProfile = "로또 번호";
                break;
            case 'tarot_is_this_some':
                userMessageText = "이거 썸타는건가?";
                rubyActionText = "루비가 고개를 갸웃하며";
                rubyAssistantMsg = "음... 그 미묘한 기류, 타로로 한번 살펴볼까? 🧐";
                selectedTarotTypeForProfile = "썸 확인";
                break;
            case 'tarot_money_flow':
                userMessageText = "오늘의 재물운이 궁금해!";
                rubyActionText = "루비가 지폐를 세는 흉내를 내며";
                rubyAssistantMsg = "좋아! 돈의 흐름이 어디로 향하는지 한번 보자! 💸";
                selectedTarotTypeForProfile = TAROT_TYPES.MONEY_FLOW;
                break;
            case 'tarot_exam_luck':
                userMessageText = "얼마 안남은 시험, 잘 볼수 있을까?";
                rubyActionText = "루비가 응원의 눈빛을 보내며";
                rubyAssistantMsg = "분명 잘 해낼 수 있을 거야! 타로로 기운을 북돋아 줄게! 📖";
                selectedTarotTypeForProfile = TAROT_TYPES.STUDY_ACADEMIC;
                break;
            case 'tarot_relationship_luck':
                userMessageText = "오늘의 대인관계운이 궁금해";
                rubyActionText = "루비가 악수하는 손짓을 하며";
                rubyAssistantMsg = "좋은 인연이 가득할지, 타로에게 물어보자! 🤝";
                selectedTarotTypeForProfile = "대인관계운";
                break;
            case 'tarot_health_luck':
                userMessageText = "건강운이 궁금해";
                rubyActionText = "루비가 건강 주스를 마시는 흉내를 내며";
                rubyAssistantMsg = "몸도 마음도 건강한 하루가 되길! 타로로 건강의 기운을 살펴보자! 💪";
                selectedTarotTypeForProfile = TAROT_TYPES.SOMEONES_HEALTH;
                break;
            case 'tarot_salary_increase':
                userMessageText = "이번에 연봉 오를 수 있을까?";
                rubyActionText = "루비가 엄지를 척 들며";
                rubyAssistantMsg = "두근두근! 너의 노력이 결실을 맺을지, 타로 카드가 알려줄 거야! 💼";
                selectedTarotTypeForProfile = TAROT_TYPES.WORK_CAREER;
                break;

            case 'new_chat':
                console.log("[FloatingMenu] '새로운 상담 시작하기' 선택됨.");
                conversationHistory = []; 
                currentConsultationStage = 0; 
                isSessionTimedOut = false;
                isFirstBotMessageDisplayed = false;
                showStage10EntryEmoticon = false;
                isInitialApiCallAfterObjectiveTest = false;
                if (rubyImageElement) rubyImageElement.classList.remove('blurred');
                currentSelectedTarotType = null;
                updateUserProfile({ "사용자의고민": null, "선택된타로카드들": [], "시나리오": null }); 
                advanceConsultationStage(1); 
                return;

            // ★★★ 플로팅 메뉴 2번 바 액션 처리 ★★★
            case 'show_my_synctype_info':
                if (userProfile.결정된싱크타입) {
                    userMessageText = `내 싱크타입(${userProfile.결정된싱크타입})과 같은 유형의 사람에 대해서 더 알고싶어`;
                    // 사용자 메시지 표시
                    const synctypeInfoUserMsgEl = createTextMessageElement(userMessageText, true);
                    if(section2) section2.appendChild(synctypeInfoUserMsgEl);
                    applyFadeIn(synctypeInfoUserMsgEl);
                    conversationHistory.push({ role: "user", parts: [{ text: userMessageText }] });
                    scrollToBottom(true);
                    
                    // API 요청
                    messageBuffer = userMessageText;
                    await sendApiRequest();
                } else {
                    // 싱크타입 정보가 없을 경우 (이론상 이 action은 싱크타입이 있을 때만 연결됨)
                    await displayHardcodedUIElements("루비가 갸웃하며", "앗, 아직 너의 싱크타입 정보를 모르겠어! [exp007] 먼저 싱크타입 테스트를 해볼까?", ["응, 테스트할래"], (btnTxt) => {
                        if (btnTxt === "응, 테스트할래") {
                             updateUserProfile({
                                "주관식질문1": null, "주관식답변1": null, "주관식질문2": null, "주관식답변2": null,
                                "주관식질문3": null, "주관식답변3": null, "주관식질문4": null, "주관식답변4": null,
                                "주관식질문5": null, "주관식답변5": null, "객관식질문과답변": [],
                                "DISC_D_점수": 0, "DISC_I_점수": 0, "DISC_S_점수": 0, "DISC_C_점수": 0,
                                "결정된싱크타입": null, "사용자소속성운": null, "사용자가성운에속한이유": null, "시나리오": null
                            });
                            현재주관식질문인덱스 = 0; currentObjectiveQuestionIndex = 0;
                            advanceConsultationStage(4);
                        }
                    });
                }
                return; // 이 case는 API 호출 후 종료

            case 'start_sync_type_test_from_menu': // 싱크타입 정보 없을 때 기본 이미지 클릭 시
                 await displayHardcodedUIElements("루비가 활짝 웃으며", "좋아! 그럼 싱크타입 테스트를 시작해볼까? [exp001] 재미있는 질문들이 기다리고 있어!", ["응, 시작할래!"], (btnTxt) => {
                    if (btnTxt === "응, 시작할래!") {
                        updateUserProfile({
                            "주관식질문1": null, "주관식답변1": null, "주관식질문2": null, "주관식답변2": null,
                            "주관식질문3": null, "주관식답변3": null, "주관식질문4": null, "주관식답변4": null,
                            "주관식질문5": null, "주관식답변5": null, "객관식질문과답변": [],
                            "DISC_D_점수": 0, "DISC_I_점수": 0, "DISC_S_점수": 0, "DISC_C_점수": 0,
                            "결정된싱크타입": null, "사용자소속성운": null, "사용자가성운에속한이유": null, "시나리오": null
                        });
                        현재주관식질문인덱스 = 0; currentObjectiveQuestionIndex = 0;
                        advanceConsultationStage(4);
                    }
                });
                return;
            
            default:
                // 'start_recommended_tarot'은 'show_my_synctype_info'로 대체되었으므로,
                // 해당 case를 명시적으로 처리할 필요는 없지만, 혹시 다른 곳에서 사용될 수 있다면 남겨두거나,
                // 아래의 일반적인 타로 주제 선택 로직으로 포함될 수 있음.
                if (action && (action.startsWith('tarot_') || action.includes('_luck') )) { // start_recommended_tarot 제거
                    userMessageText = `"${action.replace('tarot_', '').replace(/_/g, ' ')}" 주제로 타로를 보고 싶어.`;
                    rubyActionText = "루비가 흥미로운 표정으로";
                    rubyAssistantMsg = "좋아! 그 주제에 대해서도 한번 살펴보자!";
                    selectedTarotTypeForProfile = action;
                } else if (action) {
                    console.log(`[FloatingMenu] '${action}' 선택됨. (준비중 또는 기타 액션)`);
                    await displayHardcodedUIElements("루비가 머쓱해하며", "이 기능은 아직 준비 중이거나, 특별한 동작이 없어! [exp007]", [], handleButtonClick);
                    return;
                } else {
                    console.warn(`[FloatingMenu] 알 수 없는 액션 또는 타로 주제 아님: ${action}`);
                    return;
                }
                break;
        }

        // 일반 타로 주제 선택 시 로직 (맨 처음 정의된 case들)
        if (userMessageText && rubyAssistantMsg && selectedTarotTypeForProfile) {
            const userMessageElement = createTextMessageElement(userMessageText, true);
            if(section2) section2.appendChild(userMessageElement);
            applyFadeIn(userMessageElement);
            conversationHistory.push({ role: "user", parts: [{ text: userMessageText }] });
            scrollToBottom(true);

            await displayHardcodedUIElements(rubyActionText, rubyAssistantMsg, [], handleButtonClick);

            currentSelectedTarotType = selectedTarotTypeForProfile;
            updateUserProfile({ "사용자의고민": currentSelectedTarotType }); 
            if (rubyImageElement && !rubyImageElement.classList.contains('blurred')) {
                rubyImageElement.classList.add('blurred');
            }
            advanceConsultationStage(2);
        }
    }

    // --- 플로팅 메뉴 슬라이드 관련 전역(또는 상위 스코프) 변수 ---
    // let currentFloatingMenuSlideIndex = 0; // 이미 존재
    // const totalFloatingMenuSlides = 3; // 이 값을 동적으로 변경
    let visibleFloatingMenuSlides = 3; // 실제 보이는 슬라이드 수

    function updateFloatingMenuVisibility() {
        const floatingMenuPage1 = document.getElementById('floatingMenuPage1');
        const slider = document.querySelector('.floating-menu-slider');
        const allSlides = document.querySelectorAll('.floating-menu-slider .floating-menu');
        const indicatorContainer = document.querySelector('.floating-menu-indicator-container');
        const indicatorDots = document.querySelectorAll('.floating-menu-indicator-dot');

        if (!floatingMenuPage1 || !slider || !indicatorContainer || indicatorDots.length < 3) {
            console.warn("[updateFloatingMenuVisibility] 플로팅 메뉴 관련 중요 DOM 요소 누락.");
            return;
        }

        if (currentConsultationStage === 1) {
            floatingMenuPage1.classList.remove('hidden-by-stage');
            floatingMenuPage1.style.display = ''; // 명시적으로 display 복원 (CSS에서 flex로 설정됨)
            visibleFloatingMenuSlides = 3;
            slider.style.width = '300%'; // 3개 슬라이드 너비
            allSlides.forEach(slide => {
                slide.style.width = `calc(100% / 3)`;
            });
            // 인디케이터 3개 모두 보이도록
            indicatorDots.forEach(dot => dot.style.display = '');
            // 현재 슬라이드가 0번이 아니었다면 0번으로 강제 이동 (1단계 진입 시)
            // if(currentFloatingMenuSlideIndex !== 0) handleFloatingMenuSlide(0);
        } else {
            floatingMenuPage1.classList.add('hidden-by-stage');
            floatingMenuPage1.style.display = 'none'; // 확실히 숨김
            visibleFloatingMenuSlides = 2; // 2, 3번 슬라이드만 보임
            slider.style.width = '200%'; // 2개 슬라이드 너비
            // 보이는 슬라이드(2,3번)들의 너비 조정
            document.getElementById('floatingMenuPage2').style.width = `calc(100% / 2)`;
            document.getElementById('floatingMenuPage3').style.width = `calc(100% / 2)`;

            // 인디케이터 1번 숨기고, 2,3번만 보이도록
            indicatorDots[0].style.display = 'none';
            indicatorDots[1].style.display = '';
            indicatorDots[2].style.display = '';

            // 만약 현재 슬라이드가 숨겨진 0번이었다면, 다음 유효한 슬라이드(여기서는 2번 바, 즉 인덱스 1)로 이동
            if (currentFloatingMenuSlideIndex === 0) {
                handleFloatingMenuSlide(1, true); // 1번 인덱스(두 번째 보이는 슬라이드)로 강제 이동
            }
        }
        console.log(`[updateFloatingMenuVisibility] 현재 보이는 플로팅 슬라이드 수: ${visibleFloatingMenuSlides}`);
    }
    // --- 플로팅 메뉴 슬라이드 관련 상태 변수 ---
    let currentFloatingMenuSlideIndex = 0;
    const totalFloatingMenuSlides = 3; // 플로팅 바의 총 개수

    // --- 플로팅 메뉴 슬라이드 관련 상태 변수 ---
    // --- 플로팅 메뉴 슬라이드 관련 상태 변수 ---
    // let currentFloatingMenuSlideIndex = 0; // (보이는 슬라이드 기준 인덱스)
    // let visibleFloatingMenuSlides = 3; // (updateFloatingMenuVisibility에서 관리)

    function handleFloatingMenuSlide(targetVisibleIndex, forceMove = false) { 
        const slider = document.querySelector('.floating-menu-slider');
        const indicators = document.querySelectorAll('.floating-menu-indicator-dot');
        const allSlides = document.querySelectorAll('.floating-menu-slider .floating-menu'); 
        const menuContainer = document.getElementById('floatingMenuContainer');

        if (!menuContainer.classList.contains('visible') ||
            (!forceMove && targetVisibleIndex === currentFloatingMenuSlideIndex) ||
            targetVisibleIndex < 0 || targetVisibleIndex >= visibleFloatingMenuSlides) {

            if (targetVisibleIndex < 0 || targetVisibleIndex >= visibleFloatingMenuSlides) {
                console.warn(`[FloatingMenu] 유효하지 않은 슬라이드 인덱스 (보이는 슬라이드 기준): ${targetVisibleIndex}, 현재 보이는 슬라이드 수: ${visibleFloatingMenuSlides}`);
            }
            // 유효하지 않은 슬라이드 이동 시에도 버튼 상태는 현재 기준으로 한번 더 업데이트
            manageSyncRetestButtonVisibility(); // ★★★ 유효하지 않은 이동 시도 시에도 버튼 상태 업데이트 ★★★
            return;
        }

        if (slider && allSlides.length >= visibleFloatingMenuSlides) {
            let actualDomTargetIndex = targetVisibleIndex;
            let actualDomCurrentIndex = currentFloatingMenuSlideIndex;

            if (visibleFloatingMenuSlides === 2 && document.getElementById('floatingMenuPage1').style.display === 'none') {
                actualDomTargetIndex = targetVisibleIndex + 1;
                actualDomCurrentIndex = currentFloatingMenuSlideIndex + 1;
            } else {
                 actualDomTargetIndex = targetVisibleIndex;
                 actualDomCurrentIndex = currentFloatingMenuSlideIndex;
            }

            if (allSlides[actualDomCurrentIndex] && actualDomCurrentIndex !== actualDomTargetIndex) {
                allSlides[actualDomCurrentIndex].style.opacity = '0';
            }

            slider.style.transform = `translateX(-${targetVisibleIndex * (100 / visibleFloatingMenuSlides)}%)`;

            requestAnimationFrame(() => {
                if (allSlides[actualDomTargetIndex]) {
                    allSlides[actualDomTargetIndex].style.opacity = '1';
                }
            });

            currentFloatingMenuSlideIndex = targetVisibleIndex;

            let visibleIndicatorCounter = 0;
            indicators.forEach((dot) => {
                if (dot.style.display !== 'none') {
                    dot.classList.toggle('active', visibleIndicatorCounter === targetVisibleIndex);
                    visibleIndicatorCounter++;
                }
            });
            console.log(`[FloatingMenu] 슬라이드 이동: 보이는 슬라이드 기준 ${targetVisibleIndex}번 (DOM ${actualDomTargetIndex}번)`);
            manageSyncRetestButtonVisibility(); // ★★★ 슬라이드 변경 후 버튼 상태 업데이트 ★★★
        }
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
                if (isSessionTimedOut) { event.preventDefault(); return; }
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    if (!sendButton.disabled) { processUserInput(); }
                    else { console.log("[EnterKey] 보내기 버튼 비활성화 상태. 메시지 전송 무시."); }
                }
            });
            chatInput.addEventListener('input', handleChatInput);
            chatInput.addEventListener('focus', () => {
                console.log("[chatInput Focus] 입력창 포커스됨. 레이아웃 조정 및 스크롤 시도.");
                setTimeout(() => { scrollToBottom(true); console.log("[chatInput Focus] scrollToBottom(true) 호출됨."); }, 300);
            });
        }

        if (section2) {
            section2.addEventListener('scroll', () => {
                if (isSessionTimedOut) return;
                const isAtBottom = section2.scrollHeight - section2.scrollTop - section2.clientHeight < isNearBottomThreshold;
                userHasScrolledUp = !isAtBottom;
                if (isAtBottom) { hideNewMessageButton(); }
                else if (section2.scrollHeight > section2.clientHeight + isNearBottomThreshold) { showNewMessageButton(); }
            });
        }

        if (newMessageButton) newMessageButton.addEventListener('click', () => {
            if (isSessionTimedOut) return;
            scrollToBottom(true);
        });

        if (window.visualViewport) {
            console.log("[setupEventListeners] VisualViewport API 지원됨. resize 이벤트 리스너 등록.");
            window.visualViewport.addEventListener('resize', () => {
                console.log("[VisualViewport Resize Event] VisualViewport 크기 변경 감지.");
                adjustContainerHeight();
            });
        } else {
            console.log("[setupEventListeners] VisualViewport API 미지원. window resize 이벤트 리스너 등록.");
            window.addEventListener('resize', adjustContainerHeight);
        }

        const floatingMenuButton = document.getElementById('floatingMenuButton');
        if (floatingMenuButton) {
            floatingMenuButton.addEventListener('click', toggleFloatingMenu);
        }

        const menuOverlay = document.getElementById('menuOverlay');
        if (menuOverlay) {
            menuOverlay.addEventListener('click', hideFloatingMenu);
        }

        const indicatorDots = document.querySelectorAll('.floating-menu-indicator-dot');
        indicatorDots.forEach(dot => {
            dot.addEventListener('click', (event) => {
                const domTargetIndexAttr = event.currentTarget.getAttribute('data-slide-target');
                if (domTargetIndexAttr !== null) {
                    const domTargetIndex = parseInt(domTargetIndexAttr, 10);
                    let targetVisibleIdx = domTargetIndex;

                    if (visibleFloatingMenuSlides === 2 && document.getElementById('floatingMenuPage1').style.display === 'none') {
                        if (domTargetIndex === 1) targetVisibleIdx = 0;
                        else if (domTargetIndex === 2) targetVisibleIdx = 1;
                        else return;
                    }

                    if (!isNaN(targetVisibleIdx)) {
                        console.log(`[Indicator Click] DOM target: ${domTargetIndex}, Visible target for handler: ${targetVisibleIdx}`);
                        handleFloatingMenuSlide(targetVisibleIdx);
                    }
                }
            });
        });

        const floatingPage1Items = document.querySelectorAll('#floatingMenuPage1 .floating-image-list-item');
        floatingPage1Items.forEach(item => {
            item.addEventListener('click', (event) => {
                const action = event.currentTarget.dataset.action;
                console.log(`[Event Listener] Page 1 Item clicked. Action: ${action}`);
                if (action) {
                    handleFloatingMenuItemClick(action);
                }
            });
        });

        /*
        const floatingPage2Image = document.querySelector('#floatingMenuPage2 .floating-single-image-container img');
        if (floatingPage2Image) {
            floatingPage2Image.addEventListener('click', (event) => {
                const action = event.currentTarget.dataset.action;
                console.log(`[Event Listener] Page 2 Item clicked. Action: ${action}`);
                if (action) {
                    handleFloatingMenuItemClick(action);
                }
            });
        }

        const floatingPage3Items = document.querySelectorAll('#floatingMenuPage3 .floating-two-column-image-item');
        floatingPage3Items.forEach(item => {
            item.addEventListener('click', (event) => {
                const action = event.currentTarget.dataset.action;
                console.log(`[Event Listener] Page 3 Item clicked. Action: ${action}`);
                if (action) {
                    handleFloatingMenuItemClick(action);
                }
            });
        });
        */

        // --- 드래그/스와이프 슬라이드 기능 수정 ---
        const sliderElement = document.querySelector('.floating-menu-slider');
        if (sliderElement) {
            let touchStartX = 0;
            let touchEndX = 0; // touchmove에서 마지막으로 기록된 X 좌표
            let isTouching = false; // isTouching으로 변수명 변경 (의미 명확화)
            const swipeThreshold = 50;

            sliderElement.addEventListener('touchstart', (event) => {
                // 멀티터치 방지 및 메뉴가 열려 있을 때만 스와이프 활성화
                if (event.touches.length > 1 || !isFloatingMenuOpen) return;
                touchStartX = event.touches[0].clientX; // clientX 사용 (screenX보다 뷰포트 기준)
                touchEndX = touchStartX; // 초기화 시점에는 start와 end 동일
                isTouching = true;
                // console.log(`[Swipe] touchstart: X=${touchStartX}`);
            }, { passive: true }); // passive: true 로 스크롤 성능 최적화

            sliderElement.addEventListener('touchmove', (event) => {
                if (!isTouching || event.touches.length > 1 || !isFloatingMenuOpen) return;
                touchEndX = event.touches[0].clientX;
                // console.log(`[Swipe] touchmove: X=${touchEndX}`);
                // 스와이프 중 실시간으로 슬라이더를 움직이게 하려면 여기서 transform 조작 (더 복잡해짐)
                // 여기서는 touchend에서 한 번에 처리
            }, { passive: true });

            sliderElement.addEventListener('touchend', (event) => {
                if (!isTouching || !isFloatingMenuOpen) { // event.touches.length 조건 제거 (touchend에서는 touches가 비어있음)
                    isTouching = false; // 혹시 모를 상황 대비
                    return;
                }
                isTouching = false;
                // touchEndX는 touchmove에서 마지막으로 업데이트된 값을 사용해야 함.
                // touchend의 event.changedTouches[0].clientX는 터치가 끝난 지점.

                const deltaX = touchEndX - touchStartX;
                // console.log(`[Swipe] touchend: deltaX=${deltaX}, startX=${touchStartX}, endX=${touchEndX}`);

                if (Math.abs(deltaX) > swipeThreshold) {
                    if (deltaX < 0) { // 왼쪽으로 스와이프 (다음)
                        if (currentFloatingMenuSlideIndex < visibleFloatingMenuSlides - 1) {
                            console.log("[Swipe] Next slide attempt");
                            handleFloatingMenuSlide(currentFloatingMenuSlideIndex + 1);
                        } else {
                            console.log("[Swipe] Already at last slide");
                            // 마지막 슬라이드에서 더 스와이프 시 약간의 바운스 효과 (선택적)
                            sliderElement.style.transition = 'transform 0.2s ease-out';
                            sliderElement.style.transform = `translateX(-${currentFloatingMenuSlideIndex * (100 / visibleFloatingMenuSlides) + 5}%)`; // 살짝 더 이동
                            setTimeout(() => {
                                sliderElement.style.transition = 'transform 0.4s ease-in-out'; // 원래 transition 복원
                                sliderElement.style.transform = `translateX(-${currentFloatingMenuSlideIndex * (100 / visibleFloatingMenuSlides)}%)`; // 제자리
                            }, 200);
                        }
                    } else { // 오른쪽으로 스와이프 (이전)
                        if (currentFloatingMenuSlideIndex > 0) {
                            console.log("[Swipe] Previous slide attempt");
                            handleFloatingMenuSlide(currentFloatingMenuSlideIndex - 1);
                        } else {
                            console.log("[Swipe] Already at first slide");
                            // 첫 슬라이드에서 더 스와이프 시 약간의 바운스 효과 (선택적)
                            sliderElement.style.transition = 'transform 0.2s ease-out';
                            sliderElement.style.transform = `translateX(5%)`; // 살짝 더 이동
                            setTimeout(() => {
                                sliderElement.style.transition = 'transform 0.4s ease-in-out';
                                sliderElement.style.transform = `translateX(0%)`;
                            }, 200);
                        }
                    }
                } else {
                    console.log("[Swipe] Swipe distance not enough or no swipe.");
                    // 원래 위치로 돌려놓는 로직 (스와이프 도중 실시간 이동 구현 시 필요)
                    // sliderElement.style.transform = `translateX(-${currentFloatingMenuSlideIndex * (100 / visibleFloatingMenuSlides)}%)`;
                }
                // Reset X 좌표
                touchStartX = 0;
                touchEndX = 0;
            });
        }
        // --- 드래그/스와이프 슬라이드 기능 끝 ---

        console.log("[setupEventListeners] 모든 이벤트 리스너 설정 완료");
    }
    initializeApp();

}); // END DOMContentLoaded