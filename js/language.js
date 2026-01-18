/* ==================================================
  EPISODE DATA
================================================== */
const EPISODES = {
  "ginny-georgia": [
    {
      number: 1,
      title: "파일럿 에피소드",
      duration: "59분",
      desc: "여기선 정착할 수 있을까. 딸 지니,아들 오스틴과 뉴잉글랜드의 웰스베리로 이사 온 조지아 밀러. 이동네,이상하고 희한해.하지만 정작 눈길을 끄는 건 그들 가족이다.",
      video: "https://www.youtube.com/embed/v9GobWkbCiM?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "가면이 아닌데",
      duration: "50분",
      desc: "이전에는 해본 적 없는,첫 경험들이 늘어나는 지니.새 친구들과 어울리는 건 힘들다. 마커스와 보낸 밤의 여파로도 괴롭고,조지아는 기지를 발휘해 새 일상에 적응한다.",
      video: "https://www.youtube.com/embed/v9GobWkbCiM?enablejsapi=1&rel=0"
    },
    {
      number: 3,
      title: "이 동네 부자들은",
      duration: "51분",
      desc: "모두가 흥분한 10학년 파자마 파디. 맥스는 자신의 마음을 고백하고, 지니는 헌터와 마커스 사이에서 갈팡질팡한다.어려운 처지의 조지아는 오랜 손버릇에 의지하고 만다.",
      video: "https://www.youtube.com/embed/v9GobWkbCiM?enablejsapi=1&rel=0"
    },
    {
      number: 4,
      title: "100% 페미니스트",
      duration: "52분",
      desc: "왜 아무런 답이 없지?헌터의 무관심에 불안한 지니.맥스는 금세 새로운 사랑에 빠진다.기금 마련행사에 대한 기발한 아이디어를 내는 조지아.꼭 성공시켜야지!",
      video: "https://www.youtube.com/embed/v9GobWkbCiM?enablejsapi=1&rel=0"
    },
    {
      number: 5,
      title: "놀랐지",
      duration: "55분",
      desc: "노래로 인기인이 된 지니.주위의 시선이 달라지니 자신의 정체성도 흔들리는 걸까.폴과 조지아가 데이트한 후,동네 분위기도 달라진다.뜻밖의 시장 경쟁자가 나타난다.",
      video: "https://www.youtube.com/embed/v9GobWkbCiM?enablejsapi=1&rel=0"
    },
    {
      number: 6,
      title: "트라우마",
      duration: "55분",
      desc: "낯선 불청객이 들이닥쳐 집을 뒤집어 놓는다. 내가 모르는, 엄마의 비밀은 무엇일까?엄마의 거짓말 때문에 화나는지니.다시 떠오르는 어두운 과거가 조지아를 괴롭힌다.",
      video: "https://www.youtube.com/embed/v9GobWkbCiM?enablejsapi=1&rel=0"
    },
    {
      number: 7,
      title: "생일 축하해",
      duration: "56분",
      desc: "아무 일 없었다는 듯, 지니의 생일 파티를 준비하는 조지아.하지만 지니는 다른 계획이 있다.이제 열여섯 살, 어른이니 걸맞은 파티를 열어야지.삐뚤어질 텐다!",
      video: "https://www.youtube.com/embed/v9GobWkbCiM?enablejsapi=1&rel=0"
    },
    {
      number: 8,
      title: "하나를 고르시오",
      duration: "56분",
      desc: "아빠가 곂에 있으면 좋겠어.아빠 덕에 에세이 과제를 멋지게 해내는 지니.이 정도면 번듯한 대학에 가는 데 도움이 되겠지?하지만 결과는 예상 밖.헌터와도 대립한다.",
      video: "https://www.youtube.com/embed/v9GobWkbCiM?enablejsapi=1&rel=0"
    },
    {
      number: 9,
      title: "어려운 거니까",
      duration: "57분",
      desc: "모전여전인가. 두 남자 사이에서 고민하는 지니와 조지아.맥스와 마커스도 큰 상처를 받자, 지니는 둘 다 위로하느라 정신없다.조지아가 숨긴 문제가 또 하나 탄로 난다.",
      video: "https://www.youtube.com/embed/v9GobWkbCiM?enablejsapi=1&rel=0"
    }
  ],

  "vampire-diaries": [
    {
      number: 1,
      title: "파일럿",
      duration: "43분",
      desc: "아버지가 돌아가신 충격에서 벗어나지 못하는 17살 엘레나는 새로 전학 온 스테판에게 관심을 두게 되지만 스테판에겐 숨기고 있는 비밀이 있는데...",
      video: "https://www.youtube.com/embed/P17u5H4GJFQ?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "혜성의 밤",
      duration: "42분",
      desc: "엘레나는 스테판과 대화하기 위해 살바토레의 집으로 가지만, 스테판 대신 그곳에 있는 데이먼을 발견한다. 데이먼은 스테판의 놀라운 과거를 폭로한다.",
      video: "https://www.youtube.com/embed/P17u5H4GJFQ?enablejsapi=1&rel=0"
    },
    {
      number: 3,
      title: "다른 희생자",
      duration: "42분",
      desc: "엘레나는 스테판과 보니가 친해지길 바라며 그 둘을 저녁 식사에 초대하지만, 저녁 식사는 데이먼과 캐롤라인이 예고 없이 등장하면서 방해를 받는다.",
      video: "https://www.youtube.com/embed/P17u5H4GJFQ?enablejsapi=1&rel=0"
    },
    {
      number: 4,
      title: "가족 관계",
      duration: "43분",
      desc: "스테판은 마을 설립자의 파티에 데려간다. 데이먼은 엘레나에게 살바토레에 대해 이야기하고, 엘레나는 의문을 가지게 된다.",
      video: "https://www.youtube.com/embed/P17u5H4GJFQ?enablejsapi=1&rel=0"
    }
  ],

    "my-life-with-the-walter-boys": [
    {
      number: 1,
      title: "여기는 콜로라도",
      duration: "49분",
      desc: "비극적인 일을 겪은 후 월터 가족과 함께 살게 된 재키. 시골 마을 생활에 적응해보려 애쓰지만, 집과 학교가 바뀌니 새로운 문제도 생겨난다.",
      video: "https://www.youtube.com/embed/pHIXtOrHF80?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "인생을 좀 즐겨",
      duration: "39분",
      desc: "재키에게 장난을 치고 그 일로 내기까지 한 월터 형제들. 이 사실을 알게 된 재키는 캐서린 아줌마에게 도움을 청한다. 하지만 곧 형제들에겐 그들만의 문제 대처 방식이 있음을 알게 된다.",
      video: "https://www.youtube.com/embed/pHIXtOrHF80?enablejsapi=1&rel=0"
    },
    {
      number: 3,
      title: "콜 효과",
      duration: "43분",
      desc: "동문회 허들에 함께 참여한 앨릭스와 재키. 두 사람은 콜의 도움을 받아 월터 가족의 사과주를 판매한다. 한편 콜은 자기 삶에서 풋볼이 사라져 버린 현실을 쉽게 받아들이지 못한다.",
      video: "https://www.youtube.com/embed/rT_vcRzG3aw?enablejsapi=1&rel=0"
    },
    {
      number: 4,
      title: "19",
      duration: "46분",
      desc: "루시 언니의 생일날, 재키는 학교 수업을 빼먹고 콜과 함께 호숫가 별장에서 열리는 파티에 가기로 한다. 그리고 파티 도중 두 사람은 엄청난 벌칙이 걸린 진실 게임에 도전하는데.",
      video: "https://www.youtube.com/embed/rT_vcRzG3aw?enablejsapi=1&rel=0"
    }
  ],

  "gossip-girl": [
    {
      number: 1,
      title: "파일럿",
      duration: "42분",
      desc: "맨해튼 어퍼 이스트 사이드의 명문 사립학교 학생들 사이에 세레나 반 더 우드슨이 돌아왔다는 소식이 퍼지게 된다.",
      video: "https://www.youtube.com/embed/kLXdIwmCzo4?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "와일드 브런치",
      duration: "37분",
      desc: "입맞춤 파티에서 스캔들을 일으켰던 키스 여파로 인해 세레나는 자신의 베프인 블레어로부터 냉대를 받는다.",
      video: "https://www.youtube.com/embed/kLXdIwmCzo4?enablejsapi=1&rel=0"
    },
    {
      number: 3,
      title: "포이즌 아이비",
      duration: "39분",
      desc: "블레어는 더 오래 비밀로 유지될 수 있었던 세레나에 대한 정보를 알아낸다.",
      video: "https://www.youtube.com/embed/kLXdIwmCzo4?enablejsapi=1&rel=0"
    },
    {
      number: 4,
      title: "새로운 백화점 모델",
      duration: "40분",
      desc: "엄마가 자신이 만드는 의류들의 새 모델로 블레어를 낙점하자 블레어는 매우 기뻐한다.",
      video: "https://www.youtube.com/embed/kLXdIwmCzo4?enablejsapi=1&rel=0"
    }
  ],

  "thursday-murder-club": [
    {
      number: 1,
      title: "공식 예고편",
      duration: "2분 31초",
      desc: "실버타운에 사는 네 명의 친구들. 재미 삼아 살인 사건을 추리하며 시간을 보내던 중, 실제 사건에 휘말리게 된다. 리처드 오스먼의 베스트셀러 소설을 각색한 작품.",
      video: "https://www.youtube.com/embed/VzJit9Tnzyo?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "티저 예고편",
      duration: "1분 12초",
      desc: "은퇴 후의 평온한 일상, 그리고 뜻밖의 살인 사건. 네 명의 개성 넘치는 노인 탐정들이 펼치는 유쾌하면서도 긴장감 넘치는 추리극의 시작을 엿볼 수 있다.",
      video: "https://www.youtube.com/embed/GtcchgBONJM?enablejsapi=1&rel=0"
    }
  ],
  
  "gilmore-girls": [
    {
      number: 1,
      title: "파일럿 에피소드",
      duration: "44분",
      desc: "로리가 명문 사립 고등학교 입학을 허가받자 로렐라이는 자존심을 버리고 부유한 친정부모님에게 등록금 지원을 부탁한다.",
      video: "https://www.youtube.com/embed/cghZ7XDo8N4?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "칠튼에서 보낸 로렐라이의 첫날",
      duration: "43분",
      desc: "칠튼 고등학교에서의 로리의 첫날은 순탄치가 않다. 로렐라이의 옷차림은 에밀리와 교장의 신경을 거스르고, 로리는 불쾌한 반 친구들을 만난다.",
      video: "https://www.youtube.com/embed/izFkQRlPBs8?enablejsapi=1&rel=0"
    }
  ],

    "black-doves": [
    {
      number: 1,
      title: "사랑을 위하여",
      duration: "55분",
      desc: "정치인의 아내이자 잠입 스파이로 활동하는 헬렌 웨브는 애인이 살해당했다는 사실을 알게 된다. 이후, 블랙 도브는 그녀를 보호하기 위해 헬렌의 옛 친구를 고용한다.",
      video: "https://www.youtube.com/embed/ujViPOPSVwY?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "신참 블랙 도브",
      duration: "53분",
      desc: "제이슨의 살인범을 찾던 헬렌은 막다른 길에 부딪히고, 자신의 목숨을 지키기 위해 싸워야 하는 상황에 놓인다. 한편, 샘은 예전 고용인에게서 협박을 받는다..",
      video: "https://www.youtube.com/embed/ZtiSakClwIU?enablejsapi=1&rel=0"
    }
  ],

    "house-md": [
    {
      number: 1,
      title: "파일럿",
      duration: "44분",
      desc: "그레고리 하우스 박사와 그의 엘리트 팀은 학생들 앞에서 헛소리를 하다 쓰러진 교사를 구하기 위해 달려간다.",
      video: "https://www.youtube.com/embed/GSgua-jsn-Q?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "부성",
      duration: "43분",
      desc: "한 십대 라크로스 선수가 불명의 뇌 질환을 얻게 되고, 하우스와 팀은 그의 부모에게 결정을 내리라고 재촉한다.",
      video: "https://www.youtube.com/embed/GSgua-jsn-Q?enablejsapi=1&rel=0"
    }
  ],

    "lonely-planet": [
    {
      number: 1,
      title: "공식 예고편",
      duration: "분",
      desc: "오스카 수상 배우 로라 던이 출연하는 화려한 로맨스 영화. 성공한 작가가 이별을 겪은 후 모로코로 떠나는데, 그곳에서 뜻밖의 러브 스토리가 펼쳐진다.",
      video: "https://www.youtube.com/embed/lTu7j2GOGwQ?enablejsapi=1&rel=0"
    }
  ],

    "suits": [
    {
      number: 1,
      title: "파일럿 파트 1 & 2",
      duration: "81분",
      desc: "승진한 하비가 하버드 법대 졸업생을 고용하라는 지시를 받자 마이크 로스를 선택한다. 그러나 마이크는 사실 법대 학위가 없다.",
      video: "https://www.youtube.com/embed/Ab2YIbP5xw8?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "과실 및 태만",
      duration: "43",
      desc: "하비가 유부녀와의 부적절한 관계를 가졌다고 비난을 받게 되면서 간단한 소송은 어려운 소송으로 돌변한다.",
      video: "https://www.youtube.com/embed/Ab2YIbP5xw8?enablejsapi=1&rel=0"
    }
  ],

    "the-resident": [
    {
      number: 1,
      title: "파일럿 에피소드",
      duration: "44분",
      desc: "채스테인 병원에서의 인턴 첫날. 레지던트 데번 프라베시는 특이한 진료 방식을 지닌 닥터 콘래드 호킨스를 만나 새 직장의 예상치 못한 현실에 눈을 뜬다.",
      video: "https://www.youtube.com/embed/IENji5h0btw?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "독립기념일",
      duration: "44분",
      desc: "심장 이식을 받게 될 환자를 두고 갈등이 생기자 콘래드는 벨에게 맞선다. 20명의 환자를 혼자 담당하게 된 데번은 점차 한계에 이른다.",
      video: "https://www.youtube.com/embed/IENji5h0btw?enablejsapi=1&rel=0"
    }
  ],

    "life-list": [
    {
      number: 1,
      title: "공식예고편",
      duration: "2분 44초",
      desc: "10대 시절 작성한 ‘라이프 리스트’를 완성해야만 유산을 상속받을 수 있는 조건을 마주한 젊은 여성의 이야기. 과거의 꿈과 현재의 현실 사이에서 성장과 선택을 그린 감성 드라마로, 동명의 베스트셀러 소설을 원작으로 한다.",
      video: "https://www.youtube.com/embed/nldAfgJrBr8?enablejsapi=1&rel=0"
    }
  ],

    "the-crown": [
    {
      number: 1,
      title: "울퍼튼 스플래시",
      duration: "57분",
      desc: "풋풋하고 앳된 엘리자베스 공주와 필립 공의 결혼이 이루어진다. 이 무렵 조지 6세 왕의 건강은 악화되고 윈스턴 처칠은 영국 총리로 재선된다.",
      video: "https://www.youtube.com/embed/OBJpARw9eEE?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "왕의 서거",
      duration: "61분",
      desc: "악화된 건강으로 이동이 불가능한 조지 왕을 대신해 엘리자베스와 필립이 영연방 4대륙 순방을 떠난다. 한편, 정당 대표들은 처칠을 총리직에서 하차시키려는 시도를 벌인다.",
      video: "https://www.youtube.com/embed/8xn-bxWyG_0?enablejsapi=1&rel=0"
    }
  ],

  "wednesday": [
    {
      number: 1,
      title: "수요일의 아이는 울적하다",
      duration: "60분",
      desc: "이전 학교에서 끝내주게 사악한 장난을 치는 바람에 퇴학당한 웬즈데이. 부모님은 둘이 처음 사랑에 빠졌던 기숙학교, 네버모어 아카데미로 웬즈데이를 보낸다.",
      video: "https://www.youtube.com/embed/ic2063VIGDE?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "가장 외로운 사람",
      duration: "49분",
      desc: "그날 밤 벌어진 이상한 사건에 대해 웬즈데이를 취조하는 보안관. 이후, 웬즈데이는 살벌한 포컵 경주에서 강력한 라이벌과 맞붙는다.",
      video: "https://www.youtube.com/embed/AIbUp3lXNq0?enablejsapi=1&rel=0"
    }
  ],

    "heart-beat": [
    {
      number: 1,
      title: "애비",
      duration: "45분",
      desc: "허리케인이 마이애미를 강타한다. 이에 더불어 심각한 혐의 제기로 레지던트들 사이에 균열이 생기면서 맥과이어 응급실에도 태풍이 휘몰아친다.",
      video: "https://www.youtube.com/embed/8do248uJCLA?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "혼자만의 시간",
      duration: "53분",
      desc: "폭풍이 더욱 거세지면서 응급실에는 환자들이 쇄도하고, 대니는 어려운 선택을 할 수밖에 없는데. 가까운 사람이 부상을 당한 상황에서 톰은 담대하게 대처해야 한다.",
      video: "https://www.youtube.com/embed/8do248uJCLA?enablejsapi=1&rel=0"
    }
  ],

  "the-residence": [
    {
      number: 1,
      title: "어셔가의 몰락",
      duration: "51분",
      desc: "백악관에서 발생한 사망 사건을 조사하기 위해 열린 의회 청문회. 수수께끼 같은 사건의 전말과 사건 해결을 위해 고용된 천재 탐정의 이야기가 본격적으로 펼쳐진다.",
      video: "https://www.youtube.com/embed/TfJ-ocqte5g?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "다이얼M을 돌려라",
      duration: "50분",
      desc: "현장에 있던 사람들을 상대로 인터뷰를 진행하는 코델리아. 유명인과 장관부터 배관공, 페이스트리 셰프에 이르기까지 모두가 날카로운 질문 세례를 받는다.",
      video: "https://www.youtube.com/embed/TfJ-ocqte5g?enablejsapi=1&rel=0"
    }
  ],

  "stranger-things": [
    {
      number: 1,
      title: "제1장: 윌 바이어스의 실종",
      duration: "49분",
      desc: "친구네 집에서 자신의 집으로 돌아가던 중 윌은 무언가 이상한 것을 보게 되고, 윌이 있는 곳에서 가까운 정부의 비밀 실험실에서는 끔찍한 일이 벌어진다.",
      video: "https://www.youtube.com/embed/AZR9143LSoo?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "제2장: 메이플가의 이상한 아이",
      duration: "56분",
      desc: "루카스와 마이크, 더스틴은 숲속에서 한 소녀를 만나고, 호퍼는 조이스에게서 이상한 전화 통화에 대한 이야기를 전해 듣는다.",
      video: "https://www.youtube.com/embed/y_lP-HAfO2M?enablejsapi=1&rel=0"
    }
  ],

    "blood-and-water": [
    {
      number: 1,
      title: "픽스의 모든것",
      duration: "43분",
      desc: "올해도 어김없이 돌아왔다. 17년 전 유괴된 언니의 생일을 기념하는 부모님. 풀렝은 이 모든 상황에서 그만 벗어나고 싶다. 그리고 때마침 열린 파티. 도망칠 기회다.",
      video: "https://www.youtube.com/embed/2m0Cm2kMOBU?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "인터뷰",
      duration: "44분",
      desc: "시간이 없다. 아빠를 구하기 위해 파크허스트 고등학교로 전학하는 풀렝. 우선, 수영부 스타 선수이자 여학생 대표 후보자인 픽스에게 접근해야 한다. 최대한 자연스럽게.",
      video: "https://www.youtube.com/embed/27Fl-kfohok?enablejsapi=1&rel=0"
    }
  ],

  "outer-banks": [
    {
      number: 1,
      title: "허리케인",
      duration: "54분",
      desc: "허리케인이 지나간 후 기회가 찾아온다. 습지에서 침몰선을 발견한 존 B, JJ, 포프, 키아라. 그러나 그 안에 값나가는 물건은 없었다. 대신 위험한 것이 튀어나왔지.",
      video: "https://www.youtube.com/embed/Cy_axt6jHHo?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "행운의 나침반",
      duration: "47분",
      desc: "어딘가에 살아있어. 실종된 아버지가 단서를 남긴 거라고 확신하는 존 B. 그는 포그스 친구들과 추적에 나서지만, 상황은 복잡하게 꼬여간다. 걷잡을 수 없을 만큼.",
      video: "https://www.youtube.com/embed/RxlhzXCdzxI?enablejsapi=1&rel=0"
    }
  ],

  "dexter": [
    {
      number: 1,
      title: "덱스터",
      duration: "53분",
      desc: "미결 사건 범인 킬러로서의 이중생활을 하는 법의학자 덱스터 모건은 새로운 연쇄 살인범의 작업 형태에 관심을 보인다.",
      video: "https://www.youtube.com/embed/A9rCQsrpPH4?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "악어",
      duration: "54분",
      desc: "살인 혐의에 대해 무죄 판결을 앞둔 남자를 타깃으로 점찍은 덱스터. 얼마 뒤 냉동트럭 살인마가 자신의 이중생활에 대해 알고 있다는 사실을 깨닫는다.",
      video: "https://www.youtube.com/embed/A9rCQsrpPH4?enablejsapi=1&rel=0"
    }
  ],

  "manifest": [
    {
      number: 1,
      title: "파일럿 에피소드",
      duration: "42분",
      desc: "뉴욕에 도착한 828편 비행기. 착륙 직후 승객들은 자신들이 수년간 실종 상태였다는 믿을 수 없는 얘기를 듣는다. 이후 그들은 불가사의한 현상을 겪기 시작하는데.",
      video: "https://www.youtube.com/embed/VklGh6SdmWk?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "재진입",
      duration: "42분",
      desc: "828편 승객들과 면담을 진행하는 국가안보국. 승객들은 다시 각자의 삶으로 돌아가려 애쓴다. 그러던 중 한 승객이 방송에 출연해 사건에 관해 입을 연다.",
      video: "https://www.youtube.com/embed/VklGh6SdmWk?enablejsapi=1&rel=0"
    }
  ],

  "adolescence": [
    {
      number: 1,
      title: "1화",
      duration: "65분",
      desc: "어느 날, 밀러 가족의 집에 경찰이 들이닥친다. 10대 소년 제이미는 체포되어 경찰서에서 신문을 받지만, 끝까지 무죄를 주장한다.",
      video: "https://www.youtube.com/embed/DhNO7Q-2wHQ?enablejsapi=1&rel=0"
    },
    {
      number: 2,
      title: "2화",
      duration: "51분",
      desc: "제이미가 다니는 학교에서 사건의 진실과 흉기를 추적하는 경찰. 친구들에게서 아무런 단서도 얻지 못한 가운데, 배스컴 경위의 아들이 돕겠다고 나선다.",
      video: "https://www.youtube.com/embed/DhNO7Q-2wHQ?enablejsapi=1&rel=0"
    }
  ],

    "the-gray-man": [
    {
      number: 1,
      title: "공식예고편",
      duration: "분",
      desc: "이름도 없다. 두려움도 없다. 망설임도 없다. CIA 훈련 이후 유령이자 그림자로 존재하게 된 남자. 이제 조직은 가장 위험한 요원인 그를 세상에서 없애려 한다.",
      video: "https://www.youtube.com/embed/KLyxElQGWX4?enablejsapi=1&rel=0"
    }
  ]
};


