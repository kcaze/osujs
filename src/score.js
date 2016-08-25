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
