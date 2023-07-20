import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState('');
  const [showPropertyWindow, setShowPropertyWindow] = useState(false);
  const [borderWidth, setBorderWidth] = useState(2);
  const [borderColor, setBorderColor] = useState('gray');
  const [imageStyles, setImageStyles] = useState({
    width: '100%',
    border: `2px solid gray`,
  });

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleDragStart = (event) => {
    // Set some data to identify the drag source if needed
    event.dataTransfer.setData('text/plain', 'imageUpload');
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setSelectedImage(droppedFile);
  };

  const handleSubmit = () => {
    if (!selectedImage) {
      setMessage('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    axios
      .post('http://localhost:3001/submit', formData)
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setMessage('Error submitting image');
      });
  };

  const handlePropertyClick = () => {
    setShowPropertyWindow(true);
  };

  const handlePropertyClose = () => {
    setShowPropertyWindow(false);
  };

  const handleBorderWidthChange = (event) => {
    setBorderWidth(Number(event.target.value));
  };

  const handleBorderColorChange = (event) => {
    setBorderColor(event.target.value);
  };

  const handleApplyStyles = () => {
    setImageStyles((prevStyles) => ({
      ...prevStyles,
      border: `${borderWidth}px solid ${borderColor}`,
    }));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2>Image Upload</h2>
      <div
        style={{ border: '2px dashed gray', padding: '1rem', margin: '1rem 0' }}
      >
        <p>Drag and drop an image here</p>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleImageChange}
        />
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={imageStyles}
          />
        )}
      </div>
      <button onClick={handleSubmit} disabled={!selectedImage}>
        Submit
      </button>
      <p>{message}</p>

      <button onClick={handlePropertyClick}>Image Properties</button>

      {showPropertyWindow && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '1rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            zIndex: 9999,
          }}
        >
          <h3>Image Properties</h3>
          <label htmlFor="borderWidth">Border Width:</label>
          <input
            type="number"
            id="borderWidth"
            value={borderWidth}
            onChange={handleBorderWidthChange}
          />
          <br />
          <label htmlFor="borderColor">Border Color:</label>
          <input
            type="color"
            id="borderColor"
            value={borderColor}
            onChange={handleBorderColorChange}
          />
          <br />
          <button onClick={handleApplyStyles}>Apply Styles</button>
          <button onClick={handlePropertyClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;


