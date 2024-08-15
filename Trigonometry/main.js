"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const resized = canvas;
void (() => {
  const width = resized.width;
  const height = resized.height;

  const posX = width / 2;
  const posY = height / 2;

  let bRadius = 200;
  let angle = 0;
  let offset = 100;
  let speed = 0.1;
  function render() {
    let radius = bRadius + Math.sin(angle);
    let x = posX + Math.cos(angle) * offset;
    let y = posY + Math.sin(angle) * offset;
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.fillStyle = "red";
    context.arc(posX, y, bRadius, 0, Math.PI * 2);
    context.stroke();
    angle += speed;
    window.requestAnimationFrame(render);
  }
  //   render();
})();

void (() => {
  // circle motion

  const width = resized.width;
  const height = resized.height;

  const posX = width / 2;
  const posY = height / 2;

  let angle = 0;
  let speed = 0.01;
  let bRadius = 100;

  function render() {
    context.clearRect(0, 0, width, height);
    let x = bRadius * Math.cos(angle) + posX;
    let y = bRadius * Math.sin(angle) + posY;
    context.beginPath();
    context.fillStyle = "red";
    context.arc(x, y, bRadius, 0, Math.PI * 2, false);
    context.fill();
    angle += speed;
    window.requestAnimationFrame(render);
  }
  //   render();
})();
void (() => {
  // ellipse motion

  const width = resized.width;
  const height = resized.height;

  const posX = width / 2;
  const posY = height / 2;

  let angle = 0;
  let speed = 0.01;
  let xRadius = 100;
  let yRadius = 200;

  function render() {
    context.clearRect(0, 0, width, height);
    let x = xRadius * Math.cos(angle) + posX;
    let y = yRadius * Math.sin(angle) + posY;
    context.beginPath();
    context.fillStyle = "red";
    context.arc(x, y, 100, 0, Math.PI * 2, false);
    context.fill();
    angle += speed;
    window.requestAnimationFrame(render);
  }
  //   render();
})();
void (() => {
  // Lissajous curve

  const width = resized.width;
  const height = resized.height;

  const posX = width / 2;
  const posY = height / 2;

  let xAngle = 0;
  let yAngle = 0;
  let xSpeed = 0.1;
  let ySpeed = 0.131;
  let xRadius = 200;
  let yRadius = 400;

  function render() {
    context.clearRect(0, 0, width, height);
    let x = xRadius * Math.cos(xAngle) + posX;
    let y = yRadius * Math.sin(yAngle) + posY;
    context.beginPath();
    context.fillStyle = "red";
    context.arc(x, y, 50, 0, Math.PI * 2, false);
    context.fill();
    xAngle += xSpeed;
    yAngle += ySpeed;
    window.requestAnimationFrame(render);
  }
  //   render();
})();
void (() => {
  // Circle pos

  function posCircle() {
    const width = resized.width;
    const height = resized.height;

    const posX = width / 2;
    const posY = height / 2;

    let radius = 200;
    let numOfObj = 10;
    let angle = 0;
    for (let i = 0; i <= numOfObj; i++) {
      let x = radius * Math.cos(angle) + posX;
      let y = radius * Math.sin(angle) + posY;
      angle = ((Math.PI * 2) / numOfObj) * i;
      context.beginPath();
      context.fillStyle = "red";
      context.arc(x, y, 10, 0, Math.PI * 2);
      context.fill();
    }
  }
  //   posCircle();
})();
void (() => {
  // Circle pos animated

  const width = resized.width;
  const height = resized.height;

  const posX = width / 2;
  const posY = height / 2;

  let radius = 200;
  let baseAngle = 0;
  let numOfObj = 10;
  let angle = 0;
  let speed = 0.01;
  let step = (Math.PI * 2) / numOfObj;
  function render() {
    context.clearRect(0, 0, width, height);
    baseAngle += speed;
    for (let i = 0; i <= numOfObj; i++) {
      let x = radius * Math.cos(step * i + baseAngle) + posX;
      let y = radius * Math.sin(step * i + baseAngle) + posY;
      angle = step * i;

      context.beginPath();
      context.fillStyle = "red";
      context.arc(x, y, 10, 0, Math.PI * 2);
      context.fill();
    }

    window.requestAnimationFrame(render);
  }
  // render();
})();
void (() => {
  // Pointer at mouse;

  const width = canvas.width;
  const height = canvas.height;

  const posX = width / 2;
  const posY = height / 2;

  let radius = 100;
  let angle = 0;
  let speed = 0.001;
  let deltaX = 0;
  let deltaY = 0;
  function render() {
    context.clearRect(0, 0, width, height);
    let x = radius * Math.cos(angle) + posX;
    let y = radius * Math.sin(angle) + posY;
    context.save();
    context.translate(x, y);
    context.rotate(angle);

    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = "red";
    context.moveTo(20, 0);
    context.lineTo(-20, 0);
    context.moveTo(20, 0);
    context.lineTo(10, -10);
    context.moveTo(20, 0);
    context.lineTo(10, 10);
    angle += speed;
    context.stroke();
    context.restore();
    window.requestAnimationFrame(render);
  }

  window.addEventListener("mousemove", e => {
    const { clientX, clientY } = e;
    deltaX = clientX - posX;
    deltaY = clientY - posY;
    angle = Math.atan2(deltaY, deltaX);
  });

  // render();
})();

