import { AuthService } from '../services/auth.service';
import { Routing } from '../core/routing.service';
import { NewsService } from '../services/news.service';

export class NewsComponent {
    constructor() {
        this._authService = new AuthService();
        this._routing = new Routing();
        this._newsService = new NewsService();
        
        this._authToken = this._authService.token;
    }
    
    async beforeRender() {
        if (!this._authToken) return;
        
        this._news = await this._newsService.getNews(this._authToken);
        
        console.log(this._news);
    }
    
    render() {
        return `
            <div class="card mb-3" style="max-width: 540px;">
              <div class="row no-gutters">
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <img src="${this._news.news[0].pictures[0].url}" class="card-img" alt="...">
              </div>
            </div>
        `;
    }
    
    afterRender() {
    
    }
    
}