function renderEpisodes(seriesKey) {
  const list = document.querySelector("episode-list");
  list.innerHTML = "";

  const episodes = EPISODES[seriesKey];

  // 회차 없는 경우
  if (!episodes || episodes.length === 0) {
    list.innerHTML = `
      <div class="no-episode">
        <p>회차 정보가 아직 없습니다.</p>
      </div>
    `;
    return;
  }

  // 회차 있는 경우
  episodes.forEach(ep => {
    list.innerHTML += `
      <div class="episode">
        <div class="episode-left">
          <span class="episode-number">${ep.number}</span>
          <iframe src="${ep.video}" allowfullscreen></iframe>
        </div>
        <div class="episode-right">
          <h3>${ep.title} <span class="duration">(${ep.duration})</span></h3>
          <p>${ep.desc}</p>
        </div>
      </div>
    `;
  });
}




/* ==================================================
  DOM READY
================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initCustomSelect();
  initContentSlider();
  initModal();
  initEpisodeScroll();
});

/* ==================================================
  1. 커스텀 셀렉트
================================================== */
function initCustomSelect() {
  const selects = document.querySelectorAll(".custom-select");

  selects.forEach(select => {
    const selected = select.querySelector(".selected");
    const options = select.querySelector(".options");

    selected.addEventListener("click", e => {
      e.stopPropagation();
      selects.forEach(s => s !== select && s.classList.remove("open"));
      select.classList.toggle("open");
    });

    options.querySelectorAll("li").forEach(option => {
      option.addEventListener("click", () => {
        selected.textContent = option.textContent;
        select.classList.remove("open");
      });
    });
  });

  document.addEventListener("click", () => {
    selects.forEach(select => select.classList.remove("open"));
  });
}

