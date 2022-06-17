menu = new Menu();
preload()
  .then((data) => {
    spaceshipImage = data['Spaceship'];
    images = new Images(Object.keys(data).map((index) => {return {name:index, img:data[index]}})) 
  })
  .then(() => menu.renderMainMenu())
  //.then(() => menu.renderScore());
  

