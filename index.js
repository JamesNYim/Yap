/* Main entry file */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Render the footer outside of the App component
ReactDOM.render(
    <footer>&copy; 2024 Yap. All rights reserved.</footer>,
    document.getElementById('footer')
  );