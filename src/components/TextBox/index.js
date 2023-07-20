import React, { useState } from "react";
import "./TextBox.css";
function TextBox() {
  const [text, setText] = useState("");
  const [style, setStyle] = useState({
    fontFamily: "",
    fontSize: "",
    fontWeight: "",
    fontStyle: "",
    color: "",
    textAlign: "",
    left: 0,
    top: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleStyleChange(e) {
    const { name, value } = e.target;
    setStyle((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  }

  function handleFontSizeChange(e) {
    setStyle((prevStyle) => ({
      ...prevStyle,
      fontSize: `${e.target.value}px`,
    }));
  }

  function handleBoldChange(e) {
    setStyle((prevStyle) => ({
      ...prevStyle,
      fontWeight: e.target.checked ? "bold" : "",
    }));
  }

  function handleItalicChange(e) {
    setStyle((prevStyle) => ({
      ...prevStyle,
      fontStyle: e.target.checked ? "italic" : "",
    }));
  }

  function handleDragStart() {
    setIsDragging(true);
  }

  function handleDragEnd() {
    setIsDragging(false);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedText = event.dataTransfer.getData("text/plain");
    setText(droppedText);
  }

  return (
    <>
      
      <div className="container">
        <div className="row">
          
          <div className="col-sm"></div>
          <div className="col-sm">
            <div
              style={{ ...style, position: "absolute", left: style.left, top: style.top }}
              draggable={!isDragging}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <textarea
                value={text}
                onChange={handleTextChange}
              />
            </div>
            <div>
              <div className="col-3">
                <label htmlFor="fontFamily">Font Family:</label>
                <select
                  id="fontFamily"
                  name="fontFamily"
                  onChange={handleStyleChange}
                >
                  <option value="">Select a font</option>
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option>
                </select>
              </div>

              <div className="col-3">
                <label htmlFor="fontSize">Font Size:</label>
              </div>
              <div className="col-3">
                <input
                  type="number"
                  id="fontSize"
                  name="fontSize"
                  min="1"
                  max="100"
                  onChange={handleFontSizeChange}
                />
              </div>

              <div className="col-3">
                <label htmlFor="color">Color:</label>
              </div>
              <div className="col-3">
                <input
                  type="color"
                  id="color"
                  name="color"
                  onChange={handleStyleChange}
                />
              </div>

              <div className="col-3">
                <label htmlFor="textAlign">Text Align:</label>
              </div>
              <div className="col-3">
                <select
                  id="textAlign"
                  name="textAlign"
                  onChange={handleStyleChange}
                >
                  <option value="">Select an alignment</option>
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div className="col-1">
                <label htmlFor="bold">Bold:</label>
              </div>
              <div className="col-2">
                <input
                  type="checkbox"
                  id="bold"
                  name="bold"
                  onChange={handleBoldChange}
                />
              </div>

              <div className="col-1">
                <label htmlFor="italic">Italic:</label>
              </div>
              <div className="col-3">
                <input
                  type="checkbox"
                  id="italic"
                  name="italic"
                  onChange={handleItalicChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`drop-zone ${isDragging ? "active" : ""}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        Drop Text Field Here
      </div>
    </>
  );
}

export default TextBox;
