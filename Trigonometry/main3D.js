void (() => {
  const width = canvas.width;
  const height = canvas.height;

  const focal = 300;
  const points = [];
  const centerZ = 2000;
  let speed = 0.001;
  const radius = 1000;
  let baseAngle = 0;
  const numOfObj = 200;

  for (let i = 0; i < numOfObj; i++) {
    let point = {
      x: 0,
      //prettier-ignore
      y: 2000 - 4000 / numOfObj * i + Math.random() + 500,
      angle: 0.2 * i,
    };
    point.x = Math.cos(point.angle + baseAngle) * radius;
    point.z = centerZ + Math.sin(point.angle + baseAngle) * radius;
    points.push(point);
  }

  //   context.translate(width / 2, height / 2);

  window.addEventListener("mousemove", ({ clientX, clientY }) => {
    speed = (clientX - width / 2) * 0.00005;
    posY = (clientY - height / 2) * 2;
  });

  function render() {
    context.clearRect(-width / 2, -height / 2, width, height);
    baseAngle += speed;
    context.beginPath();
    for (let i = 0; i < points.length; i++) {
      let current = points[i];
      let perspective = focal / (focal + current.z);
      context.save();
      context.scale(perspective, perspective);
      context.translate(current.x, current.y);
      if (i === 0) {
        context.moveTo(0, 0);
      } else {
        context.lineTo(0, 0);
      }
      context.restore();
      current.x = Math.cos(current.angle + baseAngle) * radius;
      current.z = centerZ + Math.sin(current.angle + baseAngle) * radius;
    }
    context.stroke();

    window.requestAnimationFrame(render);
  }

  //   render();
})();

void (() => {
  const width = canvas.width;
  const height = canvas.height;

  const focal = 300;
  const points = [];
  let isUpdating = true;

  points[0] = { x: -500, y: -500, z: 2000 };
  points[1] = { x: 500, y: -500, z: 2000 };
  points[2] = { x: 500, y: -500, z: 1000 };
  points[3] = { x: -500, y: -500, z: 1000 };
  points[4] = { x: -500, y: 500, z: 2000 };
  points[5] = { x: 500, y: 500, z: 2000 };
  points[6] = { x: 500, y: 500, z: 1000 };
  points[7] = { x: -500, y: 500, z: 1000 };

  function project() {
    for (let i = 0; i < points.length; i++) {
      let current = points[i];
      let scale = focal / (focal + current.z);
      current.sx = current.x * scale;
      current.sy = current.y * scale;
    }
  }
  function drawLine(...args) {
    let first = points[args[0]];
    context.moveTo(first.sx, first.sy);
    for (let i = 1; i < args.length; i++) {
      let curr = points[args[i]];
      context.lineTo(curr.sx, curr.sy);
    }
  }

  function translateModel(x, y, z) {
    isUpdating = true;
    for (let i = 0; points.length; i++) {
      if (!points[i]) return;
      points[i].y += y;
      points[i].x += x;
      points[i].z += z;
    }
  }

  window.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case 37: // left
        translateModel(-20, 0, 0);
        break;
      case 39: // right
        translateModel(20, 0, 0);
        break;
      case 38: // up
        if (event.shiftKey) {
          translateModel(0, 0, 20);
        } else {
          translateModel(0, -20, 0);
        }
        break;
      case 40: // down
        if (event.shiftKey) {
          translateModel(0, 0, -20);
        } else {
          translateModel(0, 20, 0);
        }
        break;
    }
  });

  function render() {
    if (isUpdating) {
      context.clearRect(-width / 2, -height / 2, width, height);
      project();

      context.beginPath();
      drawLine(0, 1, 2, 3, 0);
      drawLine(4, 5, 6, 7, 4);
      drawLine(0, 4);
      drawLine(1, 5);
      drawLine(2, 6);
      drawLine(3, 7);
      context.stroke();
      isUpdating = false;
    }

    window.requestAnimationFrame(render);
  }

  //   render();
})();
void (() => {
  const width = canvas.width;
  const height = canvas.height;

  const focal = 300;
  const points = [];
  const centerZ = 1500;
  let isUpdating = true;

  points[0] = { x: -500, y: -500, z: 500 };
  points[1] = { x: 500, y: -500, z: 500 };
  points[2] = { x: 500, y: -500, z: -500 };
  points[3] = { x: -500, y: -500, z: -500 };
  points[4] = { x: -500, y: 500, z: 500 };
  points[5] = { x: 500, y: 500, z: 500 };
  points[6] = { x: 500, y: 500, z: -500 };
  points[7] = { x: -500, y: 500, z: -500 };

  function project() {
    for (let i = 0; i < points.length; i++) {
      let current = points[i];
      let scale = focal / (focal + current.z + centerZ);
      current.sx = current.x * scale;
      current.sy = current.y * scale;
    }
  }
  function drawLine(...args) {
    let first = points[args[0]];
    context.moveTo(first.sx, first.sy);
    for (let i = 1; i < args.length; i++) {
      let curr = points[args[i]];
      context.lineTo(curr.sx, curr.sy);
    }
  }

  function translateModel(x, y, z) {
    isUpdating = true;
    for (let i = 0; points.length; i++) {
      if (!points[i]) return;
      points[i].y += y;
      points[i].x += x;
      points[i].z += z;
    }
  }

  function rotateX(angle) {
    for (let i = 0; i < points.length; i++) {
      let current = points[i];
      const [y, z] = rotateByXaxis(angle, current.y, current.z);
      current.y = y;
      current.z = z;
    }
  }
  function rotateY(angle) {
    for (let i = 0; i < points.length; i++) {
      let current = points[i];
      const [x, z] = rotateByYaxis(angle, current.x, current.z);
      current.x = x;
      current.z = z;
    }
  }
  function rotateZ(angle) {
    for (let i = 0; i < points.length; i++) {
      let current = points[i];
      const [x, y] = rotateByXaxis(angle, current.x, current.y);
      current.x = x;
      current.y = y;
    }
  }

  window.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case 37: // left
        if (event.ctrlKey) {
          rotateY(0.05);
        } else if (event.shiftKey) {
          rotateZ(0.05);
        } else {
          translateModel(-20, 0, 0);
        }
        break;
      case 39: // right
        if (event.ctrlKey) {
          rotateY(-0.05);
        } else if (event.shiftKey) {
          rotateZ(-0.05);
        } else {
          translateModel(20, 0, 0);
        }
        break;
      case 38: // up
        if (event.shiftKey) {
          translateModel(0, 0, 20);
        } else if (event.ctrlKey) {
          rotateX(0.05);
        } else {
          translateModel(0, -20, 0);
        }
        break;
      case 40: // down
        if (event.shiftKey) {
          translateModel(0, 0, -20);
        } else if (event.ctrlKey) {
          rotateX(-0.05);
        } else {
          translateModel(0, 20, 0);
        }
        break;
    }
  });

  context.translate(width / 2, height / 2);
  function render() {
    if (isUpdating) {
      context.clearRect(-width / 2, -height / 2, width, height);
      project();

      context.beginPath();
      drawLine(0, 1, 2, 3, 0);
      drawLine(4, 5, 6, 7, 4);
      drawLine(0, 4);
      drawLine(1, 5);
      drawLine(2, 6);
      drawLine(3, 7);
      context.stroke();
      //   isUpdating = false;
    }

    window.requestAnimationFrame(render);
  }

  render();
})();
