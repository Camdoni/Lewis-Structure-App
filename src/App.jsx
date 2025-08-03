import "./App.css";
import LewisStructureCanvas from "./components/LewisStructureCanvas";
import Toolbar from "./components/Toolbar";
import { useState } from "react";

function App() {
  const [activePopup, setActivePopup] = useState(null);
  const [bonds, setBonds] = useState([]);
  const [elements, setElements] = useState([]);

  return (
    <div className="app-container">
      <Toolbar onToolbarItemClick={(type) => setActivePopup(type)} />
      <LewisStructureCanvas
        elements={elements}
        setElements={setElements}
        bonds={bonds}
        setBonds={setBonds}
        activePopup={activePopup}
        setActivePopup={setActivePopup}
      />
    </div>
  );
}

export default App;
