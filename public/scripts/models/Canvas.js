
class Canvas {
    constructor() {
        this.c = document.querySelector('#gameScreen');
        this.c.width = 1280;
        this.c.height = 576;

        this.width = this.c.width;
        this.height = this.c.height;

        this.ctx = this.c.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
    }

    drawImage(img, position, scale){
        this.ctx.drawImage(
            img, 
            position.x, 
            position.y, 
            Math.floor(img.width * scale), 
            Math.floor(img.height * scale)
        );
    }
    clear(){
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0, this.width, this.height);
    }

}
