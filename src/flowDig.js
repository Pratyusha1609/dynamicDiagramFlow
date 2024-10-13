import React, { useState, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  updateEdge,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import Sidebar from './sidebar';

const FlowDiagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  const addNode = (nodeData) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: 'customNode',
      data: { label: nodeData.label },
      position: { x: nodeData.x, y: nodeData.y },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addNewEdge = (edgeData) => {
    const sourceNode = nodes.find(node => node.id === edgeData.source);
    const targetNode = nodes.find(node => node.id === edgeData.target);

    if (!sourceNode || !targetNode) {
      console.log("Invalid source or target node");
      return;
    }

    const newEdge = {
      id: `e${edgeData.source}-${edgeData.target}`,
      source: edgeData.source,
      target: edgeData.target,
      label: edgeData.label,
      type: 'smoothstep',
    };

  
    setEdges((eds) => addEdge(newEdge, eds));
  };

  const removeElement = (elementId) => {
    setNodes((nds) => nds.filter((node) => node.id !== elementId));
    setEdges((eds) => eds.filter((edge) => edge.id !== elementId));
    setSelectedElement(null);
  };

  const editNodeLabel = (nodeId, newLabel) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: { ...node.data, label: newLabel },
            }
          : node
      )
    );
    setSelectedElement(null);
  };

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
  const onEdgeUpdate = (oldEdge, newConnection) =>
    setEdges((eds) => updateEdge(oldEdge, newConnection, eds));

  const onNodeClick = (event, node) => {
    setSelectedElement(node);
  };

  const onEdgeClick = (event, edge) => {
    setSelectedElement(edge);
  };

  return (
    <div className="flow-diagram-container" style={{ display: 'flex', height: '500px' }}>
      <Sidebar
        addNode={addNode}
        addEdge={addNewEdge}
        selectedElement={selectedElement}
        removeElement={removeElement}
        editNodeLabel={editNodeLabel}
      />
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeUpdate={onEdgeUpdate}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          style={{ background: '#f0f0f0' }}
          nodeTypes={nodeTypes}
        >
          <Background variant="dots" gap={12} size={1} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

const CustomNode = ({ data }) => (
  <div style={{ padding: '10px', background: '#fff', border: '1px solid #ddd' }}>
    <strong>{data.label}</strong>
  </div>
);

export default FlowDiagram;
