class Api {
  static postScore(player) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/score');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(player));
  }

  static async getScores(name) {
    var url = name ? '/score/' + name : '/score';
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
  }
  static deleteScore(id) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('DELETE', '/score/id:' + id);
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
  }

  static updateScore(id, player) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', '/score/id:' + id);
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      };
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(player));
    });

  }
  static postOrUpdateScore(player) {
    const name = player.name;
    var found;
    Api.getScores(name).then(data => {
      found = data?JSON.parse(data):false;
      if(found){
        if(player.score > found.score) Api.updateScore(found['_id'] ,player)
        return;
      }
        Api.postScore(player);  
    });
      
  }
}