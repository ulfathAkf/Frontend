import React, { useState } from 'react';
import axios from 'axios';
import "./TextEditor.css";
import "./FormBuilder.css";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState('');
  const [showPropertyWindow, setShowPropertyWindow] = useState(false);
  const [imageProperties, setImageProperties] = useState({
    width: '',
    height: '',
    borderSize: '',
    borderColor: '',
  });

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleDragStart = (event) => {
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

  const handlePropertyChange = (event) => {
    setImageProperties({
      ...imageProperties,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    if (!selectedImage) {
      alert('Please select an image.');
      return;
    }

    setShowPropertyWindow(false);

    // Save image and properties
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('width', imageProperties.width);
    formData.append('height', imageProperties.height);

    axios
      .post('http://localhost:3001/submit', formData)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      alert('Error submitting image');
      });
  };

  const handlePropertyWindowClose = () => {
    setSelectedImage(null);
    setShowPropertyWindow(false);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div
          draggable
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => setShowPropertyWindow(true)}
          style={{
            padding: '1rem',
            margin: '1rem 0',
            width: `${imageProperties.width}px`,
            height: `${imageProperties.height}px`,
          }}
        >
          
          {!selectedImage && <p>Click here to upload an Image</p>}
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                border: `${imageProperties.borderSize}px solid ${imageProperties.borderColor}`,
              }}
            />
          )}
        </div>
        
          {showPropertyWindow && (
            <div style={{ marginLeft: '1rem' }}>
              <div className="col-sm properties">
                <label>
                  Choose Image:</label>
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
               
                <br />
                <label>
                  Width:</label>
                  <input
                    type="text"
                    name="width"
                    value={imageProperties.width}
                    onChange={handlePropertyChange}
                  />
               
                <br />
                <label>
                  Height:</label>
                  <input
                    type="text"
                    name="height"
                    value={imageProperties.height}
                    onChange={handlePropertyChange}
                  />
                
                <br />
                
                  <>
                    <label>
                      Border Size:</label>
                      <input
                        type="text"
                        name="borderSize"
                        value={imageProperties.borderSize}
                        onChange={handlePropertyChange}
                      />
                   
                    <br />
                    <label>
                      Border Color:</label>
                      <input
                        type="color"
                        name="borderColor"
                        value={imageProperties.borderColor}
                        onChange={handlePropertyChange}
                      />
                    
                    <br />
                  </>
                  
                  <button className="close" onClick={handlePropertyWindowClose}>Close</button>
              
                  <button className="save" onClick={handleSubmit}>Submit</button>
               
              </div>
            </div>
          )}
      </div>
      <p>{message}</p>
    </div>
  );
};

export default ImageUpload;
