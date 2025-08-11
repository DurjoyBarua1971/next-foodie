"use client";

import { useRef } from "react";
import classes from "./image-picker.module.css";

export default function ImagePicker({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  const imageInput = useRef<HTMLInputElement>(null);

  function handlePickClick() {
    imageInput.current?.click();
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/*"
          name="image"
          ref={imageInput}
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
