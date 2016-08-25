/**
 * keys.js
 **/

this.KEYS = (function () {
  var keys = [];
  var ii;

  keys.keyCode = {
    ESC : 27
  };

  for (ii = 0; ii < 256; ii++) {
    keys[ii] = 0;
  }
  keys.callbacks = [];

  document.addEventListener("keydown", function (e) {
    e = e || window.event;
    //console.log(e.keyCode);

    //not a standard key
    if (e.keyCode >= keys.length || e.keyCode < 0) {
      return;
    }

    if (keys[e.keyCode] === 0) {
      keys[e.keyCode] = 1;
      for (ii = 0; ii < keys.callbacks.length; ii++) {
        keys.callbacks[ii]({type : "keydown", keyCode : e.keyCode});
      }
    }
  });

  document.addEventListener("keyup", function (e) {
    e = e || window.event;

    //not a standard key
    if (e.keyCode >= keys.length || e.keyCode < 0) {
      return;
    }

    if (keys[e.keyCode] === 1) {
      keys[e.keyCode] = 0;
      for (ii = 0; ii < keys.callbacks.length; ii++) {
        keys.callbacks[ii]({type : "keyup", keyCode : e.keyCode});
      }
    }
  });

  keys.addEventListener = function (f) {
    keys.callbacks.push(f);
  };

  //NOTE: assumes f exists only once in the callbacks array
  keys.removeEventListener = function (f) {
    for (var ii = 0; ii < keys.callbacks.length; ii++) {
      if (keys.callbacks[ii] === f) {
        keys.callbacks.splice(ii, 1);
        return;
      }
    }
  };

  return keys;
}());
