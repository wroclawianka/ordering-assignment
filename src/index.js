import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { OrderManagment } from "./app/components/OrderManagment/OrderManagment"

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      customerId : 3 //test value
    }
  }

    render() {
      return (
        <div>
          <OrderManagment customerId={this.state.customerId}/>
        </div>
      );
    }
  }
  
render(<App/>, window.document.getElementById("app"))