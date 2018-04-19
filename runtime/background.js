import Sprite from '../base/sprite'

const BG_IMG_SRC = 'images/timg.jpg';
const BG_WIDTH = canvas.width;
const BG_HEIGHT = canvas.height;
export default class BackGround extends Sprite {
    constructor(ctx) {
        super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT);
        this.render(ctx);
    }
    render(ctx) {
        ctx.drawImage(
            this.img,
            0,
            0,
            this.width,
            this.height
        )
       
    }
}