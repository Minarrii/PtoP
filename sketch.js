
let stageNum = 0; //스테이지 관리  나중에 바꾸셈
let slide = 0;
//대화 시스템 관련
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
let myFont;
//1스테이지
let titleBack, startBut, startButCl, art, doma, bubble, bawl, whisk, gauge, board, butter;
let score = 0;
let centerX = 420;
let centerY = 300;
let prevAngle = 0;
let angularVelocity = 0;
let gaugeValue = 0;
let targetSpeed = 0;
let accumTime = 0;
let gaugeZoneY = 0;
let gaugeZoneH = 0;
let gaugeTopY;
let zoneYArray = [];
let zoneHArray = [];
let stage1sceneNum = 0;
let startButton;
let needSt1Panel = true;
let st1Timer = 0;
let lastTimeChecked; //1스테 타이머 변수
let remainingTime = 60;
let st1SuccessPoint = 1;
//다이얼로그
let dialogue1;
let dialogue2;
let dialogue3;
let dialogue6;
let dialogue7;
//3스테이지
let stage3sceneNum = 0;
let man_bg, man_face_bg, bird, pipe, greenApple, retroCamera, darkCamera;
let score3 = 0;
let lastTimeChecked3;//3스테 타이머 변수
let st3Timer = 0;
let remainingTime3 = 60;
let st3SuccessPoint = 5;
let cameraButton;
let targetImages = [];
let targets = [];



function preload() {
  preload0();
  preload1();
  preload3();

}

function setup() {
  createCanvas(1024, 576);
  textFont(myFont);
  imageMode(CENTER);
  textAlign(LEFT, TOP);
  frameRate(18);
  //다이얼로그 객체화
  dialogue1 = new Dialogue(dialogue1List);
  dialogue2 = new Dialogue(dialogue2List);
  dialogue3 = new Dialogue(dialogue3List);
  dialogue6 = new Dialogue(dialogue6List);
  dialogue7 = new Dialogue(dialogue7List);

  startButton = new Button(startBut, startButCl, width / 2 - 140, height * 4 / 5 - 50, 300, 100, () => {
    if (stageNum == 1) stage1sceneNum = 1;
    else if (stageNum == 3) stage3sceneNum = 1;
  });

  cameraButton = new Button(darkCamera, retroCamera, width / 2 - 200, height * 2 / 5 + 100, retroCamera.width / 3, retroCamera.height / 3, () => {
    let validTarget = targets.find(t =>
      t.isInFrame() && t.x > width / 2 - 110 && t.x < width / 2 + 40
    );

    if (validTarget) {
      console.log("일단 인식함");
      if (validTarget.imgNum === 0) {  // 0: greenApple
        score3 += 1;
        console.log("사과 발견! 점수 +1");
      } else if (validTarget.imgNum === 1) {  // 1: bird
        score3 -= 2;
        console.log("새 발견! 점수 -2");
      } else if (validTarget.imgNum === 2) {
        console.log("얼굴발견! 점수 +2");
        score3 += 2;
      }
    } else {
      console.log("해당 영역에 타겟 없음");
    }
  });


  // 이름 입력창
  inputBox = createInput();
  inputBox.position(width / 2 - 215, height / 2 - 17);
  inputBox.size(416, 60);
  inputBox.class('customInput');
  inputBox.hide();

  for (let i = 0; i < 99; i++) {
    zoneYArray[i] = random(30, 300);
    zoneHArray[i] = random(90, 180);
  }
  gaugeZoneY = zoneYArray[0];
  gaugeZoneH = zoneHArray[0];

  lastTimeChecked = millis();
  lastTimeChecked3 = millis();

  //스테 3 이미지 배열 만들기
  for (let i = 0; i < 40; i++) {
    targets.push(new PhotoTarget(i, int(random(0, 3))));
  }

}

function draw() {
  if (stageNum === 0) {
    draw1();
  } else if (stageNum === 1) {
    draw2();
  } else if (stageNum === 3) {
    draw4();
  }
}

function mouseClicked() {


  if (stageNum == 1 && stage1sceneNum == 0 || stageNum == 3 && stage3sceneNum == 0) {
    startButton.checkClick();

  }
  else if (stageNum === 1 && stage1sceneNum === 1) {
    const btnX = width - 170;
    const btnY = height - 50;
    const btnW = 80;
    const btnH = 30;

    if (mouseX >= btnX - btnW / 2 && mouseX <= btnX + btnW / 2 &&
      mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2) {
      if (!dialogue2.next()) {
        stage1sceneNum = 2; // 다음 씬으로
      }
    }
  }
  else if (stageNum === 1 && stage1sceneNum === 3) {
    const btnX = width - 170;
    const btnY = height - 50;
    const btnW = 80;
    const btnH = 30;

    if (mouseX >= btnX - btnW / 2 && mouseX <= btnX + btnW / 2 &&
      mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2) {
      if (!dialogue3.next()) {
        stageNum = 3;
        needSt1Panel = true; //패널을 미리 한 번 켜놔야 함
      }
    }
  }


  if (stageNum === 3 && stage3sceneNum === 1) {//3스테이지 시작 대화 제어
    const btnX = width - 170;
    const btnY = height - 50;
    const btnW = 80;
    const btnH = 30;

    if (mouseX >= btnX - btnW / 2 && mouseX <= btnX + btnW / 2 &&
      mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2) {
      if (!dialogue6.next()) {
        stage3sceneNum = 2; // 
      }
    }
  }
  else if (stageNum === 3 && stage3sceneNum === 3) { //3스테 미니게임 끝나고
    const btnX = width - 170;
    const btnY = height - 50;
    const btnW = 80;
    const btnH = 30;

    if (mouseX >= btnX - btnW / 2 && mouseX <= btnX + btnW / 2 &&
      mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2) {
      if (!dialogue7.next()) {
        console.log("끝!")
        stageNum = 4;
        //needSt1Panel = true; 
      }
    }
  }

  if (stageNum === 3 && stage3sceneNum === 2) {
    cameraButton.checkClick();
  }
  // 추후 게임 인터랙션 등을 여기에 추가 가능
}


function mousePressed() {
  if (slide === 0) { //스타트 버튼 1씬에서
    const btnX = width / 2;
    const btnY = height * 0.85;
    const btnW = startBtnImg.width * 0.35;
    const btnH = startBtnImg.height * 0.35;
    if (mouseX >= btnX - btnW / 2 && mouseX <= btnX + btnW / 2 &&
      mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2) {
      slide = 1;
    }
  } else if (slide === 1) { //컨틴뉴 버튼
    const name = inputBox.value().trim();
    const btnX = width / 2;
    const btnY = height / 2 + 100;
    const btnW = continueBtnImg.width * 0.25;
    const btnH = continueBtnImg.height * 0.25;
    if (name !== "" && mouseX >= btnX - btnW / 2 && mouseX <= btnX + btnW / 2 &&
      mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2) {
      playerName = name;
      slide = 2;
    }
  } else if (slide >= 2) {// 그 이상에서는 다음 버러쉬 버튼
    const btnX = width - 170;
    const btnY = height - 50;
    const btnW = 80;
    const btnH = 30;
    if (mouseX >= btnX - btnW / 2 && mouseX <= btnX + btnW / 2 &&
      mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2) {
      if (dialogue1.next()) {
        slide++;
        if (slide === 14) {
          stageNum = 1;
          stage1sceneNum = 0;
        }
      }
    }
  }
}
