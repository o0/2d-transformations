import {Matrix} from 'ml-matrix';


const degToRad = (deg) => deg * Math.PI / 180;


const getRotateMatrix = (deg, translateX = 0, translateY = 0) => new Matrix([
  [Math.cos(degToRad(deg)), Math.sin(degToRad(deg)), 0],
  [-Math.sin(degToRad(deg)), Math.cos(degToRad(deg)), 0],
  [translateX, translateY, 1],
]);


const getTransformationMatrix = ({xScale = 1, yScale = 1, xSkew = 0, ySkew = 0, xTranslate = 0, yTranslate = 0}) => new Matrix([
  [xScale, Math.sin(degToRad(xSkew)), 0],
  [-Math.sin(degToRad(ySkew)), yScale, 0],
  [xTranslate, yTranslate, 1],
]);


const getScaleMatrix = (factor, translateX = 0, translateY = 0) => new Matrix([
  [factor, 0, 0],
  [0, factor, 0],
  [translateX, translateY, 1],
]);


const getYSkewMatrix = (deg, translateX, translateY) => new Matrix([
  [1, Math.sin(degToRad(deg)), 0],
  [0, 1, 0],
  [translateX, translateY, 1],
]);


const getXSkewMatrix = (deg, translateX, translateY) => new Matrix([
  [1, 0, 0],
  [-Math.sin(degToRad(deg)), 1, 0],
  [translateX, translateY, 1],
]);


const getRotateAndScaleMatrix = (angle, scaleFactor) => getRotateMatrix(angle)
  .mmul(getScaleMatrix(scaleFactor));


const renderNextFrame = (shape, ctx, start = null) => {
  if (Date.now() - start > 2000) {
    setTimeout(() => {
      initialize();
    }, 1000);

    return;
  }

  const maxShade = 128;
  const shade = (Date.now() - start) * maxShade / 2000;

  ctx.clearRect(0, 0, 800, 600);
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
      renderNextFrame.bind(null, shape.mmul(getRotateMatrix(1).mmul(getScaleMatrix(1.01))), ctx, start)
  );
};


const initialize = () => {
  renderNextFrame(new Matrix([
    [150, 150, 1],
    [250, 150, 1],
    [250, 250, 1],
    [150, 250, 1],
  ]), document.all[`plane`].getContext(`2d`), Date.now());
};


initialize();
