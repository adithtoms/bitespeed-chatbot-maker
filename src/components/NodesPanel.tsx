import React from 'react';
import { NODE_TYPES } from '../constants/nodeTypes';

const NODE_DEFINITIONS = [
  {
    type: NODE_TYPES.TEXT,
    label: 'Message',
    icon: '💬',
  },
  // we can add more node types here in the future
];

const NodesPanel = () => {
  const handleDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="sidebar">
      <h3>Nodes Panel</h3>
      {NODE_DEFINITIONS.map((node) => (
        <div
          key={node.type}
          className="node-panel-item draggable-node"
          draggable
          onDragStart={(event) => handleDragStart(event, node.type)}
        >
          <span style={{ marginRight: 8 }}>{node.icon}</span>
          {node.label}
        </div>
      ))}
    </div>
  );
};

export default NodesPanel;
