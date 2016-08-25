/**
 * hitcircle.js
 **/

//namespacing
this.osujs = this.osujs || {};

//HitCircle extends beat
osujs.HitCircle = (function () {

  var hitCircle = function (properties) {
    for (var p in properties) 
      this[p] = properties[p];

    this.initialize();
  };

  hitCircle.prototype = new osujs.Beat();
  hitCircle.prototype.beatInitialize = hitCircle.prototype.initialize;

  hitCircle.prototype.initialize = function () {
    this.beatInitialize();

    this.hitSplashX = this.x;
    this.hitSplashY = this.y;

    this.hitCircle = this.addChild(new this.HitCircle(this));

    this.comboText = this.addChild(new this.ComboText(this));

    this.approachCircle = this.addChild(new this.ApproachCircle(this));
  };

  hitCircle.prototype.beatEnd = hitCircle.prototype.end;
  hitCircle.prototype.end = function (score) {
    this.hitCircle.removeEventListener("mousedown", this);
    if (score) {
      this.playHitSound(this.hitSound);
    }
    this.beatEnd(score);
  };

  hitCircle.prototype.handleEvent = function (e) {
    switch (e.type) {
      case "tick":
        if (osujs.beatmap.getTime() - this.beginTime > 260) {
          this.end(0);
        }

        break;

      case "mousedown":
        var err = osujs.beatmap.getTime() - this.beginTime;
        var od = osujs.beatmap.Difficulty.OverallDifficulty;

        if (err < -260) 
          //FIXME: shake
          return;
        else if (Math.abs(err) <= 78-6*od)
          this.end(300);
        else if (Math.abs(err) <= 138-8*od)
          this.end(100);
        else if (Math.abs(err) <= 198-10*od)
          this.end(50);
        else if (Math.abs(err) <= 260)
          this.end(0);

        break;
    }
  };

  //i.e. make it clickable
  hitCircle.prototype.activate = function () {
    this.hitCircle.addEventListener("mousedown", this);
  };

  return hitCircle;
}());
