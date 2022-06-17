class Invader {
    constructor(xPos, yPos) {
        this.color = images.randomColor();
        this.image = images.array['Invader'][this.color]//Canvas.paint(imagesArray['Invader'], colorsRGB.red)
        const scale = 0.3;
        this.width = Math.floor(this.image.width * scale);
        this.height = Math.floor(this.image.height * scale)
        this.position = {
            x: xPos,
            y: yPos
        };
        this.draw();
    }

    draw() {
        if (this.image)
            context.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            )
    }

    update(x, y) {
        if (this.image) {
            this.position.x += x;
            this.position.y += y;
        }
    }

    shoot() {
        invaderProjectiles.push(new Projectile(this.position.x + this.width / 2, this.position.y, game.difficultySettings.projectileSpeed, 5, 'red'))
    }

    explode(){
        const settings = {
            color: this.color,
            radius: 4,
            velocity: 5,
            fade: 3,
            random: true
        }
        particlesControl.new(this.position.x, this.position.y, 30, settings)
    }

}