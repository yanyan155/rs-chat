// https://learn.javascript.ru/websockets

const wsAPI = {
  init() {
    var Socket = new WebSocket(" ws://st-chat.shas.tel");

    Socket.onopen = function() {
      console.log("Соединение установлено.");
    };

    Socket.onclose = function(event) {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
      console.log('Код: ' + event.code + ' причина: ' + event.reason);
    };

    Socket.onmessage = function(event) {
      console.log("Получены данные " + event.data);
    };

    Socket.onerror = function(error) {
      console.log("Ошибка " + error.message);
    };
    
    return Socket;
  }
};

export default wsAPI;
