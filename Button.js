class Button {
  constructor(normalImg, hoverImg, x, y, w, h, onClick) {//onClick은 실행할 함수, 없으면 화살표함수로 대체
    this.normalImg = normalImg;
    this.hoverImg = hoverImg;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.onClick = onClick;
  }

  isHovered() {//호버링 여부의 참 거짓을 반환
    return mouseX > this.x && mouseX < this.x + this.w &&
           mouseY > this.y && mouseY < this.y + this.h;
  }

  display() {//호버링 여부에 따라 이미지 전환
    if (this.isHovered()) {
      image(this.hoverImg, this.x, this.y, this.w, this.h);
    } else {
      image(this.normalImg, this.x, this.y, this.w, this.h);
    }
  }

  checkClick() { //클릭을 체크하여, onClick으로 받은 함수를 실행. mouseClicked안에 넣어 사용 권장
    if (this.isHovered()) {
      this.onClick();
    }
  }
}
