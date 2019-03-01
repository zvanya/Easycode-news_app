import { LoginComponent } from './components/login.component';
import { SignupComponent } from './components/signup.component';
import { NewsComponent } from './components/news.component';
import { HomeComponent } from './components/home.component';
import { NotFoundComponent } from './components/notfound.component';
import { UserComponent } from './components/user.component';
import { ActiveRoute } from './core/active-route.service';

const routes = {
    '/': new HomeComponent(),
    '/login': new LoginComponent(),
    '/signup': new SignupComponent(),
    '/news': new NewsComponent(),
    '/users/:id': new UserComponent(),
    '**': new NotFoundComponent()
};

const activeRoute = new ActiveRoute();

const router = async () => {
    const container = document.querySelector('app-container');
    const request = activeRoute.parseRequestURL();
    const url = (request.resourse ? '/' + request.resourse : '/') + (request.id ? '/:id' : '');

    const component = routes[url] || routes['**'];
    
    try {
        await component.beforeRender();
        container.innerHTML = component.render();
        component.afterRender();
    } catch (e) {
        console.log(`e1 = ${e}`);
    }

};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
