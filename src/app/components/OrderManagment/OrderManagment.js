import React from "react";
import update from 'immutability-helper';
import './OrderManagment.css'
import { OrderedItem } from "./../OrderedItem/OrderedItem";
import { AdditionalProductsList } from "./../AdditionalProductsList/AdditionalProductsList";
import { CurrentOrderService } from "../../services/CurrentOrderService/CurrentOrderService";
import { Item } from "./Models/Item";

export class OrderManagment extends React.Component {
    constructor(props) {
        super(props);
        this.currentOrderService = new CurrentOrderService();
        this.state = {
            customerId: this.props.customerId,
            items: [],
            total: 0
        }
    }

    componentDidMount() {
        this.fetchCurrentOrder();
    }

    fetchCurrentOrder() {
        this.currentOrderService.fetchCurrentOrder(this.state.customerId)
        .then(data =>  {
            let orderItems = []
            data.items.forEach(item => {
                let productId = item["product-id"]
                let quantity = parseInt(item["quantity"], 10)
                let unitPrice = parseFloat(item["unit-price"], 10)
                let total = parseFloat(item["total"], 10)

                orderItems.push(new Item(productId, quantity, unitPrice, total));
            })
            let orderTotal = data.total
            
            this.setState({
                items: orderItems,
                total: orderTotal
            })
        });
    }
    
    onQuantityChanged(changedItem) {
        let itemIndex = this.state.items.findIndex(item => item.productId === changedItem.productId);
        this.setState({
            items : update(this.state.items, 
                {[itemIndex]: 
                    { quantity: 
                        {$set : changedItem.quantity}
                    }})
        })
    }

    onRemovedItem(removedItem) {
        let itemIndex = this.state.items.findIndex(item => item.productId === removedItem.productId);
        this.setState( {
                items : update(this.state.items, {$splice: [[itemIndex, 1]] })
            })
    }

    render() {
        return (
        <div className="order-page container">
            <div className="title">
                <h1>Your Order</h1>
            </div>
            <div className="row">
                <div className="order-details col col-lg-9 col-md-9 col-xs-9 col-xs-offset-1">
                    <h2>Details</h2>
                    <div className="items-list">
                        {this.state.items.map((item) => {
                            return (
                                <OrderedItem key={item.productId} item={item} changedItem={this.onQuantityChanged.bind(this)} removedItem={this.onRemovedItem.bind(this)}/>
                            )
                        })}
                    </div>
                    <div className="total">{this.state.total} TOTAL</div>
                    <div className="place-order">
                        <button type="button" className="btn btn-primary">Place an order</button>
                    </div>
                </div>
                <div className="col col-lg-3 col-md-3 col-xs-3 col-xs-offset-1">
                    <AdditionalProductsList/>
                </div>
            </div>
        </div>
    )}
}