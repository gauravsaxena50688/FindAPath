import 'phaser';
class GameScore extends Phaser.Scene {
    private scorePoint : number = 0;
    private scoreText: Phaser.GameObjects.Text;
    constructor () {
        super('gamescore');
    }

    create() {
        this.addScore();
    }

    public updateScore (score: number) : void {
        this.scorePoint = this.scorePoint + score;
        this.scoreText.setText("Score : "+this.scorePoint);
    }

    public clearScore() : void {
        this.scorePoint = 0;
        this.scoreText.setText("Score : "+this.scorePoint);
    }

    private addScore () : void {
        let container = this.add.container();
        this.scoreText = this.add.text(0, 0, 'Score :'+this.scorePoint);
        this.scoreText.setFontSize(20);
        this.scoreText.setColor("red");
        container.add(this.scoreText);
        container.x = 400;
        container.y =  120;
    }

    
}
export default GameScore;