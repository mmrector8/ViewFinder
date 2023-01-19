import React, { useState } from "react";
import "./UploadPhotoForm.css";

const UploadPhotoForm = () => {
  const [description, setDescription] = useState("");
  const [pictureUrl, setPictureUrl] = useState(null);
  const handleFile = (e) => {
    setPictureUrl(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <div className="upload-form-div">
      <div className="preview-image-container">
        <img src={pictureUrl} height="400px" />
      </div>
      <form className="upload-form">
        <div className="upload-form-left">
          <h1>Upload a Photo</h1>
          <input
            type="file"
            onChange={handleFile}
          />
          <input
            type="text"
            name="description"
            placeholder="Add a description"
            autoComplete="off"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="upload-form-right">
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );
};

export default UploadPhotoForm;
