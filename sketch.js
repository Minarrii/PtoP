
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
let playerName = "조민환(개발자)";
let inputBox;
let dialogueBoxImg, nextButtonImg;
let myFont;
//1스테이지
let titleBack, startBut, startButCl, art, doma, bubble, bawl, whisk, gauge, board, butter, milkWoman, milk2, milk3, milk4, milk5, hurryUp;
let score = 0;
let centerX = 420;
let centerY = 300;
let prevAngle = 0;
let angularVelocity = 0;
let gaugeValue = 0;
let targetSpeed = 0.3;
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
let st1SuccessPoint = 5;//성공 목표 점수!
let gaugeZone;
let gaugeDirection = 1;
//다이얼로그
let dialogue1, dialogue2, dialogue3, dialogue4, dialogue5, dialogue6, dialogue7, dialogue8, dialogue9, dialogue10, dialogue12;

//2stage
let cropcrop;
let stage2sceneNum = 0;
let cropGrid = [];
let currentTurn = 0;
let maxTurns = 20;
let nextTurnTime = 0;
let score2 = 0;
let remainingTime2 = 60;
let clickedThisFrame = false;
let lastTimeChecked2 = 0;
let st2SuccessPoint = 30; //목표 점수
//
let normalCropImg, goldCropImg, darkCropImg;
let equipmentImg, scoreBoard, noWomanbg, womanbg;



//3스테이지
let stage3sceneNum = 0;
let man_bg, man_face_bg, bird, pipe, greenApple, retroCamera, darkCamera, flash, camSound;
let score3 = 0;
let lastTimeChecked3;//3스테 타이머 변수
let st3Timer = 0;
let remainingTime3 = 60;
let st3SuccessPoint = 50; //목표 점수
let cameraButton;
let targetImages = [];
let targets = [];
let clickCooltime = 0;
let movingSpeed = 1;
let nextClickableTime = 0;
let clickCooltimeDuration;
let isFlashOn = false;
let flashEndTime = 0;
let get1,get2,lose1,lose2;

//cookingstage
// cooking stage globals
let frame = 0;
let draggable = null;
let dragOffsetX = 0;
let dragOffsetY = 0;
let stage4sceneNum = 0;

// Positions (copy from cooking stage)
let butterPos = { x: 510, y: 30, w: 160, h: 160 };
let flourPos = { x: 665, y: 25, w: 150, h: 160 };
let applePos = { x: 820, y: 25, w: 140, h: 160 };
let ghostPos = { x: 0, y: 0, w: 180, h: 180 };
let chatPos = { x: 170, y: 15, w: 280, h: 140 };

let bowlCenter = { x: 260, y: 280 };
let bowlRadiusX = 180;
let bowlRadiusY = 100;

let pieTrayCenter = { x: 730, y: 360 };
let pieTrayRadiusX = 205;
let pieTrayRadiusY = 110;

let banjukPos = { x: 111, y: 185.5, w: 300, h: 191 };

//epliogue
let backToStartClicked, backToStart, painter, last_bg, drawdraw, whiteLast, ghost_painter, theEndGst,st3board;
let stage5sceneNum = 0;
let zoomStart = false;
let zoom = 1
let zoomX = 0;
let zoomY = 0;
let zoomDelay = 0;
let restartButton;
let playing = false;
let playingtime;