/* ==================================================
  2. 콘텐츠 슬라이더
================================================== */
function initContentSlider() {
  document.querySelectorAll(".content-grid").forEach(slider => {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let velocity = 0;
    let rafId = null;
    let autoTimer = null;

    function startAuto() {
      autoTimer = setInterval(() => {
        const move = slider.clientWidth / 5;
        const max = slider.scrollWidth - slider.clientWidth;
        slider.scrollLeft + move >= max
          ? slider.scrollTo({ left: 0, behavior: "smooth" })
          : slider.scrollBy({ left: move, behavior: "smooth" });
      }, 5000);
    }

    function stopAuto() {
      clearInterval(autoTimer);
    }

    function inertia() {
      velocity *= 0.95;
      if (Math.abs(velocity) > 0.5) {
        slider.scrollLeft += velocity;
        rafId = requestAnimationFrame(inertia);
      }
    }

    slider.addEventListener("mousedown", e => {
      isDragging = true;
      startX = e.pageX;
      scrollLeft = slider.scrollLeft;
      stopAuto();
      cancelAnimationFrame(rafId);
      slider.classList.add("active");
    });

    slider.addEventListener("mousemove", e => {
      if (!isDragging) return;
      const walk = e.pageX - startX;
      slider.scrollLeft = scrollLeft - walk;
      velocity = (scrollLeft - slider.scrollLeft) * 0.5;
    });

    window.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      slider.classList.remove("active");
      inertia();
      startAuto();
    });

    startAuto();
  });
}

