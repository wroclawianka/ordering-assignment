import React from "react";
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
    
    render() {
        return (
        <div className="order-page container">
            <div className="title">
                <h1>Order Page</h1>
            </div>
            <div className="row">
                <div className="order-details col col-lg-9 col-md-9 col-xs-9 col-xs-offset-1">
                    <h2>Details</h2>
                    <div className="items-list">
                        {this.state.items.map((item) => {
                            return (
                                <OrderedItem key={item.productId} item={item}/>
                            )
                        })}
                    </div>
                    <div className="total">TOTAL {this.state.total}</div>
                </div>
                <div className="col col-lg-3 col-md-3 col-xs-3 col-xs-offset-1">
                    <AdditionalProductsList/>
                </div>
            </div>
        </div>
    )}
}