import React from "react";
import './OrderItemsList.css'

export class OrderItemsList extends React.Component {
    render() {
        return (
        <div className="order-details">
            <div className="title">
                <h2>Your Order Details</h2>
            </div>
            <div className="items-list"> 
            </div>
        </div>
        )
    }
}