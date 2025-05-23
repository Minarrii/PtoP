let stageNum=0;  //현재 스테이지를 지정하는 변수
let slideValid=true;//슬라이드 번호 증가 기능을 온오프

//프롤로그 관련 전역 변수
let slide = 0;
let dialogueIndex = 0;
let dialogues = [];
let ghostImg, shakeSound;
let backgroundDark, backgroundLight, museumImg;
let startBtnImg, inputPromptImg, continueBtnImg;
let ghostAlpha = 0;
let shake = false;
let shakeStartTime = 0;
let hasPlayedShakeSound = false;
let playerName = "";
let inputBox;
let dialogueBoxImg, nextButtonImg;

//1스테이지 관련 전역 변수
let myFont; //나중에 제거하셈
// 사용할 이미지들
let titleBack;
let startBut;
let startButCl;
let art;
let doma;
let bubble;
let bawl;
let whisk;
let gauge;
let board;
let butter;
let score = 0;
//각운동량 계산 관련 변수
let centerX = 420;
let centerY = 300;
let prevAngle = 0;
let angularVelocity = 0;
//게이지 존 관련 함수
let gaugeValue = 0;
let targetSpeed = 0;
let accumTime = 0;
let gaugeZoneY = 0;
let gaugeZoneH = 0;
let gaugeTopY; //게이지 바의 y좌표
let zoneYArray = [];
let zoneHArray = []; //게이지 존의 좌표 배열


let curScene = 0;  //1스테이지 내부에서의 씬 순서
let startButton;

function preload() {
  //프롤로그 에셋
backgroundDark = loadImage("prologue assets/darkbg.jpg");
  backgroundLight = loadImage("prologue assets/brightbg.jpg");
  museumImg = loadImage("prologue assets/museum.jpg");
  startBtnImg = loadImage("prologue assets/start.png");
  inputPromptImg = loadImage("prologue assets/namebox.png");
  continueBtnImg = loadImage("prologue assets/continue.png");
  ghostImg = loadImage('prologue assets/ghost asset.png');
  //shakeSound = loadSound('prologue assets/놀라는 효과음.mp3');
  dialogueBoxImg = loadImage("prologue assets/dialoguebox.png");
  nextButtonImg = loadImage("prologue assets/nextbrush.png");
  myFont = loadFont("prologue assets/Typo_Crayon M.ttf")

//1스테이지 에셋
  titleBack = loadImage('assets/stage1/titleBack.png');
  startBut = loadImage('assets/stage1/startBut.png');
  startButCl = loadImage('assets/stage1/startButCl.png');
  art = loadImage('assets/stage1/art.png');
  doma = loadImage('assets/stage1/doma.png');
  bubble = loadImage('assets/stage1/bubble.png');
  bawl = loadImage('assets/stage1/bawl.png');
  whisk = loadImage('assets/stage1/whisk.png');
  scoreBoard = loadImage('assets/stage1/scoreBoard.png');
  gauge = loadImage('assets/stage1/gauge.png');
  board = loadImage('assets/stage1/board.png');
  butter = loadImage('assets/stage1/butter.png');

 // myFont = loadFont('assets/font/Typo_CrayonB.ttf');
  console.log("로딩완료");

}

