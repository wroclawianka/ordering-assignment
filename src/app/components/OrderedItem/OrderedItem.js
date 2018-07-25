import React from "react";
import './OrderedItem.css'
import { ProductService } from './../../services/ProductService/ProductService'
import { Product } from "./Models/Product";

export class OrderedItem extends React.Component {

    constructor(props) {
        super(props);
        this.productService = new ProductService();
        this.state = {
            item: this.props.item,
            product: ''
        }
    }

    componentWillMount() {
        this.fetchProduct(this.state.item.productId)
    }

    fetchProduct(id) {
        this.productService.fetchProduct(id)
            .then(data => {
                this.setState({
                    product: new Product(data.description, data.category)
                })
            })
    }

    render() {
        return (
            <div className="order-details">
                <div className="product">
                    <p>Description: {this.state.product.description}</p>
                    <p>Category: {this.state.product.category}</p>
                </div>
                <div className="ordered-item" key={this.state.item.productId}>
                    <p>Quantity: {this.state.item.quantity}</p>
                    <p>Unit Price: {this.state.item.unitPrice}</p>
                    <p>Total: {this.state.item.total}</p>
                </div>
            </div>
        )
    }
}