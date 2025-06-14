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
            image(milkWoman, 0, 0, width, height);
            textAlign(LEFT);
            fill("white");
            textSize(40);


            dialogue2.start(); // 대사 시작
            dialogue2.display(playerName, dialogueBoxImg, nextButtonImg); // 활성화된 경우만 표시
            // 스테이지 1에 대사 등장
            break;// 대사 사라지고
        case 2:

            //배경 사물
            image(doma, 0, 0, width, height); //배경 도마
            image(bawl, 130, -140, 600, 900);//그릇
            //우유 그리기
            if (score == 0) image(bubble, 160, -80, 540, 810);
            else if (score == 1 || score == 2) image(milk2, 170, -100, 540, 810);
            else if (score == 3 || score == 4) image(milk3, 160, -120, 520, 800);
            else if (score >= 5) image(milk5, 160, -80, 540, 810);


            //점수판 구현
            image(scoreBoard, 500, -10, 500, 120);
            textSize(24);
            textAlign(LEFT);
            fill(255)
            text("남은 버터:" + score + '/' + st1SuccessPoint + " 개", 700, 60);

            //마우스를 따라다니는 거품기
            let whiskOffsetX = 120;
            let whiskOffsetY = 90;
            image(whisk, mouseX - whiskOffsetX, mouseY - whiskOffsetY, 240, 360);
            //cursor('none');

            //시작 전, 성공, 실패 상태에 따라 패널의 내용을 변경
            if (score == 0 && remainingTime != 0) drawSt1Panel("시계방향으로 우유를 저어서 버터를 만들자!", "게이지가 범위 안에 머물면 버터가 만들어진다!", "START");
            else if (score == st1SuccessPoint && remainingTime >= 0) drawSt1Panel("버터가 만들어졌다!", "이제 이걸 여인에게 가져다 주자.", "NEXT");
            else if (remainingTime === 0) drawSt1Panel("버터를 만드는 데 실패했다.", "다시 시도해 보자.", "RESTART");

            //패널 클릭 시 액션
            if (mouseX >= 400 && mouseX <= 600 && mouseY >= 320 && mouseY <= 380 && mouseIsPressed) {
                needSt1Panel = false;  //시작 전이라면 게임 시작!
                if (score == st1SuccessPoint) {
                    stage1sceneNum = 3; //성공한 경우라면 다음 씬으로! 
                    needSt1Panel = false;
                }
                else if (remainingTime == 0) {//타임오버했다면 점수와 시간을 초기화
                    score = 0;
                    remainingTime = 60;
                }
            }

            //게이지 바 그리기
            image(gauge, 900, 50, 110, 500);

            if (!needSt1Panel) {//패널이 꺼지고 난 후에 시작!
                //타이머   
                // 1초(1000ms) 지날 때마다 타이머 감소
                if (millis() - lastTimeChecked >= 1000 && remainingTime > 0) {
                    remainingTime--;
                    lastTimeChecked = millis();
                }
                // 타이머 텍스트 형식 (00:59 형식)
                textSize(30);
                let min = floor(remainingTime / 60);
                let sec = remainingTime % 60;
                let timeStr = nf(min, 2) + ":" + nf(sec, 2);
                text(timeStr, width - 105, 40); // 오른쪽 위에 출력

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
                //fill(0);
                //textSize(24);
                //text("회전 속도: " + nf(angularVelocity, 1, 4), 600, 50);

                // 6. 이전 각도 갱신
                prevAngle = currAngle;

                // 게이지 처리
                if (angularVelocity >= targetSpeed) {
                    gaugeValue += 1;  // 천천히 증가
                } else if (angularVelocity < targetSpeed && gaugeValue > 2) {
                    gaugeValue -= 1.5;  // 빠르게 감소
                } else gaugeValue = 0;
            }

            //게이지 높이 설정
            let gaugeHeight = 5 * gaugeValue;
            gaugeTopY = 540 - gaugeHeight;

            //게이지 존
            gaugeZone.display();
            fill("white")
            text("stay", gaugeZone.x - 70, gaugeZone.y + gaugeZone.h / 2)
            text("here!", gaugeZone.x - 70, gaugeZone.y + gaugeZone.h / 2 + 20)
            triangle(gaugeZone.x + 5, gaugeZone.y + gaugeZone.h / 2 - 15, gaugeZone.x + 5, gaugeZone.y + gaugeZone.h / 2 + 15, gaugeZone.x + 25, gaugeZone.y + gaugeZone.h / 2)
            if (gaugeHeight > 490) gaugeValue--; //게이지 안 넘치게


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

            //시간이 30초가 되면!
            if (remainingTime <= 20 && remainingTime >= 15) {

                fill(255)
                rect(200, 400, 300, 80, 20)
                triangle(200, 440, 290, 455, 170, 500)
                fill(0)
                textSize(18)
                text("우유가 굳고 있어. 더 빨리 저어야 해!", 205, 450)
                image(hurryUp, width / 7 - 150, height * 3 / 4, 200, 150)
                targetSpeed = 0.45
            }

            //hard mode:판때기 움직이기
            if (score >= 3) {
                if (gaugeZone.y >= 320) gaugeDirection = -1;
                else if (gaugeZone.y <= 30) gaugeDirection = 1;

                gaugeZone.transPos(3 * gaugeDirection); // 매 프레임마다 조금씩 움직임
            }

            //성공 실패 판정
            if (score == st1SuccessPoint && remainingTime >= 0) {//성공
                needSt1Panel = true;
            }
            if (remainingTime === 0) {//실패: 시간 오버
                needSt1Panel = true;
            }

            break;
        case 3:
            //미술관으로 복귀
            if (dialogue3.index == 0) image(milkWoman, 0, 0, width, height);
            else {
                background(255);
                imageMode(CENTER);
                textAlign(LEFT, TOP);
                image(museumImg, width / 2, height / 2, width, height);
                image(ghostImg, width / 2, height / 2, ghostImg.width * 0.3, ghostImg.height * 0.3);
            }
            dialogue3.start();
            dialogue3.display(playerName, dialogueBoxImg, nextButtonImg);
            break;
    }



}

