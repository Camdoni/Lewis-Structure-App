// Simplified bounding box hit test FOR ELEMENTS
export function isMouseOverElementBox(mouse, x, y, fontSize = 65, scale = 0.6) {
  const padding = fontSize * scale;
  return (
    mouse.x >= x - padding &&
    mouse.x <= x + padding &&
    mouse.y >= y - padding &&
    mouse.y <= y + padding
  );
}
