  // Simplified bounding box hit test FOR BONDS
  export function isMouseOverBondBox(mouse, from, to, padding = 10) {
    const minX = Math.min(from.x, to.x) - padding;
    const maxX = Math.max(from.x, to.x) + padding;
    const minY = Math.min(from.y, to.y) - padding;
    const maxY = Math.max(from.y, to.y) + padding;

    return (
      mouse.x >= minX && mouse.x <= maxX && mouse.y >= minY && mouse.y <= maxY
    );
  }