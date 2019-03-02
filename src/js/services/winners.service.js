import { ENV } from '../config/env';
import { Http } from '../core/http.service';

export class WinnersService {
    constructor() {}
    
    getWinners(limit = 10, part = 1) {
        const http = new Http();
    
        const headers = {
            'Content-Type': 'application/json'
        };
        
        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/winners?part=${part}&limit=${limit}`, headers)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }
}