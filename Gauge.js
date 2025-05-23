class Gauge {
    constructor(img, x, y, w, h, t) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.t = t;

    }
    display() {
        let gaugeOffset = 0;//여백 보정용
        image(this.img, this.x, this.y - gaugeOffset, this.w, this.h);
    }

    transPos(transSpeed) {
        this.y += transSpeed;
    }


    nextZone(nextY, nextH) {  //게이지 존 위치 재설정
        gaugeZoneY = nextY;
        gaugeZoneH = nextH;
    }

    zoneCheck(gaugeTopY) {
        if (gaugeTopY >= this.y && gaugeTopY <= this.y + this.h) {
            accumTime++;
            //이하 디버그용
            console.log(accumTime);
            console.log("바닥" + (this.y));
            console.log("천장" + (this.y + this.h));
        }
        if (accumTime == 54) { //대략 3초유지하면 점수 획득
            accumTime = 0;
            score += 1;
        this.nextZone(zoneYArray[score], zoneHArray[score]);
        }
    }


}