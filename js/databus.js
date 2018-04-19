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
        this.bullets = []
        this.enemys = []
        this.gameOver = false
        this.animations = []
    }
    removeEnemey(enemy) {
        let temp = this.enemys.shift()

        temp.visible = false

        this.pool.recover('enemy', enemy)
    }
}