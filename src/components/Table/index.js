import React from "react";

function Table() {
  const rows = 5; // number of rows
  const columns = 3; // number of columns

  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
  };

  const thStyle = {
    border: "1px solid black",
    backgroundColor: "lightgray",
    padding: "8px",
  };

  const tdStyle = {
    border: "1px solid black",
    padding: "8px",
  };

  // Create an array of rows and columns with empty data
  const data = Array(rows)
    .fill()
    .map(() => Array(columns).fill(""));

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {[...Array(columns)].map((_, i) => (
            <th key={i} style={thStyle}>
              Header {i + 1}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((_, columnIndex) => (
              <td key={columnIndex} style={tdStyle}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
