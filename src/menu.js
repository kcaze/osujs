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

        osujs.beatmap.addEventListener("ready", function () {
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
