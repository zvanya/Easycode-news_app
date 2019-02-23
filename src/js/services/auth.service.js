import { Http } from './../core/http.service';
import { ENV } from './../config/env';

export class AuthService {
    login(email, password) {
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.post(`${ENV.apiUrl}/public/auth/login`, {email, password})
                .then((response) => {
                    if (!response.auth) return reject(response); 
                    localStorage.setItem('sn_user_id', response.id);
                    localStorage.setItem('sn_user_token', response.token);
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }
    
    signup(email, password, nickname, first_name, last_name, phone, gender_orientation, city, country, date_of_birth_day, date_of_birth_month, date_of_birth_year) {
        const http = new Http();
        
        return new Promise((resolve, reject) => {
            http.post(`${ENV.apiUrl}/public/auth/signup`, {email, password, nickname, first_name, last_name, phone, gender_orientation, city, country, date_of_birth_day, date_of_birth_month, date_of_birth_year})
                .then((response) => {
                    if (response.error) return reject(response);
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }
}
