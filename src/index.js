import React from 'react';
import { render } from 'react-dom';
import './index.css';

class App extends React.Component {
    render() {
      return (
        <div>
          <p>Hello</p>
        </div>
      );
    }
  }
  
render(<App/>, window.document.getElementById("app"))