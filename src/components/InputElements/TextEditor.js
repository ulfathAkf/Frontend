import React, { useState, useRef } from "react";
import "./TextEditor.css";

function TextBox() {
  const [text, setText] = useState("");
  const [savedText, setSavedText] = useState("");
  const [showTextArea, setShowTextArea] = useState(true);
  const [showProperties, setShowProperties] = useState(false);
  const [editable, setEditable] = useState(true);
  const [style, setStyle] = useState({
    fontFamily: "",
    fontSize: "",
    fontWeight: "",
    fontStyle: "",
    color: "",
    textAlign: "",
    width: "200px",
    height: "100px",
  });
  const [inputWidth, setInputWidth] = useState("200");
  const [inputHeight, setInputHeight] = useState("100");
  const textareaRef = useRef(null);

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

  function handleSave() {
    setSavedText(text);
    setShowTextArea(false);
    setShowProperties(false);
    setEditable(false);
  }

  function handleClose() {
    setShowTextArea(true);
    setShowProperties(false);
    setText(savedText);
    setEditable(true);
  }

  function handleWidthChange(e) {
    setInputWidth(e.target.value);
    setStyle((prevStyle) => ({
      ...prevStyle,
      width: `${e.target.value}px`,
    }));
  }

  function handleHeightChange(e) {
    setInputHeight(e.target.value);
    setStyle((prevStyle) => ({
      ...prevStyle,
      height: `${e.target.value}px`,
    }));
  }

  function handleClick() {
    setShowProperties(true);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm">
          {showTextArea ? (
            editable ? (
              <textarea
                style={style}
                value={text}
                onChange={handleTextChange}
                onClick={handleClick}
                ref={textareaRef}
              />
            ) : (
              <div onClick={handleClick}>{text}</div>
            )
          ) : (
            <div
              onClick={handleClick}
              style={{ ...style, cursor: editable ? "move" : "default" }}
              draggable={editable}
              onDragStart={(e) => {
                e.dataTransfer.setData("text", text);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const droppedText = e.dataTransfer.getData("text");
                const updatedText = text.replace(droppedText, "") + droppedText;
                setText(updatedText);
              }}
            >
              {text}
            </div>
          )}
        </div>
        {showProperties && (
          <div className="col-sm properties">
            <h4>Text Properties</h4>
            <div className="col" style={{ textAlign: "left" }}>
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

            <div className="col" style={{ textAlign: "left" }}>
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

            <div className="col" style={{ textAlign: "left" }}>
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
            <div className="col-2">
              <input
                type="checkbox"
                id="italic"
                name="italic"
                onChange={handleItalicChange}
              />
            </div>

            <div className="col-3">
              <label htmlFor="width">Width:</label>
            </div>
            <div className="col-3">
              <input
                type="text"
                id="width"
                name="width"
                value={inputWidth}
                onChange={handleWidthChange}
              />
            </div>

            <div className="col-3">
              <label htmlFor="height">Height:</label>
            </div>
            <div className="col-3">
              <input
                type="text"
                id="height"
                name="height"
                value={inputHeight}
                onChange={handleHeightChange}
              />
            </div>

            <div className="row" style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="col">
                {editable ? (
                  <button className="save" onClick={handleSave}>
                    Save
                  </button>
                ) : (
                  <button className="edit" onClick={() => {
                    setEditable(true);
                    setShowTextArea(true);
                  }}>
                    Edit
                  </button>
                )}
                <button className="close " onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TextBox;















