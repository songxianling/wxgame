import Animation from '../base/animation'

const MOUSE_IMG_SRC = 'images/g3.png'
const MOUSE_WIDTH = 50
const MOUSE_HEIGHT = 50

const __ = {
    speed: Symbol('speed')
}

function rnd(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}

export default class Mouse extends Animation {
    constructor() {
        super(MOUSE_IMG_SRC, MOUSE_WIDTH, MOUSE_HEIGHT)
        this.initExplosionAnimation()
    }

    init(speed,i) {
        // this.x = rnd(0, window.innerWidth - MOUSE_WIDTH);
        // this.y = rnd(0, window.innerHeight - MOUSE_HEIGHT);
        let mouseGridList = [
            {x:70,y:215},
            {x:160,y:215},
            {x:250,y:215},
            {x:60,y:340},
            {x:160,y:340},
            {x:255,y:340},
            {x:60,y:480},
            {x:160,y:480},
            {x:260,y:480}
        ];
        this.x = mouseGridList[i].x;
        this.y = mouseGridList[i].y;
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