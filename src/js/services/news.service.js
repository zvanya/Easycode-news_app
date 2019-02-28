import { ENV } from '../config/env';
import { Http } from '../core/http.service';

export class NewsService {
    constructor() {}
    
    getNews(token) {
        const http = new Http();
    
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': token
        };
        
        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/news`, headers)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }
}