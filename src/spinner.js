/**
 * spinner.js
 **/

//namespacing
this.osujs = this.osujs || {};

osujs.Spinner = (function () {
  //in degrees (returns angle in range [0,360)
  function angle(p) {
    var a = 0;
    if (p.x === 0)
      a = p.y > 0 ? 90 : 270;
    else 
      a = 360*Math.atan(p.y/p.x)/(2*Math.PI) + (p.x > 0 ? 0 : 180);
    return a > 0 ? a % 360 : (a === 0 ? a : (a % 360) + 360 );
  }

  var spinner = function (properties) {
    for (var p in properties) 
      this[p] = properties[p];

    this.initialize();
  };

  spinner.prototype = new osujs.Beat();
  spinner.prototype.beatInitialize = spinner.prototype.initialize;

  spinner.prototype.initialize = function () {
    this.beatInitialize();

    this.hitSplashX = this.x;
    this.hitSplashY = this.y;
    this.length = this.endTime - this.beginTime;

    var img_spinnertop = osujs.assets.get("img_spinnertop");
    var img_spinnermiddle = osujs.assets.get("img_spinnermiddle");
    var img_spinnerbottom = osujs.assets.get("img_spinnerbottom");
    var img_spinnerclear = osujs.assets.get("img_spinnerclear");

    this.spinnerbg = this.addChild(new createjs.Shape());
    this.spinnerbottom = this.addChild(new createjs.Bitmap(img_spinnerbottom));
    this.spinnermiddle = this.addChild(new createjs.Bitmap(img_spinnermiddle));
    this.spinnertop = this.addChild(new createjs.Bitmap(img_spinnertop));
    this.spinnerclear = this.addChild(new createjs.Bitmap(img_spinnerclear));

    this.spinnerbg.graphics.f("rgb(0,0,0)").r(0,0,1024,768);
    this.spinnerbg.regX = 1024/2;
    this.spinnerbg.regY = 768/2;
    this.spinnertop.regX = img_spinnertop.width/2;
    this.spinnertop.regY = img_spinnertop.height/2;
    this.spinnermiddle.regX = img_spinnermiddle.width/2;
    this.spinnermiddle.regY = img_spinnermiddle.height/2;
    this.spinnerbottom.regX = img_spinnerbottom.width/2;
    this.spinnerbottom.regY = img_spinnerbottom.height/2;
    this.spinnerclear.regX = img_spinnerclear.width/2;
    this.spinnerclear.regY = img_spinnerclear.height/2;
    this.spinnerclear.visible = 0;

    this.prevTime = 0;
    this.prevX = 0;
    this.prevY = 0;
    this.prevAngle = 0;
    this.cumAngle = 0;
    this.angle = 0;
    this.speed = 0;

    //FIXME: what should these be?
    this.maxSpeed = 50;
    this.speedScale = 0.05;
    this.friction = 0.7;
  };

  spinner.prototype.begin = function () {
    this.fadeIn(100);
  };

  spinner.prototype.activate = function () {
    createjs.Ticker.addEventListener("tick", this);
  };

  spinner.prototype.handleEvent = function (e) {
    switch (e.type) {
      case "tick":
        this.angle = angle({x:osujs.stage.mx - this.x, y:osujs.stage.my - this.y});

        if (osujs.stage.mousedown) {
          var acc = this.angle - this.prevAngle;
          if (acc < -180) acc += 360;
          if (acc > 180) acc += -360;
          this.speed += acc/4;

          if (Math.abs(this.speed) == this.maxSpeed) 
            console.log("TAICHOU, GENKAI DA!!!");
        }

        this.speed *= this.friction;

        this.prevAngle = this.angle;

        this.spinnertop.rotation += this.speed*e.delta*this.speedScale;
        this.cumAngle += Math.abs(this.speed*e.delta*this.speedScale);

        if (this.cumAngle/360 > this.length/600) 
          this.spinnerclear.visible = 1;

        if (osujs.beatmap.getTime() > this.endTime) {
          var spins = this.cumAngle/360;
          if (spins > this.length / 600)
            this.end(300);
          else if (spins > this.length / 800)
            this.end(100);
          else if (spins > this.length / 1200)
            this.end(50);
          else
            this.end(0);
        }
        break;
    }
  };

  return spinner;
}());
