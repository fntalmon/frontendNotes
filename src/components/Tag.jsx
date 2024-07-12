import React, { useState,useEffect } from "react";
import { Chip } from "@mui/material";

const Tag = ({  label, initialSelected, onSelect }) => {
  

  const [selected,setSelected] = useState(false);

  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  const handleToggle = () => {
    setSelected(!selected);
    if (onSelect) {
      onSelect(!selected);
    }
  };

  return (
    <Chip
      label={label}
      variant={selected ? "filled" : "outlined"}
      color={selected ? "primary" : "default"}
      onClick={handleToggle}
      sx={{
        cursor: "pointer",
        mr: 1,
        mb: 1,
      }}
    />
  );
};

export default Tag;
