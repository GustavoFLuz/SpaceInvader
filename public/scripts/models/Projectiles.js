class Projectile{
    constructor(xPos, yPos, velocity, radius, color){
        this.velocity = velocity;
        this.position = {
            x: xPos,
            y: yPos
        }
        this.radius = radius;
        this.color = color;
        this.draw();
    }
    draw(){
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
        context.fillStyle = typeof(this.color)=='string'?this.color:`rgb(${Object.values(this.color).join(',')})`;;
        context.fill();
        context.closePath();
    }
    update(){
        this.position.y += this.velocity;
        this.draw();
    }
    checkPlayerColision(){
        return this.position.y - this.radius >= spaceship.position.y &&
            this.position.y + this.radius <= spaceship.position.y + spaceship.height &&
            this.position.x + this.radius <= spaceship.position.x + spaceship.width &&
            this.position.x - this.radius >= spaceship.position.x
    }
}