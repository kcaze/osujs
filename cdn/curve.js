/**
 * curve.js
 **/

this.curvejs = {};

(function () {
  //in degrees (returns angle in range [0,360)
  function angle(p) {
    var a = 360*Math.atan2(p.y, p.x)/(2*Math.PI);
    return a >= 0 ? a : 360+a;
  }

  //returns distance between two points
  function dist(p1, p2) {
    return Math.sqrt(Math.pow(p1.x-p2.x, 2) + Math.pow(p1.y-p2.y, 2));
  }

  //generic curve class from which others derive
  Curve = (function () {
    function curve(points) { }

    curve.prototype.curveInitialize = function (points) {
      this.points = points;
      this.points[0].length = 0;
      for (var ii = 1; ii < this.points.length; ii++) {
        this.points[ii].length = this.points[ii].length || this.points[ii-1].length+dist(this.points[ii], this.points[ii-1]);
      }
    
      this.length = this.points[this.points.length-1].length;
    };

    function indexAt(points, length) {
      var low = 0, high = points.length-1;
      var m;

      while (points[high-1].length > length) {
        m = Math.round((high+low)/2);
        if (points[m].length > length) high = m;
        else low = m;
      }

      return high;
    }

    //returns the point on the curve with arclength L from the start
    //implements a binary search + linear interpolation to find the point
    curve.prototype.pointAt= function (length) {
      var index = indexAt(this.points, length);
      var p1 = this.points[index-1], p2 = this.points[index];
      var diff = (length - p1.length)/(p2.length - p1.length);

      return { x : p1.x + diff*(p2.x-p1.x), y : p1.y + diff*(p2.y-p1.y) };
    };

    //returns a tangent velocity vector of the curve at the point on the curve with arclength L
    //(doesn't make any promises about the magnitude of the vector)
    curve.prototype.tangentAt= function (length) {
      var index = indexAt(this.points, length);
      var p1 = this.points[index-1], p2 = this.points[index];

      return { x : p2.x - p1.x,  y : p2.y - p1.y };
    };

    //returns angle of tangent velocity vector in degrees at the point on the curve with arclength L
    curve.prototype.angleAt= function(length) {
      return angle(this.tangentAt(length));
    };

    //use this to add a single point to a curve
    curve.prototype.addPoint = function (point) {
      if (dist(this.points[this.points.length-1], point)) {
        this.length += dist(this.points[this.points.length-1], point);
        this.points.push({ x : point.x,
                          y : point.y,
                          length : this.length });
      }
      return this;
    };

    //composes with the passed in array of curves in order, returing the joint curve. 
    //modifies the original curve but not the array of curves
    curve.prototype.compose = function (curves) {
      if (curves.length === 0) return this;
      else {
        var c = curves.splice(0,1)[0];
        var addonLength = this.length + dist(this.points[this.points.length-1], c.points[0]);
        for (var ii = 0; ii < c.points.length; ii++)
          this.points.push({ x : c.points[ii].x, y : c.points[ii].y, length : c.points[ii].length + addonLength });
        this.length = this.points[this.points.length-1].length;
        return this.compose(curves);
      }
    };

    //returns an object {left, right, up, down} which gives the bounding box of the curve
    curve.prototype.boundingBox = function () {
      var bb = { left : this.points[0].x, right : this.points[0].x,
                 up : this.points[0].y, down : this.points[0].y };
      for (var ii = 1; ii < this.points.length; ii++) {
        bb.left = this.points[ii].x < bb.left ? this.points[ii].x : bb.left;
        bb.right = this.points[ii].x > bb.right ? this.points[ii].x : bb.right;
        bb.up = this.points[ii].y < bb.up ? this.points[ii].y : bb.up;
        bb.down = this.points[ii].y > bb.down ? this.points[ii].y : bb.down;
      }

      return bb;
    };

    //clips the curve after a certain length, with some linear interpolation
    curve.prototype.clipAt= function (length) {
      var point = this.pointAt(length);
      this.points = this.points.splice(0, indexAt(this.points, length));
      this.length = this.points[this.points.length-1].length;
      if (dist(point, this.points[this.points.length-1]))
        this.addPoint(point);
      return this;
    }

    return curve;
  }());

  //boring, it's a line
  curvejs.LinearCurve = (function () {
    function LinearCurve(points) {
      this.curveInitialize(points);
    }

    LinearCurve.prototype = new Curve();

    return LinearCurve;
  }());

  //handles bezier curves with an arbitrary number of control points
  curvejs.BezierCurve = (function () {
    //first 100 factorial precalculated
    var factorial = (function () {
      var f = [1];

      for (var ii = 1; ii <= 100; ii++)
        f[ii] = ii*f[ii-1];

      function factorial(n) {
        if (f[n]) return f[n];
        else return f[n] = n*factorial(n-1);
      }

      return factorial;
    });

    //first 100 rows of Pascal's triangle precalculated
    var binomial = (function () {
      var b = [[1]]; //binomial coefficients
      for (var ii = 1; ii <= 100; ii++) {
        b[ii] = [];
        for (var jj = 0; jj <= ii; jj++)
          b[ii][jj] = f[ii] / (f[jj] * f[ii-jj]);
      }

      function binomial(n, r) {
        if (b[n]) { if (b[n][r]) return b[n][r]; }
        else b[n] = [];

        return b[n][r] = factorial(n)/(factorial(r)*factorial(n-r));
      }

      return binomial;
    });

    //takes points and splits in half, returns as array of two arrays of control points
    //implements De Casteljau's algorithm to split
    function split(points) {
      function b(p, i, j) {
        if (j === 0) return p[i];
        else{
          var b1 = b(p, i, j-1), b2 = b(p, i+1, j-1);
          return { x : 0.5*(b1.x + b2.x), y : 0.5*(b1.y + b2.y) };
        }
      }

      var p = [[], []];
      for (var ii = 0; ii < points.length; ii++) {
        p[0].push(b(points, 0, ii));
        p[1].push(b(points, ii, points.length-1-ii));
      }

      return p;
    }

    //returns an array of points for a linear approximation of the curve
    function approximate(points, threshold) {
      //if is flat
      if (Math.abs(points[0].x - points[points.length-1].x) + Math.abs(points[0].y - points[points.length-1].y) < threshold) {
        return [points[points.length-1]];
      }

      var p = split(points);
      var p1 = approximate(p[0], threshold), p2 = approximate(p[1], threshold);

      return [].concat(p1, p2);
    }

    function BezierCurve(points, threshold) {
      threshold = threshold || 1;

      this.controlPoints = points;
      this.curveInitialize([this.controlPoints[0]].concat(approximate(this.controlPoints, threshold)));
    }
    
    BezierCurve.prototype = new Curve();
    
    return BezierCurve;
  }());

  //draws the arc of the circle that goes through the 3 points in the order specified.
  //assumes 3 noncollinear points are passed in 
  curvejs.CircleCurve = (function () {
    function pointToAngle(point, center) {
      return angle({ x : point.x - center.x, y : point.y - center.y });
    }

    function angleToPoint(angle, center, radius) {
      return { x : Math.cos(angle/360*2*Math.PI)*radius + center.x, y : Math.sin(angle/360*2*Math.PI)*radius + center.y };
    }

    function CircleCurve(points, threshold) {
      threshold = threshold || 1;

      //calculates center and radius using determinant method
      var x1 = points[0].x, x2 = points[1].x, x3 = points[2].x;
      var y1 = points[0].y, y2 = points[1].y, y3 = points[2].y;
      var z1 = Math.pow(x1, 2) + Math.pow(y1, 2);
      var z2 = Math.pow(x2, 2) + Math.pow(y2, 2);
      var z3 = Math.pow(x3, 2) + Math.pow(y3, 2);

      var M11 = x1*(y2-y3) - y1*(x2-x3) + (x2*y3-x3*y2);
      var M12 = z1*(y2-y3) - y1*(z2-z3) + (z2*y3-z3*y2);
      var M13 = z1*(x2-x3) - x1*(z2-z3) + (z2*x3-z3*x2);
      var M14 = z1*(x2*y3-x3*y2) - x1*(z2*y3-z3*y2) + y1*(z2*x3-z3*x2);

      this.center = { x : 0.5*M12/M11, y : -0.5*M13/M11 };
      this.radius = Math.sqrt(Math.pow(this.center.x, 2) + Math.pow(this.center.y, 2) + M14/M11);

      var a1 = pointToAngle(points[0], this.center);
      var a2 = pointToAngle(points[1], this.center);
      var a3 = pointToAngle(points[2], this.center);

      var direction = a1 > a2 ? (a1 > a3 && a3 > a2 ? 1 : -1) : (a2 > a3 && a3 > a1 ? -1 : 1);
      var division = threshold/(2*Math.PI*this.radius) * 360;
      var length = (a3-a1)*direction > 0 ? Math.abs(a1-a3) : 360-Math.abs(a1-a3);

      points = [];
      for (var ii = 0; ii <= length; ii += division) {
        points.push(angleToPoint(a1 + direction*ii, this.center, this.radius));
      }

      this.curveInitialize(points);
    }

    CircleCurve.prototype = new Curve();

    return CircleCurve;
  }());
}());
