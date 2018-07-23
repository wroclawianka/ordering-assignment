import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { Order } from "./app/components/Order/Order"

class App extends React.Component {
    render() {
      return (
        <div>
          <Order/>
        </div>
      );
    }
  }
  
render(<App/>, window.document.getElementById("app"))