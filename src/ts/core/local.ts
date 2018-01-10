import Game from '../ui/game';

export default class Local {
    constructor() {
        const game = new Game('local');
        game.init();
        game.loop();
    }
}