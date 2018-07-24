export class CurrentOrderService {
    apiUrl = "http://localhost:3001";
    currentOrderPath = this.apiUrl + "/api/current-orders";
    headers = {
        "Content-Type": "application/json"
    };

    fetchCurrentOrder(customerId) {
        const queryString = this.objToQueryString({
            "customer-id": customerId,
        });
        const url = this.currentOrderPath + `?${queryString}`
        const options = {
            method: "GET",
            headers: this.headers,
        };
        return fetch(url, options)
            .then(response => response.json());
    }

    objToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }
}