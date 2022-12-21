import 'phaser';
class GameBackground extends Phaser.Scene {
    private background: Phaser.GameObjects.Image;
    private jsondata: any;

    constructor() {
        super('gamebackground');
    }
    
    preload() {
        this.load.image('background', 'assets/background.jpg');
        this.load.json('nodeposition', 'assets/nodeposition.json');
    }

    create() {
        this.jsondata = this.cache.json.get('nodeposition');
        this.background = this.add.image(0, 0, 'background');
        this.background.setScale(0.2, 0.2);
        this.background.x = (this.game.config.width as number) / 2;
        this.background.y = (this.game.config.height as number) / 2;
        this.createNode();
    }

    private createNode(): void {
        for (let i: number = 0; i <= 28; i++) {
            let node = this.getNode(i);
            this.drawLine(node);
        }
        for (let obj of this.jsondata["node"]) {
            this.add.rectangle(obj.x, obj.y, 10, 10, 0xFFA500);
        }
        //this.scene.launch('gamescore');
        this.scene.launch('gameplay');
    }

    private drawLine(node: any): void {
        let leftnode: any = (node.left == -1) ? null : this.getNode(node.left);
        let frontnode: any = (node.front == -1) ? null : this.getNode(node.front);
        let rightnode: any = (node.right == -1) ? null : this.getNode(node.right);
        (frontnode != null) && this.add.line(0, 0, node.x, node.y, frontnode.x, frontnode.y, 0x0000FF).setOrigin(0);
        (leftnode != null) && this.add.line(0, 0, node.x, node.y, leftnode.x, leftnode.y, 0x0000FF).setOrigin(0);
        (rightnode != null) && this.add.line(0, 0, node.x, node.y, rightnode.x, rightnode.y, 0x0000FF).setOrigin(0);
    }

    private getNode(point: number): any {
        let nodedata = this.jsondata["node"];
        let currentnodeData = null;
        for (let node of nodedata) {
            if (node.data == point) {
                currentnodeData = node;
                break;
            }
        }
        return currentnodeData;
    }
}
export default GameBackground;