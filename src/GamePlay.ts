import 'phaser';
//import GameScore from './GameScore';
import { NONE } from 'phaser';

class GamePlay extends Phaser.Scene {
    private currentNode: any;
    private leftNode: any;
    private rightNode: any;
    private frontNode: any;
    private jsondata: any;
    private moveCircle: Phaser.GameObjects.Arc;
    private playerCircle: Phaser.GameObjects.Arc;
    private moveLeft: Phaser.Input.Keyboard.KeyboardPlugin | Phaser.Input.Keyboard.Key;
    private moveRight: Phaser.Input.Keyboard.KeyboardPlugin | Phaser.Input.Keyboard.Key;
    private moveFront: Phaser.Input.Keyboard.KeyboardPlugin | Phaser.Input.Keyboard.Key;
    private pressEnter: Phaser.Input.Keyboard.KeyboardPlugin | Phaser.Input.Keyboard.Key;
    private passcircle: Phaser.Tweens.Tween;
    private seconds: number = 60;
    private lifeCount: number = 3;
    private scorePoint: number = 0;
    private scoreText: Phaser.GameObjects.Text;
    private lifeCountText;
    private timerValue;


    constructor() {
        super('gameplay');
    }

    preload() {
        this.load.json('nodeposition', 'assets/nodeposition.json');
    }

    create() {
        this.jsondata = this.cache.json.get('nodeposition')['node'];
        this.currentNode = this.getNode(0);
        this.leftNode = this.getNode(this.currentNode.left);
        this.rightNode = this.getNode(this.currentNode.right);
        this.frontNode = this.getNode(this.currentNode.front);
        this.moveCircle = this.add.circle(this.currentNode.x, this.currentNode.y, 10, 0xFFCC00).setStrokeStyle(2, 0xFF5733, 1);
        this.playerCircle = this.add.circle(this.currentNode.x, this.currentNode.y, 11).setStrokeStyle(2, 0xFF0000, 1);
        this.addTimer();
        this.addEventOnButton();
        this.createTimer();
    }

    private addEventOnButton(): void {
        this.moveFront = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.moveLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.moveRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.pressEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.moveFront.on('down', (key, event) => {
            this.moveCircleFront();
        });
        this.moveLeft.on('down', (key, event) => {
            this.moveCircleLeft();
        });
        this.moveRight.on('down', (key, event) => {
            this.moveCircleRight();
        });
        this.pressEnter.on('down', (key, event) => {
            this.setFinalPosition();
        });
    }

    private pauseEventOnButton(): void {
        this.moveFront = this.input.keyboard.disableGlobalCapture();
        this.moveLeft = this.input.keyboard.disableGlobalCapture();
        this.moveRight = this.input.keyboard.disableGlobalCapture();
    }

    private resumeEventOnButton(): void {
        this.moveFront = this.input.keyboard.enableGlobalCapture();
        this.moveLeft = this.input.keyboard.enableGlobalCapture();
        this.moveRight = this.input.keyboard.enableGlobalCapture();
    }

    private setFinalPosition(): void {
        this.tweens.add({
            targets: this.playerCircle,
            x: this.moveCircle.x,
            y: this.moveCircle.y,
            duration: 250,
            ease: 'Sine.inOut',
            onComplete: () => {
                //this.currentNode = null;
                //this.currentNode = this.leftNode;
                this.leftNode = (this.currentNode.left != -1) && this.getNode(this.currentNode.left);
                this.rightNode = (this.currentNode.right != -1) && this.getNode(this.currentNode.right);
                this.frontNode = (this.currentNode.frontNode != -1) && this.getNode(this.currentNode.front);
                this.checkForGameEnd("YOU REACHED TO THE END POINT");
            }
        })

    }

    private moveCircleLeft(): void {
        if ((this.leftNode != null)) {
            this.passcircle = null;
            this.pauseEventOnButton();
            this.passcircle = this.tweens.add({
                targets: this.moveCircle,
                x: this.leftNode.x,
                y: this.leftNode.y,
                duration: 500,
                ease: 'Sine.inOut',
                onComplete: () => {
                    this.currentNode = null;
                    this.currentNode = this.leftNode;
                    /*this.leftNode = this.getNode(this.currentNode.left);
                    this.rightNode = this.getNode(this.currentNode.right);
                    this.frontNode = this.getNode(this.currentNode.front);*/
                    this.resumeEventOnButton();
                }
            });
        }
    }

