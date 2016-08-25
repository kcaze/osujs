/**
 * settings.js
 **/

//namespacing
this.osujs = this.osujs || {};

osujs.settings = (function () {
  var settings = {
    canvasId: "osujs_canvas",
    internalResolution : { width : 1024, height : 768 }
  };

  settings.width = parseInt(localStorage.getItem("settings.width"),10) || 640;
  settings.height = parseInt(localStorage.getItem("settings.height"),10) || 480;
  settings.offset = parseInt(localStorage.getItem("settings.offset"),10) || 0;
  settings.key_z = parseInt(localStorage.getItem("settings.key_z"),10) || 90;
  settings.key_x = parseInt(localStorage.getItem("settings.key_x"),10) || 88;

  //use this to set values so that updates get propagated and saved to localStorage
  settings.set = function (field, value) {
    switch (field) {
      case "width":
        this.width = value;
        osujs.stage.canvas.width = value;
        osujs.stage.scaleX = value/osujs.settings.internalResolution.width;
        break;

      case "height":
        this.height = value;
        osujs.stage.canvas.height = value;
        osujs.stage.scaleY = value/osujs.settings.internalResolution.height;
        break;

      default:
        this[field] = value;
        break;
    }
    localStorage.setItem("settings."+field, value);
  };

  return settings;
}());
