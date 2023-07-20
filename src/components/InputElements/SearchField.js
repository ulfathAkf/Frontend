import React, { useState } from "react";
import './SearchField.css';

const SearchingField = () => {
  const [showPropertyWindow, setShowPropertyWindow] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);
  const [searchFieldSize, setSearchFieldSize] = useState(16);
  const [searchFieldColor, setSearchFieldColor] = useState("#000000");
  const [searchFieldBorderSize, setSearchFieldBorderSize] = useState(1);
  const [searchFieldborderColor, setSearchFieldborderColor] = useState("#000000");

  const handleSearchFieldClick = () => {
    setShowPropertyWindow(true);
  };

  const handlePropertySelect = (e) => {
    setSelectedProperty(e.target.value);
    setFilteredUserDetails([]);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    handleFilter(e.target.value);
  };

  const handleFilter = (value) => {
    if (selectedProperty && value !== "") {
      const filteredUsers = sampleUserDetails.filter(
        (user) =>
          user[selectedProperty].toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUserDetails(filteredUsers);
    } else {
      setFilteredUserDetails([]);
    }
  };

  const handleClosePropertyWindow = () => {
    setShowPropertyWindow(false);
  };

  const handleSizeChange = (e) => {
    setSearchFieldSize(Number(e.target.value));
  };

  const handleColorChange = (e) => {
    setSearchFieldColor(e.target.value);
  };

  const handleborderColorChange = (e) => {
    setSearchFieldborderColor(e.target.value);
  }; 

  const handleBorderSizeChange = (e) => {
    setSearchFieldBorderSize(Number(e.target.value));
  };

  const sampleUserDetails = [
    { id: 1, email: "ulfath@gmail.com", name: "hana", userid: "user1" },
    { id: 2, email: "salama@gmail.com", name: "shams", userid: "user2" },
  ];

  const searchFieldStyle = {
    fontSize: `${searchFieldSize}px`,
    color: searchFieldColor,
    borderWidth: `${searchFieldBorderSize}px`,
    borderColor:searchFieldborderColor
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter Search text here"
          onClick={handleSearchFieldClick}
          onChange={handleInputChange}
          style={searchFieldStyle}
          
        />
      </div>
      {showPropertyWindow && (
        <div className="col-sm properties">
          <h4>Search Field Properties</h4>
          <label>Input type:</label>
          <select
            value={selectedProperty}
            onChange={handlePropertySelect}
            style={{ marginBottom: "10px", width: "200px" }}
          >
            <option value=""> Input </option>
            <option value="email">Email</option>
            <option value="name">Name</option>
            <option value="userid">UserID</option>
          </select>
          <br />
          <label htmlFor="sizeInput">Font Size:</label>
          <input
            id="sizeInput"
            type="number"
            min="1"
            value={searchFieldSize}
            onChange={handleSizeChange}
            style={{ marginLeft: "10px" }}
          />
          <br />
          <label htmlFor="colorInput">Text Color:</label>
          <input
            id="colorInput"
            type="color"
            value={searchFieldColor}
            onChange={handleColorChange}
            style={{ marginLeft: "10px" }}
          />
           <br />
          <label htmlFor="colorInput">Border Color:</label>
          <input
            id="colorInput"
            type="color"
            value={searchFieldborderColor}
            onChange={handleborderColorChange}
            style={{ marginLeft: "10px" }}
          />
          <br />
          <label htmlFor="borderInput">Border Size:</label>
          <input
            id="borderInput"
            type="number"
            min="0"
            value={searchFieldBorderSize}
            onChange={handleBorderSizeChange}
            style={{ marginLeft: "10px" }}
          />
          <br />
          <button className="Close" onClick={handleClosePropertyWindow}>Close</button>
        </div>
        
      )}
      {filteredUserDetails.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: "#f2f2f2", textAlign: "left", padding: "8px", border: "1px solid #ddd" }}>
                Email
              </th>
              <th style={{ backgroundColor: "#f2f2f2", textAlign: "left", padding: "8px", border: "1px solid #ddd" }}>
                Name
              </th>
              <th style={{ backgroundColor: "#f2f2f2", textAlign: "left", padding: "8px", border: "1px solid #ddd" }}>
                User ID
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUserDetails.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{user.email}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{user.name}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{user.userid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchingField;
