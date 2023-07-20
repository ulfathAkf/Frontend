import React, { useState } from "react";
import TextEditor from "./TextEditor";
import TableCreation from "./TableCreation";
import SearchField from "./SearchField";
import FileUpload from "./FileUpload";
import "./TextEditor.css";
import "./FileUpload.css";
import Navbar from "../NavBar/navbar";

const InputElements = () => {
  const [components, setComponents] = useState([]);
  const [canvasComponents, setCanvasComponents] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const componentType = event.dataTransfer.getData("componentType");
    const newComponent = getComponentByType(componentType);
    setComponents([...components, newComponent]);
  };
  
  const handleDropCanvas = (event) => {
    event.preventDefault();
    const componentType = event.dataTransfer.getData("componentType");
    const newComponent = getComponentByType(componentType);
    const { clientX, clientY } = event;
    const componentWithPosition = {
      component: newComponent,
      position: { x: clientX, y: clientY }
    };
    setCanvasComponents([...canvasComponents, componentWithPosition]);
  };
   
  
  const getComponentByType = (type) => {
    switch (type) {
      case "textEditor":
        return <TextEditor />;
      case "tableCreation":
        return <TableCreation />;
      case "searchField":
        return <SearchField />;
      case "fileUpload":
        return <FileUpload />;
      default:
        return null;
    }
  };

  const handleDragStart = (event, componentType) => {
    event.dataTransfer.setData("componentType", componentType);
  };

//   const prevForm = () => {
//     const fields = this.state.orders.filter((data) => data !== null && data !== undefined);
//     this.props.onPreview(fields);
// }
  return (
    <>
      <Navbar />

      <div className="container">
        <div className="sidebar">
          <h5 className="heading">InputElements</h5>

          <div
            className="draggable-item"
            draggable="true"
            onDragStart={(event) => handleDragStart(event, "textEditor")}
          >
            Text Editor
          </div>
          <div
            className="draggable-item"
            draggable="true"
            onDragStart={(event) => handleDragStart(event, "tableCreation")}
          >
            Table Creation
          </div>
          <div
            className="draggable-item"
            draggable="true"
            onDragStart={(event) => handleDragStart(event, "searchField")}
          >
            Search Field
          </div>
          <div
            className="draggable-item"
            draggable="true"
            onDragStart={(event) => handleDragStart(event, "fileUpload")}
          >
            Image upload
          </div>
        </div>
        <div className="main-content">
          <div style={{ display: "flex" }}>
            <div
              className="drop-container"
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDropCanvas}
            >
              <h5 className="heading">Canvas Area</h5>
              {canvasComponents.map((component, index) => (
                <div
                  key={index}
                  className="component"
                  style={{ position: "absolute", top: component.position.y, left: component.position.x }}
                  draggable="true"
                >
                  {component.component}

                  {/* <button className="submit-button"  onClick={() => this.prevForm()}>
                   Close
                  </button> */}


                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputElements;
