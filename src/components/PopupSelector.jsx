import "./PopupSelector.css";
import { useState, useEffect, useRef } from "react";

const elementOptions = [
  "hydrogen",
  "helium",
  "lithium",
  "berryllium",
  "boron",
  "carbon",
  "nitrogen",
  "oxygen",
  "flourine",
  "neon",
  "sodium",
  "magnesium",
  "aluminum",
  "silicon",
  "phosphorus",
  "sulfur",
  "chlorine",
  "argon",
  "potassium",
  "calcium",
];

const bondOptions = ["single", "double", "triple", "lone pair"];
const chargeOptions = ["one", "two", "three", "four"];

function PopupSelector({ type, onSelect }) {
  const [searchInput, setSearchInput] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const inputRef = useRef(null);

  const options =
    type === "element"
      ? elementOptions
      : type === "bond"
      ? bondOptions
      : type === "charge"
      ? chargeOptions
      : [];

  // update filteredOptions when searchInput or options change
  useEffect(() => {
    const filtered = options.filter((word) =>
      word.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchInput, options]);

  // this useEffect is so when the Popup Selector appears, the cursor auto blinks on the search-bar
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="popup-selector-div">
      <input
        className="search-bar"
        type="text"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        ref={inputRef}
      ></input>
      <ul>
        {filteredOptions.map((option, index) => (
          <li
            key={index}
            onClick={() => onSelect(option)}
            className={
              type === "element"
                ? "element-li"
                : type === "bond"
                ? "bond-li"
                : type === "charge"
                ? "charge-li"
                : ""
            }
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopupSelector;
