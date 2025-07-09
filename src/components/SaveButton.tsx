import React from 'react';
import type { Node, Edge } from 'reactflow';

interface SaveButtonProps {
  nodes: Node[];
  edges: Edge[];
}

const SaveButton: React.FC<SaveButtonProps> = ({ nodes, edges }) => {
  const handleSave = () => {
    // Find nodes with no incoming edges (no edge.target === node.id)
    const nodesWithNoIncomingEdges = nodes.filter((node) =>
      !edges.some((edge) => edge.target === node.id)
    );

    if (nodes.length > 1 && nodesWithNoIncomingEdges.length > 1) {
      alert('Cannot save: More than one node has no incoming connection. Connect your nodes to create a valid flow.');
      return;
    }

    const flow = { nodes, edges };
    console.log('Saved Flow:', JSON.stringify(flow, null, 2));
    alert('Flow saved successfully. Check console for output.');
  };

  return <button onClick={handleSave} className="save-button">Save Flow</button>;
};

export default SaveButton;