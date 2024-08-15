class Particle {
  mass = 1;
  radius = 10;
  bounce = -1;
  constructor(x, y, speed, angle, grav = 0) {
    this.velocity = new Vector(0, 0);
    this.position = new Vector(x, y);
    this.gravity = new Vector(0, grav);
    this.velocity.setLength(speed);
    this.velocity.setAngle(angle);
  }

  accelerate(accelerator) {
    this.velocity.addTo(accelerator);
  }

  update() {
    this.velocity.addTo(this.gravity);
    this.position.addTo(this.velocity);
  }

  angleTo(particle) {
    return Math.atan2(
      particle.position.y - this.position.y,
      particle.position.x - this.position.x
    );
  }
  distanceTo(particle) {
    const dX = particle.position.x - this.position.x;
    const dY = particle.position.y - this.position.y;

    return Math.sqrt(dX ** 2 + dY ** 2);
  }

  gravitateTo(particle) {
    const grav = new Vector(0, 0);
    const distance = this.distanceTo(particle);
    grav.setLength(particle.mass / distance ** 2);
    grav.setAngle(this.angleTo(particle));

    this.velocity.addTo(grav);
  }
}
class ParticleOptimized {
  mass = 1;
  radius = 10;
  bounce = -1;
  friction = 1;
  gravity = 0;

  x = 0;
  y = 0;
  vx = 0;
  xy = 0;

  constructor(x, y, speed, angle, grav = 0) {
    this.x = x;
    this.y = y;
    this.gravity = grav;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
  }

  /**
   *
   * @param {number} ax acceleration vector x
   * @param {number} ay acceleration vector y
   */
  accelerate(ax, ay) {
    this.vy += ay;
    this.vx += ax;
  }

  update() {
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.y += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
  }

  angleTo(particle) {
    return Math.atan2(particle.y - this.y, particle.x - this.x);
  }
  distanceTo(particle) {
    const dX = particle.x - this.x;
    const dY = particle.y - this.y;

    return Math.sqrt(dX ** 2 + dY ** 2);
  }

  gravitateTo(particle) {
    const dX = particle.x - this.x;
    const dY = particle.y - this.y;
    const distance = Math.sqrt(dX ** 2 + dY ** 2);
    const force = this.mass / distance ** 2;
    const ax = (dX / distance) * force;
    const ay = (dY / distance) * force;

    this.vx += ax;
    this.vy += ay;
  }
}
