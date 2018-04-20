import BackGround from './runtime/background';
import DataBus from './databus';
import Player from './player/index';
import Mouse from './mouse/mouse';

let ctx = canvas.getContext('2d');
let databus = new DataBus();
export default class Main {
    constructor() {
        this.restart();
    }
    restart() {
        databus.init();
        this.bg = new BackGround(ctx);
        this.player = new Player(ctx);
        // this.mouse1 = new Mouse(ctx);
        this.loop();
        // this.mouse1.init(6,2)
        // let enemy1 = databus.pool.getItemByClass('enemy', Mouse)
        // enemy1.init(6, 1)
        // enemy1.visible = false
        // console.log(enemy1);

        // databus.enemys.push(enemy1)
        // let enemy2 = databus.pool.getItemByClass('enemy', Mouse)
        // enemy2.init(6, 2)
        // databus.enemys.push(enemy2)

        for (let i = 0; i < 9; i++) {
            let enemy = 'enemy' + i;
            enemy = databus.pool.getItemByClass('enemy', Mouse)
            enemy.init(6, i)
            console.log(1);
            enemy.visible = false
            databus.enemys.push(enemy)
        }
    }
    // 随机显示地鼠
    enemyGenerate() {
        if (databus.frame % 30 === 0) {
            // let enemy = databus.pool.getItemByClass('enemy', Mouse)
            // enemy.init(6, rnd(0, 9))
            let i = rnd(0, 9);
            databus.enemys[i].visible = true
            // console.log(databus.enemys);
            setTimeout(function(){
                databus.enemys[i].visible = false
            },1000)
        }
    }
    render() {
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.bg.render(ctx)
        databus.bullets
            .concat(databus.enemys)
            .forEach((item) => {
                item.drawToCanvas(ctx)
            })
        this.player.drawToCanvas(ctx)
        // databus.animations.forEach((ani) => {
        //     if (ani.isPlaying) {
        //         ani.aniRender(ctx)
        //     }
        // })

    }
    update() {
        if (databus.gameOver) {
            return
        }
        // this.bg.update()
        this.enemyGenerate()
    }
    loop() {
        databus.frame++

            this.update();
        this.render()
        window.requestAnimationFrame(this.loop.bind(this), canvas)
    }
}

function rnd(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
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