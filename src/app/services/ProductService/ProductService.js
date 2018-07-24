export class ProductService {
    apiUrl = "http://localhost:3001";
    productsPath = this.apiUrl + "/api/products";
    headers = {
        "Content-Type": "application/json"
    };

    fetchProduct(id) {
        const url = this.productsPath + `/${id}`
        const options = {
            method: "GET",
            headers: this.headers,
        };
        return fetch(url, options)
            .then(response => response.json())
            .catch(err => err);
    }
}