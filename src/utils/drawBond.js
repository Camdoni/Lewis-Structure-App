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
  // destructure options
  // strokeColor = color of line
  // type can be "single", "double", or "triple"

  const { strokeColor = "#000", strokeWidth = 4, type } = options;

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;

  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}
