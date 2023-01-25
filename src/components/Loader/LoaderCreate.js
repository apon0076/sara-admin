import React from "react";
import Loader from "react-loader-spinner";

const LoaderCreate = (props) => {
  return (
    <div>
      <Loader
        type={props.type}
        color={props.color}
        height={props.height}
        width={props.width}
      />
    </div>
  );
};

export default LoaderCreate;
