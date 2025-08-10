import { useState, useRef } from "react";
import { getSnappedBondPoint } from "./useSnapping.js";

export default function useBondDrag(bonds, setBonds, elements) {
  const [dragging, setDragging] = useState(null);
  const snappedToRef = useRef(null);

  function startDrag(type, bondId, startPos, end = null) {
    const bond = bonds.find((b) => b.id === bondId);
    setDragging({
      type,
      bondId,
      startPos,
      end,
      initialFrom: bond?.from,
      initialTo: bond?.to,
    });
    snappedToRef.current = null; // reset snap lock
  }

  function drag(currentPos) {
    if (!dragging) return;

    const { bondId, type, end: whichEnd } = dragging;

    setBonds((prev) =>
      prev.map((bond) => {
        if (bond.id !== bondId) return bond;

        if (type === "handle") {
          if (snappedToRef.current) {
            // Snap locked: always use locked point
            return {
              ...bond,
              [whichEnd]: snappedToRef.current,
            };
          } else {
            // Attempt to snap to elements or other bond handles
            const snapped = getSnappedBondPoint(
              currentPos,
              elements,
              prev,
              bondId
            );
            if (snapped) {
              snappedToRef.current = snapped; // lock snapping
              return {
                ...bond,
                [whichEnd]: snapped,
              };
            } else {
              // No snap: follow cursor
              return {
                ...bond,
                [whichEnd]: currentPos,
              };
            }
          }
        }

        if (type === "bond") {
          const dx = currentPos.x - dragging.startPos.x;
          const dy = currentPos.y - dragging.startPos.y;

          return {
            ...bond,
            from: {
              x: dragging.initialFrom.x + dx,
              y: dragging.initialFrom.y + dy,
            },
            to: {
              x: dragging.initialTo.x + dx,
              y: dragging.initialTo.y + dy,
            },
          };
        }

        return bond;
      })
    );
  }

  function endDrag() {
    setDragging(null);
    snappedToRef.current = null;
  }

  return { dragging, startDrag, drag, endDrag };
}
