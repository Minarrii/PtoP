class Dialogue {
  constructor(dialogueArray) {
    this.dialogues = dialogueArray;
    this.index = 0;
    this.shake = false;
    this.shakeStartTime = 0;
    this.hasPlayedShakeSound = false;
    this.isActive = false;
  }
  start() {
    if (this.isActive) return; //start가 반복해서 돌아가는 경우를 막기 위함. 이제 조건문 없이 start()바로 써도 됨!
    this.index = 0;
    this.isActive = true;
    this.shake = false;
    this.hasPlayedShakeSound = false;
  }

  getCurrentText() {
    return this.dialogues[this.index].text;
  }

  getCurrentSpeaker(playerName) {
    const speaker = this.dialogues[this.index].speaker;
    return speaker === "주인공" ? (playerName || "???") : speaker;
  }

  next() {
    if (this.index < this.dialogues.length - 1) {
      this.index++;
      if (this.index === 6 &&stageNum==0) {
        this.shake = true;
        this.shakeStartTime = millis();
        if (!this.hasPlayedShakeSound) {
          shakeSound.play();
          this.hasPlayedShakeSound = true;
        }
      }
      
      return true;
    } else {
      this.end();
      return false;
    }
  }
  end() {
    this.isActive = false;
    this.shake = false;
    this.hasPlayedShakeSound = false;
  }
// 흔들리는 시간
  isShaking() {
    if (this.shake && millis() - this.shakeStartTime > 1000) {
      this.shake = false;
    }
    return this.shake;
  }
// 대사 주인 등장
  display(playerName, dialogueBoxImg, nextButtonImg) {
    let dbx = width / 2;
    let dby = height - 120;
    let dx = dbx, dy = dby;

    if (this.isShaking()) {
      dx += random(-5, 5);
      dy += random(-5, 5);
    }
// 대사 박스
    let boxW = dialogueBoxImg.width * 0.38;
    let boxH = dialogueBoxImg.height * 0.38;
    imageMode(CENTER);
    image(dialogueBoxImg, dx, dy, boxW, boxH);
// 이름 위치
    let speakerName = this.getCurrentSpeaker(playerName);
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(255);
    text(speakerName, dx / 2 -70, dy - boxH / 2 + 31);

    textAlign(CENTER, CENTER);
    textSize(20);
    fill(90, 70, 50);

    let content = this.getCurrentText();
    let textAreaWidth = boxW * 0.85;
    let textX = dx;
    let textY = dy + 26;
//대사가 밑으로 가는 --> 옆으로 안 퍼지고 모양  잡게
    let words = content.split(" ");
    let lines = [], currentLine = "";
    for (let word of words) {
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

    image(nextButtonImg, width - 175, height - 63, 75, 23);
  }
}