function draw3() {
    switch (stage2sceneNum) {
        case 0: // Stage intro
            imageMode(CORNER);
            image(titleBack, 0, 0);
            startButton.display();
            textAlign(CENTER);
            textSize(40);
            text("STAGE 2", width / 2, height / 5);
            textSize(60);
            text("이삭 줍는 여인들", width / 2, height * 2.7 / 5);
            break;


        case 1:
            imageMode(CORNER);
            image(cropcrop, 0, 0, width, height);
            textAlign(LEFT);
            fill("white");
            textSize(40);


            dialogue4.start(); // 대사 시작
            dialogue4.display(playerName, dialogueBoxImg, nextButtonImg);
            break;
        case 2:
            background(255);
            drawBackground();
            textAlign(LEFT);
            fill("white");
            textSize(40);
            text("STAGE 2", 30, 50);

            // 이삭 그리기
            for (let i = 0; i < cropGrid.length; i++) {
                let crop = cropGrid[i];
                if (crop && crop.isVisible()) crop.display();
            }

            drawUI();

            // 3초바다 이삭 생기기
            if (millis() > nextTurnTime && currentTurn < maxTurns && !needSt1Panel) {
                currentTurn++;
                nextTurnTime = millis() + 3000;
                spawnCrops();
            }

            // 카운트다운 타이머
            if (!needSt1Panel && millis() - lastTimeChecked2 >= 1000 && remainingTime2 > 0) {
                remainingTime2--;
                lastTimeChecked2 = millis();
            }

            //패널 클릭 시 액션
            if (mouseX >= 400 && mouseX <= 600 && mouseY >= 320 && mouseY <= 380 && mouseIsPressed) {
                needSt1Panel = false;  //시작 전이라면 게임 시작!
                if (score2 >= st2SuccessPoint) {
                    stage2sceneNum = 3; //성공한 경우라면 다음 씬으로! 
                    needSt1Panel = false;
                }
                else if (remainingTime2 == 0) {//타임오버했다면 점수와 시간을 초기화
                    resetGame();
                }
            }
            if (!needSt1Panel && mouseIsPressed) {
                for (let i = 0; i < cropGrid.length; i++) {
                    if (cropGrid[i] && cropGrid[i].checkClick(mouseX, mouseY)) break; // 그냥 게임중 아무 패널 안 보이는 상태
                }
            }


            // 점수 패널
            if (score2 >= st2SuccessPoint) {
                drawSt1Panel("이삭을 충분히 주웠다!", "여인들에게 갖다 주자", "NEXT");
            } else if (currentTurn >= 20) {
                drawSt1Panel("이삭을 충분히 모으지 못했다.", "다시 시작해 보자", "RESTART");
            } else if (score2 === 0 && currentTurn === 0) {
                drawSt1Panel("이삭이 사라지기 전에 빨리 클릭해서 줍자!", "특별한 이삭도 섞여 있으니 유심히 봐야 돼.", "START");
            }


            // 마우스 사진
            image(equipmentImg, mouseX - 37, mouseY - 15, 90, 135);

            //성공 실패 판정
            if (score2 >= st2SuccessPoint && remainingTime2 >= 0) {//성공
                needSt1Panel = true;
            }
            if (remainingTime2 === 0) {//실패: 시간 오버
                needSt1Panel = true;
            }
            break;
        case 3:
            //미술관으로 복귀
            imageMode(CORNER);
            if (dialogue5.index == 0) image(cropcrop, 0, 0, width, height);
            else {
                background(255);
                imageMode(CENTER);
                textAlign(LEFT, TOP)
                image(museumImg, width / 2, height / 2, width, height);
                image(ghostImg, width / 2, height / 2, ghostImg.width * 0.3, ghostImg.height * 0.3);
            }

            dialogue5.start();  // 한 번만 실행
            dialogue5.display(playerName, dialogueBoxImg, nextButtonImg);

            break;
    }

}


