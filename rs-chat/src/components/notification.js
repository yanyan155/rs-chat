const notifyMe = (message) => {
  let string = `User ${message.from} send message: ${message.message}`;
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  else if (Notification.permission === "granted") {
    var notification = new Notification(string);
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted" 
          && typeof localStorage.getItem('name') === 'string') {
        var notification = new Notification(string);
      }
    });
  }
}

export default notifyMe;