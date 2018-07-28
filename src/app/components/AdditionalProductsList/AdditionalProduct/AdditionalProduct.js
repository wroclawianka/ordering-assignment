import React from "react";
import "./AdditionalProduct.css"
import { Item } from "./Models/Item";

export class AdditionalProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            product: this.props.product
        };
        this.onAddItem = this.onAddItem.bind(this);
    }

    onAddItem() {
        let item = new Item(this.state.product.id, 1, this.state.product.price, this.state.product.price);
        this.props.item(item);
    }

    render() {
        return (
            <div className="additional-product">
                <div className="product-description" onClick={this.onAddItem}><i className="fas fa-plus"></i>  {this.state.product.description}</div>
                <div className="product-price">{this.state.product.price}</div>
            </div>
        )
    }
}