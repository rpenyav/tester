import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const EditIcon = () => {
  const [hover, setHover] = useState(false);

  const style = {
    cursor: "pointer",
    marginLeft: "10px",
    color: hover ? "#333333" : "#cccccc",
  };

  return (
    <FaEdit
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
};

export default EditIcon;
