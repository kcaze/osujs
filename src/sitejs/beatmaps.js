//namespacing

this.site = this.site || {};

site.beatmaps = (function (){
  var beatmaps = {};
  beatmaps.active = null;

  beatmaps.handleClick = function (id) {
    var map = $(id);

    if (beatmaps.active)
      beatmaps.active.removeClass("active");

    map.addClass("active");
    $("#currentbeatmap").html(
      map.attr("songTitle")+" ("+map.attr("difficulty")+") &mdash; "+map.attr("artist")
    );
    beatmaps.active = map;

    //temporary
    osujs.settings.beatmap = {
      osu : "assets/beatmaps/"+map.attr("osu"),
      music : "assets/beatmaps/"+map.attr("music")
    };
  };

  return beatmaps;
}());
