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
            <div className="ordered-item">
                <div className="item product description">
                    <h4>{this.state.product.description}</h4>
                </div>
                <div className="item product category">
                    <p>Cat. {this.state.product.category}</p>
                </div>
                <div className="item unitPrice">
                    <p>{this.state.item.unitPrice}</p>
                </div>
                <div className="item quantity">
                    <p>{this.state.item.quantity}</p>
                </div>
                <div className="item total">
                    <p>{this.state.item.total} TOTAL</p>
                </div>
            </div>
        )
    }
}