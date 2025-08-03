import { useState } from "react";

export default function useElementDrag(setElements) {
  const [draggingElementId, setDraggingElementId] = useState(null);
  const [dragStartPos, setDragStartPos] = useState(null);

  function startElementDrag(elementId, pos) {
    setDraggingElementId(elementId);
    setDragStartPos(pos);
  }

  function elementDrag(pos) {
    if (!draggingElementId) return;

    const dx = pos.x - dragStartPos.x;
    const dy = pos.y - dragStartPos.y;

    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === draggingElementId ? { ...el, x: el.x + dx, y: el.y + dy } : el
      )
    );

    setDragStartPos(pos);
  }

  function endElementDrag() {
    setDraggingElementId(null);
    setDragStartPos(null);
  }

  return {
    draggingElementId,
    startElementDrag,
    elementDrag,
    endElementDrag,
  };
}
