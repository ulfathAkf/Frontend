import React, { useState, useRef, useEffect } from 'react';
import './TableCreation.css';

const CreateTable = () => {
  const [numRows, setNumRows] = useState(3);
  const [numColumns, setNumColumns] = useState(2);
  const [tableColor, setTableColor] = useState('#000001');
  const [shadingColor, setShadingColor] = useState('#ffffff');
  const [cellWidth, setCellWidth] = useState(50);
  const [cellHeight, setCellHeight] = useState(50);
  const tableRef = useRef(null);
  const [resizing, setResizing] = useState(false);
  const [borderWidth, setBorderWidth] = useState(1);
  const [selectedCells, setSelectedCells] = useState([]);
  const [showProperties, setShowProperties] = useState(true);

  const handleDrop = (e) => {
    e.preventDefault();
    setShowProperties(true);
    
  };

  const handleNumRowsChange = (e) => {
    setNumRows(Number(e.target.value));
  };

  const handleNumColumnsChange = (e) => {
    setNumColumns(Number(e.target.value));
  };

  const handleTableColorChange = (e) => {
    setTableColor(e.target.value);
  };

  const handleShadingColorChange = (e) => {
    setShadingColor(e.target.value);
  };

  const handleCellWidthChange = (e) => {
    setCellWidth(Number(e.target.value));
  };

  const handleCellHeightChange = (e) => {
    setCellHeight(Number(e.target.value));
  };

  const handleBorderWidthChange = (e) => {
    setBorderWidth(Number(e.target.value));
  };

  const resizeSelectedCells = (width, height) => {
    setSelectedCells((prevSelectedCells) =>
      prevSelectedCells.map((cell) => ({
        ...cell,
        width,
        height,
      }))
    );
  };

  const handleTableResize = (e) => {
    if (resizing) {
      const table = tableRef.current;
      const newWidth = e.clientX;
      const newHeight = e.clientY;
      const cellWidth = newWidth / numColumns;
      const cellHeight = newHeight / numRows;

      table.style.width = newWidth + 'px';
      table.style.height = newHeight + 'px';

      setCellWidth(cellWidth);
      setCellHeight(cellHeight);
      resizeSelectedCells(cellWidth, cellHeight);
    }
  };

  const handleMouseDown = () => {
    setResizing(true);
  };

  const handleMouseUp = () => {
    if (resizing) {
      setResizing(false);
    }
  };

  const handleCellClick = (row, col) => {
    const cell = { row, col };

    const cellIndex = selectedCells.findIndex(
      (c) => c.row === cell.row && c.col === cell.col
    );

    if (cellIndex > -1) {
      setSelectedCells((prevSelectedCells) =>
        prevSelectedCells.filter(
          (c) => !(c.row === cell.row && c.col === cell.col)
        )
      );
    } else {
      setSelectedCells((prevSelectedCells) => [
        ...prevSelectedCells,
        {
          ...cell,
          color: shadingColor,
          width: cellWidth,
          height: cellHeight,
        },
      ]);
    }
  };

  useEffect(() => {
    const table = tableRef.current;
    const container = table.parentNode;
    setCellWidth(container.offsetWidth / numColumns);
    setCellHeight(container.offsetHeight / numRows);
  }, [numRows, numColumns]);

  const renderTable = () => {
    if (numRows > 0 && numColumns > 0) {
      const tableRows = [];

      for (let i = 0; i < numRows; i++) {
        const tableColumns = [];

        for (let j = 0; j < numColumns; j++) {
          const selectedCell = selectedCells.find(
            (cell) => cell.row === i && cell.col === j
          );

          const cellStyle = {
            border: `${borderWidth}px solid ${tableColor}`,
            backgroundColor: selectedCell ? selectedCell.color : 'transparent',
            width: `${cellWidth}px`,
            height: `${cellHeight}px`,
          };

          tableColumns.push(
            <td
              key={j}
              style={cellStyle}
              onClick={() => handleCellClick(i, j)}
            ></td>
          );
        }

        tableRows.push(<tr key={i}>{tableColumns}</tr>);
      }

      return (
        <div
          className="resizable-table"
          // onMouseMove={handleTableResize}
          onMouseUp={handleMouseUp}
        >
          <table
            ref={tableRef}
            onMouseDown={handleMouseDown}
          //  style={{ cursor: resizing ? 'se-resize' : 'auto' }}
          >
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      );
    }

    return null;
  };

  const handleSave = () => {
    setShowProperties(false);
    // Add code to save the table properties and selected cells
  };

  const handleClose = () => {
    setShowProperties(false);

  };

  return (
    <div
      className="create-table"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {renderTable()}
      {showProperties && (
        <PropertyWindow
          numRows={numRows}
          numColumns={numColumns}
          tableColor={tableColor}
          shadingColor={shadingColor}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          borderWidth={borderWidth}
          onNumRowsChange={handleNumRowsChange}
          onNumColumnsChange={handleNumColumnsChange}
          onTableColorChange={handleTableColorChange}
          onShadingColorChange={handleShadingColorChange}
          onCellWidthChange={handleCellWidthChange}
          onCellHeightChange={handleCellHeightChange}
          onBorderWidthChange={handleBorderWidthChange}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

const PropertyWindow = ({
  numRows,
  numColumns,
  tableColor,
  shadingColor,
  cellWidth,
  cellHeight,
  borderWidth,
  onNumRowsChange,
  onNumColumnsChange,
  onTableColorChange,
  onShadingColorChange,
  onCellWidthChange,
  onCellHeightChange,
  onBorderWidthChange,
  onSave,
  onClose,
}) => {
  return (
    <div className="properties-window">
      <h3>Table Properties</h3>
      <label>
        Number of Rows:</label>
        <input type="number" value={numRows} onChange={onNumRowsChange} />
      
      <br />
      <label>
        Number of Columns:</label>
        <input type="number" value={numColumns} onChange={onNumColumnsChange} />
      
      <br />
      <label>
        Table Border Color:</label>
        <input type="color" value={tableColor} onChange={onTableColorChange} />
      
      <br />
      <label>
        Shading Color:</label>
        <input type="color" value={shadingColor} onChange={onShadingColorChange} />
      
      <br />
      <label>
        Cell Width:</label>
        <input type="number" value={cellWidth} onChange={onCellWidthChange} />
      
      <br />
      <label>
        Cell Height:</label>
        <input type="number" value={cellHeight} onChange={onCellHeightChange} />
      
      <br />
      <label>
        Table Border Width:</label>
        <input
          type="number"
          value={borderWidth}
          onChange={onBorderWidthChange}
        />
      
      <br />
      <button className="save-button" onClick={onSave}>
        Save
      </button>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default CreateTable;