function draw4() {
    imageMode(CORNER);
    textAlign(LEFT, BASELINE);
    switch (stage3sceneNum) {
        case 0:
            frameRate(60);//속도변경
            image(titleBack, 0, 0);
            startButton.display();

            textAlign(CENTER);
            textSize(40);
            text("STAGE 3", width / 2, height / 5);
            textSize(60);
            text("인간의 아들", width / 2, height * 2.7 / 5);

            break;
        case 1:
            image(man_bg, 0, 0, width, height);
            textAlign(LEFT);
            fill("white");
            textSize(40);

            dialogue6.start(); // 대사 시작
            dialogue6.display(playerName, dialogueBoxImg, nextButtonImg); // 활성화된 경우만 표시

            break;// 대사 사라지고
        case 2:

            //배경 사물
            image(man_face_bg, 0, 0, width, height); //남자 그림
            cameraButton.display(); //카메라 호버링

            //점수판 구현
             if (score3 < 0) score3 = 0;  //음수 안 되게
            image(scoreBoard, 500, 0, 500, 80);
            textSize(22);
            textAlign(LEFT);
            text("찍은 사진:" + score3 + '/' + st3SuccessPoint + " 장", 710, 50);
           

            //플래시 이펙트
            if (isFlashOn) {
                image(flash, cameraButton.x + 150, cameraButton.y + 20, 150, 150) //플래시 이미지
                textSize(40)
                if (get1 == true) {
                    fill("white")
                    text("+1장", width / 2 + 100, height * 2 / 5 + 200)
                } else if (get2 == true) {
                    fill("white")
                    text("+2장", width / 2 + 100, height * 2 / 5 + 200)
                } else if (lose1 == true) {
                    fill("red")
                    text("-1장!", width / 2 - 250, height * 2 / 5 + 200)
                } else if (lose2 == true) {
                    fill("red")
                    text("-2장!", width / 2 - 250, height * 2 / 5 + 200)
                }
                if (millis() > flashEndTime) {
                    isFlashOn = false;  //이미지 끄기
                    get1 = get2 = lose1 = lose2 = false;
                }
            }
            //시작 전, 성공, 실패 상태에 따라 패널의 내용을 변경
            if (score3 == 0 && remainingTime3 != 0) drawSt1Panel("카메라를 클릭해 사진을 찍자.", "사과와 달이 남자의 얼굴을 완전히 가렸을 때 ", "START", "찍어야 한다.");
            else if (score3 >= st3SuccessPoint && remainingTime3 >= 0) drawSt1Panel("사진을 아주 잘 찍었다!", "남자에게 보여 주자.", "NEXT");
            else if (remainingTime3 === 0) drawSt1Panel("사진을 잘 찍지 못했다.", "다시 시도해 보자.", "RESTART");

            //패널 클릭 시 액션
            if (mouseX >= 400 && mouseX <= 600 && mouseY >= 320 && mouseY <= 380 && mouseIsPressed) {
                needSt1Panel = false;  //시작 전이라면 게임 시작!
                if (score3 >= st3SuccessPoint) {
                    stage3sceneNum = 3; //성공한 경우라면 다음 씬으로! 
                    needSt1Panel = false;
                }
                else if (remainingTime3 == 0) {//타임오버했다면 점수와 시간을 초기화
                    score3 = 0;
                    remainingTime3 = 60;
                    for (let t of targets) {
                        t.relocate();// 화면에 그리기
                        t.speed = width / 6;
                        t.isClicked = false
                    }
                }
            }



            if (!needSt1Panel) {//패널이 꺼지고 난 후에 시작!
                //타이머   
                // 1초(1000ms) 지날 때마다 타이머 감소
                if (millis() - lastTimeChecked3 >= 1000 && remainingTime3 > 0) {
                    remainingTime3--;
                    lastTimeChecked3 = millis();
                }
                // 타이머 텍스트 형식 (00:59 형식)
                let min = floor(remainingTime3 / 60);
                let sec = remainingTime3 % 60;
                let timeStr = nf(min, 2) + ":" + nf(sec, 2);
                textSize(22)
                fill("white")
                text(timeStr, width - 105, 40); // 오른쪽 위에 출력

                //사물들
                line(width / 2 - 120, 0, width / 2 - 120, 300) //표시선, 추후 삭제 가능
                line(width / 2 + 40, 0, width / 2 + 40, 300)
                for (let t of targets) {
                    t.move();     // 위치 업데이트
                    t.speed += 0.3;
                    movingSpeed = t.speed;
                    t.display();  // 화면에 그리기
                }

                /*textSize(18)
                image(greenApple, 0, 10, 40, 40);
                text(": +1", 40, 40);
                image(face, 85, 18, 30, 30);
                text(": +2", 120, 40);
                image(bird, 163, 15, 30, 30);
                text(": -2", 200, 40);
                image(pipe, 240, 15, 40, 30);
                text(": -1", 280, 40);*/
                image(st3board, 0, -30, 300, 150)
            }


            //성공 실패 판정
            if (score3 >= st3SuccessPoint && remainingTime3 >= 0) {//성공
                needSt1Panel = true;
            }
            if (remainingTime3 === 0) {//실패: 시간 오버
                needSt1Panel = true;
            }

            break;
        case 3:
            //미술관으로 복귀
            if (dialogue7.index == 0) image(man_bg, 0, 0, width, height);
            else {
                background(255);
                imageMode(CENTER);
                textAlign(LEFT, TOP);
                image(museumImg, width / 2, height / 2, width, height);
                image(ghostImg, width / 2, height / 2, ghostImg.width * 0.3, ghostImg.height * 0.3);
            }

            dialogue7.start();  // 한 번만 실행
            dialogue7.display(playerName, dialogueBoxImg, nextButtonImg);
            break;
    }



}

