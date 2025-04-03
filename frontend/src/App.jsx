import axios from 'axios';
import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodeControls from './components/NodeControls';
import './styles/App.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 0 },
  },
];

const initialEdges = [];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    body: '',
    delay: '',
  });

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = (type) => {
    const id = (nodes.length + 1).toString();
    const newNode = {
      id,
      data: { label: type },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const scheduleEmail = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/emails/schedule`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        alert('Email scheduled successfully!');
      } else {
        alert(`Failed to schedule email: ${response.data.error}`);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        alert(`An error occurred: ${error.response.data.error || error.response.statusText}`);
      } else if (error.request) {
        // No response received from the server
        console.error('No response received:', error.request);
        alert('No response received from the server. Please check your network connection or server status.');
      } else {
        // Other errors
        console.error('Error message:', error.message);
        alert(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div className="app-container">
      <NodeControls addNode={addNode} />
      <div className="flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <div className="email-form">
        <h2>Schedule an Email</h2>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Recipient Email"
        />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="Subject"
        />
        <textarea
          name="body"
          value={formData.body}
          onChange={handleInputChange}
          placeholder="Email Body"
        />
        <input
          type="text"
          name="delay"
          value={formData.delay}
          onChange={handleInputChange}
          placeholder="Delay (e.g., in 1 minute)"
        />
        <button className="schedule-email-btn" onClick={scheduleEmail}>
          Schedule Email
        </button>
      </div>
    </div>
  );
}

export default App;
