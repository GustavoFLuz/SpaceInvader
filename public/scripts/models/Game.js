
class Game {

    static frames = 0; // 61 frames = 1 second

    constructor(name, color) {
        this.keys = {
            rightPressed: false,
            leftPressed: false,
            shootPressed: false
        }
        this.setupKeys(this.keys)

        this.settings = {
            over: false,
            particleFrequency: 50,
            particleQuantity: 15
        }
        //initial difficulty
        this.difficulty = 1;
        this.difficultySettings = {
            projectileSpeed: 1,
            velocity: 1,
            spawnRate: 1,
            spawnQuantity: 1,
            shootFrequency: { period: 1, percent: 1 },
            invaderPoints: 1,
            gridPoints: 1
        }

        this.player = {
            score: 0,
            name: name,
            color: color
        }

        window.canvas = new Canvas();
        window.context = canvas.ctx;
        window.spaceship = new Spaceship(color);

        window.spaceshipProjectiles = [];
        window.invaderProjectiles = [];
        window.particles = [];
        window.spaceshipControl = new SpaceshipController(spaceship);
        window.projectilesControl = new ProjectilesController();
        window.particlesControl = new ParticlesControllers();
        window.scoreHtml = document.querySelector('#score span');
        window.grids = [];
        this.animate();
    }
    setupKeys(keys) {
        this.keyEvents(keys)
    }

    keyEvents(keys) {
        addEventListener('keydown', (event) => {
            if (event.code == 'KeyD' || event.code == 'ArrowRight') keys.rightPressed = true;
            if (event.code == 'KeyA' || event.code == 'ArrowLeft') keys.leftPressed = true;
            if (event.code == 'Space') keys.shootPressed = true;
        })
        addEventListener('keyup', (event) => {
            if (event.code == 'KeyD' || event.code == 'ArrowRight') keys.rightPressed = false;
            if (event.code == 'KeyA' || event.code == 'ArrowLeft') keys.leftPressed = false;
            if (event.code == 'Space') keys.shootPressed = false;
        })
    }

    animate() {
        if (this.settings.finish) {
            Api.postOrUpdateScore(this.player)
            menu.renderMainMenu(true, this.player.score);
            return;
        };

        requestAnimationFrame(() => this.animate());
        canvas.clear();
        this.backgroundUpdate();
        this.difficultyUpdate(this.player.score);

        scoreHtml.innerHTML = this.player.score;

        this.settings.over ? null : spaceshipControl.checkPressed(this.keys);
        projectilesControl.update();
        particlesControl.update();

        grids.forEach((grid, index) => {
            grid.update();
            if (grid.invaders.length == 0) {
                grids.splice(index, 1);
                this.player.score += this.difficultySettings.gridPoints;
                if (grids.length == 0) grids.push(new InvadersGrid(this.difficultySettings.velocity,
                    this.difficultySettings.spawnQuantity));
            };

            if (!(Game.frames % this.difficultySettings.shootFrequency.period))
                grid.shoot(this.difficultySettings.shootFrequency.percent);

        });

        if (!(Game.frames % this.difficultySettings.spawnRate)) {
            grids.push(new InvadersGrid(this.difficultySettings.velocity,
                this.difficultySettings.spawnQuantity));
        }

        this.settings.over ? null : this.checkLoseCondition();



        Game.frames++;
    }

    checkLoseCondition() {
        invaderProjectiles.forEach((projectile) => {
            projectile.checkPlayerColision() ? this.settings.over = true : null;
        })

        if (this.settings.over) {
            spaceship.explode();
            setTimeout(() => {
                this.settings.finish = true;
            }, 1000)
        }
    }
    backgroundUpdate() {
        if (!(Game.frames % Math.floor(1000 / this.settings.particleFrequency))) {
            const quantity = Math.floor(Math.random() * this.settings.particleQuantity);
            for (var i = 0; i < quantity; i++) {
                var brightness = 200 - Math.floor(Math.random() * 100);
                var x = Math.floor(Math.random() * canvas.width)
                const settings = {
                    color: { r: brightness, g: brightness, b: brightness },
                    radius: Math.floor(Math.random() * 3) + 1,
                    velocity: Math.floor(Math.random() * 3) + 2,
                    fade: 0,
                    random: false
                }
                particles.push(new Particle(x, 0, settings))
            }
        }
    }
    difficultyUpdate(score) {
        let x = this.difficulty;
        this.difficulty = Math.ceil(Math.sqrt((score + 1) / 1000));
        this.difficultySettings = {
            projectileSpeed: 2 * this.difficulty,
            velocity: Math.ceil((10 * Math.log10(this.difficulty * 30)) / 3),
            spawnRate: Math.floor((10000 / (55 * Math.log10(this.difficulty) + 30)) + 1),
            spawnQuantity: Math.floor(7 * Math.log10(this.difficulty) + 3),
            shootFrequency: {
                period: (Math.floor(5000 / (75 * Math.log10(this.difficulty) + 30))),
                percent: (35 * Math.log10(this.difficulty) + 30)
            },
            invaderPoints: Math.floor(15 * Math.log10((score / 1000) + 1) + 10),
            gridPoints: Math.floor((15 * Math.log10((score / 1000) + 1) + 10) * 10)
        }
        if (x != this.difficulty) {
            console.log('Difficulty: ' + this.difficulty);
        }
    }
}

