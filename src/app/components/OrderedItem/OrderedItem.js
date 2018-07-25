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

    changeQuantity(){
        console.log("changeQuantity");
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
                        <input className="form-control" type="number" name="quantity" value={this.state.item.quantity} onChange={this.changeQuantity}/>
                    </div>
                    <div className="item total">
                        <p className="label">Total</p>
                        <p className="value">{this.state.item.total}</p>
                    </div>
                </div>
            </div>
        )
    }
}