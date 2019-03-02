import { AuthService } from '../services/auth.service';
import { Routing } from '../core/routing.service';

export class AuthGuard {
    constructor() {
        this._authService = new AuthService();
        this._routing = new Routing();
    }

    check() {
        if (!this._authService.userId && !this._authService.token) {
            this._routing.navigate(`/login`);
            return false;
        }

        return true;
    }
}