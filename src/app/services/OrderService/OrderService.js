export class OrderService {
    apiUrl = "http://localhost:3001";
    ordersPath = "/api/orders";
    yourOrderPath = "/api/your-order";
    headers = {
        "Content-Type": "application/json"
    };

    fetchYourOrder() {
        let options = {
            method: "GET",
            headers: this.headers
        };
        return fetch(this.apiUrl + this.yourOrderPath, options)
            .then(response => response.json());
    }

    addToOrders(data) {
        let options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: this.headers
        };
        return fetch(this.apiUrl + this.ordersPath, options)
            .then(response => response.json())
            .catch(err => err);
    }
}