class Crop {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.size = 75;
        this.type = type;
        this.spawnTime = millis();
        this.visible = true;
    }

    isVisible() {
        return this.visible && millis() - this.spawnTime < 3000;
    }

    display() {
        let img = this.type === "gold" ? goldCropImg
            : this.type === "dark" ? darkCropImg
                : normalCropImg;
        image(img, this.x, this.y, this.size, this.size);
    }

    checkClick(mx, my) {
        if (!this.isVisible()) return false;
        if (mx >= this.x && mx <= this.x + this.size && my >= this.y && my <= this.y + this.size) {
            this.visible = false;
            if (this.type === "normal") score2 += 1;
            if (this.type === "gold") score2 += 5;
            if (this.type === "dark") score2 -= 5;
            return true;
        }
        return false;
    }
}