function preload() {
  preload0();
  preload1();
  preload2();
  preload3();
  preload4();
  preload5();

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
  dialogue4 = new Dialogue(dialogue4List);
  dialogue5 = new Dialogue(dialogue5List);
  dialogue6 = new Dialogue(dialogue6List);
  dialogue7 = new Dialogue(dialogue7List);
  dialogue8 = new Dialogue(dialogue8List);
  dialogue9 = new Dialogue(dialogue9List);
  dialogue10 = new Dialogue(dialogue10List);
  dialogue12 = new Dialogue(dialogue12List);

  startButton = new Button(startBut, startButCl, width / 2 - 140, height * 4 / 5 - 50, 300, 100, () => {
    if (stageNum == 1) stage1sceneNum = 1;
    else if (stageNum == 2) stage2sceneNum = 1;
    else if (stageNum == 3) stage3sceneNum = 1;

  });

  //스테 3 이미지 배열 만들기
  for (let i = 0; i < 160; i++) {
    targets.push(new PhotoTarget(i, int(random(0, 4))));
  }


  cameraButton = new Button(darkCamera, retroCamera, width / 2 - 200, height * 2 / 5 + 100, retroCamera.width / 3, retroCamera.height / 3, () => {


    if (millis() >= nextClickableTime) {

      // 이 안에서 타겟 탐색도 같이!
      let validTarget = targets.find(t => t.isInFrame() && !t.isClicked);

      if (validTarget) {
        camSound.play();
        console.log("일단 인식함");
        //clickCooltime = 1;
        validTarget.isClicked = true; // ← 클릭 처리

        // 📸 플래시 이펙트 시작
        isFlashOn = true;
        flashEndTime = millis() + 300; // 300ms 후 꺼짐

        clickCooltimeDuration = (width / 8) / validTarget.speed;
        nextClickableTime = millis() + clickCooltimeDuration * 1000;

        setTimeout(() => {
          clickCooltime = 0;
        }, clickCooltimeDuration * 1000); // ms 단위로 변환

        if (validTarget.imgNum === 0) {
          score3 += 1;
          console.log("사과 발견! 점수 +1");
          get1=true;
        } else if (validTarget.imgNum === 1) {
          score3 -= 2;
          console.log("새 발견! 점수 -2");
          lose2=true;
        } else if (validTarget.imgNum === 2) {
          score3 += 2;
          console.log("얼굴발견! 점수 +2");
          get2=true;
        } else if (validTarget.imgNum === 3) {
          score3 -= 1;
          console.log("파이프 발견! 점수 -1");
          lose1=true;
        }
      } else {
        console.log("해당 영역에 타겟 없음");
      }
    }
  });


  // 이름 입력창
  inputBox = createInput();
  inputBox.position(width / 2 - 215, height / 2 - 17);
  inputBox.size(416, 60);
  inputBox.class('customInput');
  inputBox.hide();

  //1스테 게이지존
  for (let i = 0; i < 99; i++) {
    zoneYArray[i] = random(75, 300);
    zoneHArray[i] = random(100, 160);
  }
  gaugeZoneY = zoneYArray[0];
  gaugeZoneH = zoneHArray[0];

  gaugeZone = new Gauge(board, 866, gaugeZoneY, 136, gaugeZoneH);

  lastTimeChecked = millis();
  lastTimeChecked3 = millis();

  //스테2 이삭 배열
  for (let i = 0; i < 50; i++) cropGrid.push(null);
  nextTurnTime = millis() + 1000;



}

function draw() {
  if (stageNum === 0) {
    draw1();
  } else if (stageNum === 1) {
    draw2();
  } else if (stageNum == 2) {
    draw3();
  } else if (stageNum === 3) {
    draw4();
  } else if (stageNum === 4) {
    draw5();
  } else if (stageNum === 5) {
    draw6();
  }
}

function mouseClicked() {


  if (stageNum == 1 && stage1sceneNum == 0 || stageNum == 3 && stage3sceneNum == 0 || stageNum == 2 && stage2sceneNum == 0) { //스테이지별 시작 타이틀 화면 조건
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
        stageNum = 2;
        needSt1Panel = true; //패널을 미리 한 번 켜놔야 함
      }
    }
  }

  if (stageNum === 2 && stage2sceneNum === 1) {//2스테이지 시작 대화 제어
    const btnX = width - 170;
    const btnY = height - 50;
    const btnW = 80;
    const btnH = 30;

    if (mouseX >= btnX - btnW / 2 && mouseX <= btnX + btnW / 2 &&
      mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2) {
      if (!dialogue4.next()) {
        stage2sceneNum = 2; // 
      }
    }
  }
  else if (stageNum === 2 && stage2sceneNum === 3) { //2스테 미니게임 끝나고
    const btnX = width - 170;
    const btnY = height - 50;
    const btnW = 80;
    const btnH = 30;

    if (mouseX >= btnX - btnW / 2 && mouseX <= btnX + btnW / 2 &&
      mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2) {
      if (!dialogue5.next()) {
        stageNum = 3;
        needSt1Panel = true;
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
        stageNum = 4;
        //needSt1Panel = true; 
      }
    }
  }

  if (stageNum === 3 && stage3sceneNum === 2) {
    cameraButton.checkClick();
  }

  if (stageNum === 4 && stage4sceneNum === 0 && frame === 4) {//요리씬 마지막에 나오는 다음 버튼
    const btnX = width - 170;
    const btnY = height - 50;
    const btnW = 80;
    const btnH = 30;

    if (mouseX >= btnX - btnW / 2 && mouseX <= btnX + btnW / 2 &&
      mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2) {
      stage4sceneNum = 1; // 다음 씬으로 전환
    }
  }

  else if (stageNum === 4 && stage4sceneNum === 1) { //3스테 미니게임 끝나고
    const btnX = width - 170;
    const btnY = height - 50;
    const btnW = 80;
    const btnH = 30;

    if (mouseX >= btnX - btnW / 2 && mouseX <= btnX + btnW / 2 &&
      mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2) {
      if (!dialogue9.next()) {
        stageNum = 5;
        stage5sceneNum = 0;
        //needSt1Panel = true; 
      }
    }
  }

  if (stageNum == 5 && stage5sceneNum == 0) { //5스테이지
    const btnX = width - 170;
    const btnY = height - 50;
    const btnW = 80;
    const btnH = 30;
    if (mouseX >= btnX - btnW / 2 && mouseX <= btnX + btnW / 2 &&
      mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2) {

      if (!dialogue10.next()) {
        stage5sceneNum = 1;
      }
    }
  }
  if (stageNum == 5 && stage5sceneNum == 1) { //5스테이지 1
    const btnX = width - 170;
    const btnY = height - 50;
    const btnW = 80;
    const btnH = 30;
    if (mouseX >= btnX - btnW / 2 && mouseX <= btnX + btnW / 2 &&
      mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2) {


      if (!dialogue12.next()) {
        stage5sceneNum = 2;
        zoomDelay = millis();
        //needSt1Panel = true; 
      }

    }
  }
  if (stageNum == 5 && stage5sceneNum == 2) {
    restartButton.checkClick()//초기화 버튼
  }

  // 추후 게임 인터랙션 등을 여기에 추가 가능
}


