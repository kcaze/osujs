/**
 * initialize.js
 **/

//namespacing
this.osujs = this.osujs || {};

osujs.initialize = function () {
  console.log(osujs.settings);

  createjs.Ticker.setFPS(120);
  createjs.Ticker.useRAF = 1;

  osujs.internalResolution = { width : 1024, height : 768 };

  osujs.stage = new createjs.Stage(osujs.settings.canvasId);
  osujs.stage.canvas.width = osujs.settings.width;
  osujs.stage.canvas.height = osujs.settings.height;
  osujs.stage.scaleX = osujs.settings.width/osujs.settings.internalResolution.width;
  osujs.stage.scaleY = osujs.settings.height/osujs.settings.internalResolution.height;

  createjs.Ticker.addEventListener("tick", osujs.stage);
  osujs.stage.addEventListener("stagemousedown", osujs.stage);
  osujs.stage.addEventListener("stagemouseup", osujs.stage);

  osujs.stage.handleEvent = function (e) {
    switch (e.type) {
      case "tick":
        this.mx = this.mouseX / this.scaleX;
        this.my = this.mouseY / this.scaleY;
        this.update();
        break;

      case "stagemousedown":
        this.mousedown = 1;
        break;

      case "stagemouseup":
        this.mousedown = 0;
        break;
    }
  };

  //set up handlers for alternative clicking methods
  //rightclick
  osujs.stage.canvas.oncontextmenu = function () {
    event.preventDefault();
    return false;
  };
  //x and z keys
  KEYS.addEventListener(function (e) {
    var mouseEvent;

    if (e.keyCode != osujs.settings.key_z && e.keyCode != osujs.settings.key_x) return;
    if (!osujs.stage.mouseInBounds) return;

    switch (e.type) {
      case "keydown":
        //hacky way to fire a mouse event
        mouseEvent = new createjs.MouseEvent("stagemousedown", osujs.stage.mouseX, osujs.stage.mouseY);
        osujs.stage._handlePointerDown(-1, mouseEvent);
        break;
      case "keyup":
        mouseEvent = new createjs.MouseEvent("stagemouseup", osujs.stage.mouseX, osujs.stage.mouseY);
        osujs.stage._handlePointerUp(-1, mouseEvent);
        break;
    }
  });

  fps = new createjs.Text("0", "24px ABeeZee,Arial");
  fps.y = 740;
  fps.x = 986;
  createjs.Ticker.addEventListener("tick", fps);
  fps.handleEvent = function () {
    this.text = Math.round(createjs.Ticker.getMeasuredFPS());
  };

  osujs.stage.addChild(new osujs.Loader()).attachQueue(osujs.assets);
  osujs.assets.addEventListener("complete", function () {
    osujs.stage.removeAllChildren();
    osujs.cursor = osujs.stage.addChild(new osujs.Cursor());
    osujs.stage.addChild(fps);
    osujs.stage.addChild(new osujs.menu.Logo());
  });
  osujs.assets.beginLoad();
};
