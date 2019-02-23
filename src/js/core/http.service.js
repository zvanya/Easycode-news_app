export class Http {
    post(url, data, options) {
        return new Promise((resolve, reject) => {
            // console.log(JSON.stringify(data));
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        });
    }
}