function setup() {
  createCanvas(1024, 576);
  textFont(myFont);
  startButton = new Button(startBut, startButCl, width / 2 - 140, height * 4 / 5 - 50, 300, 100, () => { curScene = 1 });
frameRate(18);


//프롤로그
textAlign(LEFT, TOP);
imageMode(CENTER);
 
 // 이름 입력창 
inputBox = createInput();
  inputBox.position(width / 2 - 215, height / 2-17);
  inputBox.size(416, 68);
  inputBox.class('customInput');
  inputBox.hide();

  //전체 대화
  dialogues = [
    "나는 정문대학교 서양화가 3학년. 어제 밤샘 작업을 끝내고 미술관 관람 과제를 하러 왔다. 에휴. 이번 과제도 밤 새서 겨우 제출했네. 교수님이 다시 해보라고만 안 하시면 좋겠다.",
    "벌써 3학년인데, 내가 미술을 계속할 수 있을지 모르겠어. 아무래도 재능이 없는 것 같아. 어렸을 땐 이런 미술관에 작품을 거는 화가가 되는 게 꿈이었는데... 어쩌다 이렇게 됐지? 나 졸업은 할 수 있을까? 이러다 학교를 떠도는 전설의 XX학번이 되는거 아냐?",
    "에이, 쓸데없는 생각 그만하자. 잠을 못 자서 이상한 생각이 드나 봐. 잠깐 여기 벤치에 앉아서 눈이나 좀 붙일까.",
    "안녕? 눈 좀 떠볼래?",
    "깜짝이야! 뭐지? 귀신인가? 잠을 못 자서 헛것을 보는 건가?",
    "귀신이라니. 나는 이 미술관을 떠도는 영혼이야. 이제 이곳도 지긋지긋한데 마침 너를 만났어. 너라면 나를 이곳에서 해방시켜줄 수 있을 것 거야.",
    "미술관을 떠돌고 있는 거면 귀신 맞잖아! 아무튼.. 내가 너를 해방시켜줄 수 있다고? 어떻게?",
    "너는 예전의 나와 아주 많이 닮았거든. 나도 그림을 그리는 화가였어. 이런 멋진 미술관에 작품 하나 걸어보는 게 소원이었는데 그러지 못했지. 그런데 그게 한으로 남은 건지 죽고 나서 내 영혼이 이 미술관에 갇혀 버렸어.",
    "아무래도 이 미술관에 내 그림을 걸어야 그 한이 풀릴 것 같아. 하지만 난 지금 영혼 상태니까 인간인 너의 도움이 필요해. 너라면 내 처지에 공감해줄 거라 믿어. 부디 나를 도와주지 않을래?",
    "그렇구나… (MBTI F인 나는 영혼의 이야기에 그만 마음이 움직여버렸다.) 그래, 도와줄게. 내가 뭘 하면 될까?",
    "음, 내가 꼭 그리고 싶은 게 있는데 그걸 만들 재료가 필요해. 내가 너를 총 세개의 그림 속으로 보내줄게. 그 안에서 재료를 찾아서 나에게 가져와 줘.",
    "(그림에서 재료를 가져오라고…? 그게 어떻게 가능하지) 일단 알겠어. 어떻게든 해 볼게.",
    "고마워. 그럼 첫 번째 그림으로 보내줄게. 첫 번째 그림은 요하네스 베르메르의 <우유 따르는 여인>이야. 그 그림에서 버터를 가져와줘."
    
  ];
  

  //존 좌표 배열

  for (let i = 0; i < 99; i++) {
    zoneYArray[i] = random(10, 300);
    zoneHArray[i] = random(90, 180);
  }
  gaugeZoneY=zoneYArray[0];
  gaugeZoneH=zoneHArray[0];
}

function draw(){
  if(stageNum==0){
draw1();
  }
  else if(stageNum==1){
draw2();
  }

}

