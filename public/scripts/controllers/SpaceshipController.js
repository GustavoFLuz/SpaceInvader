class SpaceshipController {
    constructor(spaceship) {
        this.spaceship = spaceship;
        this.availableToShoot = true;
    }
    checkPressed(keys) {
        if (keys.rightPressed) {
            if (this.spaceship.position.x + this.spaceship.width < canvas.width)
                this.spaceship.move('right')
        }
        if (keys.leftPressed) {
            if (this.spaceship.position.x > 0)
                this.spaceship.move('left')
        };
        if (keys.shootPressed && this.availableToShoot) {
            this.spaceship.shoot();
            this.availableToShoot = false;
            setTimeout(()=>{this.availableToShoot = true}, 100);
        };
        this.update();
    }

    update() {
        this.spaceship.draw()
    }
}
