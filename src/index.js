import {Matrix} from 'ml-matrix';


const degToRad = (deg) => deg * Math.PI / 180;


const getRotateMatrix = (deg, _translateX = 0, _translateY = 0) => new Matrix([
  [Math.cos(degToRad(deg)), Math.sin(degToRad(deg))],
  [-Math.sin(degToRad(deg)), Math.cos(degToRad(deg))],
]);


const getScaleMatrix = (factor, _translateX = 0, _translateY = 0) => new Matrix([
  [factor, 0],
  [0, factor],
]);


const getRotateAndScaleMatrix = (angle, scaleFactor) => getRotateMatrix(angle)
  .mmul(getScaleMatrix(scaleFactor));


const renderNextFrame = (shape, ctx, start = null) => {
  if (Date.now() - start > 300) {
    return;
  }

  const maxShade = 128;
  const shade = (Date.now() - start) * maxShade / 300;
  ctx.save();
  ctx.fillStyle = `rgb(0, ${shade}, 0)`;

  ctx.beginPath();
  shape.forEach((it, i) => {
    if (i === 0) {
      ctx.moveTo(it[0], it[1]);
    } else {
      ctx.lineTo(it[0], it[1]);
    }
  });
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  requestAnimationFrame(
      renderNextFrame.bind(null, shape.mmul(getRotateAndScaleMatrix(2, 1.01)), ctx, start)
  );
};


const initialize = () => {
  renderNextFrame(new Matrix([
    [100, 100],
    [200, 100],
    [200, 200],
    [100, 200],
  ]), document.all[`plane`].getContext(`2d`), Date.now());
};


initialize();
