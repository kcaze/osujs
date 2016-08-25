/**
 * parse.js
 **/

/*
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
          hitObject.curve.addPoint(hitObject.curve.pointAt(hitObject.length));
        }
        else if (hitObject.curve.length > hitObject.length) {
          hitObject.curve.clipAt(hitObject.length);
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
*/
