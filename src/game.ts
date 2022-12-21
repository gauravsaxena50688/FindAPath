import 'phaser';
import TitleScreen from './TitleScreen';
import GameBackground from './GameBackground';
import GameScore from './GameScore';
import GameOver from './GameOver';
import GamePlay from './GamePlay';
const config = {
    scale: {
        mode: Phaser.Scale.FIT,
        width: window.innerWidth,
        height: window.innerHeight
    }

}
const game = new Phaser.Game(config);
game.scene.add('titlescreen', TitleScreen);
game.scene.add('gamebackground', GameBackground);
game.scene.add('gamescore', GameScore);
game.scene.add('gameplay', GamePlay);
game.scene.add('gameover', GameOver);
game.scene.start('titlescreen');
