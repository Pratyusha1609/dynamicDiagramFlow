import React, { useState, useEffect } from "react";

const Sidebar = ({ addNode, addEdge, selectedElement, removeElement, editNodeLabel }) => {
  const [label, setLabel] = useState('');
  const [x, setX] = useState(100);
  const [y, setY] = useState(100);

  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');

  useEffect(() => {
    if (selectedElement?.data) {
      setLabel(selectedElement.data.label || '');
    } else if (selectedElement?.label) {
      setLabel(selectedElement.label || '');
    }
  }, [selectedElement]);

  const handleAddNode = () => {
    addNode({ label, x, y });
    setLabel('');
    setX(100);
    setY(100);
  };

  const handleAddEdge = () => {
    if (!source || !target) {
      console.log("Source and Target are required for an edge");
      return;
    }

    addEdge({ source, target, label });
    setLabel('');
    setSource('');
    setTarget('');
  };

  const handleEditNodeLabel = () => {
    if (selectedElement) {
      editNodeLabel(selectedElement.id, label);
    }
    setLabel('');
  };

  const handleRemoveElement = () => {
    if (selectedElement) {
      removeElement(selectedElement.id);
    }
    setLabel('');
  };

  return (
    <div style={{ width: '250px', padding: '10px', borderRight: '1px solid #ddd' }}>
      <h3>Add Node</h3>
      <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label" />
      <input value={x} onChange={(e) => setX(Number(e.target.value))} placeholder="X Position" />
      <input value={y} onChange={(e) => setY(Number(e.target.value))} placeholder="Y Position" />
      <button onClick={handleAddNode} style={{ width: '100%', marginBottom: '10px', backgroundColor: '#007bff', color: 'white'}}>Add Node</button>

      <h3>Add Edge</h3>
      <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Source Node ID" />
      <input value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Target Node ID" />
      <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Edge Label" />
      <button onClick={handleAddEdge} style={{ width: '100%', marginBottom: '10px', backgroundColor: '#007bff', color: 'white'}}>Add Edge</button>

      {selectedElement && (
        <>
          <h3>Edit/Remove Element</h3>
          <p>Selected Element: {selectedElement?.data?.label || selectedElement?.label || selectedElement?.id}</p>
          
          <button onClick={handleEditNodeLabel} style={{ width: '100%', marginBottom: '10px', backgroundColor: '#FF0000', color: 'white'}}>
            Edit Label
          </button>

          <button onClick={handleRemoveElement} style={{ width: '100%', marginBottom: '10px', backgroundColor: '#FF0000', color: 'white' }}>
            Remove Element
          </button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
