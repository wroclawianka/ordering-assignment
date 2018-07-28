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
        this.onQuantityChanged = this.onQuantityChanged.bind(this);
        this.onRemovedItem = this.onRemovedItem.bind(this);
        this.onAddItem =  this.onAddItem.bind(this);
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
        let prevOrder = this.state.currentOrder
        let itemIndex = this.findItemIndex(prevOrder.items, changedItem.productId);
        let order = this.updateItem(prevOrder, itemIndex, changedItem);
        let total = this.recalculateTotal(order);
        order = this.updateTotal(order, total)
        this.setState({
            currentOrder : order
        });
    }

    onRemovedItem(removedItem) {
        let prevOrder = this.state.currentOrder;
        let itemIndex = this.findItemIndex(prevOrder.items, removedItem.productId);
        let order = this.removeItem(prevOrder, itemIndex);
        let total = this.recalculateTotal(order);
        order = this.updateTotal(order, total)
        this.setState({
            currentOrder : order
        })
    }

    onAddItem(newItem) {
        let prevOrder = this.state.currentOrder;
        let index = prevOrder.items.findIndex(item => (item.productId === newItem.productId))
        if(index === -1){
            this. addNewItem(prevOrder, newItem);
        }
        else{
            this.increaseQuantity(prevOrder, index, newItem);
        }
    }

    addNewItem(prevOrder, item){
        let order = update(prevOrder, {items: {$push: [item]}})
        let total = this.recalculateTotal(order);
        order = this.updateTotal(order, total);
        this.setState({
                currentOrder: order
            })
    }

    increaseQuantity(prevOrder, index, newItem){
        let item = prevOrder.items[index];
            item = {
                ...item, 
                quantity: item.quantity + newItem.quantity,
                total: item.total + newItem.total,
            }
            let order = this.updateItem(prevOrder, index, item);
            let total = this.recalculateTotal(order);
            order = this.updateTotal(order, total);
            this.setState({
                currentOrder: order
            })
    }
    
    placeAnOrder(){
        this.orderService.addToOrders(this.state.currentOrder)
        .then(data => this.showOrderStatus(data.id));
    }

    // item methods
    findItemIndex(items, id){
        return items.findIndex(item => item.productId === id);
    }
    
    updateItem(order, index, value){
        return update(order, {items: {[index]: {$set: value}}})
    }

    removeItem(order, index){
        return update(order, {items: {$splice: [[index, 1]] }})
    }

    // total methods
    updateTotal(order, value){
        return  update(order, {total: {$set: value}})
    }

    recalculateTotal(order){
        let total = 0;
        order.items.forEach(item => {
            total += item.total;
        })
        return total;     
    }

    // order status methods
    checkOrderStatus(id) {
        return (id) ? this.statuses.success : this.statuses.failure;
    }

    showOrderStatus(id){
        this.setState({
            orderStatus: this.checkOrderStatus(id)
        })
    }

    isOrderEmpty() {
        return this.state.currentOrder.items.length <= 0;
    }

    isOrderProcessed() {
        return this.state.orderStatus === this.statuses.success;
    }

    render() {
        const isBtnDisabled = this.isOrderEmpty() || this.isOrderProcessed();
        
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
                                <OrderedItem key={item.productId} item={item} changedItem={this.onQuantityChanged} removedItem={this.onRemovedItem}/>
                            )
                        })}
                    </div>
                    <div className="status">
                        <p><b>Status:</b> {this.state.orderStatus}</p> 
                    </div>
                    <div className="total">{this.state.currentOrder.total} TOTAL</div>
                    <div className="place-order">
                        <button type="button" className="btn btn-primary" onClick={this.placeAnOrder} disabled={isBtnDisabled}>Place an order</button>
                    </div>
                </div>
                <div className="col col-lg-3 col-md-3 col-xs-3 col-xs-offset-1">
                    <AdditionalProductsList item={this.onAddItem}/>
                </div>
            </div>
        </div>
    )}
}