void (() => {
  // Salut

  const width = canvas.width;
  const height = canvas.height;
  const particles = Array(100)
    .fill(null)
    .map(
      item =>
        new Particle(
          width / 2.5,
          height / 2.5,
          Math.random() * 4 + 1,
          Math.random() * Math.PI * 2
        )
    );

  function render() {
    context.clearRect(0, 0, width, height);

    for (let particle of particles) {
      particle.update();
      context.beginPath();
      context.fillStyle = "red";
      context.arc(particle.position.x, particle.position.y, 10, 0, Math.PI * 2);
      context.fill();
    }

    window.requestAnimationFrame(render);
  }

  // render();
})();

void (() => {
  // Gravity
  const width = canvas.width;
  const height = canvas.height;
  const particles = Array(100)
    .fill(null)
    .map(
      item =>
        new Particle(
          width / 2.5,
          height / 4,
          Math.random() * 5 + 1,
          Math.random() * Math.PI * 2,
          0.1
        )
    );

  function render() {
    context.clearRect(0, 0, width, height);

    for (let particle of particles) {
      particle.update();
      context.beginPath();
      context.fillStyle = "red";
      context.arc(particle.position.x, particle.position.y, 10, 0, Math.PI * 2);
      context.fill();
    }

    window.requestAnimationFrame(render);
  }

  // render();
})();

void (() => {
  // Acceleration;

  const width = canvas.width;
  const height = canvas.height;
  const thrustVec = new Vector(0, 0);
  const particle = new Particle(width / 2.5, height / 2.5, 0, 0);
  const wind = new Vector(0, 0);
  let thrusting = false;
  let angle = 0;
  let turningRight = false;
  let turningLeft = false;

  document.addEventListener("keydown", e => {
    switch (e.key) {
      case "ArrowUp":
        thrusting = true;
        break;
      case "ArrowLeft":
        turningLeft = true;
        break;
      case "ArrowRight":
        turningRight = true;
        break;
      default:
        return;
    }
  });
  document.addEventListener("keyup", e => {
    switch (e.key) {
      case "ArrowUp":
        thrusting = false;
        break;
      case "ArrowLeft":
        turningLeft = false;
        break;
      case "ArrowRight":
        turningRight = false;
        break;
      default:
        return;
    }
  });

  function render() {
    context.clearRect(0, 0, width, height);

    if (turningLeft) {
      angle -= 0.05;
    }
    if (turningRight) {
      angle += 0.05;
    }
    wind.setAngle(angle + Math.PI);
    thrustVec.setAngle(angle);
    if (thrusting) {
      wind.setLength(0);
      thrustVec.setLength(0.1);
    } else {
      wind.setLength(0.005);
      thrustVec.setLength(0);
    }

    particle.accelerate(wind);
    particle.accelerate(thrustVec);

    particle.update();
    context.save();
    context.translate(particle.position.x, particle.position.y);
    context.rotate(angle);

    context.beginPath();
    // context.lineWidth = 1;
    // context.strokeStyle = "red";
    // context.rect(particle.position.x, particle.position.y, 10, 10);
    context.moveTo(10, 0);
    context.lineTo(-10, -7);
    context.lineTo(-10, 0);
    context.closePath();
    context.stroke();
    context.fill();

    if (particle.position.x > width) {
      particle.position.x = 0;
    } else if (particle.position.x < 0) {
      particle.position.x = width;
    } else if (particle.position.y > height) {
      particle.position.y = 0;
    } else if (particle.position.y < 0) {
      particle.position.y = height;
    }

    context.stroke();
    context.restore();
    window.requestAnimationFrame(render);
  }

  // render();
})();

