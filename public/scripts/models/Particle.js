class Particle {
    constructor(xPos, yPox, {color, radius, velocity, fade, random}) {
      this.position = {
        x: xPos,
        y: yPox
      }
      this.velocity = random?{
        x: (Math.random()-0.5)*velocity,
        y: (Math.random()-0.5)*velocity
      }:{
        x: 0,
        y: Math.random()*velocity
      }
      this.radius = radius;
      this.color = color;
      this.opacity = 1
      this.fade = fade/100;
    }
  
    draw() {
      context.save()
      context.globalAlpha = this.opacity
      context.beginPath()
      context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
      context.fillStyle = typeof(this.color)=='string'?this.color:`rgb(${Object.values(this.color).join(',')})`;
      context.fill()
      context.closePath()
      context.restore()
    }
  
    update() {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
      this.opacity -= this.fade;
    }
  }
  