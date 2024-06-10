import React from 'eact';
import ReactDOM from 'eact-dom';
import './index.css'; // Import the CSS file

function App() {
  return (
    <div className="container">
      <h1>Welcome to my app!</h1>
      <p>This is a sample app.</p>
      <button>Click me!</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));