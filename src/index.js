import {Matrix} from 'ml-matrix';


const degToRad = (deg) => deg * Math.PI / 180;


const getRotateMatrix = (deg, translateX = 0, translateY = 0) => new Matrix([
  [Math.cos(degToRad(deg)), Math.sin(degToRad(deg))],
  [-Math.sin(degToRad(deg)), Math.cos(degToRad(deg))],
]);


const getScaleMatrix = (factor, translateX = 0, translateY = 0) => new Matrix([
  [factor, 0],
  [0, factor],
]);


const getRotateAndScaleMatrix = (angle, scaleFactor) =>
    getRotateMatrix(angle).mmul(getScaleMatrix(scaleFactor));


const renderNextFrame = (shape, ctx, start = null) => {
  if (Date.now() - start > 300) return;

  const maxShade = 128;
  const shade = (Date.now() - start) * maxShade / 300;
  ctx.fillStyle = `rgb(0, ${shade}, 0)`;

  ctx.beginPath();
  shape.forEach((it, i) => {
    if (i === 0) ctx.moveTo(it[0], it[1])
    else ctx.lineTo(it[0], it[1])
  });
  ctx.closePath();
  ctx.fill();

  requestAnimationFrame(
    renderNextFrame.bind(null, shape.mmul(getRotateAndScaleMatrix(2, 1.01)), ctx, start),
  );
};


const initialize = () => {
  const container = document.all['plane'];
  const ctx = container.getContext('2d');

  const shape = new Matrix([
    [100, 100],
    [200, 100],
    [200, 200],
    [100, 200],
  ]);

  renderNextFrame(shape, ctx, Date.now());
};


initialize();
