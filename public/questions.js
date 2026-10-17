const QUESTIONS_DATA = [
  {
    "id": "w1-q001",
    "week": 1,
    "subject": "1주차: 컴퓨터 시스템 개요",
    "subTopic": "폰 노이만 구조와 시스템 버스",
    "type": "multiple",
    "question": "폰 노이만 구조(Von Neumann Architecture)의 핵심 특징과 그로 인해 발생하는 병목 현상에 대한 설명으로 가장 거짓인 것은?",
    "options": [
      "명령어와 데이터가 동일한 물리적 메모리에 저장된다.",
      "CPU는 프로그램 카운터(PC)가 가리키는 주소에서 명령어를 순차적으로 인출한다.",
      "명령어 버스와 데이터 버스가 물리적으로 분리되어 있어 동시 접근이 가능하다.",
      "메모리와 CPU 사이의 데이터 이동 통로가 하나여서 발생하는 속도 저하를 폰 노이만 병목이라 한다."
    ],
    "answer": 2,
    "explanation": "명령어 메모리와 데이터 메모리가 분리되어 동시 접근이 가능한 것은 하버드 구조(Harvard Architecture)의 특징입니다. 폰 노이만 구조는 하나의 버스를 공유합니다."
  },
  {
    "id": "w1-q002",
    "week": 1,
    "subject": "1주차: 컴퓨터 시스템 개요",
    "subTopic": "명령어 사이클 (Instruction Cycle)",
    "type": "ox",
    "question": "인터럽트 사이클(Interrupt Cycle) 진입 시, CPU는 현재 실행 중인 명령어의 처리를 즉시 중단하고 프로그램 카운터(PC) 값을 스택에 백업한다.",
    "options": ["O", "X"],
    "answer": 1,
    "explanation": "CPU는 인터럽트 요청이 들어와도 '현재 실행 중인 명령어 사이클(Execute Cycle)'까지는 끝까지 완료한 후, 다음 명령어를 인출하기 전에 인터럽트 사이클로 진입합니다."
  }
];
