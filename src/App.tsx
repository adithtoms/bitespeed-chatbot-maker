// File: src/App.tsx
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';

import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';
import SaveButton from './components/SaveButton';
import TextNode from './components/CustomNodes/TextNode';
import { NODE_TYPES } from './constants/nodeTypes';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const nodeTypes = {
  [NODE_TYPES.TEXT]: TextNode,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const existingEdge = edges.find((e) => e.source === params.source);
      if (existingEdge) return;
      setEdges((eds) => addEdge(params, eds));
    },
    [edges]
  );

  const handleNodeClick = (_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;
      const reactFlowBounds = (event.target as HTMLDivElement).getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };
      const id = uuidv4();
      setNodes((nds) =>
        nds.concat({
          id,
          type: type as string,
          position,
          data: { label: '' },
        } as Node)
      );
    },
    [setNodes]
  );

  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
    setSelectedNode((sel) => (sel && sel.id === nodeId ? null : sel));
  }, [setNodes, setEdges, setSelectedNode]);

  return (
    <ReactFlowProvider>
      <div className="app-container">
        <div className="flow-wrapper">
          <ReactFlow
            nodes={nodes.map((node) => ({
              ...node,
              data: {
                ...node.data,
                onDelete: handleDeleteNode,
              },
            }))}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            nodeTypes={nodeTypes}
            fitView
            onDrop={onDrop}
            onDragOver={onDragOver}
          />
        </div>
        <div className="right-panel-wrapper">
          <div className="save-btn-row">
            <SaveButton nodes={nodes} edges={edges} />
          </div>
          {selectedNode ? (
            <SettingsPanel
              selectedNode={selectedNode}
              setNodes={setNodes}
              setSelectedNode={setSelectedNode}
            />
          ) : (
            <NodesPanel />
          )}
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
