/**
 * assets.js
 **/

//namespacing
this.osujs = this.osujs || {};

osujs.assets = (function () {
  var assets = new createjs.LoadQueue(true);
  assets.installPlugin(createjs.Sound);
  assets.get = assets.getResult;
  assets.beginLoad = function () {
    assets.addEventListener("complete", function () {
      assets.sliderb = new createjs.SpriteSheet({
        images : [assets.get("img_sliderb0"), assets.get("img_sliderb1"),
            assets.get("img_sliderb2"), assets.get("img_sliderb3"),
            assets.get("img_sliderb4"), assets.get("img_sliderb5"),
            assets.get("img_sliderb6"), assets.get("img_sliderb7"),
            assets.get("img_sliderb8"), assets.get("img_sliderb9")],
        frames : { width : assets.get("img_sliderb0").width, height : assets.get("img_sliderb0").height },
        animations : { 
          slide : [0, 9],
          reverseSlide : { frames : [9,8,7,6,5,4,3,2,1,0] }
        }
      });
    });

    assets.loadManifest([
      { id : "aud_Normal-hitclap", src : "assets/skin/normal-hitclap.mp3" },
      { id : "aud_Normal-hitfinish", src : "assets/skin/normal-hitfinish.mp3" },
      { id : "aud_Normal-hitnormal", src : "assets/skin/normal-hitnormal.mp3" },
      { id : "aud_Normal-hitwhistle", src : "assets/skin/normal-hitwhistle.mp3" },
      { id : "aud_Soft-hitclap", src : "assets/skin/soft-hitclap.mp3" },
      { id : "aud_Soft-hitfinish", src : "assets/skin/soft-hitfinish.mp3" },
      { id : "aud_Soft-hitnormal", src : "assets/skin/soft-hitnormal.mp3" },
      { id : "aud_Soft-hitwhistle", src : "assets/skin/soft-hitwhistle.mp3" },

      { id : "img_approachcircle", src : "assets/skin/approachcircle.png" },
      { id : "img_cursor", src : "assets/skin/cursor.png" },
      { id : "img_cursormiddle", src : "assets/skin/cursormiddle.png" },
      { id : "img_default0", src : "assets/skin/default-0.png" },
      { id : "img_default1", src : "assets/skin/default-1.png" },
      { id : "img_default2", src : "assets/skin/default-2.png" },
      { id : "img_default3", src : "assets/skin/default-3.png" },
      { id : "img_default4", src : "assets/skin/default-4.png" },
      { id : "img_default5", src : "assets/skin/default-5.png" },
      { id : "img_default6", src : "assets/skin/default-6.png" },
      { id : "img_default7", src : "assets/skin/default-7.png" },
      { id : "img_default8", src : "assets/skin/default-8.png" },
      { id : "img_default9", src : "assets/skin/default-9.png" },
      { id : "img_hit0", src : "assets/skin/hit0.png" },
      { id : "img_hit100", src : "assets/skin/hit100.png" },
      { id : "img_hit100k", src : "assets/skin/hit100k.png" },
      { id : "img_hit300", src : "assets/skin/hit300.png" },
      { id : "img_hit300g", src : "assets/skin/hit300g.png" },
      { id : "img_hit300k", src : "assets/skin/hit300k.png" },
      { id : "img_hit50", src : "assets/skin/hit50.png" },
      { id : "img_hitcircle", src : "assets/skin/hitcircle.png" },
      { id : "img_hitcircleoverlay", src : "assets/skin/hitcircleoverlay.png" },
      { id : "img_logo", src : "assets/skin/logo.png" },
      { id : "img_score0", src : "assets/skin/score-0.png" },
      { id : "img_score1", src : "assets/skin/score-1.png" },
      { id : "img_score2", src : "assets/skin/score-2.png" },
      { id : "img_score3", src : "assets/skin/score-3.png" },
      { id : "img_score4", src : "assets/skin/score-4.png" },
      { id : "img_score5", src : "assets/skin/score-5.png" },
      { id : "img_score6", src : "assets/skin/score-6.png" },
      { id : "img_score7", src : "assets/skin/score-7.png" },
      { id : "img_score8", src : "assets/skin/score-8.png" },
      { id : "img_score9", src : "assets/skin/score-9.png" },
      { id : "img_scorex", src : "assets/skin/score-x.png" },
      { id : "img_sliderb0", src : "assets/skin/sliderb0.png" },
      { id : "img_sliderb1", src : "assets/skin/sliderb1.png" },
      { id : "img_sliderb2", src : "assets/skin/sliderb2.png" },
      { id : "img_sliderb3", src : "assets/skin/sliderb3.png" },
      { id : "img_sliderb4", src : "assets/skin/sliderb4.png" },
      { id : "img_sliderb5", src : "assets/skin/sliderb5.png" },
      { id : "img_sliderb6", src : "assets/skin/sliderb6.png" },
      { id : "img_sliderb7", src : "assets/skin/sliderb7.png" },
      { id : "img_sliderb8", src : "assets/skin/sliderb8.png" },
      { id : "img_sliderb9", src : "assets/skin/sliderb9.png" },
      { id : "img_sliderfollowcircle", src : "assets/skin/sliderfollowcircle.png" },
      { id : "img_sliderscorepoint", src : "assets/skin/sliderscorepoint.png" },
      { id : "img_spinnerbottom", src : "assets/skin/spinner-bottom.png" },
      { id : "img_spinnerclear", src : "assets/skin/spinner-clear.png" },
      { id : "img_spinnermiddle", src : "assets/skin/spinner-middle.png" },
      { id : "img_spinnertop", src : "assets/skin/spinner-top.png" },
      { id : "img_reversearrow", src : "assets/skin/reversearrow.png" }
    ]);
  };

  return assets;
}());
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
/**
 * beatmap.js
 **/

