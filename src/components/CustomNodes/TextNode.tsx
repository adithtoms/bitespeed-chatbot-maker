import React from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';

const TextNode: React.FC<NodeProps> = ({ data, id }) => {
  return (
    <div className="text-node" style={{ position: 'relative' }}>
      <Handle type="target" position={Position.Top} />
      {data.onDelete && (
        <button
          className="node-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            data.onDelete(id);
          }}
          title="Delete Node"
        >
          ×
        </button>
      )}
      <div className="text-node-body">{data.label || 'Text Node'}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default TextNode;