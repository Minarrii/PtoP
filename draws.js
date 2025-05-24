function draw1() {
  background(255);
  if (slide === 0) {
    image(backgroundDark, width / 2, height / 2, width, height);
    image(startBtnImg, width / 2, height * 0.85, startBtnImg.width * 0.35, startBtnImg.height * 0.35);
  } else if (slide === 1) {
    image(backgroundLight, width / 2, height / 2, width, height);
    image(inputPromptImg, width / 2, height / 2, inputPromptImg.width * 0.32, inputPromptImg.height * 0.32);
    inputBox.show();
    image(continueBtnImg, width / 2, height / 2 + 100, continueBtnImg.width * 0.25, continueBtnImg.height * 0.25);
  } else {
    inputBox.hide();
    image(museumImg, width / 2, height / 2, width, height);

    if (slide >= 5 && ghostAlpha < 255) ghostAlpha += 20;
    if (slide >= 5) {
      tint(255, ghostAlpha);
      image(ghostImg, width / 2, height / 2, ghostImg.width * 0.3, ghostImg.height * 0.3);
      noTint();
    }


    dialogue1.display(playerName, dialogueBoxImg, nextButtonImg);
  }

}


function draw2() {
  console.log(stage1sceneNum);
  imageMode(CORNER);
  textAlign(LEFT, BASELINE);
  switch (stage1sceneNum) {
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

      if (!dialogue2.isActive) {
        dialogue2.start(); // 대사 시작
      }
      dialogue2.display(playerName, dialogueBoxImg, nextButtonImg); // 활성화된 경우만 표시
      // 스테이지 1에 대사 등장
      break;// 대사 사라지고
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
      isDialogue2Active = true;

      dialogue2.display(playerName, dialogueBoxImg, nextButtonImg); // 대사 다시 등장
      break;
  }



}