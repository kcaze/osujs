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
/**
 * keys.js
 **/

this.KEYS = (function () {
  var keys = [];
  var ii;

  keys.keyCode = {
    ESC : 27
  };

  for (ii = 0; ii < 256; ii++) {
    keys[ii] = 0;
  }
  keys.callbacks = [];

  document.addEventListener("keydown", function (e) {
    e = e || window.event;
    //console.log(e.keyCode);

    //not a standard key
    if (e.keyCode >= keys.length || e.keyCode < 0) {
      return;
    }

    if (keys[e.keyCode] === 0) {
      keys[e.keyCode] = 1;
      for (ii = 0; ii < keys.callbacks.length; ii++) {
        keys.callbacks[ii]({type : "keydown", keyCode : e.keyCode});
      }
    }
  });

  document.addEventListener("keyup", function (e) {
    e = e || window.event;

    //not a standard key
    if (e.keyCode >= keys.length || e.keyCode < 0) {
      return;
    }

    if (keys[e.keyCode] === 1) {
      keys[e.keyCode] = 0;
      for (ii = 0; ii < keys.callbacks.length; ii++) {
        keys.callbacks[ii]({type : "keyup", keyCode : e.keyCode});
      }
    }
  });

  keys.addEventListener = function (f) {
    keys.callbacks.push(f);
  };

  //NOTE: assumes f exists only once in the callbacks array
  keys.removeEventListener = function (f) {
    for (var ii = 0; ii < keys.callbacks.length; ii++) {
      if (keys.callbacks[ii] === f) {
        keys.callbacks.splice(ii, 1);
        return;
      }
    }
  };

  return keys;
}());
/**
 * option.js
 **/

$("#options_width").attr("value", osujs.settings.width);
$("#options_height").attr("value", osujs.settings.height);
$("#options_offset").attr("value", osujs.settings.offset);
$("#options_key_x").attr("value", String.fromCharCode(osujs.settings.key_x));
$("#options_key_z").attr("value", String.fromCharCode(osujs.settings.key_z));

//option tab behaviour
$("#options_width").bind("input", function (e) {
  osujs.settings.set("width", parseInt($(this).val(), 10));
});
$("#options_height").bind("input", function (e) {
  osujs.settings.set("height", parseInt($(this).val(), 10));
});
$("#options_offset").bind("input", function (e) {
  osujs.settings.set("offset", parseInt($(this).val(), 10));
});
$("#options_key_x").bind("keydown", function (e) {
  this.value = String.fromCharCode(e.keyCode);
  osujs.settings.set("key_x", e.keyCode);
});
$("#options_key_z").bind("keydown", function (e) {
  this.value = String.fromCharCode(e.keyCode);
  osujs.settings.set("key_z", e.keyCode);
});
