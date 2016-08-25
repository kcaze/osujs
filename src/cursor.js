/**
 * cursor.js
 **/

//namespacing
this.osujs = this.osujs || {};

osujs.Cursor = (function () {
  var cursor = function () {
    this.initialize();
  };

  cursor.prototype = new createjs.Container();
  cursor.prototype.containerInitialize = cursor.prototype.initialize;

  cursor.prototype.initialize = function () {
    this.containerInitialize();
    createjs.Ticker.addEventListener("tick", this);
    osujs.stage.addEventListener("stagemousedown", this);
    osujs.stage.addEventListener("stagemouseup", this);

    osujs.stage.canvas.style.cursor = 'none';

    var img_cursor = osujs.assets.get("img_cursor");
    var img_cursormiddle = osujs.assets.get("img_cursormiddle");

    this.cursormiddle = this.addChild(new createjs.Bitmap(img_cursormiddle));
    this.cursormiddle.regX = img_cursormiddle.width/2;
    this.cursormiddle.regY = img_cursormiddle.height/2;

    this.cursor = this.addChild(new createjs.Bitmap(img_cursor));
    this.cursor.regX = img_cursor.width/2;
    this.cursor.regY = img_cursor.height/2;
  };

  cursor.prototype.handleEvent = function (e) {
    switch (e.type) {
      case "tick":
        this.x = osujs.stage.mx;
        this.y = osujs.stage.my;

        this.cursor.rotation += 0.5;
        this.cursor.rotation %= 360;

        osujs.stage.setChildIndex(this, osujs.stage.getNumChildren() - 1);
        break;
      case "stagemousedown":
        createjs.Tween.get(this.cursor).to({
          scaleX : 1.25,
          scaleY : 1.25
        }, 35, createjs.Ease.linear).ignoreGlobalPause = true;
        break;
      case "stagemouseup":
        createjs.Tween.get(this.cursor).to({
          scaleX : 1,
          scaleY : 1
        }, 35, createjs.Ease.linear).ignoreGlobalPause = true;
        break;
    }
  };

  return cursor;
}());
