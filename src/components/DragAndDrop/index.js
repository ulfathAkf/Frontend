import React, { useState } from 'react';

const DragAndDrop = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [fields, setFields] = useState([
    { id: 1, name: 'Field 1', top: 50, left: 50 },
    { id: 2, name: 'Field 2', top: 100, left: 100 },
    { id: 3, name: 'Field 3', top: 150, left: 150 }
  ]);
  const [dragZonePosition, setDragZonePosition] = useState({ top: 0, left: 0 });

  const handleDragStart = (event, field) => {
    setDraggedItem(field);
  };

  const handleDragZoneStart = (event) => {
    setDragZonePosition({
      top: event.clientY - dragZonePosition.top,
      left: event.clientX - dragZonePosition.left
    });
  };

  const handleDrag = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const offsetX = event.clientX - dragZonePosition.left;
    const offsetY = event.clientY - dragZonePosition.top;

    setFields((prevFields) =>
      prevFields.map((field) => {
        if (field === draggedItem) {
          return {
            ...field,
            top: offsetY,
            left: offsetX
          };
        }
        return field;
      })
    );
    setDraggedItem(null);
  };

  return (
    <div>
      <h2>Drag and Drop Example</h2>
      <div
        style={{
          position: 'relative',
          top: dragZonePosition.top,
          left: dragZonePosition.left,
          border: '2px dashed gray',
          padding: '10px',
          backgroundColor: 'white',
          minWidth: '200px',
          cursor: 'move'
        }}
        draggable
        onDragStart={handleDragZoneStart}
        onDrag={handleDrag}
        onDrop={handleDrop}
      >
        <h3>Draggable Zone</h3>
        {fields.map((field) => (
          <div
            key={field.id}
            draggable
            onDragStart={(event) => handleDragStart(event, field)}
            style={{
              marginBottom: '5px',
              backgroundColor: draggedItem === field ? 'lightgray' : 'white',
              cursor: 'move'
            }}
          >
            {field.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragAndDrop;