function draw5() {
    switch (stage4sceneNum) {
        case 0:
            background(220);
            imageMode(CORNER);

            if (frame === 0) {
                image(cooking_bg, 0, 0, width, height);
            } else if (frame === 1) {
                image(butter_bg, 0, 0, width, height);
            } else if (frame === 2) {
                image(cooking_bg, 0, 0, width, height);
            } else if (frame === 3) {
                image(pie_bg, 0, 0, width, height);
            } else if (frame === 4) {
                image(applepie_bg, 0, 0, width, height);

                //버튼 생기기
                if (stage4sceneNum === 0 && frame === 4) {
                    const btnX = width - 170;
                    const btnY = height - 50;
                    const btnW = 80;
                    const btnH = 30;
                    image(nextButtonImg, btnX, btnY, btnW, btnH);
                }


            }

            image(cookingghostImg, ghostPos.x, ghostPos.y, ghostPos.w, ghostPos.h);
            image(chatImg, chatPos.x, chatPos.y, chatPos.w, chatPos.h);

            fill(0);
            noStroke();
            textSize(18);
            textAlign(CENTER);
            text(dialogue8List[frame].text, chatPos.x + 20, chatPos.y + 25, chatPos.w - 40, chatPos.h - 40);

            // 요리 재료
            if (frame === 0) {
                if (!draggable || draggable.name !== 'butter') image(butterImg, butterPos.x, butterPos.y, butterPos.w, butterPos.h);
                image(flourImg, flourPos.x, flourPos.y, flourPos.w, flourPos.h);
                image(appleImg, applePos.x, applePos.y, applePos.w, applePos.h);
            } else if (frame === 1) {
                if (!draggable || draggable.name !== 'flour') image(flourImg, flourPos.x, flourPos.y, flourPos.w, flourPos.h);
                image(appleImg, applePos.x, applePos.y, applePos.w, applePos.h);
            } else if (frame === 2) {
                image(appleImg, applePos.x, applePos.y, applePos.w, applePos.h);
                if (!draggable || draggable.name !== 'banjuk') image(banjukImg, banjukPos.x, banjukPos.y, banjukPos.w, banjukPos.h);
            } else if (frame === 3) {
                if (!draggable || draggable.name !== 'apple') image(appleImg, applePos.x, applePos.y, applePos.w, applePos.h);
            }

            if (draggable) {
                draggable.x = mouseX + dragOffsetX;
                draggable.y = mouseY + dragOffsetY;
                image(draggable.img, draggable.x, draggable.y, draggable.w, draggable.h);
            }

            noFill();
            noStroke();
            ellipse(bowlCenter.x, bowlCenter.y, bowlRadiusX * 2, bowlRadiusY * 2);
            ellipse(pieTrayCenter.x, pieTrayCenter.y, pieTrayRadiusX * 2, pieTrayRadiusY * 2);

            image(handImg, mouseX - 20, mouseY - 10, 40, 40);

            break;

        case 1: // Oven scene with alternating backgrounds + dialogue9
            // Alternate background every 30 frames or time-based
            if (frameCount % 60 < 30) {
                image(oven_darkbg, width / 2, height / 2, width, height);
            } else {
                image(oven_lightbg, width / 2, height / 2, width, height);
            }

            dialogue9.start();
            dialogue9.display(playerName, dialogueBoxImg, nextButtonImg);

            break;

        // Add more cases if you have more scenes in stage 4
    }
}

