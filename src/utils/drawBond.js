// drawBond.js (Rough.js version)

import rough from "roughjs/bundled/rough.esm.js";

/**
 * Draws a bond with rough (sketchy) style on canvas.
 * 
 * @param {HTMLCanvasElement} canvas - The canvas element.
 * @param {{x: number, y: number}} from - Starting point.
 * @param {{x: number, y: number}} to - Ending point.
 * @param {Object} [options] - Optional styling options.
 */
export function drawBondRough(canvas, from, to, options = {}) {
  const rc = rough.canvas(canvas);

  const points = [
    [from.x, from.y],
    [to.x, to.y],
  ];

  const roughOptions = {
    stroke: options.strokeColor || "#000",
    strokeWidth: options.strokeWidth || 2,
    // add any roughjs options you want here
  };

  rc.linearPath(points, roughOptions);
}
