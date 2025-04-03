import React from 'react';

function NodeControls({ addNode }) {
  return (
    <div className="controls">
      <button onClick={() => addNode('Cold Email')}>Add Cold Email</button>
      <button onClick={() => addNode('Wait/Delay')}>Add Wait/Delay</button>
      <button onClick={() => addNode('Lead Source')}>Add Lead Source</button>
    </div>
  );
}

export default NodeControls;
