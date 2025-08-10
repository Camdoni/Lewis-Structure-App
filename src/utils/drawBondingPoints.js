import { getBondingPoints } from "../hooks/useSnapping.js";

export function drawBondingPoints(ctx, element) {
  const radius = 5;
  ctx.fillStyle = "lightgray";
  const bondingPoints = getBondingPoints(element);
  bondingPoints.forEach((pt) => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
    ctx.fill();
  });
}
