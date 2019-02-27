import { AuthService } from './../services/auth.service';
import { Routing } from '../core/routing.service';

export class SignupComponent {
    constructor() {
        this._authService = new AuthService();
        this._routing = new Routing();
    }
    
    async beforeRender() {

    }
    
    render() {
        return `
            <div class="auth-wrap d-flex mt-5">
                <div class="auth-form col col-6 mx-auto my-auto">
                    <div class="reg-alert alert" hidden></div>
                    <h3>Enter information for sign up</h3>
                    <p class="text-secondary"></p>
                    <form name="signupForm" novalidate>
                        <div class="form-group">
                            <input type="email" class="form-control form-control-sm" id="email" placeholder="name@example.com" required data-pattern="^S+@[a-z]+.[a-z]+$">
                            <input type="password" class="form-control form-control-sm mt-3" id="password" placeholder="password" required data-pattern="S+">
                            <input type="text" class="form-control form-control-sm mt-3" id="nickname" placeholder="nickname" required>
                            <input type="text" class="form-control form-control-sm mt-3" id="first_name" placeholder="first name" required>
                            <input type="text" class="form-control form-control-sm mt-3" id="last_name" placeholder="last name" required>
                            <input type="text" class="form-control form-control-sm mt-3" id="phone" placeholder="phone" required>
                            <div class="input-group mb-3 mt-3">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="gender_orientation">Sex</label>
                                </div>
                                <select class="custom-select" id="gender_orientation">
                                    <option selected value="1">Male</option>
                                    <option value="2">Female</option>
                                </select>
                            </div>
                            <input type="text" class="form-control form-control-sm mt-3" id="city" placeholder="city" required>
                            <input type="text" class="form-control form-control-sm mt-3" id="country" placeholder="country" required>
                            <input type="text" class="form-control form-control-sm mt-3" id="date_of_birth_day" placeholder="День рождения" required>
                            <input type="text" class="form-control form-control-sm mt-3" id="date_of_birth_month" placeholder="Месяц рождения" required>
                            <input type="text" class="form-control form-control-sm mt-3" id="date_of_birth_year" placeholder="Год рождения" required>
                            <div class="d-flex mt-5">
                                <button type="submit" class="btn btn-primary btn-sm">Sign up</button>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- /.auth-form -->
                <div class="auth-bg col col-6">
                
                </div>
                <!-- /.auth-bg -->
            </div>
            <!-- /.auth-wrap -->
        `;
    }
    
    afterRender() {
        document.forms['signupForm'].addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = e.target.elements['email'].value;
            const password = e.target.elements['password'].value;
            const nickname = e.target.elements['nickname'].value;
            const firstName = e.target.elements['first_name'].value;
            const lastName = e.target.elements['last_name'].value;
            const phone = e.target.elements['phone'].value;
            const sex = e.target.elements['gender_orientation'].value === "1" ? "male" : "female";
            const city = e.target.elements['city'].value;
            const country = e.target.elements['country'].value;
            const dateOfBirthDay = e.target.elements['date_of_birth_day'].value;
            const dateOfBirthMonth = e.target.elements['date_of_birth_month'].value;
            const dateOfBirthYear = e.target.elements['date_of_birth_year'].value;
    
            if (!email || !password || !nickname || !firstName || !lastName || !phone || !sex || !city || !country || !dateOfBirthDay || !dateOfBirthMonth || !dateOfBirthYear) {
                this._showMessage("reg-alert", "alert-warning", "Заполните поля регистрационной формы");
                return;
            }
            
            const data = {
                email: email,
                password: password,
                nickname: nickname,
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                gender_orientation: sex,
                city: city,
                country: country,
                date_of_birth_day: dateOfBirthDay,
                date_of_birth_month: dateOfBirthMonth,
                date_of_birth_year: dateOfBirthYear
            };
            
            this._authService.signup(data)
                .then((response) => {
                    console.log(response);
    
                    const routeToRoot = () => { this._routing.navigate(`/`) };
                    this._showMessage("reg-alert", "alert-success", response.message, 2000).then(routeToRoot);
                })
                .catch((err) => {
                    console.log(err);
                    
                    this._showMessage("reg-alert", "alert-danger", err.message, 5000);
                });
        });
    }
    
    /**
     *
     * @param {String} className
     * @param {String} type
     * @param {String} message
     * @param {Number} delay
     * @private
     */
    _showMessage(className, type, message, delay) {
        return new Promise( (res) => {
            const messageElement = document.querySelector(`.${className}`);
    
            messageElement.innerHTML = message;
            messageElement.classList.add(type);
            messageElement.removeAttribute("hidden");
    
            setTimeout(() => {
                messageElement.setAttribute("hidden", "false");
                messageElement.classList.remove(type);
                res();
            }, delay);
        });
    }

}
