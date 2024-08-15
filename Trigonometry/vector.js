class Vector {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  set x(val) {
    this._x = val;
  }

  set y(val) {
    this._y = val;
  }

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }

  getAngle() {
    return Math.atan2(this._y, this._x);
  }

  setAngle(angle) {
    const length = this.getLength();
    this._y = Math.sin(angle) * length;
    this._x = Math.cos(angle) * length;
  }

  setLength(length) {
    const angle = this.getAngle();
    this._y = Math.sin(angle) * length;
    this._x = Math.cos(angle) * length;
  }

  getLength() {
    return Math.sqrt(this._y ** 2 + this._x ** 2);
  }

  add(vector) {
    return new Vector(this._x + vector.x, this._y + vector.y);
  }
  subtract(vector) {
    return new Vector(this._x - vector.x, this._y - vector.y);
  }
  scaleBy(val) {
    return new Vector(this._x * val, this._y * val);
  }
  divide(val) {
    return new Vector(this._x / val, this._y / val);
  }

  addTo(vector) {
    this._x += vector.x;
    this._y += vector.y;
  }
  subtractFrom(vector) {
    this._x -= vector.x;
    this._y -= vector.y;
  }
  multiplyBy(val) {
    this._x *= val;
    this._y *= val;
  }

  divideBy(val) {
    this._x /= val;
    this._y /= val;
  }
}