void (() => {
  //Orbit

  const width = canvas.width;
  const height = canvas.height;

  const sun = new Particle(width / 2.5, height / 2.5, 0, 0);
  const planet = new Particle(
    width / 2.5 + 100,
    height / 2.5,
    10,
    -Math.PI / 2
  );

  sun.mass = 10 * 1000;
  function render() {
    context.clearRect(0, 0, width, height);

    planet.gravitateTo(sun);
    planet.update();
    context.beginPath();
    context.arc(sun.position.x, sun.position.y, 50, 0, Math.PI * 2);
    context.arc(planet.position.x, planet.position.y, 10, 0, Math.PI * 2);
    context.fill();

    window.requestAnimationFrame(render);
  }

  // render();
})();

void (() => {
  // Fountain
  const width = canvas.width;
  const height = canvas.height;

  const particles = [];

  for (let i = 0; i < 100; i++) {
    const particle = new Particle(
      width / 2,
      height,
      Math.random() * 5 + 8,
      -Math.PI / 2 + (Math.random() * 0.2 - 0.1),
      0.1
    );
    particle.radius = Math.random() * 10 + 3;
    particles.push(particle);
  }

  function render() {
    context.clearRect(0, 0, width, height);

    particles.forEach(particle => {
      particle.update();
      if (particle.position.y - particle.radius > height) {
        particle.position.x = width / 2;
        particle.position.y = height;
        particle.velocity.setAngle(-Math.PI / 2 + Math.random() * 0.2 - 0.1);
        particle.velocity.setLength(Math.random() * 5 + 8);
      }

      context.beginPath();
      context.arc(particle.position.x, particle.position.y, 10, 0, Math.PI * 2);
      context.fill();
    });

    window.requestAnimationFrame(render);
  }

  // render();
})();

