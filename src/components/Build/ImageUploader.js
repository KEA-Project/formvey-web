import React, { useState } from "react";

function ImageUploader() {
  const [file, setFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const imageFile = e.dataTransfer.files[0];
    setFile(imageFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = () => {
    // 파일 업로드를 수행하는 로직을 작성합니다.
    console.log(URL.createObjectURL(file));
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ width: "200px", height: "200px", border: "1px solid black" }}
    >
      {file ? (
        <img
          src={URL.createObjectURL(file)}
          alt="uploaded"
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <p>Drag and drop an image file here</p>
      )}
      {file && <button onClick={handleUpload}>Upload</button>}
    </div>
  );
}

export default ImageUploader;
