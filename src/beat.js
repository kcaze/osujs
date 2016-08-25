/**
 * beat.js
 **/

//namespacing
this.osujs = this.osujs || {};

osujs.Beat = (function () {
  var beat = function () {};

  beat.prototype = new createjs.Container();
  beat.prototype.containerInit = beat.prototype.initialize;

  beat.prototype.initialize = function () {
    this.containerInit();
  };

  beat.prototype.fadeIn = function (t) {
    this.alpha = 0;
    createjs.Tween.get(this).to({alpha:1}, t, createjs.Ease.linear);
  };

  beat.prototype.fadeOut = function (t) {
    createjs.Tween.get(this).to({alpha:0}, t, createjs.Ease.quartOut)
    .call(function () { osujs.beatmap.playArea.removeChild(this); }.bind(this));
  };

  beat.prototype.begin = function () {
    createjs.Ticker.addEventListener("tick", this);
    this.fadeIn(225);
    this.approachCircle.begin();
  };

  beat.prototype.end = function (score) {
    this.handleEvent = function () {};

    if (this.comboNum == 1) {
      osujs.beatmap.hitSplashType = "g";
    }
    if (score == 100) {
      osujs.beatmap.hitSplashType = "k";
    }
    else if (score == 50 || score === 0) {
      osujs.beatmap.hitSplashType = "";
    }

    createjs.Ticker.removeEventListener("tick", this);

    this.dispatchEvent({ type : "score", score : score, combo : score === 0 ? 0 : 1, beat : this});
    var hitSplash = osujs.beatmap.playArea.addChild(new osujs.HitSplash(score, this.comboEnd ? osujs.beatmap.hitSplashType : ""));
    hitSplash.x = this.hitSplashX;
    hitSplash.y = this.hitSplashY;

    this.fadeOut(300);
  };

  beat.prototype.HitCircle = (function () {
    var hitCircle = function (args) {
      this.initialize();
      this.scaleX = this.scaleY = osujs.beatmap.Difficulty.CircleSize;

      var color = args.color;

      var img_hitcircle = osujs.assets.get("img_hitcircle");
      var img_hitcircleoverlay = osujs.assets.get("img_hitcircleoverlay");

      var hitCircleImage = this.addChild(new createjs.Bitmap(img_hitcircle));
      var hitCircleOverlay = this.addChild(new createjs.Bitmap(img_hitcircleoverlay));

      hitCircleImage.regX = img_hitcircle.width / 2;
      hitCircleImage.regY = img_hitcircle.height / 2;
      hitCircleImage.filters = [
        new createjs.ColorFilter(color[0]/255, color[1]/255, color[2]/255, 1, 0,0,0,0)
      ];
      hitCircleImage.cache(0, 0, img_hitcircle.width, img_hitcircle.height);

      hitCircleOverlay.regX = img_hitcircleoverlay.width/2;
      hitCircleOverlay.regY = img_hitcircleoverlay.height/2;
    };

    hitCircle.prototype = new createjs.Container();

    return hitCircle;
  }());

  beat.prototype.ApproachCircle = (function () {
    var initialScale = 4;
  
    var approachCircle = function (args) {
      var img_approachcircle = osujs.assets.get("img_approachcircle");

      this.initialize();

      this.color = args.color;
      this.circleSize = args.circleSize;
      this.beginTime = args.beginTime;

      this.image = img_approachcircle;
      this.regX = img_approachcircle.width/2;
      this.regY = img_approachcircle.height/2;
      this.filters = [
        new createjs.ColorFilter(this.color[0]/255, this.color[1]/255, this.color[2]/255, 1, 0,0,0,0)
      ];
      this.cache(0, 0, img_approachcircle.width, img_approachcircle.height);
    };

    approachCircle.prototype = new createjs.Bitmap();

    approachCircle.prototype.begin = function () {
      this.timeInterval = this.beginTime - osujs.beatmap.getTime();
      this.scaleX = this.scaleY = initialScale*this.circleSize;
      createjs.Tween.get(this).to({
        scaleX:this.circleSize, 
        scaleY:this.circleSize
      }, this.timeInterval, createjs.Ease.Linear).call(function () {
        this.visible = 0;
      }.bind(this));
    };

    return approachCircle;
  }());

  beat.prototype.ComboText = (function () {
    var comboText = function (hitObject) {
      this.initialize();
      var s = hitObject.comboNum.toString();
      var width = 0;
      var height = osujs.assets.get("img_default0").height;

      for (var ii = 0; ii < s.length; ii++) {
        var digit = new createjs.Bitmap(osujs.assets.get("img_default"+s[ii]));
        this.addChild(digit);
        digit.x = width;
        width += digit.image.width+1;
      }

      this.regX = width/2;
      this.regY = height/2;
      this.scaleX = this.scaleY = 0.75;
    };

    comboText.prototype = new createjs.Container();

    return comboText;
  }());

  beat.prototype.playHitSound = function (hitSound) {
    if (hitSound === 0) {
      createjs.Sound.play("aud_"+osujs.beatmap.General.SampleSet+"-hitnormal");//, createjs.Sound.INTERRUPT_ANY);
    }
    else {
      if (hitSound & 2) {
        createjs.Sound.play("aud_"+osujs.beatmap.General.SampleSet+"-hitwhistle");//, createjs.Sound.INTERRUPT_ANY);
      }
      if (hitSound & 4) {
        createjs.Sound.play("aud_"+osujs.beatmap.General.SampleSet+"-hitfinish");//, createjs.Sound.INTERRUPT_ANY);
      }
      if (hitSound & 8) {
        createjs.Sound.play("aud_"+osujs.beatmap.General.SampleSet+"-hitclap");//, createjs.Sound.INTERRUPT_ANY);
      }
    }
  };

  return beat;
}());
