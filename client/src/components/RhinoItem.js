import React from 'react';

const RhinoItem = ({ rhino }) => {
  return (
    <div>
      <div>{rhino.id}</div>
      <div>{rhino.name}</div>
      <div>{rhino.species}</div>
    </div>
  );
};

export default RhinoItem;
