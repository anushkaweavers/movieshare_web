import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";

interface IButtonFieldType {
  img?: string;
  label?: string;
  alt?: string;
  imgHeight?: number;
  imgWidth?: number;
  mainCls?: string;
  type?: "button" | "reset" | "submit";
  onClick?: () => void;
  fullWidth?: boolean;
  customJsx?: React.ReactNode;
}

const ButtonField = (props: IButtonFieldType) => {
  const {
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
  } = props;
  return (
    <Button
      fullWidth={fullWidth}
      className={mainCls}
      type={type || "button"}
      onClick={onClick}
    >
      {!!img && (
        <Image width={imgHeight} height={imgWidth} src={img} alt={alt!} />
      )}
      {customJsx && customJsx}
      <span>{label}</span>{" "}
    </Button>
  );
};

export default ButtonField;