//namespacing
this.osujs = this.osujs || {};

osujs.Beatmap = (function () {

  var beatmap = function (map) {
    this.initialize();

    this.osu = map.osu;
    this.music = map.music;

    osujs.beatmap = this;

    this.isMusicReady = 0;
    this.isOsuReady = 0;
    this.ready = 0;
    this.paused = 0;

    this.score = new osujs.Score(this);

    this.playArea = new createjs.Container();
    //hardcoded offset for play area
    this.playArea.x = 102; 
    this.playArea.y = 77;

    this.pauseScreen = new osujs.menu.Pause();
    this.pauseScreen.alpha = 0;
  };

  beatmap.prototype = new createjs.Container();

  beatmap.prototype.load = function () {
    this.loader = this.addChild(new osujs.Loader());

    var queue = new createjs.LoadQueue();

    queue.addEventListener("fileload", function (e) {
      this.osu = e.result;

      var data = osujs.parseOsu(this.osu);

      for (var p in data) 
        this[p] = data[p];

      this.isAssetsReady = 1;

      console.log("osu loaded");
      if (this.isMusicReady) {
        this.ready = 1;
        this.dispatchEvent({ type : "beatmapload" });
        this.removeChild(this.loader);
      }
    }.bind(this));

    createjs.Sound.addEventListener("fileload", function (e) {
      if (e.src == this.music) {
        this.music = createjs.Sound.createInstance(this.music);
  
        console.log("music loaded");
        this.isMusicReady = 1;
        if (this.isAssetsReady) {
          this.ready = 1;
          this.dispatchEvent({ type : "beatmapload" });
          this.removeChild(this.loader);
        }
      }
    }.bind(this));

    queue.loadFile({ id : "osu", src : this.osu, type : createjs.LoadQueue.TEXT });
    createjs.Sound.registerSound(this.music);
    console.log("Began loading");
  };

  beatmap.prototype.play = function () {
    console.log("beatmap played");
    this.makeHitObjects();

    //set up events
    this.addEventListener("score", this.score);
    createjs.Ticker.addEventListener("tick", this);
    KEYS.addEventListener(this.handleEvent.bind(this));
    this.music.addEventListener("failed", this);
    this.music.addEventListener("succeeded", this);

    //add children
    this.addChild(this.score);
    this.addChild(this.playArea);

    //and.... begin!
    this.music.play();

    /*/for testing
    this.time = this.addChild(new createjs.Text("Hello", "48px Arial"));
    this.time.x = 600;
    this.time.handleEvent = function (e) {
      this.text = osujs.beatmap.music.getPosition();
    };
    createjs.Ticker.addEventListener("tick", this.time);
    //*/
  };

  beatmap.prototype.stop = function () {
    this.music.stop();
    this.removeAllChildren();
    createjs.Ticker.removeEventListener("tick", this);
    KEYS.removeEventListener(this.handleEvent.bind(this));
  };

  beatmap.prototype.pause = function () {
    this.removeChild(this.playArea);
    this.addChild(this.pauseScreen);

    this.paused = 1;
    createjs.Ticker.setPaused(true);
    this.music.pause();

    createjs.Tween.get(this.pauseScreen).to({alpha:1}, 100, createjs.Ease.linear)
    .ignoreGlobalPause = true;
  };

  beatmap.prototype.resume = function () {
    this.paused = 0;
    this.addChild(this.playArea);

    createjs.Tween.get(this.pauseScreen).to({alpha:0}, 100, createjs.Ease.linear)
    .call(function () {
      this.removeChild(this.pauseScreen);
      createjs.Ticker.setPaused(false);
      this.music.resume();
    }.bind(this))
    .ignoreGlobalPause = true;
  };

  beatmap.prototype.end = function () {
    this.stop();
    createjs.Sound.removeSound(this.music);
  };

  beatmap.prototype.handleEvent = function (e) {
    switch (e.type) {
      case "tick":
        t = this.getTime();

        if (this.currHit < this.hitObjects.length&& t > this.hitObjects[this.currHit].approachTime) {
          var hitObject = this.hitObjects[this.currHit++];
          hitObject.addEventListener("score", this);
          hitObject.begin();
          this.playArea.addChildAt(hitObject, 0);
        }

        if (this.currHit >= this.hitObjects.length && this.playArea.children.length === 0) {
          this.end();
          setTimeout(function () {
            this.dispatchEvent({ type : "end" });
          }.bind(this), 500);
        }
        break;

      case "score":
        this.score.handleEvent(e);

        //make next hitobject active
        this.currActive++;
        if (this.currActive < this.hitObjects.length)
          this.hitObjects[this.currActive].activate();
        break;

      case "failed":
        this.addChild(new createjs.Text("Music playback failed.", "36px Arial"));
        console.log("Music playback failed");
        break;

      case "succeeded":
        this.startTime = createjs.Ticker.getTime();
        break;

      case "keydown":
        if (e.keyCode == KEYS.keyCode.ESC) {
          if (this.paused) this.resume();
          else this.pause();
        }
        break;
    }
  };

  beatmap.prototype.makeHitObjects = function () {
    var extra = { colorNum : 0, comboNum : 0, comboEnd : 0 };

    this.hitObjects = [];
    this.currHit = 0;
    this.currActive = 0;

    //give each hitObject its necessary extra data
    for (var ii = 0; ii < this.HitObjects.length; ii++) {
      var hitObject = this.HitObjects[ii];
      extra.circleSize = this.Difficulty.CircleSize;
      if (hitObject.type == osujs.Spinner)
        extra.approachTime = hitObject.beginTime-100;
      else
        extra.approachTime = hitObject.beginTime - (2000 - this.Difficulty.ApproachRate*150);
      extra.colorNum = (extra.colorNum + hitObject.combo) % this.Color.length;
      extra.color = this.Color[extra.colorNum];
      extra.comboNum = hitObject.combo ? 1 : ++extra.comboNum;
      extra.comboEnd = !this.HitObjects[ii+1] || this.HitObjects[ii+1].combo ? 1 : 0;

      for (var p in extra) hitObject[p] = extra[p];

      this.hitObjects.push(new hitObject.type(hitObject));
    }

    //make first hitcircle clickable
    this.hitObjects[0].activate();
  };

  beatmap.prototype.getTime = function () {
    return createjs.Ticker.getTime(true) - this.startTime + osujs.settings.offset;
  };

  return beatmap;
}());
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
/**
 * initialize.js
 **/

