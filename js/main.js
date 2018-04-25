import BackGround from './runtime/background';
import Player from './player/index';
import Mouse from './mouse/mouse';

let ctx = canvas.getContext('2d');
export default class Main {
    constructor() {
        // 维护当前requestAnimationFrame的id
        this.aniId = 0
        this.time1
        this.time2
        this.time3
        this.restart();
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
        this.bindLoop = this.loop.bind(this)
        // 清除上一局的动画
        clearInterval(this.time3);
        databus.startNum = 3
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
                this.time3 = setTimeout(function () {
                    if (!databus.enemys.length) {
                        return
                    }
                    databus.enemys[i].visible = false
                }, 3000)
            }

        }
    }
    // 触摸按钮开始
    touchEventHandler() {
        canvas.addEventListener('touchstart', ((e) => {
            e.preventDefault()
            if (databus.startNum) {
                this.ready()
                databus.touchStartGame = true
            }
            if (!databus.touchStartGame) {
                this.restart()
            }
        }).bind(this))
    }
    // 开始倒计时
    ready() {
        let that = this;
        clearInterval(that.time1);
        that.time1 = setInterval(function () {
            databus.startNum--;
            if (databus.startNum <= 0) {
                // 倒计时结束
                clearInterval(that.time1);
                // 文案开始倒计时
                that.gameSurplusTime();
            }
        }, 1000)

    }
    // 开始游戏按钮
    startGame() {
        ctx.fillStyle = "red"
        ctx.font = "20px Arial"
        ctx.fillText(
            `轻触屏幕即可开始游戏`,
            screenWidth / 2 - 100,
            screenHeight / 2 - 100 + 355
        )
    }
    // 开始倒计时的文案
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
    // 游戏剩余时间
    showGameSurplusTime(ctx, surplustime) {
        ctx.fillStyle = "#ffffff"
        ctx.font = "20px Arial"
        ctx.fillText(
            `时间剩余： ${surplustime} s`,
            200,
            100, 100, 100
        )
    }
    render() {
        // 此render函数的执行间隔时长为30ms；如果尽量里面不写方法的执行；只做一些展示的函数执行池
        ctx.clearRect(0, 0, canvas.width, canvas.height)
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
        // 游戏结束并且没有去触摸开始游戏
        if (!databus.touchStartGame) {
            // 显示开始游戏按钮
            this.startGame()
        }
        // 开始倒计时没有结束并且去触摸了开始按钮
        if (databus.startNum > 0 && databus.touchStartGame) {
            // 显示开始倒计时321
            this.renderReadyTime()
        }
        // 一直显示当前分数
        this.renderGameScore(ctx, databus.score)
        // 开始游戏了
        if (databus.startNum <= 0) {
            // 显示剩余时间文案
            this.showGameSurplusTime(ctx, databus.surplustime)

        }
    }

    // 游戏剩余时间文案倒计时
    gameSurplusTime() {
        let that = this
        clearInterval(that.time2)
        that.time2 = setInterval(function () {
            databus.surplustime--;
            if (databus.surplustime <= 0) {
                // 游戏结束
                databus.enemys = []
                databus.gameOver = true
                databus.touchStartGame = false
                clearInterval(that.time2);
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