void (() => {
  // Bounce
  const width = canvas.width;
  const height = canvas.height;

  const ball = new Particle(
    width / 2,
    height / 2,
    5,
    Math.random() * Math.PI,
    0.1
  );
  ball.radius = 50;
  // ball.bounce = -0.9;

  function render() {
    context.clearRect(0, 0, width, height);
    context.rect(0, 0, width, height);
    context.strokeStyle = "red";
    context.lineWidth = "5";
    context.stroke();
    ball.update();

    if (ball.position.y + ball.radius > height) {
      ball.position.y = height - ball.radius;
      ball.velocity.y = ball.velocity.y * ball.bounce;
    } else if (ball.position.y - ball.radius < 0) {
      ball.position.y = ball.radius;
      ball.velocity.y = ball.velocity.y * ball.bounce;
    } else if (ball.position.x + ball.radius > width) {
      ball.position.x = width - ball.radius;
      ball.velocity.x = ball.velocity.x * ball.bounce;
    } else if (ball.position.x - ball.radius < 0) {
      ball.position.x = ball.radius;
      ball.velocity.x = ball.velocity.x * ball.bounce;
    }

    context.beginPath();
    context.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
    context.fill();

    window.requestAnimationFrame(render);
  }

  // render();
})();
void (() => {
  // Friction
  const width = canvas.width;
  const height = canvas.height;

  const ball = new Particle(width / 2, height / 2, 10, -1, 0);
  ball.radius = 10;
  const friction = 0.95;
  function render() {
    context.clearRect(0, 0, width, height);

    ball.velocity.multiplyBy(friction);
    ball.update();

    if (ball.position.y + ball.radius > height) {
      ball.position.y = height - ball.radius;
      ball.velocity.y = ball.velocity.y * ball.bounce;
    } else if (ball.position.y - ball.radius < 0) {
      ball.position.y = ball.radius;
      ball.velocity.y = ball.velocity.y * ball.bounce;
    } else if (ball.position.x + ball.radius > width) {
      ball.position.x = width - ball.radius;
      ball.velocity.x = ball.velocity.x * ball.bounce;
    } else if (ball.position.x - ball.radius < 0) {
      ball.position.x = ball.radius;
      ball.velocity.x = ball.velocity.x * ball.bounce;
    }

    context.beginPath();
    context.font = "15px serif";
    context.fillText(
      `PosX: ${ball.position.x.toFixed(4)}, PosY: ${ball.position.y.toFixed(
        4
      )}`,
      10,
      50
    );
    context.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
    context.fill();

    window.requestAnimationFrame(render);
  }

  // render();
})();
void (() => {
  // Mapping normalized and lerped values
  const width = canvas.width;
  const height = canvas.height;

  let mousePos = { x: 0, y: 0 };

  document.addEventListener("mousemove", e => {
    const { clientX, clientY } = e;
    mousePos.x = clientX;
    mousePos.y = clientY;
  });

  function render() {
    context.clearRect(0, 0, width, height);
    let radius = map(mousePos.y, 0, height, 20, 320);
    context.beginPath();
    context.font = "15px serif";
    context.fillText(
      `Mouse PosX: ${mousePos.x.toFixed(4)}, Mouse PosY: ${mousePos.y.toFixed(
        4
      )}`,
      10,
      50
    );

    context.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
    context.fill();

    window.requestAnimationFrame(render);
  }

  // render();
})();
void (() => {
  const width = canvas.width;
  const height = canvas.height;

  let mousePos = { x: 0, y: 0 };

  document.addEventListener("mousemove", e => {
    const { clientX, clientY } = e;
    mousePos.x = clientX;
    mousePos.y = clientY;
  });

  const rectSize = 115;

  function render() {
    context.clearRect(0, 0, width, height);
    // let percentX = mousePos.x - width / 2;
    // let percentY = mousePos.y - height / 2;
    let percentX = normilize(mousePos.x, width / 2, width / 2 + rectSize);
    let percentY = normilize(mousePos.y, height / 2, height / 2 + rectSize);

    context.beginPath();
    context.font = "15px serif";
    context.fillText(
      `Mouse PosX: ${mousePos.x.toFixed(4)}, Mouse PosY: ${mousePos.y.toFixed(
        4
      )}`,
      10,
      50
    );
    context.fillText(
      `Mouse within rect PosX: ${percentX}, Mouse within rect PosY: ${percentY})}`,
      10,
      70
    );
    context.rect(width / 2, height / 2, rectSize, rectSize);
    context.fill();

    window.requestAnimationFrame(render);
  }

  // render();
})();

void (() => {
  // Stars around the center

  const width = canvas.width;
  const height = canvas.height;

  function render() {
    for (let i = 0; i < 10000; i++) {
      const x = randomDist(0, width, 5);
      const y = randomDist(0, height, 5);

      context.rect(x, y, 1, 1);
      context.fill();
    }
  }
  // Slow render
  // render();
})();

void (() => {
  // Collision detection

  const width = canvas.width;
  const height = canvas.height;

  const rect1 = {
    x: width / 2,
    y: height / 2,
    width: 115,
    height: 95,
  };

  const rect2 = {
    x: 0,
    y: 0,
    width: 55,
    height: 65,
  };

  document.addEventListener("mousemove", e => {
    const { clientX, clientY } = e;
    rect2.x = clientX - rect2.width / 2;
    rect2.y = clientY - rect2.height / 2;
  });

  function render() {
    context.clearRect(0, 0, width, height);
    let isColliding = rectCollision(rect1, rect2);

    context.beginPath();
    context.fillStyle = isColliding ? "red" : "black";

    context.rect(rect1.x, rect1.y, rect1.width, rect1.height);
    context.rect(rect2.x, rect2.y, rect2.width, rect2.height);

    context.fill();
    window.requestAnimationFrame(render);
  }
  // render();
})();

