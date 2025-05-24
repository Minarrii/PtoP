



let stageNum = 0;
let slide = 0;
let isDialogue2Active = false; // 전역 변수 추가
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
let dialogue1;
let dialogue2;


function preload() {
  preload0();
  preload1();

}

function setup() {
  createCanvas(1024, 576);
  textFont(myFont);
  imageMode(CENTER);
  textAlign(LEFT, TOP);
  frameRate(18);
  dialogue1 = new Dialogue(dialogue1List);
  dialogue2 = new Dialogue(dialogue2List);

  startButton = new Button(startBut, startButCl, width / 2 - 140, height * 4 / 5 - 50, 300, 100, () => {
    stage1sceneNum = 1;
  });
  // 이름 입력창
  inputBox = createInput();
  inputBox.position(width / 2 - 215, height / 2 - 17);
  inputBox.size(416, 60);
  inputBox.class('customInput');
  inputBox.hide();

  for (let i = 0; i < 99; i++) {
    zoneYArray[i] = random(10, 300);
    zoneHArray[i] = random(90, 180);
  }
  gaugeZoneY = zoneYArray[0];
  gaugeZoneH = zoneHArray[0];
}

function draw() {
  if (stageNum === 0) {
    draw1();
  } else if (stageNum === 1) {
    draw2();
  }
}


function mouseClicked() {
  if (stage1sceneNum == 0) {
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