function draw6() {

    switch (stage5sceneNum) {
        case 0:
            background(255);
            textAlign(LEFT, TOP)

            if (dialogue10.index >= 0 && dialogue10.index <= 8) { //그림그리는 영상 부분
                imageMode(CORNER);
                image(drawdraw, 0, 0, width, height);
                if (dialogue10.index >= 3) {
                    kid_painting.play();
                    image(kid_painting, 0, 0, width, height)

                }
            }
            else if (dialogue10.index > 8 && dialogue10.index <= 19) {
                imageMode(CORNER);
                image(museumImg, 0, 0, width, height);
                imageMode(CENTER);
                image(ghostImg, width / 2, height / 2, ghostImg.width * 0.3, ghostImg.height * 0.3);

            } else if (dialogue10.index >= 20) { //화가로 성불하는 부분
                imageMode(CORNER);
                image(museumImg, 0, 0, width, height);
                imageMode(CENTER);
                image(ghost_painter, width / 2, height / 2, ghostImg.width * 0.3, ghostImg.height * 0.3);
            }
            else {//우령이 사라지고 난 후
                imageMode(CORNER);
                fill("red")
                textSize(16);
                image(last_bg, 0, 0, width, height);
                textAlign(CENTER)
                text("<애플파이>", 710, 340)
                text("행복한 화가" + ", " + playerName, 710, 360)

            }


            dialogue10.start();
            dialogue10.display(playerName, dialogueBoxImg, nextButtonImg);

            break;
        case 1:
            imageMode(CORNER);
            fill("red")
            textSize(16);
            image(last_bg, 0, 0, width, height);
            textAlign(CENTER)
            text("<애플파이>", 710, 340)
            text("행복한 화가" + ", " + playerName, 710, 360)

            dialogue12.start();
            dialogue12.display(playerName, dialogueBoxImg, nextButtonImg);


            break;


        case 2: //줌 인: 일단 대화 박스만 지우고 다시 그린다
            fill("red")
            textSize(16);
            frameRate(30);
            background(255)
            imageMode(CORNER);
            image(last_bg, 0, 0, width, height);
            textAlign(CENTER)
            text("<애플파이>", 710, 347)
            text("행복한 화가" + ", " + playerName, 710, 367)


            if (millis() - zoomDelay >= 1000) { // 버튼 누르고 1초가 지나면 줌 인 시작
                if (zoom < 1.8) zoom += 0.01
                if (zoomX < 420) zoomX += 6
                if (zoomY < 100) zoomY += 3


                push();
                scale(zoom);                        // 확대
                translate(-zoomX, -zoomY);      // 원하는 지점을 중심으로 맞춤
                imageMode(CORNER);
                image(last_bg, 0, 0, width, height);
                textAlign(CENTER)
                text("<애플파이>", 710, 347)
                text("행복한 화가" + ", " + playerName, 710, 367)
                pop();
            }
            if (millis() - zoomDelay >= 5000) {//초기화 버튼
                restartButton = new Button(backToStart, backToStartClicked, width / 2 + 240, height / 2 + 160, 270, 90, () => {
                    window.location.reload();
                });
                imageMode(CENTER)
                fill(255, 80)
                rect(0, 0, 4000, 4000)
                image(theEndGst, width / 2, height / 2, theEndGst.width / 3, theEndGst.height / 3)
                imageMode(CORNER)
                restartButton.display();
            }

            break;


    }
}



