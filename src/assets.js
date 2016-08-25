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
