import { LoginComponent } from './components/login.component';
import { SignupComponent } from './components/signup.component';
import { HomeComponent } from './components/home.component';
import { NotFoundComponent } from './components/notfound.component';

const routes = {
    '/': new HomeComponent(),
    '/login': new LoginComponent(),
    '/signup': new SignupComponent(),
    '**': new NotFoundComponent()
};

const router = () => {
    const container = document.querySelector('app-container');
    const url = location.hash.slice(1).toLowerCase() || '/';

    const component = routes[url] || routes['**']; 
    container.innerHTML = component.render();
    component.afterRender();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);



