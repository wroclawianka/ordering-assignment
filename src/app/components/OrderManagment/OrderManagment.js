import React from "react";
import './OrderManagment.css'
import { OrderItemsList } from "./OrderList/OrderItemsList";
import { AdditionalProductsList } from "./AdditionalProductsList/AdditionalProductsList";

export class OrderManagment extends React.Component {
    render() {
        return (
        <div className="order-page container">
            <div className="title">
                <h1>Order Page</h1>
            </div>
            <div className="row">
                <div className="col col-lg-9 col-md-9 col-xs-9 col-xs-offset-1">
                    <OrderItemsList/>
                </div>
                <div className="col col-lg-3 col-md-3 col-xs-3 col-xs-offset-1">
                    <AdditionalProductsList/>
                </div>
            </div>
        </div>
    )}
}