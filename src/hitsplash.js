/**
 * hitsplash.js
 **/

//namespacing
this.osujs = this.osujs || {};

osujs.HitSplash = (function () {
  var hitSplash = function (score, type) {
    this.score = score;
    this.type = type;
    this.initialize();
  };

  hitSplash.prototype = new createjs.Bitmap();
  hitSplash.prototype.bitmapInitialize = hitSplash.prototype.initialize;

  hitSplash.prototype.initialize = function () {
    this.bitmapInitialize();

    switch (this.score) {
      case 300:
        this.image = osujs.assets.get("img_hit300"+this.type);
        break;

      case 100:
        this.image = osujs.assets.get("img_hit100"+this.type);
        break;

      case 50:
        this.image = osujs.assets.get("img_hit50"+this.type);
        break;

      case 0:
        this.image = osujs.assets.get("img_hit0"+this.type);
        break;

      case "tick": //for slider ticks
        this.image = {width : 0, height: 0};
        break;
    }

    this.regX = this.image.width/2;
    this.regY = this.image.height/2;
    this.alpha = 0;

    createjs.Tween.get(this)
      .to({alpha:1}, 100, createjs.Ease.linear)
      .wait(100)
      .to({alpha:0}, 100, createjs.Ease.linear)
      .call(function() { osujs.beatmap.playArea.removeChild(this); }.bind(this));
  };

  return hitSplash;
}());
