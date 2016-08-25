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

    var osuPromise = $.Deferred();
    var soundPromise = $.Deferred();
    $.when(osuPromise, soundPromise).done(function () {
      console.log("beatmap ready");
      this.removeChild(this.loader);
      this.dispatchEvent({ type : "ready" });
    }.bind(this));

    var osuLoader = new createjs.LoadQueue();

    osuLoader.addEventListener("fileload", function (e) {
      var data = osujs.parseOsu(e.result);
      this.osu = data;

      console.log("osu loaded");
      console.log(this.osu);

      for (var p in data) {
        if (data.hasOwnProperty(p))
          this[p] = data[p];
      }

      this.makeHitObjects(function () {
        osuPromise.resolve();
      });
    }.bind(this)); 

    createjs.Sound.addEventListener("fileload", function (e) {
      if (e.src == this.music) {
        this.music = createjs.Sound.createInstance(this.music);
  
        console.log("music loaded");
        soundPromise.resolve();
      }
    }.bind(this));

    osuLoader.loadFile({ id : "osu", src : this.osu, type : createjs.LoadQueue.TEXT});
    createjs.Sound.registerSound(this.music);

    console.log("began beatmap loading");
  };

  beatmap.prototype.play = function () {
    console.log("beatmap played");

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

        if (this.currHit < this.hitObjects.length && t > this.hitObjects[this.currHit].approachTime) {
          console.log("hitobject began");
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

  //uses setTimeout to process
  beatmap.prototype.makeHitObjects = function (callback_fn) {
    var extra = { colorNum : 0, comboNum : 0, comboEnd : 0 };

    this.hitObjects = [];
    this.currHit = 0;
    this.currActive = 0;

    var chunk = 5, ii = 0;
    var colorNum = 1, comboNum = 1;
    var osu = this.osu;
    var hitObjects = this.HitObjects;
    console.log("Begin hitobject making");
    function process() {
      for(var jj = chunk; jj && ii < hitObjects.length; jj--, ii++) {
        var hitObject = hitObjects[ii];
        //hitObject.beatmap = this;

        if (hitObject.type == "spinner")
          hitObject.approachTime = hitObject.beginTime-100;
        else
          hitObject.approachTime = hitObject.beginTime - (2000 - osu.Difficulty.ApproachRate*150);
 
        colorNum = (colorNum + hitObject.combo) % osu.Color.combos.length;
        comboNum = hitObject.combo ? 1 : comboNum+1;
        hitObject.color = osu.Color.combos[colorNum];
        hitObject.comboNum = comboNum;
        hitObject.comboEnd = !hitObjects[ii+1] || hitObjects[ii+1].combo ? 1 : 0;
        hitObject.circleSize = osu.Difficulty.CircleSize;
     
        if (hitObject.type == "slider") {
          var curve;
          var ctrlPts = hitObject.controlPoints;
  
          //convert red points into sections
          var sections = [], currSection = [];
          for (kk = 0; kk < ctrlPts.length; kk++) {
            if (kk && ctrlPts[kk].x == ctrlPts[kk-1].x && ctrlPts[kk].y == ctrlPts[kk-1].y){
              sections.push(currSection);
              currSection = [];
            }
            currSection.push(ctrlPts[kk]);
          }
          sections.push(currSection);

          switch (hitObject.sliderType) {
            case "P":
              if (sections.length > 1)
                curve = new curvejs.BezierCurve(sections[0]);
              else
                curve = new curvejs.CircleCurve(sections[0]);
              break;
            case "B":
              curve = new curvejs.BezierCurve(sections[0]);
              for (kk = 1; kk  < sections.length; kk++) {
                curve.compose([new curvejs.BezierCurve(sections[kk])]);
              }
              break;
            case "L":
              curve = new curvejs.LinearCurve(sections[0]);
              for (kk = 1; kk < sections.length; kk++)
                curve.compose([new curvejs.LinearCurve(sections[jj])]);
              break;
          }
          hitObject.curve = curve.clipAt(hitObject.length);
        }
   
        switch (hitObject.type) {
          case "hitcircle":
            hitObject = new osujs.HitCircle(hitObject);
            break;
          case "slider":
            hitObject = new osujs.Slider(hitObject);
            break;
          case "spinner":
            hitObject = new osujs.Spinner(hitObject);
            break;
        }
        this.hitObjects.push(hitObject);
      }
      if (ii != hitObjects.length)
        setTimeout(process.bind(this), 0);
      else{
        this.hitObjects[0].activate();
        callback_fn();
      }
    }
    process.bind(this)();
  };

  beatmap.prototype.getTime = function () {
    return createjs.Ticker.getTime(true) - this.startTime + osujs.settings.offset;
  };

  return beatmap;
}());
