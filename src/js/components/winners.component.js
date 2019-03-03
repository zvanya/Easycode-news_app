import { WinnersService } from '../services/winners.service';

export class WinnersComponent {
    constructor() {
        this._winnersService = new WinnersService();
        
        this._winners;
    }
    
    async beforeRender() {
        this._winners = await this._winnersService.getWinners(5, 1);
    }
    
    render() {
        let marckup = ``;
        let marckupIn = '';
    
        if (!this._winners) {
            marckup += `
                <div class="container">
                  <div class="row" style="padding-top: 40px">
                    <div class="col">
                      Ошибка получения новостей...
                    </div>
                  </div>
                </div>
            `;
        } else if (this._winners.winners.length === 0) {
            marckup += `
                <div class="container">
                  <div class="row" style="padding-top: 40px">
                    <div class="col">
                      Не найдено ни одной новости...
                    </div>
                  </div>
                </div>
            `;
        } else if (this._winners) {
    
            for (let i = 0; i < this._winners.winners.length; i++) {
                marckupIn += `<img src="${this._winners.winners[i].member_id.images[0].image_basic.url}" class="img-thumbnail rounded" alt="..." style="width: auto; height: 300px; margin: 2px">`;
            }
            
            marckup = `
                <div class="container">
                  <div class="row" style="padding-top: 40px">
                    ${marckupIn}
                  </div>
                </div>
            `;
        }
        
        return marckup;
    }
    
    afterRender() {
    
    }
    
}