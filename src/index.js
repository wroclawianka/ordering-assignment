import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { OrderManagment } from "./app/components/OrderManagment/OrderManagment"

class App extends React.Component {
    render() {
      return (
        <div>
          <OrderManagment/>
        </div>
      );
    }
  }
  
render(<App/>, window.document.getElementById("app"))