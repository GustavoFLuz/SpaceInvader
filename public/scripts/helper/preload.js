async function preload() {
    const imgSrc = [
        'Invader.png',
        'Spaceship.png'
    ]
    const images = [];
    await Promise.all(imgSrc.map(async (src) => {
        const imgName = src.split('.')[0];
        images[imgName.trim()] = await loadImage(src);
      }));
    return images;
}
function loadImage(imageSrc) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject
        img.src = '../../assets/img/' + imageSrc;
    })
}

