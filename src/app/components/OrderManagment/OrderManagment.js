import React from "react";
import './OrderManagment.css'
import { OrderItemsList } from "./OrderList/OrderItemsList";
import { AdditionalProductsList } from "./AdditionalProductsList/AdditionalProductsList";
import { CurrentOrderService } from "../../services/CurrentOrderService/CurrentOrderService";
import { CurrentOrder } from "./Models/CurrentOrder";
import { Item } from "./Models/Item";

export class OrderManagment extends React.Component {
    constructor(props) {
        super(props);
        this.currentOrderService = new CurrentOrderService();
        this.state = {
            customerId: this.props.customerId,
            order: ''
        }
    }

    componentDidMount() {
        this.fetchCustomerOrder();
    }

    fetchCustomerOrder() {
        this.currentOrderService.fetchCurrentOrder(this.state.customerId)
        .then(data =>  {
            let items = [];
            data.items.forEach(item => {
                items.push(new Item(item["product-id"], item["quantity"]));
            })
            let total = data.total; 
            this.setState({
                order : new CurrentOrder(items, total)
            })
        });
    }
    
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