void (() => {
  // Springs
  const width = canvas.width;
  const height = canvas.height;

  const ball = new Particle(
    Math.random() * width,
    Math.random() * height,
    5,
    Math.random() * Math.PI * 2,
    0
  );
  const springPoint = new Vector(width / 2, height / 2);
  ball.radius = 10;
  ball.bounce = -0.9;
  let isMouseDown = false;
  const friction = 0.95;
  const k = 0.2;

  document.addEventListener("mousedown", e => {
    isMouseDown = true;
    const { clientX, clientY } = e;
    ball.position.x = clientX;
    ball.position.y = clientY;
  });
  document.addEventListener("mousemove", e => {
    if (!isMouseDown) return;
    const { clientX, clientY } = e;
    ball.position.x = clientX;
    ball.position.y = clientY;
  });
  document.addEventListener("mouseup", e => {
    isMouseDown = false;
  });

  function render() {
    context.clearRect(0, 0, width, height);

    if (!isMouseDown) {
      let distance = springPoint.subtract(ball.position);
      let springForce = distance.scaleBy(k);
      ball.velocity.addTo(springForce);
    }
    ball.velocity.multiplyBy(friction);
    ball.update();
    if (ball.position.y + ball.radius > height) {
      ball.position.y = height - ball.radius;
      ball.velocity.y = ball.velocity.y * ball.bounce;
    } else if (ball.position.y - ball.radius < 0) {
      ball.position.y = ball.radius;
      ball.velocity.y = ball.velocity.y * ball.bounce;
    } else if (ball.position.x + ball.radius > width) {
      ball.position.x = width - ball.radius;
      ball.velocity.x = ball.velocity.x * ball.bounce;
    } else if (ball.position.x - ball.radius < 0) {
      ball.position.x = ball.radius;
      ball.velocity.x = ball.velocity.x * ball.bounce;
    }

    context.beginPath();

    context.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
    context.arc(springPoint.x, springPoint.y, 3, 0, Math.PI * 2);
    context.fill();
    context.lineTo(ball.position.x, ball.position.y);
    context.moveTo(springPoint.x, springPoint.y);
    context.stroke();
    window.requestAnimationFrame(render);
  }

  // render();
})();
void (() => {
  const width = canvas.width;
  const height = canvas.height;
  const mouse = {
    x: 0,
    y: 0,
  };

  document.addEventListener("mousemove", e => {
    const { clientX, clientY } = e;
    mouse.x = clientX;
    mouse.y = clientY;
  });

  const ball = new Particle(
    Math.random() * width,
    Math.random() * height,
    0,
    Math.random() * Math.PI * 2,
    0
  );
  const springPoint = new Vector(width / 2, height / 2);
  ball.radius = 10;

  const friction = 0.95;
  const k = 0.01;

  function render() {
    context.clearRect(0, 0, width, height);

    let distance = springPoint.subtract(ball.position);
    let springForce = distance.scaleBy(k);
    ball.velocity.addTo(springForce);

    flyOff();
    ball.velocity.multiplyBy(friction);
    ball.update();

    context.beginPath();

    context.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
    // context.arc(springPoint.x, springPoint.y, 3, 0, Math.PI * 2);
    context.fill();
    // context.lineTo(ball.position.x, ball.position.y);
    // context.moveTo(springPoint.x, springPoint.y);
    context.stroke();
    window.requestAnimationFrame(render);
  }

  function flyOff() {
    const range = 150;

    const dx = mouse.x - ball.position.x;
    const dy = mouse.y - ball.position.y;

    const dist = Math.sqrt(dx ** 2 + dy ** 2);
    if (dist <= range) {
      const angle = Math.atan2(dy, dx);
      const vx = Math.cos(angle);
      const vy = Math.sin(angle);
      const force = 3 + 100 / dist;
      ball.velocity.x = force * vx * -1;
      ball.velocity.y = force * vy * -1;
    }
  }

  // render();
})();
