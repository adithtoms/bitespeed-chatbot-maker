import React, { useState, useEffect } from 'react';
import type { Node } from 'reactflow';

interface SettingsPanelProps {
  selectedNode: Node;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setSelectedNode: React.Dispatch<React.SetStateAction<Node | null>>;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  selectedNode,
  setNodes,
  setSelectedNode,
}) => {
  const [text, setText] = useState<string>(selectedNode.data.label || '');

  useEffect(() => {
    setText(selectedNode.data.label || '');
  }, [selectedNode]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === selectedNode.id ? { ...node, data: { ...node.data, label: newText } } : node
      )
    );
  };

  return (
    <div className="settings-panel">
      <h3>Settings Panel</h3>
      <input
        type="text"
        placeholder="Enter message"
        value={text}
        onChange={handleTextChange}
      />
      <button onClick={() => setSelectedNode(null)}>Back</button>
    </div>
  );
};

export default SettingsPanel;