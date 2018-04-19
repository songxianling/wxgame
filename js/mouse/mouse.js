import Animation from '../base/animation'
import DataBus from '../databus'

const MOUSE_IMG_SRC = 'images/c6.ico'
const MOUSE_WIDTH = 70
const MOUSE_HEIGHT = 70

const __ = {
    speed: Symbol('speed')
}

let databus = new DataBus()

function rnd(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}

export default class Mouse extends Animation {
    constructor() {
        super(MOUSE_IMG_SRC, MOUSE_WIDTH, MOUSE_HEIGHT)

    }

    init(speed) {
        this.x = rnd(0, window.innerWidth - MOUSE_WIDTH);
        this.y = rnd(0, window.innerHeight - MOUSE_HEIGHT);
        this[__.speed] = speed
        this.visible = true
    }
    // 每一帧更新子弹位置
    update() {
        // 对象回收
        setTimeout(function(){
            databus.removeEnemey(this)
        },3000)
    }
    // 爆炸
    initExplosionAnimation() {
        let frames = []
        const EXPLO_IMG_PREFIX = 'images/enemy1_down'
        const EXPLO_FRAME_COUNT = 4
        for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
            frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
        }
        this.initFrames(frames)

    }
}