import "./Toolbar.css";

function Toolbar({ onToolbarItemClick }) {
  return (
    <div className="toolbar-div">
      <div
        className="element-div"
        onClick={() => onToolbarItemClick("element")}
      >
        element
      </div>
      <div className="bond-div" onClick={() => onToolbarItemClick("bond")}>
        bond
      </div>
      <div className="charge-div" onClick={() => onToolbarItemClick("charge")}>
        charge
      </div>
    </div>
  );
}

export default Toolbar;
