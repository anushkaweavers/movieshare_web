import { Box, Dialog, DialogContent } from "@mui/material";
import Image from "next/image";
import React from "react";
import ButtonField from "./ButtonField";

interface IPopUp {
  open: boolean;
  handleClose: () => void;
  imgSrc: string;
  description: string;
  title: string;
  btnTitle: string;
  btnClick: () => void;
}

const MSPopUp = ({
  open,
  handleClose,
  imgSrc,
  description,
  title,
  btnTitle,
  btnClick,
}: IPopUp) => {
  return (
    <Dialog open={open} onClose={handleClose} className='custom-popup'>
      <DialogContent>
        <Box className='popup-icon'>
          <Image width={34} height={34} src={imgSrc} alt='' />
        </Box>
        <h3>{title}</h3>
        <p>{description}</p>
        <ButtonField mainCls='p-btn' label={btnTitle} onClick={btnClick} />
      </DialogContent>
    </Dialog>
  );
};

export default MSPopUp;
