/**
 * Draws a bond (straight line) between two atoms on a canvas
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas 2D drawing context
 * @param {{x: number, y: number }} from - Starting point of the bond.
 * @param {{x: number, y: number }} to - Ending point of the bond
 * @param {Object} [options] - Optional
 * @param {string} [options.strokeColor="#000"] - Bond color.
 * @param {number} [options.strokeWidth=2] - Bond thickness.
 */

export function drawBond(ctx, from, to, options = {}) {
  const { strokeColor = "#000", strokeWidth = 4, type = "single" } = options;

  ctx.strokeStyle = strokeColor;
  ctx.lineCap = "round";

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);

  if (type === "single") {
    ctx.lineWidth = strokeWidth;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }

  if (type === "double") {
    ctx.lineWidth = strokeWidth;

    // perpendicular offset
    const offsetX = -(dy / length) * 7.5; 
    const offsetY = (dx / length) * 7.5;

    // Line 1
    ctx.beginPath();
    ctx.moveTo(from.x + offsetX, from.y + offsetY);
    ctx.lineTo(to.x + offsetX, to.y + offsetY);
    ctx.stroke();

    // Line 2
    ctx.beginPath();
    ctx.moveTo(from.x - offsetX, from.y - offsetY);
    ctx.lineTo(to.x - offsetX, to.y - offsetY);
    ctx.stroke();
  }

  if (type === "triple") {
    ctx.lineWidth = strokeWidth;

    // perpendicular offset
    const offsetX = -(dy / length) * 12; 
    const offsetY = (dx / length) * 12;

    // Line 1 - center
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    // Line 2
    ctx.beginPath();
    ctx.moveTo(from.x + offsetX, from.y + offsetY);
    ctx.lineTo(to.x + offsetX, to.y + offsetY);
    ctx.stroke();

    // Line 3
    ctx.beginPath();
    ctx.moveTo(from.x - offsetX, from.y - offsetY);
    ctx.lineTo(to.x - offsetX, to.y - offsetY);
    ctx.stroke();
  }
}
