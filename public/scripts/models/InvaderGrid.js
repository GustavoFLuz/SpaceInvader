class InvadersGrid {
    constructor(velocity, quantity) {
        this.position = {
            x: 0,
            y: 0,
        };
        this.space = {
            horizontal: 40,
            vertical: 30,
        };
        this.velocity = {
            x: velocity,
            y: 0,
        };
        this.columns = Math.floor(Math.random() * quantity) + 2;
        this.rows = Math.floor(Math.random() * 3) + 2;
        this.width = this.columns * this.space.horizontal;
        this.invaders = this.create();
    }

    create() {
        const invaders = [];
        for (let y = 0; y < this.rows; y++)
            for (let x = 0; x < this.columns; x++) {
                invaders.push(
                    new Invader(
                        this.space.horizontal * x,
                        this.space.vertical * y,
                        "../../../../assets/img/Invader.png"
                    )
                );
            }
        return invaders;
    }

    update() {
        this.velocity.y = 0;
        this.checkColision();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.invaders.forEach((invader, index) => {
            spaceshipProjectiles.forEach((projectile, projectileIndex) => {
                this.checkProjectileColision(projectile, projectileIndex, invader, index);
            });
            invader.update(this.velocity.x, this.velocity.y);
            invader.draw();
        });
    }
    checkColision() {
        if (
            !(this.position.x + this.width < canvas.width && this.position.x >= 0)) {
            this.velocity.x *= -1;
            this.velocity.y = this.space.vertical;
        }
    }

    checkProjectileColision(projectile, pIndex, invader, Iindex){
        if (
            projectile.position.y - projectile.radius <= invader.position.y + invader.height &&
            projectile.position.y + projectile.radius >= invader.position.y &&
            projectile.position.x + projectile.radius <= invader.position.x + invader.width &&
            projectile.position.x - projectile.radius >= invader.position.x
        ) {
            setTimeout(() => {
                if (
                    this.invaders.find((inv) => inv == invader) &&
                    spaceshipProjectiles.find((pro) => pro == projectile)
                ) {
                    invader.explode();
                    this.invaders.splice(Iindex, 1);
                    spaceshipProjectiles.splice(pIndex, 1);

                    game.player.score += game.difficultySettings.invaderPoints;

                    if (this.invaders.length > 0) {
                        const leftPos = this.invaders.reduce((min, inv) => inv.position.x < min ? inv.position.x : min, canvas.width)
                        const rightPos = this.invaders.reduce((max, inv) => inv.position.x > max ? inv.position.x : max, 0)
                        this.width = rightPos - leftPos + this.space.horizontal;
                        this.position.x = leftPos;
                    }
                }
            }, 0);
        }
    }
    shoot(percent) {
        let shootingInvaders = Math.floor(Math.random() * this.invaders.length * (percent/100));
        while (shootingInvaders--)
            this.invaders[Math.floor(Math.random() * this.invaders.length)].shoot();
    }
}