function mousePressed() {

  //영상 자동재생 재한 우회
  milkWoman.loop();
  cropcrop.loop();
  drawdraw.loop();


  if (stageNum === 4) {
    // 요리씬 스테이지 먼저 넣음
    cookingMousePressed();
  } else {

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
    } else if (slide >= 2) { // 그 이상에서는 다음 버튼
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
}

function mouseReleased() {
  if (stageNum === 4) {
    cookingMouseReleased();
  }
  //에셋 그릇에 놓을 때
}


function cookingMousePressed() {
  if (!draggable) {
    if (frame === 0 && mouseInRect(butterPos)) {
      startDrag('butter', butterImg, butterPos);
    } else if (frame === 1 && mouseInRect(flourPos)) {
      startDrag('flour', flourImg, flourPos);
    } else if (frame === 2 && mouseInRect(banjukPos)) {
      startDrag('banjuk', banjukImg, banjukPos);
    } else if (frame === 3 && mouseInRect(applePos)) {
      startDrag('apple', appleImg, applePos);
    }
  }
}

function cookingMouseReleased() {
  if (draggable) {
    let success = false;

    if (frame === 0 && draggable.name === 'butter') {
      if (mouseInBowl()) {
        success = true;
        frame = 1;
        draggable = null;
      }
    } else if (frame === 1 && draggable.name === 'flour') {
      if (mouseInBowl()) {
        success = true;
        frame = 2;
        draggable = null;
      }
    } else if (frame === 2 && draggable.name === 'banjuk') {
      if (mouseInPieTray()) {
        success = true;
        frame = 3;
        draggable = null;
      }
    } else if (frame === 3 && draggable.name === 'apple') {
      if (mouseInPieTray()) {
        success = true;
        frame = 4;
        draggable = null;
      }
    }

    if (!success) {
      draggable = null; // snap back
    }
  }
}
function mouseInRect(rect) {
  return mouseX >= rect.x && mouseX <= rect.x + rect.w &&
    mouseY >= rect.y && mouseY <= rect.y + rect.h;
}

function mouseInBowl() {
  let dx = mouseX - bowlCenter.x;
  let dy = mouseY - bowlCenter.y;
  return (dx * dx) / (bowlRadiusX * bowlRadiusX) + (dy * dy) / (bowlRadiusY * bowlRadiusY) <= 1;
}

function mouseInPieTray() {
  let dx = mouseX - pieTrayCenter.x;
  let dy = mouseY - pieTrayCenter.y;
  return (dx * dx) / (pieTrayRadiusX * pieTrayRadiusX) + (dy * dy) / (pieTrayRadiusY * pieTrayRadiusY) <= 1;
}

function startDrag(name, img, pos) {
  draggable = {
    name: name,
    img: img,
    x: pos.x,
    y: pos.y,
    w: pos.w,
    h: pos.h
  };
  dragOffsetX = draggable.x - mouseX;
  dragOffsetY = draggable.y - mouseY;
}