    private moveCircleFront(): void {
        if ((this.frontNode != null)) {
            this.passcircle = null;
            this.pauseEventOnButton();
            this.passcircle = this.tweens.add({
                targets: this.moveCircle,
                x: this.frontNode.x,
                y: this.frontNode.y,
                duration: 500,
                ease: 'Sine.inOut',
                onComplete: () => {
                    this.currentNode = null;
                    this.currentNode = this.frontNode;
                    /*this.leftNode = this.getNode(this.currentNode.left);
                    this.rightNode = this.getNode(this.currentNode.right);
                    this.frontNode = this.getNode(this.currentNode.front);*/
                    this.resumeEventOnButton();
                }
            });
        }
    }

    private moveCircleRight(): void {
        if ((this.rightNode != null)) {
            this.passcircle = null;
            this.pauseEventOnButton();
            this.passcircle = this.tweens.add({
                targets: this.moveCircle,
                x: this.rightNode.x,
                y: this.rightNode.y,
                duration: 500,
                ease: 'Sine.inOut',
                onComplete: () => {
                    this.currentNode = null;
                    this.currentNode = this.rightNode;
                    /*this.leftNode = this.getNode(this.currentNode.left);
                    this.rightNode = this.getNode(this.currentNode.right);
                    this.frontNode = this.getNode(this.currentNode.front);*/
                    this.resumeEventOnButton();
                }
            });
        }
    }

    private getNode(point: number): any {
        let nodedata = this.jsondata;
        let currentnodeData = null;
        for (let node of nodedata) {
            if (node.data == point) {
                currentnodeData = node;
                break;
            }
        }
        return currentnodeData;
    }

    private checkForGameEnd(message: string): void {
        if ((this.currentNode.left == -1) && (this.currentNode.right == -1)) {
            alert(message);
            this.scorePoint = this.scorePoint + 100;
            this.scoreText.setText("Score : " + this.scorePoint);
            this.reset();
            return;
        }
    }

    private addTimer(): void {
        let container = this.add.container();

        this.scoreText = this.add.text(0, 0, 'Score :'+this.scorePoint);
        this.scoreText.setFontSize(20);
        this.scoreText.setColor("red");

        this.timerValue = this.add.text(0, 0, 'Time : 60');
        this.timerValue.setFontSize(20);
        this.timerValue.setColor("red");
        this.timerValue.x = this.scoreText.x + this.scoreText.width + 200;

        this.lifeCountText = this.add.text(0, 0, 'Life : ' + this.lifeCount);
        this.lifeCountText.setFontSize(20);
        this.lifeCountText.setColor("red");
        this.lifeCountText.x = this.timerValue.x + this.timerValue.width + 200;

        container.add(this.scoreText);
        container.add(this.timerValue);
        container.add(this.lifeCountText);
        
        container.x = 400;
        container.y = 120;
    }

    private reset(): void {
        this.currentNode = null;
        this.leftNode = null;
        this.frontNode = null;
        this.rightNode = null;
        this.currentNode = this.getNode(0);
        this.leftNode = this.getNode(this.currentNode.left);
        this.rightNode = this.getNode(this.currentNode.right);
        this.frontNode = this.getNode(this.currentNode.front);
        this.moveCircle.x = this.currentNode.x;
        this.moveCircle.y = this.currentNode.y
        this.playerCircle.x = this.currentNode.x;
        this.playerCircle.y = this.currentNode.y;
    }

    private createTimer(): void {
        let interval = setInterval(() => {
            this.timerValue.setText("Time : " + this.seconds--);
            if (this.seconds === 0) {
                this.timerValue.setText("Time : " + this.seconds);
                this.lifeCountText.setText("LIFE : " + --this.lifeCount);
                clearInterval(interval);
                this.reset();
                if (this.lifeCount === 0) {
                    this.seconds = 60;
                    this.lifeCount = 3;
                    this.scorePoint = 0;
                    this.scene.stop('gameplay');
                    this.scene.start('gameover');
                    return;
                };
                this.seconds = 60;
                this.createTimer();
            }
        }, 1000);
    }
}

export default GamePlay;