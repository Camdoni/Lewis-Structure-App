// ctx is Context for CanvasRenderingContext2D (html <canvas> API)
//
export function drawElement(ctx, element) {
  const { x, y, symbol } = element;

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(symbol, x, y);
}
