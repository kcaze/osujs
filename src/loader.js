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
