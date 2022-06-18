class Menu {
  constructor() {
    this.menuDiv = document.querySelector('#menu');
  }
  toggleMenu(on) {
    on ? this.menuDiv.style.display = 'flex' : this.menuDiv.style.display = 'none'
  }
  renderMainMenu(gameEnded, score) {
    const html = `
    <div id='info' onmouseenter='menu.renderInfo(event)' onmouseout='menu.removeInfo()'>i</div>
    ${gameEnded ? "<h2 id='gameover'>GAME OVER</h2>" : ''}
    ${gameEnded ? `<h2 id='finalScore'>${score} points</h2>` : ''}
    <h2 id='title'><span>Space</span><span>Invaders</span></h2>
    <div id="menu-buttons">
      <button onclick='menu.renderStartMenu()'>Start Game</button>
      <button onclick='menu.renderScore()'>Score</button>
    </div>`;
    this.menuDiv.innerHTML = html;
    this.toggleMenu(true);
  }
  renderInfo(event) {
    const div = document.createElement('div');
    div.id = 'info-box';
    div.innerHTML = `
    <p>Move: A/D or left/right arrows</p>
    <p>Shoot: space bar</p>
    <p>Try to get as many points as you can by defeating enemies, but take care with them shooting back</p>    
    `;
    document.querySelector('#menu').appendChild(div);
  }
  removeInfo(){
    if(document.querySelector('#info-box'))document.querySelector('#info-box').remove();
  }
  renderStartMenu() {
    const html = `      
    <div><canvas id="spaceshipCustom"></canvas></div>
    <div><input type="text" id="playerName" placeholder="NAME"></div>
    <div id="ranges">
      <label>
        <input type="range" id="red"   oninput="menu.changeColor(event)" min="0" max="255" value="255">
        <span style="background-color:#F00">255</span>
      </label>
      <label>
        <input type="range" id="green" oninput="menu.changeColor(event)" min="0" max="255" value="255">
        <span style="background-color:#0F0">255</span>
      </label>
      <label>
        <input type="range" id="blue"  oninput="menu.changeColor(event)" min="0" max="255" value="255">
        <span style="background-color:#00F"> 255</span>
      </label>
    </div>
    <div><button id="startGame" onclick="menu.prestartGame()">Start Game</button></div>
    `;

    this.menuDiv.innerHTML = html;
    this.changeCanvasColor();
  }

  renderScore() {
    var scores;
    Api.getScores().then(data => scores = JSON.parse(data)).then(() => {
      scores.sort((a, b) => { return b.score - a.score });
      const html = `
      <div id="rankingHeader"><h4 id="ranking">RANKING</h2>
      <button id="back" onclick="menu.renderMainMenu()" >Back</button></div>
      <ul id="rankingList">
        ${scores.map((score, index) => this.renderListItem(score, index))}
      </ul>`
      this.menuDiv.innerHTML = html;
      scores.map(async (score, index) => {
        const c = document.querySelector('#listItem___' + index);
        const ctx = c.getContext("2d");
        c.width = spaceshipImage.width;
        c.height = spaceshipImage.height;

        const image = await images.paint(spaceshipImage, score.color)
        ctx.drawImage(
          image,
          0,
          0,
          c.width,
          c.height
        )
      })
    })
  }
  renderListItem(score, index) {
    const deleteButton = false;
    const html = `
    <li>
      <div style='display:none'>${score._id}</div>
      <div class='rank'>${index + 1}</div>
      <div><canvas id="listItem___${index}"></canvas></div>
      <div class="listName">${score.name}</div>
      <div class="listScore">${score.score}</div>
      ${deleteButton ? "<div><img class='delete' onclick='menu.deleteScore(this)' src='./assets/img/trash.svg'></img></div>" : ''} 
    </li>
    `
    return html;
  }
  deleteScore(event) {
    const id = event.parentNode.parentNode.querySelector('div:first-child').innerHTML;
    Api.deleteScore(id)
      .then(() => this.renderScore())
      .catch((err) => console.log('Error during Score deleting: ' + err));

  }
  changeColor(event) {
    const colorPos = { red: 0, green: 1, blue: 2 };
    const rgb = [0, 0, 0];
    const color = event.target.id;
    const colorValue = event.target.value;
    rgb[colorPos[color]] = colorValue;

    const span = event.target.parentNode.querySelector('span');
    span.innerHTML = colorValue;
    span.style.backgroundColor = 'rgb(' + rgb.join(',') + ')';
    this.changeCanvasColor()
  }

  changeCanvasColor() {
    const c = document.querySelector('#spaceshipCustom');
    c.width = spaceshipImage.width;
    c.height = spaceshipImage.height
    const ctx = c.getContext("2d");

    const rgb = [
      document.querySelector('#red').value,
      document.querySelector('#green').value,
      document.querySelector('#blue').value
    ];
    ctx.drawImage(
      images.array['Spaceship']['white'],
      0,
      0,
      c.width,
      c.height
    );
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'rgb(' + rgb.join(',') + ')';
    ctx.fillRect(0, 0, c.width, c.height);
  }

  prestartGame() {
    const name = document.querySelector('#playerName').value;
    if (!name) {
      alert('Insert Name');
      return;
    }

    const color = {
      r: document.querySelector('#red').value,
      g: document.querySelector('#green').value,
      b: document.querySelector('#blue').value
    }

    this.toggleMenu(false);
    window.game = new Game(name, color);
  }

  drawScoreImage(id, color) {
    const c = document.querySelector('#listItem___' + id);
    const scale = 0.3
    c.width = Math.floor(spaceshipImage.width * scale);
    c.height = Math.floor(spaceshipImage.height * scale)
    const ctx = c.getContext("2d");
    const rgb = Object.values(color)

    ctx.drawImage(
      images.array['Spaceship']['white'],
      0,
      0,
      c.width,
      c.height
    );
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'rgb(' + rgb.join(',') + ')';
    ctx.fillRect(0, 0, c.width, c.height);
  }
}
