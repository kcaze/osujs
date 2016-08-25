/**
 * parse.js
 **/

//namespacing
this.osujs = this.osujs || {};

osujs.parseOsu = function (osu) {
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
    return parseFloat(/osu file format v(\d+)/.exec(lines[0])[1]);
  }

  function parseGeneral(lines) {
    var general = {};
    for (var n = 0; n < lines.length; n++) {
      var line = lines[n].split(":");
      general[line[0].trim()] = line[1].trim();
    }

    general.AudioLeadIn = parseFloat(general.AudioLeadIn) || 0;
    general.StackLeniency = parseFloat(general.StackLeniency) || 0.7;

    return general;
  }

  function parseMetadata(lines) {
    var metadata = {};
    for (var n = 0; n < lines.length; n++) {
      var line = lines[n].split(":");
      metadata[line[0].trim()] = line[1].trim();
    }

    return metadata;
  }

  function parseDifficulty(lines) {
    var difficulty = {};
    for (var n = 0; n < lines.length; n++) {
      var m = lines[n].split(":");
      difficulty[m[0]] = m[1].trim();
    }

    difficulty.HPDrainRate = parseFloat(difficulty.HPDrainRate) || 7;
    difficulty.CircleSize = parseFloat(difficulty.CircleSize) || 5;
    difficulty.OverallDifficulty = parseFloat(difficulty.OverallDifficulty) || 7;
    difficulty.ApproachRate = parseFloat(difficulty.ApproachRate) || 6;
    difficulty.SliderMultiplier = parseFloat(difficulty.SliderMultiplier) || 1;
    difficulty.SliderTickRate = parseFloat(difficulty.SliderTickRate) || 2;

    //convert into useful values
    difficulty.CircleSize = 1 - 0.1*(difficulty.CircleSize - 3);

    return difficulty;
  }

  function parseColor(lines) { 
    var colors = {};
    var combos = [];
    lines = lines || [];

    for (var n = 0; n < lines.length; n++) {
      var line = lines[n].split(":");
      var color = line[1].trim().split(",");
      color = [parseFloat(color[0]), parseFloat(color[1]), parseFloat(color[2])];
      if (/^Combo\d+/.test(line[0])) {
        combos.push(color);
      }
      else {
        colors[line[0].trim()] = color;
      }
    }

    colors.combos = combos.length ? combos : [[255,0,0], [255,255,0], [0,255,0], [0,0,255]];
    colors.SliderBorder = colors.SliderBorder || [255,255,255];

    return colors;
  }

  function parseTimingPoints(lines) {
    var timingPoints = [];

    for (var n = 0; n < lines.length; n++) {
      var line = lines[n].split(",");
      timingPoints.push({ 
        offset : parseFloat(line[0]),
        beatLength : parseFloat(line[1]) > 0 ? parseFloat(line[1]) : timingPoints[timingPoints.length-1].beatLength,
        meter : parseFloat(line[2]), 
        sampleSet : parseFloat(line[3]), 
        sampleNumber : parseFloat(line[4]), 
        volumePercent : parseFloat(line[5])
      });
    }

    //returns the timing point of an object with offset t
    timingPoints.getPoint = function (offset) {
      if (offset <= this[0].offset) return this[0];
      for (var ii = 0; this[ii].offset < offset; ii++) {}
      return this[ii-1];
    };

    return timingPoints;
  }

  function parseHitObjects(lines) {
    var hitobjects = [];
    var hitobject = {};

    //note: all coordinates converted to 1024x768 resolution here
    for (var n = 0; n < lines.length; n++) {
      hitobject = {};
      var line = lines[n].split(",");
      var conversionRate = 1.6;
      var ii = 0, jj, elt;

      hitobject.x = conversionRate * parseFloat(line[ii++]);
      hitobject.y = conversionRate * parseFloat(line[ii++]);
      hitobject.beginTime = parseFloat(line[ii++]);
      hitobject.combo = parseFloat(line[ii++]);
      if (hitobject.combo & 1) 
        hitobject.type = "hitcircle";
      else if (hitobject.combo & 2) 
        hitobject.type = "slider";
      else 
        hitobject.type = "spinner";
      hitobject.combo = !!(hitobject.combo & 4);
      hitobject.hitsound = parseFloat(line[ii++]);

      switch (hitobject.type) {
        case "hitcircle":
          elt = line[ii].split(":");
          hitobject.perBeatSampleSet = parseFloat(elt[0]);
          hitobject.perBeatAddition = parseFloat(elt[1]);
          break;
        case "slider":
          elt = line[ii++].split("|");
          hitobject.sliderType = elt[0];
          hitobject.controlPoints = [{ x : 0, y : 0 }];
          for (jj = 1; jj < elt.length; jj++) {
            var p = elt[jj].split(":");
            hitobject.controlPoints.push({ 
              x : conversionRate * parseFloat(p[0]) - hitobject.x,
              y : conversionRate * parseFloat(p[1]) - hitobject.y
            });
          }
          hitobject.repeats = parseFloat(line[ii++]);
          hitobject.length = conversionRate * parseFloat(line[ii++]);
          //there exists customized hitsounds
          if (ii < line.length) {
            elt = line[ii++].split("|");
            hitobject.hitsounds = [];
            for (jj = 0; jj < elt.length; jj++) {
              hitobject.hitsounds.push(parseFloat(elt[jj]));
            }
          }
          break;
        case "spinner":
          hitobject.endOffset = parseFloat(line[ii++]);
          elt = line[ii].split(":");
          hitobject.perBeatSampleSet = parseFloat(elt[0]);
          hitobject.perBeatAddition = parseFloat(elt[1]);
          break;
      }

      hitobject.perBeatSampleSet = hitobject.perBeatSampleSet || 0;
      hitobject.perBeatAddition = hitobject.perBeatAddition || 0;
      hitobjects.push(hitobject);
    }

    return hitobjects;
  }


  //split and sanitize beatmap
  var lines = osu.split("\n");
  for (var n = 0; n < lines.length; n++)
    lines[n] = lines[n].trim();

  var sections = separateSections(lines);
  var data = {};

  data.Version = parseVersion(sections.version);
  data.General = parseGeneral(sections.General);
  data.Metadata = parseMetadata(sections.Metadata);
  data.Color = parseColor(sections.Colours);
  data.Difficulty = parseDifficulty(sections.Difficulty);
  data.HitObjects = parseHitObjects(sections.HitObjects);
  data.TimingPoints = parseTimingPoints(sections.TimingPoints);

  return data;
};
