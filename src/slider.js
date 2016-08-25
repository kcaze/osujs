/**
 * slider.js
 **/

//namespacing
this.osujs = this.osujs || {};

osujs.Slider = (function () {

  var slider = function (properties) {
    for (var p in properties) 
      this[p] = properties[p];

    this.initialize();
  };

  slider.prototype = new osujs.Beat();
  slider.prototype.beatInitialize = slider.prototype.initialize;

  slider.prototype.initialize = function (properties) {
    this.beatInitialize();

    this.beatLength = osujs.beatmap.TimingPoints.getPoint(this.beginTime).beatLength;
    this.speed = 160*osujs.beatmap.Difficulty.SliderMultiplier/this.beatLength;
    this.totalTime = this.length/this.speed;
    this.repeated = 0;
    this.ticksHit = 0; 
    this.initialHit = 0;

    this.createBody();
    this.createTicks();

    this.tail = this.addChild(new this.HitCircle(this));
    this.tail.x = this.curve.points[this.curve.points.length-1].x;
    this.tail.y = this.curve.points[this.curve.points.length-1].y;

    this.head = this.addChild(new this.HitCircle(this));

    this.headArrow = this.addChild(new this.ReverseArrow(this, 0));
    this.tailArrow = this.addChild(new this.ReverseArrow(this, 1));
    if (this.repeats > 1) this.tailArrow.visible = 1;

    this.comboText = this.addChild(new this.ComboText(this));
    this.ball = this.addChild(new this.Ball(this));
    this.approachCircle = this.addChild(new this.ApproachCircle(this));

    this.hitSplashX = this.x + (this.repeats % 2 ? this.tail.x : this.head.x);
    this.hitSplashY = this.y + (this.repeats % 2 ? this.tail.y : this.head.y);
  };

  slider.prototype.handleEvent = function (e) {
    switch (e.type) {
      case "tick":
        var t = osujs.beatmap.getTime() - this.beginTime;

        if (t < 0) return;

        if (!this.initialHit && t > 138-8*osujs.beatmap.Difficulty.OverallDifficulty) {
          osujs.beatmap.dispatchEvent({ type : "score", 
            score : 0, 
            combo : 0,
            beat : this
          });
          this.initialHit = 1;
        }

        if (this.repeated === 0) this.start();

        if (t >= this.totalTime) {
          if (this.repeats !== this.repeated) this.repeat();
          else this.end(300);
        }
        else {
          this.update(t);
        }

        break;

      case "mousedown":
        var err = osujs.beatmap.getTime() - this.beginTime;

        if (err < -260)
          return;

        if (Math.abs(err) <= 138-8*osujs.beatmap.Difficulty.OverallDifficulty) {
          this.ticksHit += 1;
          this.playHitSound(this.hitSound);
          osujs.beatmap.dispatchEvent({ type : "score", 
            score : 0, 
            combo : 1,
            beat : this
          });
        }
        else {
          osujs.beatmap.dispatchEvent({ type : "score", 
            score : 0, 
            combo : 0,
            beat : this
          });
        }

        this.initialHit = 1;
        this.comboText.visible = 0;
        this.head.removeEventListener("mousedown", this);
        break;
    }
  };

  slider.prototype.start = function () {
    this.comboText.visible = 0;
    this.ball.visible = 1;
    for (var ii = 0; ii < this.ticks.length; ii++) {
      this.ticks[ii].visible = 1;
    }
    this.repeated = 1;
  };

  slider.prototype.update = function (t) {
    var T = this.repeated % 2 ? t : this.totalTime - t;
    this.ball.update(T*this.speed);

    for (var ii = 0; ii < this.ticks.length; ii++) {
      if (t > this.ticks[ii].t && this.ticks[ii].visible) {
        if (this.ball.clicked) {
          this.ticksHit += 1;
          osujs.beatmap.dispatchEvent({ type : "score", 
            score : 0, 
            combo : 1,
            beat : this
          });
        }
        else {
          this.ball.sliderfollowcircle.visible = 0;
          osujs.beatmap.dispatchEvent({ type : "score", 
            score : 0, 
            combo : 0,
            beat : this
          });
        }
        this.ticks[ii].visible = 0;
      }
    }
  };

  slider.prototype.repeat = function () {
    this.beginTime += this.totalTime;

    //reset ticks
    for (var ii = 0; ii < this.ticks.length; ii++) {
      this.ticks[ii].visible = 1;
      this.ticks[ii].t = this.totalTime - this.ticks[ii].t;
    }

    var hitSound = this.hitSounds ? this.hitSounds.splice(0, 1)[0] : this.hitSound;
    if (this.ball.clicked) {
      this.playHitSound(hitSound);
      this.ticksHit += 1;
      osujs.beatmap.dispatchEvent({ type : "score", 
        score : 0, 
        combo : 1,
        beat : this
      });
    }

    if (this.repeats - this.repeated >= 2) 
      this.headArrow.visible = this.tailArrow.visible = 1;
    else {
      if (this.repeated % 2) this.tailArrow.visible = 0;
      else this.headArrow.visible = 0;
    }

    this.repeated += 1;
  };

  slider.prototype.end = (function () {
    slider.prototype.beatEnd = slider.prototype.end;
    return function end () {
      this.removeChild(this.ball);

      var totalTicks = 1+this.repeats*(this.ticks.length+1);

      var hitSound = this.hitSounds ? this.hitSounds.splice(0, 1)[0] : this.hitSound;
      if (this.ball.clicked) {
        this.playHitSound(hitSound);
        this.ticksHit += 1;
      }

      if (this.ticksHit == totalTicks)
        this.beatEnd(300);
      else if (this.ticksHit >= totalTicks/2)
        this.beatEnd(100);
      else if (this.ticksHit)
        this.beatEnd(50);
      else
        this.beatEnd(0);
    };
  }());

  slider.prototype.createBody = function () {
    var body = new createjs.Shape();
    var width = osujs.beatmap.Difficulty.CircleSize * osujs.assets.get("img_hitcircle").width;
    var p = this.curve.points;
    var length = this.length;
    var sliderBorder = osujs.beatmap.Color.SliderBorder;

    function strokeBezier(percentWidth, color) {
      body.graphics.mt(p[0].x, p[0].y).ss(percentWidth*width,0,1).s(color);
      for (var ii = 0; ii < p.length; ii++) body.graphics.lt(p[ii].x, p[ii].y);
    }

    strokeBezier(0.9, "rgb(150, 150, 150)");
    strokeBezier(0.88, "rgb("+sliderBorder[0]+","+sliderBorder[1]+","+sliderBorder[2]+")");
    strokeBezier(0.77, "rgb(150, 150, 150)");
    strokeBezier(0.75, "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")");

    var bb = this.curve.boundingBox();
    //bounding rectangle is bounding rectangle of curve +/- width/2
    body.cache(bb.left-width/2, bb.up-width/2, bb.right - bb.left + width, bb.down - bb.up + width); 

    this.body = this.addChild(body);
  };

  slider.prototype.createTicks = function () {
    var interval = this.beatLength*this.speed/osujs.beatmap.Difficulty.SliderTickRate;

    var Tick = function (slider, t) {
      this.initialize();

      var img_sliderscorepoint = osujs.assets.get("img_sliderscorepoint");
      var p = slider.curve.pointAt(t*slider.speed);

      this.image = img_sliderscorepoint;
      this.regX = img_sliderscorepoint.width/2;
      this.regY = img_sliderscorepoint.height/2;
      this.x = p.x;
      this.y = p.y;
      this.t = t;
      this.visible = 0;
    };

    Tick.prototype = new createjs.Bitmap();

    this.ticks = [];
    for (var ii = 1; ii*interval < this.length; ii++) {
      this.ticks.push(this.addChild(new Tick(this, ii*interval/this.speed)));
    }
  };

  slider.prototype.ReverseArrow = (function () {
    var arrow = function (slider, isEnd) {
      this.slider = slider;
      this.initialize(isEnd);
    };

    arrow.prototype = new createjs.Bitmap();
    arrow.prototype.bitmapInitialize = arrow.prototype.initialize;

    arrow.prototype.initialize = function (isEnd) {
      var img_reversearrow = osujs.assets.get("img_reversearrow");

      this.image = img_reversearrow;
      this.regX = img_reversearrow.width/2;
      this.regY = img_reversearrow.height/2;
      this.x = isEnd ? this.slider.tail.x : this.slider.head.x;
      this.y = isEnd ? this.slider.tail.y : this.slider.head.y;
      this.rotation = this.slider.curve.angleAt(isEnd ? this.slider.length : 0) + (isEnd ? 180 : 0);
      this.visible = 0;

      //black arrow on certain sliders
      if (this.slider.color[0]+this.slider.color[1]+this.slider.color[2] >= 255*2) {
        this.filters = [
          new createjs.ColorFilter(0.1,0.1,0.1,1,0,0,0,0)
        ];
        this.cache(0, 0, img_reversearrow.width*2, img_reversearrow.height*2);
      }
    };

    return arrow;
  }());

  slider.prototype.Ball = (function () {
    var ball = function (slider) {
      this.slider = slider;
      this.initialize();
    };

    ball.prototype = new createjs.Container();
    ball.prototype.containerInitialize = ball.prototype.initialize;

    ball.prototype.initialize = function () {
      this.containerInitialize();

      var img_sliderb = osujs.assets.get("img_sliderb0");
      var img_sliderfollowcircle = osujs.assets.get("img_sliderfollowcircle");

      //slide left or right
      this.reverse = this.slider.curve.tangentAt(0).x >= 0 ? 0 : 1;

      //FIXME: animations should be accessed through .get as well I think
      this.sliderb = this.addChild(new createjs.BitmapAnimation(osujs.assets.sliderb));
      this.sliderb.regX = img_sliderb.width/2;
      this.sliderb.regY = img_sliderb.height/2;
      if (this.reverse)
        this.sliderb.gotoAndPlay("reverseSlide");
      else
        this.sliderb.gotoAndPlay("slide");
  
      this.sliderfollowcircle = this.addChild(new createjs.Bitmap(img_sliderfollowcircle));
      this.sliderfollowcircle.regX = img_sliderfollowcircle.width/2;
      this.sliderfollowcircle.regY = img_sliderfollowcircle.height/2;
      this.sliderfollowcircle.visible = 0;

      this.radius = img_sliderfollowcircle.width/2;
      this.scaleX = this.scaleY = osujs.beatmap.Difficulty.CircleSize;

      this.clicked = 0;
      this.visible = 0;
    };

    ball.prototype.update = function (length) {
      var p = this.slider.curve.pointAt(length);
      
      //update position
      this.x = p.x;
      this.y = p.y;
      this.sliderb.rotation = this.slider.curve.angleAt(length) + (this.reverse ? 180 : 0);

      var dx = this.x+this.slider.x+osujs.beatmap.playArea.x - osujs.stage.mx;
      var dy = this.y+this.slider.y+osujs.beatmap.playArea.y - osujs.stage.my;

      if (osujs.stage.mousedown && Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) <= this.radius) {
        this.sliderfollowcircle.visible = 1;
        this.clicked = 1;
      }
      else { 
        this.clicked = 0;
      }
    };

    return ball;
  }());

  //i.e. make it clickable
  slider.prototype.activate = function () {
    this.head.addEventListener("mousedown", this);
  };

  return slider;
}());
