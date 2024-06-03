"use client";
import Image from "next/image";
import React, { useState, ChangeEvent, useEffect } from "react";

interface ImageInputProps {
  setBannerImage: (item: string) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ setBannerImage }) => {
  const [image, setImage] = useState("");

  const handleInputChange = (event) => {
    setImage(event.target.value);
  };

  useEffect(() => {
    if (image) {
      setBannerImage(image);
    }
  }, [image, setBannerImage]);

  return (
    <div className="w-full">
      <div className="w-full">
        <input
          type="text"
          placeholder="Enter image URL"
          value={image}
          onChange={handleInputChange}
          className="border shadow w-full p-2 rounded-md"
        />
      </div>
      {image && (
        <div className="w-full flex justify-center mt-4">
          <Image
            src={image}
            alt="Preview"
            width={150}
            height={150}
            className="mt-2 border rounded-xl"
          />
        </div>
      )}
    </div>
  );
};

export default ImageInput;
