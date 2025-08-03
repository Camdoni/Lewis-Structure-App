export function drawBondHandles(ctx, bond) {
    ctx.beginPath();
    ctx.arc(bond.from.x, bond.from.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(bond.to.x, bond.to.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
}