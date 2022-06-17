class Spaceship {
    constructor(color) {
        this.velocity = 15;
        this.color = color;
        images.paint(images.array['Spaceship']['white'], color)
            .then(data => this.image = data)
            .then(() => {
                const scale = 0.4;
                this.width = Math.floor(this.image.width * scale);
                this.height = Math.floor(this.image.height * scale)
                this.position = {
                    x: canvas.width / 2 - this.width / 2,
                    y: canvas.height - this.height - 20
                };
            })

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

    move(direction) {
        switch (direction) {
            case 'right': this.position.x += this.velocity; break;
            case 'left': this.position.x -= this.velocity; break;
        }
    }

    shoot() {
        spaceshipProjectiles.push(new Projectile(this.position.x + this.width / 2, this.position.y, -15, 3, this.color))
    }

    explode() {
        this.image = null;
        const settings = {
            color: this.color,
            radius: 4,
            velocity: 5,
            fade: 3,
            random: true
        }
        particlesControl.new(this.position.x, this.position.y, 50, settings)
    }

}