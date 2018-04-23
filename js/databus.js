import Pool from './base/pool'

let instance

export default class DataBus {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this;
        this.pool = new Pool()
        this.init()
    }
    init() {
        this.frame = 0
        this.score = 0
        this.surplustime = 30
        this.bullets = []
        this.enemys = []
        this.gameOver = false
        this.animations = []
        this.startNum = 3
        this.startBtn = {
            startX: screenWidth / 2 - 50,
            startY: screenHeight / 2 - 100 + 355,
            endX: screenWidth / 2 + 100,
            endY: screenHeight / 2 - 100 + 395
        }
    }
    removeEnemey(enemy) {
        let temp = this.enemys.shift()

        temp.visible = false

        this.pool.recover('enemy', enemy)
    }
}