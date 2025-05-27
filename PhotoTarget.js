class PhotoTarget {
  constructor(order,imgNum) {
    this.x= -100-order*width/4;
    this.y = 130;
    this.speed = width/6;
    this.img = targetImages[imgNum];
    this.order=order;
    this.imgNum = imgNum;
  }
relocate(){
     this.x= -100-this.order*width/4;
}
  move() {
    this.x += this.speed/frameRate();
  }

  display() {
   image(this.img, this.x, this.y, 100, 150);
  }

  isInFrame() {
    return this.x > width/2 - 110 && this.x < width/2 + 40;
  }

 
}
