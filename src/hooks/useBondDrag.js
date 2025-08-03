import { useState } from "react";

export default function useBondDrag(setBonds) {
  const [dragging, setDragging] = useState(null); // { type, bondId, end? }
  const [dragStartPos, setDragStartPos] = useState(null);

  function startDrag(type, bondId, pos, end = null) {
    setDragging({ type, bondId, end });
    setDragStartPos(pos);
  }

  function drag(pos) {
    if (!dragging) return;

    const dx = pos.x - dragStartPos.x;
    const dy = pos.y - dragStartPos.y;

    if (dragging.type === "bond") {
      setBonds((prevBonds) =>
        prevBonds.map((bond) =>
          bond.id === dragging.bondId
            ? {
                ...bond,
                from: { x: bond.from.x + dx, y: bond.from.y + dy },
                to: { x: bond.to.x + dx, y: bond.to.y + dy },
              }
            : bond
        )
      );
    } else if (dragging.type === "handle") {
      setBonds((prevBonds) =>
        prevBonds.map((bond) =>
          bond.id === dragging.bondId
            ? {
                ...bond,
                [dragging.end]: {
                  x: bond[dragging.end].x + dx,
                  y: bond[dragging.end].y + dy,
                },
              }
            : bond
        )
      );
    }

    setDragStartPos(pos);
  }

  function endDrag() {
    setDragging(null);
    setDragStartPos(null);
  }

  return {
    dragging,
    startDrag, // call with (type, bondId, pos, end?)
    drag,
    endDrag,
  };
}
