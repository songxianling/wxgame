import BackGround from './runtime/background';
import DataBus from './databus';

let ctx = canvas.getContext('2d');
let databus = new DataBus();
export default class Main {
    constructor() {
        this.restart();
    }
    restart(){    
        databus.init();
        this.bg = new BackGround(ctx);
        this.loop();
    }
    render(){
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.bg.render(ctx)
    }
    update(){
        if(databus.gameOver){
            return
        }
    }
    loop(){
        this.update();
        this.render()
        window.requestAnimationFrame(this.loop.bind(this),canvas)
    }
}





// export default class Main {
//     constructor() {
//         this.ctx = ctx;
//         const WIDTH = canvas.width;
//         const HEIGHT = canvas.height;
//         // 背景
//         let bg = wx.createImage();
//         bg.src = 'images/timg.jpg';
//         bg.onload = function () {
//             ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT)
//         }
//         // 锤子
//         let c = wx.createImage();
//         c.src = 'images/c5.ico';
//         console.log(this.dataBus);

//         c.onload = function () {
//             ctx.drawImage(c, dataBus.cx, dataBus.cy, 70, 70)
//         }
//         let c6 = wx.createImage();
//         c6.src = 'images/c6.ico';
//         wx.onTouchStart(function (e) {     
//             dataBus.cx = e.touches[0].clientX;
//             dataBus.cy = e.touches[0].clientY - 14;
//             console.log(dataBus);
//             ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT)
//             ctx.drawImage(c, dataBus.cx, dataBus.cy, 70, 70)
//             // console.log(e.touches[0].clientX, e.touches[0].clientY)
//         });
//     }
// }