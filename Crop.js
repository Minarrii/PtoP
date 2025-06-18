let pointsText = []; // Array to store point texts and their positions

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

            // Calculate the points for clicked crop
            let points = 0;
            let pointText = '';
            let textColor = 'white';
            if (this.type === "normal") {
                points = 1;
                pointText = "+1점";
            } else if (this.type === "gold") {
                points = 5;
                pointText = "+5점";
            } else if (this.type === "dark") {
                points = -5;
                pointText = "-5점";
                textColor = 'red';
            }

            // Update score
            score2 += points;

            // Add the points text to the display array with a timer for visibility
            pointsText.push({
                text: pointText,
                x: this.x, // Position it at the crop's location
                y: this.y - 30, // Display above the crop
                timer: millis(),
                color: textColor // Text color for + and - points
            });
            return true;
        }
        return false;
    }
}