//namespacing
this.osujs = this.osujs || {};

osujs.initialize = function () {
  console.log(osujs.settings);

  createjs.Ticker.setFPS(60);
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
/**
 * loader.js
 **/

//namespacing
this.osujs = this.osujs || {};

// a Loader object can be attached to a LoadQueue object to display the progress 
osujs.Loader = (function () {
  var loader = function () {
    this.initialize();

    var radius = 150;
    var thickness = 32;
    var color = "rgb(255, 200, 200)";

    this.shape = this.addChild(new createjs.Shape());
    this.shape.graphics.setStrokeStyle(thickness)
                 .beginStroke(color)
                 .arc(0, 0, radius, Math.PI/4, 3*Math.PI/4, 0)
                 .endStroke()
                 .beginStroke(color)
                 .arc(0, 0, radius, -Math.PI/4, -3*Math.PI/4, 1)
                 .endStroke();
    this.shape.cache(-(radius+thickness), -(radius+thickness), 2*(radius+thickness), 2*(radius+thickness));

    this.x = 1024/2;
    this.y = 768/2;

    createjs.Ticker.addEventListener("tick", this);
  };

  loader.prototype = new createjs.Container();
  loader.prototype.handleEvent = function (e) {
    switch (e.type) {
      case "tick":
        this.shape.rotation += 0.5;
        this.shape.rotation %= 360;
        break;
      case "progress":
        this.text.text = Math.round(e.progress*100);
        this.text.regX = this.text.getMeasuredWidth()/2;
        this.text.regY = this.text.getMeasuredHeight()/2;
        break;
    }
  };

  loader.prototype.attachQueue = function (q) {
    this.text = this.addChild(new createjs.Text("0", "64px ABeeZee"));
    this.text.color = "rgb(50,50,50)";
    this.text.regX = this.text.getMeasuredWidth()/2;
    this.text.regY = this.text.getMeasuredHeight()/2;
    q.addEventListener("progress", this);
  };

  return loader;
}());
/**
 * menu.js
 *
 * code for all sort of menu objects
 **/

//namespacing
this.osujs = this.osujs || {};

osujs.menu = {};

osujs.menu.Logo = (function () {
  var logo = function () {
    var img_logo = osujs.assets.get("img_logo");

    this.initialize();

    this.image = img_logo;
    this.regX = img_logo.width/2;
    this.regY = img_logo.height/2;

    this.x = osujs.internalResolution.width/2;
    this.y = osujs.internalResolution.height/2;

    this.addEventListener("mousedown", this);
  };

  logo.prototype = new createjs.Bitmap();

  logo.prototype.handleEvent = function (e) {
    switch (e.type) {
      case "mousedown":
        createjs.Sound.play("aud_Normal-hitnormal");

        if (!osujs.settings.beatmap) return;

        osujs.stage.removeChild(this);
        osujs.beatmap = osujs.stage.addChild(new osujs.Beatmap(osujs.settings.beatmap));

        osujs.beatmap.addEventListener("beatmapload", function () {
          console.log("beatmap loaded");
          osujs.beatmap.play();
        });

        osujs.beatmap.addEventListener("end", function () {
          console.log("beatmap ended");
          osujs.stage.removeChild(osujs.beatmap);
          osujs.stage.addChild(this);
        }.bind(this));

        osujs.beatmap.load();
        break;
    }
  };

  return logo;
}());

osujs.menu.Pause = (function () {
  var pauseScreen = function () {
    this.initialize();

    this.backdrop = this.addChild(new createjs.Shape());
    this.backdrop.graphics.f("rgb(255,255,255)")
      .r(0,0,osujs.settings.internalResolution.width, osujs.settings.internalResolution.height);

    this.text = this.addChild(new createjs.Text("PAUSED", "96px ABeeZee, Arial"));
    this.text.color = "rgb(255,200,200)";
    this.text.regX = this.text.getMeasuredWidth()/2;
    this.text.regY = this.text.getMeasuredHeight()/2;
    this.text.x = osujs.settings.internalResolution.width/2;
    this.text.y = osujs.settings.internalResolution.height/2;
  };

  pauseScreen.prototype = new createjs.Container();

  return pauseScreen;
}());
/**
 * parse.js
 **/

//namespacing
this.osujs = this.osujs || {};

//note: all coordinates will be converted to 1024*768 resolution
//returns an object with the properties of the beatmap
osujs.parseOsu = function (beatmap) {

  //parses lines and returns an object with sections
  function separateSections(lines) {
    var sections = { version : [] };
    var section = "version";
    for (var n = 0; n < lines.length; n++) {
      if (/\[(\w*)\]/.exec(lines[n]))
        sections[section = /\[(\w*)\]/.exec(lines[n])[1]] = [];
      else if (lines[n])
        sections[section].push(lines[n]);
    }
    return sections;
  }

  function parseVersion(lines) {
    return parseInt(/osu file format v(\d+)/.exec(lines[0])[1], 10);
  }

  function parseGeneral(lines) {
    var general = {};
    for (var n = 0; n < lines.length; n++) {
      var m = lines[n].split(":");
      general[m[0]] = m[1].slice(1);
    }

    return general;
  }

  function parseDifficulty(lines) {
    var difficulty = {};
    for (var n = 0; n < lines.length; n++) {
      var m = lines[n].split(":");
      difficulty[m[0]] = parseFloat(m[1]);
    }

    //convert from osu values into useful values
    difficulty.CircleSize = 1 - 0.1*(difficulty.CircleSize - 3);

    //legacy beatmap compatibility;
    difficulty.ApproachRate = difficulty.ApproachRate || 2;

    return difficulty;
  }

  function parseColor(lines) { 
    var color = [];
    color.SliderBorder = [255, 255, 255];
    if (lines) {
      for (var n = 0; n < lines.length; n++)  {
        var m = lines[n].split(":");
        if (m[0] != "SliderBorder") {
          m = m[1].trim().split(",");
          //var m = /Combo\d+ : (\d+),(\d+),(\d+)/.exec(lines[n]);
          color.push([parseInt(m[0], 10), parseInt(m[1], 10), parseInt(m[2], 10)]);
        }
        else {
          m = m[1].trim().split(",");
          color.SliderBorder = [parseInt(m[0], 10), parseInt(m[1], 10), parseInt(m[2], 10)];
        }
      }
    }
    else {
      //default colors
      color.push([255, 0, 0]);
      color.push([255, 255, 0]);
      color.push([0, 255, 0]);
      color.push([0, 0, 255]);
    }
    return color;
  }

  function parseTimingPoints(lines) {
    var timingPoints = [];
    var s, t, beatLength;
    for (var n = 0; n < lines.length; n++) {
      s = lines[n].split(",");
      t = parseInt(s[0], 10);
      beatLength = parseFloat(s[1]);
      if (beatLength < 0) {
        beatLength = timingPoints[timingPoints.length-1].beatLength;
      }
      timingPoints.push( { t : t, beatLength : beatLength } );
    }

    //given a time t, returns the beat length at that time
    timingPoints.getBeatLength = function (t) {
      var beatLength = this[0].beatLength;
      for (var ii = 0; ii < this.length; ii++) {
        if (t < this[ii].t) {
          return beatLength;
        }
        else {
          beatLength = this[ii].beatLength;
        }
      }
    };

    return timingPoints;
  }

  function parseHitObjects(lines) {
    var scale = 1024/640; //x and y coordinates need to be in 1024x768 resolution
    var hitObjects = [];
    for (var n = 0; n < lines.length; n++) {  
      var ii;
      var s = lines[n].split(",");
      var hitObject = Object.create(null);

      hitObject.x = scale*parseInt(s[0], 10);
      hitObject.y = scale*parseInt(s[1], 10);
      hitObject.beginTime = parseInt(s[2], 10);
      hitObject.combo = parseInt(s[3], 10) >> 2; //what?
      hitObject.hitSound = parseInt(s[4], 10);

      //FIXME: not the right way to check if spinner. length differs across versions
      if (s.length == 7) {
        hitObject.type = osujs.Spinner;
        hitObject.endTime = parseInt(s[5], 10);
      }
      //Slider
      else if (s.length > 6) { //additional slider data
        hitObject.type = osujs.Slider;

        //points are relative to the head of the slider
        var slider = s[5].split("|");
        var points = [{x : 0, y : 0}];
        var curves = [];

        hitObject.sliderType = slider[0];

        for (ii = 1; ii < slider.length; ii++) {
          var p = slider[ii].split(":");
          var x = scale*parseInt(p[0], 10) - hitObject.x;
          var y = scale*parseInt(p[1], 10) - hitObject.y;

          if (x == points[points.length-1].x && y == points[points.length-1].y) {
            //FIXME: this might not be the right way to figure out slider types
            switch (hitObject.sliderType) {
              case "P":
                curves.push(new curvejs.CircleCurve(points));
                break;
              case "L":
                curves.push(new curvejs.LinearCurve(points));
                break;
              case "B":
                curves.push(new curvejs.BezierCurve(points));
                break;
            }
            points = [];
          }
          points.push({ x : x, y : y });
        }
        switch (hitObject.sliderType) {
          //FIXME: what to do with P's with last point duplicated?
          case "P":
            curves.push(new curvejs.CircleCurve(points));
            break;
          case "L":
            curves.push(new curvejs.LinearCurve(points));
            break;
          case "B":
            curves.push(new curvejs.BezierCurve(points));
            break;
        }
        hitObject.curve = curves.splice(0,1)[0];
        hitObject.curve.compose(curves);
        hitObject.length = scale*parseInt(s[7], 10);
        hitObject.repeats = parseInt(s[6], 10);
        if (hitObject.curve.length < hitObject.length) {
          hitObject.curve.addPoint(hitObject.curve.pointAtLength(hitObject.length));
        }
        else if (hitObject.curve.length > hitObject.length) {
          hitObject.curve.clipAtLength(hitObject.length);
        }

        //how do hitSounds work?
        if (s[8]) {
          var hitSounds = s[8].split("|");
          hitObject.hitSounds = [];
          for (ii = 0; ii < hitSounds.length; ii++) {
            hitObject.hitSounds.push(parseInt(hitSounds[ii], 10));
          }
        }
      }
      else {
        hitObject.type = osujs.HitCircle;
      }

      hitObjects.push(hitObject);
    }
    return hitObjects;
  }


  //split and sanitize beatmap
  var lines = beatmap.split("\n");
  for (var n = 0; n < lines.length; n++)
    lines[n] = lines[n].trim();

  var sections = separateSections(lines);
  var data = Object.create(null); //perfectly clean object

  data.Version = parseVersion(sections.version);
  data.General = parseGeneral(sections.General);
  data.Color = parseColor(sections.Colours);
  data.Difficulty = parseDifficulty(sections.Difficulty);
  data.HitObjects = parseHitObjects(sections.HitObjects);
  data.TimingPoints = parseTimingPoints(sections.TimingPoints);

  console.log(data);
  return data;
};
/** 
 * score.js
 **/

//namespacing
this.osujs = this.osujs || {};

osujs.Score = (function () {
  var score = function (beatmap) {
    this.beatmap = beatmap;
    this.initialize();
  };

  score.prototype = new createjs.Container();
  score.prototype.containerInitialize = score.prototype.initialize;

  score.prototype.initialize = function () {
    this.containerInitialize();
    this.combo = 0;
    this.score = 0;
    this.dispScore = 0;
    this.beatmap.addEventListener("score", this);
    createjs.Ticker.addEventListener("tick", this);

    this.scoreText = this.addChild(new this.ScoreText(this));
    this.comboText = this.addChild(new this.ComboText(this));

    this.comboText.update();
  };

  score.prototype.handleEvent = function (e) {
    switch (e.type) {
      case "tick":
        if (this.dispScore != this.score) {
          this.dispScore += Math.ceil((this.score-this.dispScore)/4);
          this.scoreText.update();
        }
        break;

      case "score":
        this.score += e.score+e.score*this.combo/25;
        this.combo = e.combo ? this.combo+1 : 0;

        this.comboText.update();

        break;
    }
  };

  score.prototype.ScoreText = (function () {
    var scoreText = function (par) {
      var img_score0 = osujs.assets.get("img_score0");
      this.par = par;

      this.initialize();
      this.digits = [];
      for (var ii = 0; ii < 8; ii++) {
        var digit = this.addChild(new createjs.Bitmap(img_score0));
        digit.regX = img_score0.width/2; 
        digit.x = ii*img_score0.width;
        this.digits.push(digit);
      }

      this.x = 1024-img_score0.width*7.5-8;
      this.y = 8;
    };

    scoreText.prototype = new createjs.Container();


    scoreText.prototype.update = function () {
      s = this.par.dispScore.toString();
      for (var ii = 0; ii < s.length; ii++) {
        var digit = this.digits[8-s.length+ii];
        var image = osujs.assets.get("img_score"+s[ii]);
        digit.image = image;
        digit.regX = image.width/2;
      }
    };

    return scoreText;
  }());

  score.prototype.ComboText = (function () {
    var comboText = function (par) {
      this.par = par;
      this.x = 8;
      this.y = 768-osujs.assets.get("img_score0").height-8;
    };

    comboText.prototype = new createjs.Container();

    comboText.prototype.update = function () {
      var s = this.par.combo.toString();

      this.removeAllChildren();

      var img_scorex = osujs.assets.get("img_scorex");

      var digit = this.addChild(new createjs.Bitmap(img_scorex));
      
      var width = img_scorex.width;
      for (var ii = 0; ii < s.length; ii++) {
        digit = new createjs.Bitmap(osujs.assets.get("img_score"+s[ii]));
        this.addChild(digit);
        digit.x = width;
        width += digit.image.width+1;
      }
    };

    return comboText;
  }());

  return score;
}());
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

    this.beatLength = osujs.beatmap.TimingPoints.getBeatLength(this.beginTime);
    this.speed = 160*osujs.beatmap.Difficulty.SliderMultiplier/this.beatLength;
    this.totalTime = this.length/this.speed;
    this.repeated = 0;
    this.ticksHit = 0; 
    this.initialHit = 0;

    this.createBody();

    this.tail = this.addChild(new this.HitCircle(this));
    this.tail.x = this.curve.points[this.curve.points.length-1].x;
    this.tail.y = this.curve.points[this.curve.points.length-1].y;

    this.head = this.addChild(new this.HitCircle(this));

    this.headArrow = this.addChild(new this.ReverseArrow(this, 0));
    this.tailArrow = this.addChild(new this.ReverseArrow(this, 1));
    if (this.repeats > 1) this.tailArrow.visible = 1;

    this.createTicks();
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
      var p = slider.curve.pointAtLength(t*slider.speed);

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
    //FIXME: 64 is hardcoded (should I use 64?)
    for (var ii = 1; ii*interval < this.length-64; ii++) {
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
      this.rotation = this.slider.curve.angleAtLength(isEnd ? this.slider.length : 0) + (isEnd ? 180 : 0);
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
      this.reverse = this.slider.curve.tangentAtLength(0).x >= 0 ? 0 : 1;

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
      var p = this.slider.curve.pointAtLength(length);
      
      //update position
      this.x = p.x;
      this.y = p.y;
      this.sliderb.rotation = this.slider.curve.angleAtLength(length) + (this.reverse ? 180 : 0);

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
