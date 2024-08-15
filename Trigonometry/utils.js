/**
 *
 * @param {Number} value current value
 * @param {Number} min value that you want to be considered as 0 or start on the range
 * @param {Number} max value that you want to be considered as 1 or end on the range
 * @returns {Number} normalized value within 0-1 range
 */

function normilize(value, min, max) {
  return (value - min) / (max - min);
}

/**
 * Opposite of normalization
 * @param {Number} norm normalized value within 0-1 range
 * @param {Number} min minimum value of the current range
 * @param {Number} max maximum value of the current range
 * @returns {Number} exact value on the specified range
 *
 * Example:
 * You have a line drawn on a screen where starting point X is 100 and end point X is 450 and you know you want to draw a point on that line within that range at 37 percent.
 * Now you need exact value instead of percent so you have to convert it using function: lerp(norm: 0.37, min: 100, max: 450) => 229.5 is you exact X pos on the screen.
 */

function lerp(norm, min, max) {
  return (max - min) * norm + min;
}

/**
 * Map (convert) value from one range to another range
 * @param {Number} val current value you want to map
 * @param {Number} sourceMin min value of the range you want to map from
 * @param {Number} sourceMax max value of the range you want to map from
 * @param {Number} destMin min value of the range you want to map to
 * @param {Number} destMax max value of the range you want to map to
 * @returns {Number} exact value on the destination range
 *
 * Example:
 * You want to track your mouse on Y axis and based on its Y pos enlarge or shrink radius of a circle on the screen.
 * Your mouse range is 0 - 600 on Y axis and your circle radius can be only between 20 and 360 for example. So when mouse is at 0 Y axis circle is 20 radius and when mouse is at 600 Y axis radius is 360.
 * Using this params you will get: map(val: currentMousePos, sourceMin: 0, sourceMax: 600, destMin: 20, destMax: 360) => exact value within 20-360 range.
 */

function map(val, sourceMin, sourceMax, destMin, destMax) {
  return lerp(normilize(val, sourceMin, sourceMax), destMin, destMax);
}

/**
 * Clamp value within specified range
 * @param {Number} val
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} value or min/max if it overflows
 */

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function distance(obj0, obj1) {
  const dx = obj0.x - obj1.x;
  const dy = obj0.y - obj1.y;
  return Math.sqrt(dx ** 2 + dy ** 2);
}
function distanceXY(x0, y0, x1, y1) {
  const dx = x0 - x1;
  const dy = y0 - y1;
  return Math.sqrt(dx ** 2 + dy ** 2);
}

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

function degsToRads(deg) {
  return (deg / 180) * Math.PI;
}

function radsToDegs(rads) {
  return (rads * 180) / Math.PI;
}

function roundToPlaces(val, places) {
  const mult = 10 ** places;
  return Math.round(val * mult) / mult;
}

function randomDist(min, max, iterations) {
  let total = 0;

  for (let i = 0; i < iterations; i++) {
    total += randomRange(min, max);
  }
  return total / iterations;
}

function circleCollision(c0, c1) {
  return distance(c0, c1) <= c0.radius + c1.radius;
}

function circlePointCollision(pX, pY, circle) {
  return distanceXY(pX, pY, circle.x, circle.y) < circle.radius;
}
function isInRange(val, min, max) {
  return val >= Math.min(min, max) && val <= Math.max(min, max);
}

function pointRectCollision(x, y, rect) {
  return isInRange(x, rect.x, rect.x + rect.width) && isInRange(y, rect.y, rect.y + rect.height);
}

function isRangeIntersect(min0, max0, min1, max1) {
  return (
    Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1)
  );
}

function rectCollision(rect0, rect1) {
  return (
    isRangeIntersect(rect0.x, rect0.x + rect0.width, rect1.x, rect1.x + rect1.width) &&
    isRangeIntersect(rect0.y, rect0.y + rect0.height, rect1.y, rect1.y + rect1.height)
  );
}

/**
 *
 * @param {Object} p0 starting position
 * @param {Object} p1 control point
 * @param {Object} p2 target point
 * @param {Number} t step 0.0 - 1.0
 * @param {Object} pFinal point that will go on the curve path. If not specified creates a new one or updates the given one.
 * @returns
 */

function quadraticBezier(p0, p1, p2, t, pFinal) {
  pFinal = pFinal || {};
  pFinal.x = Math.pow(1 - t, 2) * p0.x + (1 - t) * 2 * t * p1.x + t * t * p2.x;
  pFinal.y = Math.pow(1 - t, 2) * p0.y + (1 - t) * 2 * t * p1.y + t * t * p2.y;
  return pFinal;
}

/**
 *
 * @param {Object} p0 starting position
 * @param {Object} p1 control point
 * @param {Object} p2 control point
 * @param {Object} p3 target point
 * @param {Number} t step 0.0 - 1.0
 * @param {Object} pFinal point that will go on the curve path. If not specified creates a new one or updates the given one.
 * @returns
 */

function cubicBezier(p0, p1, p2, p3, t, pFinal) {
  pFinal = pFinal || {};
  pFinal.x =
    Math.pow(1 - t, 3) * p0.x +
    Math.pow(1 - t, 2) * 3 * t * p1.x +
    (1 - t) * 3 * t * t * p2.x +
    t * t * t * p3.x;
  pFinal.y =
    Math.pow(1 - t, 3) * p0.y +
    Math.pow(1 - t, 2) * 3 * t * p1.y +
    (1 - t) * 3 * t * t * p2.y +
    t * t * t * p3.y;
  return pFinal;
}

function multicurve(points, context) {
  let p0;
  let p1;
  let midx;
  let midy;

  context.moveTo(points[0].x, points[0].y);

  for (var i = 1; i < points.length - 2; i += 1) {
    p0 = points[i];
    p1 = points[i + 1];
    midx = (p0.x + p1.x) / 2;
    midy = (p0.y + p1.y) / 2;
    context.quadraticCurveTo(p0.x, p0.y, midx, midy);
  }
  p0 = points[points.length - 2];
  p1 = points[points.length - 1];
  context.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y);
}

function rotateByXaxis(angle, y, z) {
  const y1 = y * Math.cos(angle) - z * Math.sin(angle);
  const z1 = z * Math.cos(angle) + y * Math.sin(angle);
  return [y1, z1];
}

function rotateByYaxis(angle, x, z) {
  const x1 = x * Math.cos(angle) - z * Math.sin(angle);
  const z1 = z * Math.cos(angle) + x * Math.sin(angle);
  return [x1, z1];
}

function rotateByZaxis(angle, x, y) {
  const x1 = x * Math.cos(angle) - y * Math.sin(angle);
  const y1 = y * Math.cos(angle) + x * Math.sin(angle);
  return [x1, y1];
}
