import { useState, useEffect, useRef } from "react";
import { drawBond } from "../utils/drawBond.js";
import { drawElement } from "../utils/drawElement.js";
import PopupSelector from "./PopupSelector.jsx";
import "./LewisStructureCanvas.css";
import useBondDrag from "../hooks/useBondDrag.js";
import { elementOptions, bondOptions } from "../data/elementOptions.js";
import { drawBondHandles } from "../utils/drawBondHelpers.js";
import { isMouseNearPoint } from "../utils/hitBondTest.js";
import { isMouseOverBondBox } from "../utils/isMouseOverBondBox.js";
import { isMouseOverElementBox } from "../utils/isMouseOverElementBox.js";
import useElementDrag from "../hooks/useElementDrag.js";

function LewisStructureCanvas({
  elements,
  setElements,
  bonds,
  setBonds,
  activePopup,
  setActivePopup,
}) {
  const canvasRef = useRef(null);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // initialize useBondDrag hook
  const { dragging, startDrag, drag, endDrag } = useBondDrag(setBonds);

  //initialize useElementDrag hook
  const { draggingElementId, startElementDrag, elementDrag, endElementDrag } =
    useElementDrag(setElements);

  const [hoveredBondId, setHoveredBondId] = useState(null);
  const [hoveredElementId, setHoveredElementId] = useState(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Draw bonds when bonds/elements/dimensions change
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bonds.forEach((bond) => {
      drawBond(ctx, bond.from, bond.to, {
        strokeColor: dragging?.bondId === bond.id ? "gray" : "black",
      });

      if (dragging?.bondId === bond.id || hoveredBondId === bond.id) {
        drawBondHandles(ctx, bond);
      }
    });

    elements.forEach((element) => {
      drawElement(ctx, element);

      if (hoveredElementId === element.id) {
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 2;

        const metrics = ctx.measureText(element.symbol);
        const textWidth = metrics.width;

        const fontSize = 65;
        const padding = 10;

        const verticalOffset = fontSize * 0.55 - 5;
        const rectHeight = fontSize + padding * 2 - 10;

        ctx.strokeRect(
          element.x - textWidth / 2 - padding,
          element.y - verticalOffset - padding,
          textWidth + padding * 2,
          rectHeight
        );
      }
    });
  }, [bonds, hoveredBondId, hoveredElementId, elements, dimensions, dragging]);

  // Util: get mouse position
  function getMousePos(event) {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function getClickedBond(pos) {
    for (let bond of bonds) {
      if (isMouseOverBondBox(pos, bond.from, bond.to)) {
        return bond;
      }
    }
    return null;
  }

  function getClickedBondHandle(pos) {
    for (let bond of bonds) {
      if (isMouseNearPoint(pos, bond.from, 8)) {
        return { bondId: bond.id, end: "from" };
      }
      if (isMouseNearPoint(pos, bond.to, 8)) {
        return { bondId: bond.id, end: "to" };
      }
    }
    return null;
  }

  // Mouse Events
  useEffect(() => {
    const canvas = canvasRef.current;

    function handleMouseDown(event) {
      const pos = getMousePos(event);

      const handle = getClickedBondHandle(pos);
      if (handle) {
        startDrag("handle", handle.bondId, pos, handle.end);
        return;
      }

      const bond = getClickedBond(pos);
      if (bond) {
        startDrag("bond", bond.id, pos);
      }

      const clickedElement = elements.find((el) =>
        isMouseOverElementBox(pos, el.x, el.y, 40)
      );

      if (clickedElement) {
        startElementDrag(clickedElement.id, pos);
        return;
      }
    }

    function handleMouseMove(event) {
      const pos = getMousePos(event);

      if (dragging) {
        drag(pos);
        canvas.style.cursor = "grabbing";
        return;
      }

      if (draggingElementId) {
        elementDrag(pos);
        canvas.style.cursor = "grabbing";
        return;
      }

      const handle = getClickedBondHandle(pos);
      const bond = getClickedBond(pos);
      const element = elements.find((el) =>
        isMouseOverElementBox(pos, el.x, el.y, 40)
      );

      if (handle) {
        canvas.style.cursor = "grab";
      } else if (bond || element) {
        canvas.style.cursor = "pointer";
      } else {
        canvas.style.cursor = "default";
      }

      setHoveredBondId(bond?.id ?? null);
      setHoveredElementId(element?.id ?? null);
    }

    function handleMouseUp() {
      endDrag();
      endElementDrag();
    }

    function handleMouseLeave() {
      setHoveredBondId(null);
      setHoveredElementId(null);
      endElementDrag();
    }

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [bonds, dragging, startDrag, drag, endDrag]);

  // Popup selector
  const handleSelect = (selectedItem) => {
    if (activePopup === "bond") {
      //find the type of bond the user chooses
      const foundBond = bondOptions.find(
        (b) => b.type.toLowerCase() === selectedItem.toLowerCase()
      );

      // render that bond to the canvas
      if (foundBond) {
        const newBond = {
          id: Date.now(),
          from: { x: 100, y: 100 },
          to: { x: 200, y: 150 },
          type: foundBond.type,
        };

        setBonds((prev) => [...prev, newBond]);
      }
    }

    // do same here but for element
    if (activePopup === "element") {
      const foundElement = elementOptions.find(
        (el) => el.name.toLowerCase() === selectedItem.toLowerCase()
      );

      if (foundElement) {
        const newElement = {
          id: Date.now(),
          x: Math.random() * 600,
          y: Math.random() * 600,
          symbol: foundElement.symbol,
          name: foundElement.name,
        };

        setElements((prev) => [...prev, newElement]);
      }
    }
    console.log("Elements: ", elements);
    console.log("Bonds: ", bonds);

    // remove popup from ui
    setActivePopup(null);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          background: "white",
          zIndex: 0,
        }}
      />
      {activePopup && (
        <>
          <div className="popup-overlay" onClick={() => setActivePopup(null)} />
          <PopupSelector type={activePopup} onSelect={handleSelect} />
        </>
      )}
    </div>
  );
}

export default LewisStructureCanvas;