function draw2() {
  console.log(curScene);
  imageMode(CORNER);
  textAlign(LEFT, BASELINE);
  switch (curScene) {
    case 0:
      image(titleBack, 0, 0);
      startButton.display();


      textAlign(CENTER);
      textSize(40);
      text("STAGE 1", width / 2, height / 5);
      textSize(60);
      text("우유를 따르는 여인", width / 2, height * 2.7 / 5);
      break;
    case 1:
      image(art, 0, 0, width, height);
      textAlign(LEFT);
      fill("white");
      textSize(40);
      text("STAGE 1", 30, 50);
      text("대화창은 대화시스템 개발되면 추후 적용예정. ", 200, 450);
      text("클릭해서 다음화면으로 ㄱㄱ ", 200, 500);

      break;
    case 2:

      //배경 사물
      image(doma, 0, 0, width, height); //배경 도마
      image(bawl, 130, -140, 600, 900);//그릇
      image(bubble, 160, -80, 540, 810); //우유

      //점수판 구현
      image(scoreBoard, 500, 30, 500, 120);
      textSize(30);
      textAlign(LEFT);
      text("만든 버터:" + score + " 개", 700, 100);

      //마우스를 따라다니는 거품기
      let whiskOffsetX = 120;
      let whiskOffsetY = 90;
      image(whisk, mouseX - whiskOffsetX, mouseY - whiskOffsetY, 240, 360);
      //cursor('none');

      //거품기 회전 속도 계산
      // 1. 중심점 표시 (디버그용)
      fill(255, 0, 0);
      ellipse(centerX, centerY, 10, 10);

      // 2. 현재 각도 계산
      let dx = mouseX - centerX;
      let dy = mouseY - centerY;
      let currAngle = atan2(dy, dx);  // 중심 → 마우스 벡터의 각도

      // 3. 각도 차이 계산
      let deltaAngle = currAngle - prevAngle;

      // 각도 wrap-around 보정 (-PI ~ PI)
      if (deltaAngle > PI) deltaAngle -= TWO_PI;
      if (deltaAngle < -PI) deltaAngle += TWO_PI;

      // 4. 회전 속도 누적 (절댓값으로 빠르기만 체크)
      angularVelocity = abs(deltaAngle);

      // 5. 디버깅용 텍스트 출력
      fill(0);
      textSize(24);
      text("회전 속도: " + nf(angularVelocity, 1, 4), 600, 50);

      // 6. 이전 각도 갱신
      prevAngle = currAngle;

      //게이지 시스템 구현
      //게이지 바 그리기
      image(gauge, 900, 50, 110, 500); 

      // 게이지 처리
      targetSpeed = 0.3;
      if (angularVelocity >= targetSpeed) {
        gaugeValue += 1.0;  // 천천히 증가
      } else if (angularVelocity < targetSpeed && gaugeValue > 2) {
        gaugeValue -= 2.0;  // 빠르게 감소
      } else gaugeValue = 0;

      let gaugeHeight = 5 * gaugeValue;
      gaugeTopY = 540 - gaugeHeight;
      console.log("y좌표" + gaugeTopY); //디버그용

      //게이지 존
      let gaugeZone = new Gauge(board, 913, gaugeZoneY, 82, gaugeZoneH);
      gaugeZone.display();

      fill(245, 165, 44);//게이지 바 그리기
      noStroke();
      rect(915, 540, 80, -gaugeHeight, 30);
      tint(255, (39 + accumTime * 4));//accutIme을 유지하면 버터가 점점 선명하게 보임!
      image(butter, 915, -gaugeHeight + 500, 80, 70);//게이지 높이를 따라가는 버터그림
      noTint();

      //게이지 조건 검사
      gaugeZone.zoneCheck(gaugeTopY);

      //좌상단 스테이지 넘버
      textAlign(LEFT);
      fill("white");
      textSize(40);
      text("STAGE 1", 30, 50);

      break;
    case "ending":
      drawEndingScene();
      break;
  }



}

function mouseClicked() {
  if (curScene == 0) {
    startButton.checkClick();

  }
  else if (curScene == 1) {
    curScene = 2;
  }
}

function draw1() {
  background(255);
// 화면 배경 설정
  if (slide === 0) {
    image(backgroundDark, width / 2, height / 2, width, height);
    image(startBtnImg, width / 2, height * 0.85,startBtnImg.width * 0.35, startBtnImg.height * 0.35);
  } else if (slide === 1) {
    image(backgroundLight, width / 2, height / 2, width, height);
    image(inputPromptImg, width / 2, height / 2,inputPromptImg.width*0.32,inputPromptImg.height*0.32);
    inputBox.show();
    image(continueBtnImg, width / 2, height / 2 + 100, continueBtnImg.width*0.25, continueBtnImg.height*0.25);
  } else {
    inputBox.hide();
    image(museumImg, width / 2, height / 2, width, height); // 첫 대 씬

    if (slide >= 5 && ghostAlpha < 255) ghostAlpha += 5; //유령 등장 스피드
    if (slide >= 5) {
      tint(255, ghostAlpha);
      image(ghostImg, width / 2, height / 2, ghostImg.width * 0.3, ghostImg.height * 0.3);
      noTint();
    }
// 대사 흔들거리는
    if (slide === 6 && shakeStartTime === 0) {
      shake = true;
      shakeStartTime = millis();
      if (!hasPlayedShakeSound) {
        //shakeSound.play();
        hasPlayedShakeSound = true;
      }
    }
   if (shake && millis() - shakeStartTime > 1000) {
  shake = false;
   }
    drawDialogueBox();
    drawNextButton();
  }
}

