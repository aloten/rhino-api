import React from 'react';

const RhinoItem = ({ rhino }) => {
  return (
    <ul>
      <li>{rhino.id}</li>
      <li>{rhino.name}</li>
      <li>{rhino.species}</li>
    </ul>
  );
};

export default RhinoItem;
