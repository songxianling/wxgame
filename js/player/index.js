import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const PLAYER_IMG_SRC = 'images/c5.png'
const PLAYER_WIDTH = 70
const PLAYER_HEIGHT = 70


export default class Player extends Sprite {
    constructor() {
        super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

        this.x = screenWidth / 2 - this.width / 2
        this.y = screenHeight / 2 - this.height / 2
        // 手指在可操作范围内
        this.touched = false
        this.initEvent()
    }

    /**
     * 当手指触摸屏幕的时候
     * 判断手指是否在锤子上🔨
     * @param {Number} x: 手指的X轴坐标
     * @param {Number} y: 手指的Y轴坐标
     * @return {Boolean}: 用于标识手指是否在🔨上的布尔值
     */

    checkIsFingerOnAir(x, y) {
        const deviation = 30
        console.log(x,y);
        
        return !!(x >= 30 && 
            y >= 200 && 
            x <= 320 && 
            y <= 533
        )
    }
    /**
     * 根据手指的位置设置锤子的位置
     * 保证手指处于锤子中间
     * 同时限定锤子的活动范围限制在屏幕中
     */
    setAirPosAcrossFingerPosZ(x, y) {
        let disX = x - this.width / 2
        let disY = y - this.height / 2

        if (disX < 0)
            disX = 0

        else if (disX > screenWidth - this.width)
            disX = screenWidth - this.width

        if (disY <= 0)
            disY = 0

        else if (disY > screenHeight - this.height)
            disY = screenHeight - this.height

        this.x = disX
        this.y = disY
    }
    /**
     * 玩家响应手指的触摸事件
     * 改变锤子的位置
     */
    initEvent() {
        canvas.addEventListener('touchstart', ((e) => {
            e.preventDefault()
            this.img.src = 'images/c6.png'
            let x = e.touches[0].clientX
            let y = e.touches[0].clientY
            if (this.checkIsFingerOnAir(x, y)) {
                this.touched = true
                let i
                if(x>=80 && x<=130 && y>=210 && y<= 250){
                    i = 0
                }else if(x>=170 && x<=220 && y>=210 && y<= 250){
                    i = 1
                }else if(x>=260 && x<=310 && y>=210 && y<= 250){
                    i = 2
                }else if(x>=70 && x<=120 && y>=340 && y<= 380){
                    i = 3
                }else if(x>=170 && x<=220 && y>=340 && y<= 380){
                    i = 4
                }else if(x>=265 && x<=315 && y>=340 && y<= 380){
                    i = 5
                }else if(x>=70 && x<=120 && y>=480 && y<= 520){
                    i = 6
                }else if(x>=170 && x<=220 && y>=480 && y<= 520){
                    i = 7
                }else if(x>=265 && x<=315 && y>=480 && y<= 520){
                    i = 8
                }
                if(i+1 && databus.enemys[i].visible){
                    databus.score += 5
                    databus.enemys[i].initExplosionAnimation()
                    databus.enemys[i].playAnimation()
                }
                this.setAirPosAcrossFingerPosZ(x, y)
            }
            console.log(databus.startBtn);
            
        }).bind(this))
        canvas.addEventListener('touchend', ((e) => {
            e.preventDefault()
            this.img.src = 'images/c5.png'
        }).bind(this))
    }
}