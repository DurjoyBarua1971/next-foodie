"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  function handlePickClick() {
    imageInput.current?.click();
  }

function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
  const files = event.target.files;
  
  if (!files || files.length === 0) {
    setPickedImage(null);
    return;
  }

  const file = files[0];
  const fileReader = new FileReader();
  
  fileReader.onload = () => {
    if (typeof fileReader.result === "string") {
      setPickedImage(fileReader.result);
    } else {
      setPickedImage(null);
    }
  };
  
  fileReader.onerror = () => {
    console.error('Error reading file');
    setPickedImage(null);
  };
  
  fileReader.readAsDataURL(file);
}

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage ? (
            <Image
              src={pickedImage}
              alt="Selected"
              className={classes.image}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <p className={classes.placeholder}>No image picked yet</p>
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/*"
          name="image"
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
