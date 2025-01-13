import React from "react";

interface INoData {
  text: string;
}

const NoDataFound = ({ text }: INoData) => {
  return (
    <div className='no-data-found'>
      <h1>{text}</h1>
    </div>
  );
};

export default NoDataFound;
