import { useState } from "react";
import { getBondingPoints } from "./useSnapping";

export default function useElementDrag(elements, setElements, bonds, setBonds) {
  const [draggingElementId, setDraggingElementId] = useState(null);
  const [dragStartPos, setDragStartPos] = useState(null);

  function startElementDrag(id, startPos) {
    setDraggingElementId(id);
    setDragStartPos(startPos);
  }

  function elementDrag(currentPos) {
    if (!draggingElementId || !dragStartPos) return;

    const dx = currentPos.x - dragStartPos.x;
    const dy = currentPos.y - dragStartPos.y;

    setElements((prev) =>
      prev.map((el) =>
        el.id === draggingElementId
          ? { ...el, x: el.x + dx, y: el.y + dy }
          : el
      )
    );

    // Update any bond endpoints that were attached to bonding points
    setBonds((prevBonds) =>
      prevBonds.map((bond) => {
        const updated = { ...bond };
        const movedElement = elements.find((e) => e.id === draggingElementId);
        const oldPoints = getBondingPoints(movedElement);
        const newPoints = getBondingPoints({
          ...movedElement,
          x: movedElement.x + dx,
          y: movedElement.y + dy,
        });

        // Snap from/to points if they match a bonding point
        oldPoints.forEach((pt, i) => {
          if (pointsAreEqual(pt, bond.from)) {
            updated.from = newPoints[i];
          }
          if (pointsAreEqual(pt, bond.to)) {
            updated.to = newPoints[i];
          }
        });

        return updated;
      })
    );

    setDragStartPos(currentPos);
  }

  function endElementDrag() {
    setDraggingElementId(null);
    setDragStartPos(null);
  }

  return { draggingElementId, startElementDrag, elementDrag, endElementDrag };
}

function pointsAreEqual(p1, p2) {
  return Math.abs(p1.x - p2.x) < 1 && Math.abs(p1.y - p2.y) < 1;
}
