// Return the exact bonding point object to ensure reference equality
export function getBondingPoints(element) {
  const { x, y, symbol } = element;

  const padding = 10;
  const fontSize = 65;
  const verticalOffset = fontSize * 0.55 - 5;
  const rectHeight = fontSize + padding * 2 - 10;

  // Approximate width using symbol length
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.font = `${fontSize}px sans-serif`;
  const textWidth = ctx.measureText(symbol).width;
  const rectWidth = textWidth + padding * 2;

  return [
    { x, y: y - verticalOffset - padding }, // top edge center
    { x: x + rectWidth / 2, y: y - verticalOffset - padding }, // top right corner
    { x: x + rectWidth / 2, y }, // right edge center
    { x: x - rectWidth / 2, y: y - verticalOffset - padding }, // top left corner
    { x, y: y - verticalOffset - padding + rectHeight }, // bottom edge center
    { x: x - rectWidth / 2, y: y - verticalOffset - padding + rectHeight }, // bottom left corner
    { x: x + rectWidth / 2, y: y - verticalOffset - padding + rectHeight }, // bottom right corner
    { x: x - rectWidth / 2, y }, // left edge center
  ];
}

// Snap radius defaults to 30 pixels
export function getSnappedBondPoint(
  pos,
  elements,
  bonds,
  draggingBondId = null,
  radius = 30
) {
  let candidates = [];

  // Add all bonding points from elements
  for (const el of elements) {
    candidates.push(...getBondingPoints(el));
  }

  // Add all bond endpoints except the currently dragged bond's handle
  for (const bond of bonds) {
    if (bond.id === draggingBondId) continue; // skip the bond being dragged
    candidates.push(bond.from);
    candidates.push(bond.to);
  }

  // Find closest candidate point within radius
  let closest = null;
  let minDist = Infinity;

  for (const pt of candidates) {
    const dx = pos.x - pt.x;
    const dy = pos.y - pt.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius && dist < minDist) {
      minDist = dist;
      closest = pt;
    }
  }

  return closest;
}
