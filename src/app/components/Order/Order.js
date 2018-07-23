import React from "react";
import { OrderItemsList } from "./OrderList/OrderItemsList";
import { AdditionalProductsList } from "./AdditionalProductsList/AdditionalProductsList";

export class Order extends React.Component {
    render() {
        return (
        <div>
            <p>I am Order</p>
            <OrderItemsList/>
            <AdditionalProductsList/>
        </div>
    )}
}