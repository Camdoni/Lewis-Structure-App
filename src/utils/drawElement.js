// ctx is Context for CanvasRenderingContext2D (html <canvas> API)
//
export function drawElement(ctx, element) {
  const { x, y, symbol } = element;

  ctx.fillStyle = "black";
  ctx.font = "bold 65px Inter";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(symbol, x, y);
}
