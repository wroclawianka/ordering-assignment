import React from "react";
import update from 'immutability-helper';
import './OrderManagment.css'
import { OrderedItem } from "./../OrderedItem/OrderedItem";
import { AdditionalProductsList } from "./../AdditionalProductsList/AdditionalProductsList";
import { CurrentOrderService } from "../../services/CurrentOrderService/CurrentOrderService";
import { OrderService } from "../../services/OrderService/OrderService";
import { Item } from "./Models/Item";
import { CurrentOrder } from "./Models/CurrentOrder";

export class OrderManagment extends React.Component {
    constructor(props) {
        super(props);
        this.currentOrderService = new CurrentOrderService();
        this.orderService = new OrderService();
        this.statuses = {
            onClientSide : "Order on the client's side",
            success : "Success. You order is already in progress", 
            failure : "Failure. Please, check your order"
        }
        this.state = {
            currentOrder: new CurrentOrder(this.props.customerId, [], 0),
            orderStatus: '',
        }
        this.showOrderStatus = this.showOrderStatus.bind(this);
        this.placeAnOrder = this.placeAnOrder.bind(this);
    }

    componentDidMount() {
        this.fetchCurrentOrder();
    }

    fetchCurrentOrder() {
        this.currentOrderService.fetchCurrentOrder(this.state.currentOrder.customerId)
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
            

            this.setState((prevState) => {
                return { 
                    currentOrder: {
                        customerId: prevState.currentOrder.customerId,
                        items: orderItems,
                        total: orderTotal
                    },
                    orderStatus: this.statuses.onClientSide}
            })
        });
    }
    
    onQuantityChanged(changedItem) {
        let itemIndex = this.state.currentOrder.items.findIndex(item => item.productId === changedItem.productId);
        this.setState({
            currentOrder : update(this.state.currentOrder, 
                {items: {[itemIndex]: 
                    { quantity: 
                        {$set : changedItem.quantity}
                    }}})
        })
    }

    onRemovedItem(removedItem) {
        let itemIndex = this.state.currentOrder.items.findIndex(item => item.productId === removedItem.productId);
        this.setState( {
                currentOrder : update(this.state.currentOrder, {items: {$splice: [[itemIndex, 1]] }})
            })
    }

    checkOrderStatus(id) {
        if(id) {
            return this.statuses.success;
        } else {
            return this.statuses.failure;
        }
    }

    // ifOrderIsEmpty(){
    //     return this.state.currentOrder.items.length <= 0
    // }

    showOrderStatus(id){
        this.setState({
            orderStatus: this.checkOrderStatus(id)
        })
    }

    placeAnOrder(){
        this.orderService.addToOrders(this.state.currentOrder)
        .then(data => this.showOrderStatus(data.id));
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
                        {this.state.currentOrder.items.map((item) => {
                            return (
                                <OrderedItem key={item.productId} item={item} changedItem={this.onQuantityChanged.bind(this)} removedItem={this.onRemovedItem.bind(this)}/>
                            )
                        })}
                    </div>
                    <div className="status">
                        <p><b>Status:</b> {this.state.orderStatus}</p> 
                    </div>
                    <div className="total">{this.state.currentOrder.total} TOTAL</div>
                    <div className="place-order">
                        <button type="button" className="btn btn-primary" onClick={this.placeAnOrder}>Place an order</button>
                    </div>
                </div>
                <div className="col col-lg-3 col-md-3 col-xs-3 col-xs-offset-1">
                    <AdditionalProductsList/>
                </div>
            </div>
        </div>
    )}
}