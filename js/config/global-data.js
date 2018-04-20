import DataBus from '../databus'

/**
 * 全局data
 * 这样做的好处是对于几乎所有页面都要import的模块，或者是一些配置参数
 * 可以很方便的一次引入 到处使用
 * 需要挂载在window对象下（本为global对象，wx-adapter封装到了window对象下
 */
// 屏幕长宽
window.screenWidth = window.innerWidth
window.screenHeight = window.innerHeight
window.pixelRatio = window.devicePixelRatio

window.databus = new DataBus()