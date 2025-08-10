export function drawElement(ctx, element) {
  const { x, y, symbol } = element;

  // Draw element symbol
  ctx.fillStyle = "black";
  ctx.font = "bold 65px Inter";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(symbol, x, y);
}
