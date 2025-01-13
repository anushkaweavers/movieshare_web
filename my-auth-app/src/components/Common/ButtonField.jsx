import { Button } from "@mui/material";
import React from "react";

const ButtonField = ({
  img,
  label,
  alt,
  imgHeight,
  imgWidth,
  mainCls,
  type,
  onClick,
  fullWidth,
  customJsx,
}) => {
  return (
    <Button
      fullWidth={fullWidth}
      className={mainCls}
      type={type || "button"}
      onClick={onClick}
    >
      {!!img && (
        <img
          width={imgWidth}
          height={imgHeight}
          src={img}
          alt={alt}
          style={{ marginRight: "8px" }}
        />
      )}
      {customJsx && customJsx}
      <span>{label}</span>
    </Button>
  );
};

export default ButtonField;
