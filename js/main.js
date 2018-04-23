import BackGround from './runtime/background';
import Player from './player/index';
import Mouse from './mouse/mouse';

let ctx = canvas.getContext('2d');
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
        for (let i = 0; i < 9; i++) {
            let enemy = 'enemy' + i;
            enemy = databus.pool.getItemByClass('enemy', Mouse)
            enemy.init(6, i)
            enemy.visible = false
            databus.enemys.push(enemy)
        }
        this.renderGameScore(ctx,databus.score)
    }

    // 随机显示地鼠
    enemyGenerate() {
        if (databus.frame % 30 === 0) {
            let i = rnd(0, 9);
            databus.enemys[i].visible = true
            setTimeout(function () {
                databus.enemys[i].visible = false
            }, 3000)
        }
    }
    renderGameScore(ctx, score) {
        ctx.fillStyle = "#ffffff"
        ctx.font = "20px Arial"

        ctx.fillText(
            score,
            100,
            100,100,100
        )
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
        databus.animations.forEach((ani) => {
            if (ani.isPlaying) {
                ani.aniRender(ctx)
            }
        })
        this.renderGameScore(ctx,databus.score)

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
