class Images {
    constructor(args) {
        this.colors = {
            white: { r: 255, g: 255, b: 255 },
            yellow: { r: 255, g: 255, b: 0 },
            pink: { r: 255, g: 0, b: 255 },
            red: { r: 255, g: 0, b: 0 },
            lightblue: { r: 0, g: 255, b: 255 },
            green: { r: 0, g: 255, b: 0 },
            blue: { r: 0, g: 0, b: 255 },
            purple: { r: 160, g: 0, b: 255 },
            orange: { r: 255, g: 128, b: 0 }
        }
        this.array = [];
        args.forEach(image => {
            this.array[image.name] = []
            Object.keys(this.colors).map((color) => {
                this.paint(image.img, this.colors[color])
                    .then(data=>this.array[image.name][color] = data)
            })
        })
    }
    async paint(image, color) {
        let auxC = document.createElement('canvas');
        auxC.width = image.width;
        auxC.height = image.height;
        const auxCtx = auxC.getContext('2d');
        auxCtx.drawImage(image, 0, 0, auxC.width, auxC.height);
        auxCtx.globalCompositeOperation = 'source-atop';
        auxCtx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
        auxCtx.fillRect(0, 0, auxC.width, auxC.height);
        var newImage = new Image();
        newImage.src = await auxC.toDataURL();
        return newImage;
    }

    randomColor() {
        const colors = Object.keys(this.colors).map((color) => color);
        return colors[Math.floor(Math.random() * colors.length)]
    }
}

function desenha(img) {
    c = document.querySelector('canvas');
    c.width = 1280;
    c.height = 576;
    width = c.width;
    height = c.height;
    c.getContext("2d").drawImage(
        img,
        100,
        100,
        img.width,
        img.height
    );
}