/* ==================================================
  3. 모달 + 회차 렌더링
================================================== */
function initModal() {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalCast = document.getElementById("modal-cast");
  const modalGenre = document.getElementById("modal-genre");
  const modalFeature = document.getElementById("modal-feature");
  const closeBtn = modal.querySelector(".close");

  function openModal(target) {
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    modalImg.src = target.src;
    modalTitle.textContent = target.dataset.title || "";
    modalDescription.innerHTML = target.dataset.description || "";
    modalCast.textContent = target.dataset.cast || "";
    modalGenre.textContent = target.dataset.genre || "";
    modalFeature.textContent = target.dataset.feature || "";

    renderEpisodes(target.dataset.id);
  }

  function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    stopAllVideos();
  }

  document.addEventListener("click", e => {
    const target = e.target.closest(".modal-trigger");
    if (target) openModal(target);
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => e.target === modal && closeModal());
  document.addEventListener("keydown", e => e.key === "Escape" && closeModal());
}

/* ==================================================
  4. 회차 렌더링
================================================== */
function renderEpisodes(seriesId) {
  const list = document.getElementById("episode-list");
  if (!list) return;

  const episodes = EPISODES[seriesId];
  if (!episodes) {
    list.innerHTML = "";
    return;
  }

  list.innerHTML = episodes.map(ep => `
    <div class="episode">
      <div class="episode-left">
        <span class="episode-number">${ep.number}</span>
        <iframe src="${ep.video}" frameborder="0" allowfullscreen></iframe>
      </div>
      <div class="episode-right">
        <h3>${ep.title} <span class="duration">(${ep.duration})</span></h3>
        <p>${ep.desc}</p>
      </div>
    </div>
  `).join("");
}

/* ==================================================
  5. 에피소드 스크롤 (드래그)
================================================== */
function initEpisodeScroll() {
  const area = document.querySelector(".episode-scroll");
  if (!area) return;

  let isDragging = false;
  let startY = 0;
  let scrollTop = 0;

  area.addEventListener("mousedown", e => {
    isDragging = true;
    startY = e.pageY - area.offsetTop;
    scrollTop = area.scrollTop;
    area.classList.add("dragging");
  });

  area.addEventListener("mousemove", e => {
    if (!isDragging) return;
    const y = e.pageY - area.offsetTop;
    area.scrollTop = scrollTop - (y - startY) * 1.5;
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    area.classList.remove("dragging");
  });
}

/* ==================================================
  6. iframe 정지
================================================== */
  function stopAllVideos() {
  document.querySelectorAll("iframe").forEach(iframe => {
  iframe.src = iframe.src;
  });
}
