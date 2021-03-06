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
            product: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
    }

    componentWillMount() {
        this.fetchProduct(this.state.item.productId)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            item: nextProps.item
        })
    }

    shouldComponentUpdate(nextProps){
        return (!this.isProductEmpty() && !this.isItemChanged(nextProps))? false : true;
    }

    fetchProduct(id) {
        this.productService.fetchProduct(id)
        .then(data => {
            this.setState({
                product: new Product(data.description, data.category)
            })
        })
    }
    
    handleChange(event){
        let quantity = parseInt(event.target.value, 10);
        let total = this.state.item.unitPrice * quantity;
        this.props.changedItem({
            ...this.state.item,
            quantity: quantity,
            total: total
        });
    }
    
    handleRemoveItem(){
        this.props.removedItem(this.state.item)
    }
    
    isProductEmpty(){
        return this.state.product === "";
    }

    isItemChanged(nextProps){
        return this.state.item !== nextProps.item;
    }

    render() {
        return (
            <div className="ordered-item">
                <div className="product description">
                    <h4>{this.state.product.description}</h4>
                    <span className="category">Cat. {this.state.product.category}</span>
                </div>
                <div className="calculations">
                    <div className="item unitPrice">
                        <p className="label">Price</p>
                        <p className="value">{this.state.item.unitPrice}</p>
                    </div>
                    <div className="item quantity">
                        <p className="label">Quantity</p>
                        <input className="form-control" type="number" name="quantity" value={this.state.item.quantity} min="1" onChange={this.handleChange}/>
                    </div>
                    <div className="item total">
                        <p className="label">Total</p>
                        <p className="value">{this.state.item.total}</p>
                    </div>
                    <div className="trash">
                        <p className="trash-icon">
                        <i className="far fa-trash-alt" onClick={this.handleRemoveItem}></i>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}