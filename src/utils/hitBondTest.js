export function isMouseNearPoint(mouse, point, radius) {
    const dx = mouse.x - point.x;
    const dy = mouse.y - point.y;
    return dx * dx + dy * dy <= radius * radius;
}