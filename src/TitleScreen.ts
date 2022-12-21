import 'phaser';
import GameBackground from './GameBackground';
class TitleScreen extends Phaser.Scene {
    preload() {
        this.load.image('logo', 'assets/phaser3-logo.png');
        this.load.image('libs', 'assets/libs.png');
        this.load.glsl('bundle', 'assets/plasma-bundle.glsl.js');
        this.load.glsl('stars', 'assets/starfields.glsl.js');
    }
    create() {
        this.add.shader('RGB Shift Field', 0, 0, (this.game.config.width as number), (this.game.config.height as number)).setOrigin(0);
        const text = this.add.text(0, 0, 'FIND A PATH!!!');
        text.setFontSize(20);
        text.setColor('#FFFFFF');
        text.x = ((this.game.config.width as number) - text.width) / 2;
        text.y = ((this.game.config.height as number) - text.height) / 2;
        const text2 = this.add.text(0, 0, 'Press Space to start',{fontFamily:`"Press Start 2P"`});
        text2.setFontSize(50);
        text2.x = ((this.game.config.width as number) - text2.width) / 2;
        text2.y = text.y + text.height + 5;

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.stop('titlescreen');
            this.scene.start('gamebackground')
        });

    }

}
export default TitleScreen;