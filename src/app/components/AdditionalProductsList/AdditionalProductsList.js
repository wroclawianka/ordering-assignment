import React from "react";
import { ProductService } from "../../services/ProductService/ProductService";
import { Product } from "./Models/Product";
import { AdditionalProduct } from "./AdditionalProduct/AdditionalProduct";

export class AdditionalProductsList extends React.Component {
    constructor(){
        super();
        this.productService = new ProductService();
        this.state = {
            products: []
        }
        this.onAddItem = this.onAddItem.bind(this);
    }

    componentWillMount() {
        this.fetchTheProducts();
    }

    fetchTheProducts() {
        this.productService.fetchProducts()
        .then(data => {
            let products = []
            data.forEach(product => {
                let price = parseFloat(product.price, 10)
                products.push(new Product(product.id, product.description, product.category, price))
            })
            this.setState({
                products: products
            })
        });
    }

    onAddItem(item){
        this.props.item(item);
    }

    render() {
        return (
            <div className="additional-products-list">
            <div className="title">
                <h3>Add Other Products</h3>
            </div>
            <div className="items-list"> 
                {this.state.products.map((product => {
                    return (
                        <AdditionalProduct key={product.id} product={product} item={this.onAddItem}/>
                    )
                }))}
            </div>
        </div>
        )
    }
}