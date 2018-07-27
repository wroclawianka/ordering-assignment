export class OrderService {
    apiUrl = "http://localhost:3001";
    ordersPath = this.apiUrl + "/api/orders";
    headers = {
        "Content-Type": "application/json"
    };

    addToOrders(data) {
        let options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: this.headers
        };
        return fetch(this.ordersPath, options)
            .then(response => response.json())
            .catch(err => err);
    }
}