function drawSt1Panel(text1, text2, text3, text4) {
    if (needSt1Panel) {
        fill(210, 214, 211, 200);
        rect(250, 200, 500, 200, 20);
        fill(0);
        textSize(22);
        text(text1, 280, 240);
        text(text2, 280, 280);
        text(text4, 280, 315);
        if (mouseX >= 400 && mouseX <= 600 && mouseY >= 320 && mouseY <= 380) fill("red");
        else fill("gray");
        rect(400, 320, 200, 60);
        fill("white");
        textSize(30);
        text(text3, 450, 360);
    }
}

function drawBackground() {
    imageMode(CORNER)
    image(noWomanbg, 0, 0, width, height);
    stroke(180);
    //for (let i = 0; i <= 10; i++) line(i * 100, 100, i * 100, 600);
    //for (let j = 0; j <= 5; j++) line(0, 100 + j * 100, 1000, 100 + j * 100);
}

//점수 표시
function drawUI() {
    image(scoreBoard, 500, -10, 500, 120);
    textSize(30);
    textAlign(LEFT);
    text("주운 이삭:" + score2 + " 개", 700, 50);
    let min = floor(remainingTime2 / 60);
    let sec = remainingTime2 % 60;
    let timeStr = nf(min, 2) + ":" + nf(sec, 2);
    text(timeStr, width - 105, 40);

    textSize(35);
    text("+1", 325, 65); image(normalCropImg, 260, 25, 60, 60);
    text("+5", 465, 65); image(goldCropImg, 400, 25, 60, 60);
    text("-5", 605, 65); image(darkCropImg, 540, 25, 60, 60);
}

function resetGame() {
    score2 = 0;
    remainingTime2 = 60;
    currentTurn = 0;
    nextTurnTime = millis() + 1000;
    cropGrid = Array(50).fill(null);
    needSt1Panel = false;
}

function spawnCrops() {
    cropGrid = Array(50).fill(null);
    let indices = Array.from({ length: 50 }, (_, i) => i);
    shuffle(indices, true);

    const cellWidth = 100;
    const cellHeight = 70;
    const cropSize = 80;

    for (let i = 0; i < 8; i++) {
        let idx = indices[i];
        let col = idx % 10;
        let row = Math.floor(idx / 10);

        let x = col * cellWidth + (cellWidth - cropSize) / 2;
        let y = row * cellHeight + (cellHeight - cropSize) / 2 + 195;  // 210 pushes grid lower on screen

        let type = "normal";
        if (currentTurn >= 5 && currentTurn < 15 && (i === 0 || i === 1)) {
            type = i === 0 ? "gold" : "dark";
        } else if (currentTurn >= 15 && (i < 4)) {
            type = i % 2 === 0 ? "gold" : "dark";
        }
        cropGrid[idx] = new Crop(x, y, type);
    }
}



