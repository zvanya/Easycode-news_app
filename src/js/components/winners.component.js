import { WinnersService } from '../services/winners.service';

export class WinnersComponent {
    constructor() {
        this._winnersService = new WinnersService();
        
        this._limit = 5;
        this._part = 1;
        this._imgThmbLastId = 0;
        this._imgThmbLastVisible = 0;
        this._winners;
    }
    
    async beforeRender() {
        this._winners = await this._winnersService.getWinners(this._limit, this._part);
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
                marckupIn += this._templateWinnerImg(i, i);
            }
            this._imgThmbLastId = this._winners.winners.length - 1;
            
            marckup = `
                <div class="container">
                  <div id="winners-container" class="row" style="padding-top: 40px">
                    ${marckupIn}
                  </div>
                </div>
            `;
        }
        
        return marckup;
    }
    
    afterRender() {
        window.addEventListener("scroll", async (e) => {
            const lastImgThumbnail = document.getElementById("winners-container").lastElementChild;
            
            if (this._isElementInViewport(lastImgThumbnail) && this._imgThmbLastVisible === 0) {
                this._imgThmbLastVisible = 1;
                // this._part++;
                this._winners = await this._winnersService.getWinners(this._limit, this._part);
                this._renderAddWinners();
            } else if (!this._isElementInViewport(lastImgThumbnail)) {
                this._imgThmbLastVisible = 0;
            }
        });
    }
    
    _renderAddWinners() {
        let marckupIn = ``;
        // console.log(`this._imgThmbLastId: ${this._imgThmbLastId}`);
        for (let i = 0; i < this._winners.winners.length; i++) {
            // debugger;
            marckupIn += this._templateWinnerImg(i, i + this._imgThmbLastId + 1);
        }
    
        document.getElementById("winners-container").insertAdjacentHTML("beforeend", marckupIn);
    
        this._imgThmbLastId += this._winners.winners.length - 1;
    }
    
    /**
     *
     * @param {Number} index
     * @param {Number} idNumber
     * @returns {string}
     * @private
     */
    _templateWinnerImg(index, idNumber) {
        return `<img id=img-thumbnail-${idNumber} src="${this._winners.winners[index].member_id.images[0].image_basic.url}" class="img-thumbnail rounded" alt="..." style="width: auto; height: 300px; margin: 2px">`
    }
    
    _isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        
        return rect.bottom > 0 &&
            rect.right > 0 &&
            rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
            rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */;
    }
    
}