// 대사 박스 
function drawDialogueBox() {
 
  let dbx = width / 2;
  let dby = height - 120;
  let dx = dbx, dy = dby;
  if (shake && slide === 6) {
    dx += random(-5, 5);
    dy += random(-5, 5);
  }

  
  let boxW = dialogueBoxImg.width * 0.35;
  let boxH = dialogueBoxImg.height * 0.35;
  image(dialogueBoxImg, dx, dy, boxW, boxH);
  // 이름 넣을 박스 --> 가운데에 넣고 싶어서 갈색 부분이랑 비슷하게 박스 만들고 거기의 중앙으로 설정
  let nameBox = {
    x: dx/2 +3 ,
    y: dy - boxH / 2 +40,  
    w: 250,              
    h: 40              
  };

 // 이름 등장 순서 설정
  let speakerName;
  if ([0, 1, 2, 4, 6, 9, 11, ].includes(dialogueIndex)) {
    speakerName = playerName !== "" ? playerName : "???";
  } else if (dialogueIndex === 3) {
    speakerName = "???";
  } else {
    speakerName = "미술관의 유령";
  }
// 이름 텍스트 위치
  textAlign(CENTER, CENTER);
  textSize(18);
  fill(255); 
  text(speakerName, nameBox.x, nameBox.y); 

  textAlign(CENTER, CENTER);
  textSize(18);
  fill(90, 70, 50);
// 대사 위치
  let textAreaWidth = boxW * 0.85;
  let textAreaHeight = boxH * 0.55;
  let textX = dx;
  let textY = dy + 36;

  let words = dialogues[dialogueIndex].split(" ");
  let lines = [], currentLine = "";

  for (let word of words) { //박스 안에 담기게 하는 기능
    let testLine = currentLine + word + " ";
    if (textWidth(testLine) > textAreaWidth) {
      lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine.trim());

  let lineHeight = textAscent() + textDescent();
  let totalHeight = lines.length * lineHeight;
  let startY = textY - totalHeight / 2;

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], textX, startY + i * lineHeight);
  }
}


// 다음 버튼 위치
function drawNextButton() {
  image(nextButtonImg, width - 175, height - 55, 75, 23);
}

//대화 넘기기
function mousePressed() {
  if (slide === 0) {
    // Start button
    let btnX = width / 2;
    let btnY = height * 0.85;
    let btnW = startBtnImg.width * 0.35;
    let btnH = startBtnImg.height * 0.35;
    if (mouseX >= btnX - btnW / 2 && mouseX <= btnX + btnW / 2 &&
        mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2) {
      slide = 1;
    }

  } else if (slide === 1) {
    // Continue button
    let name = inputBox.value().trim();
    let btnX = width / 2;
    let btnY = height / 2 + 100;
    let btnW = continueBtnImg.width * 0.25;
    let btnH = continueBtnImg.height * 0.25;
    if (name !== "" &&
        mouseX >= btnX - btnW / 2 && mouseX <= btnX + btnW / 2 &&
        mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2) {
      playerName = name;
      slide = 2;
      dialogueIndex = 0;
    }

  } else if(slide>=2&&slideValid) {
    // Next brush button
    let btnX = width - 170;
    let btnY = height - 50;
    let btnW = 80;
    let btnH = 30;
    if (mouseX >= btnX - btnW / 2 && mouseX <= btnX + btnW / 2 &&
        mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2) {
      if (dialogueIndex < dialogues.length - 1) {
        dialogueIndex++;
        slide++;
        console.log(slide);

      
        if (slide !== 6) {
          shake = false;
          shakeStartTime = 0;
          hasPlayedShakeSound = false;
        }

        if(slide==14){
          slideValid=!slideValid;
          stageNum=1;
          curScene=0; //왠지 모르겠지만 curScene이 2가 됨...
        }
      }
    }
  }
}