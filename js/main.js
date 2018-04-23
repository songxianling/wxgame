import BackGround from './runtime/background';
import Player from './player/index';
import Mouse from './mouse/mouse';

let ctx = canvas.getContext('2d');
export default class Main {
    constructor() {
        // 维护当前requestAnimationFrame的id
        this.aniId = 0

        this.restart();
        // this.ready();
    }
    restart() {
        databus.init();
        this.bg = new BackGround(ctx);
        this.player = new Player(ctx);
        // this.mouse1 = new Mouse(ctx);
        this.loop();
        // 创建地鼠
        for (let i = 0; i < 9; i++) {
            let enemy = 'enemy' + i;
            enemy = databus.pool.getItemByClass('enemy', Mouse)
            enemy.init(6, i)
            enemy.visible = false
            databus.enemys.push(enemy)
        }
        this.renderGameScore(ctx, databus.score)

        this.bindLoop = this.loop.bind(this)
        // 清除上一局的动画
        console.log('重新开始游戏');
        // 监听按钮点击
        this.touchEventHandler()
        window.cancelAnimationFrame(this.aniId);

        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
    }

    // 随机显示地鼠
    enemyGenerate() {
        if (databus.frame % 30 === 0) {
            let i = rnd(0, 9);
            if (!databus.enemys[i].visible) {
                databus.enemys[i].visible = true
            }
            setTimeout(function () {
                databus.enemys[i].visible = false
            }, 3000)
        }
    }
    // 触摸开始按钮
    touchEventHandler() {
        canvas.addEventListener('touchstart', ((e) => {
            e.preventDefault()
            let x = e.touches[0].clientX
            let y = e.touches[0].clientY
            let startBtn = databus.startBtn
            if (x >= startBtn.startX &&
                x <= startBtn.endX &&
                y >= startBtn.startY &&
                y <= startBtn.endY) {
                console.log(7777);

                this.ready();
            } else {
                console.log(77);
            }
        }).bind(this))

    }
    // 开始游戏按钮
    startGame() {
        ctx.fillStyle = "red"
        ctx.font = "20px Arial"
        ctx.fillText(
            `点击开始游戏`,
            screenWidth / 2 - 50,
            screenHeight / 2 - 100 + 355
        )
    }
    // 开始倒计时
    renderReadyTime() {
        ctx.fillStyle = "#ffffff"
        ctx.font = "20px Arial"

        ctx.fillText(
            `准备好；要开始了 ${databus.startNum} s`,
            100,
            300, 200, 200
        )
    }
    // 游戏分数
    renderGameScore(ctx, score) {
        ctx.fillStyle = "#ffffff"
        ctx.font = "20px Arial"

        ctx.fillText(
            '当前分数：' + score,
            100,
            100, 100, 100
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
        // 实现命中敲击之后的爆炸动画
        databus.animations.forEach((ani) => {
            if (ani.isPlaying) {
                ani.aniRender(ctx)
            }
        })
        // this.renderReadyTime();
        // this.touchEventHandler()
        this.startGame()
        this.renderGameScore(ctx, databus.score)

    }

    // 倒计时
    ready() {
        let time1 = setInterval(function () {
            databus.startNum--;
            if (databus.startNum <= 0) {
                clearInterval(time1);
            }
        }, 1000)
    }
    update() {
        if (databus.gameOver) {
            return
        }
        // this.bg.update()
        if (databus.startNum <= 0) {
            this.enemyGenerate()
        }
    }
    loop() {
        databus.frame++

            this.update()
        this.render()
        this.aniId = window.requestAnimationFrame(this.loop.bind(this), canvas)
    }
}

function rnd(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}