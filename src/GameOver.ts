import 'phaser';

class GameOver extends Phaser.Scene {
    constructor () {
        super('gameover');
    }

    create (data) {
        this.scene.stop('gamebackground');
        this.scene.stop('gamescore');
        let gameover = this.add.text(0, 0, 'GAME OVER!!! PRESS SPACE FOR PLAY AGAIN', {fontFamily:`"Press Start 2P"`});
        gameover.setFontSize(50);
        gameover.x = ((this.game.config.width as number) - gameover.width)/2;
        gameover.y = ((this.game.config.height as number) - gameover.height)/2;
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('titlescreen');
        });
    }
}

export default GameOver;