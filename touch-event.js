export default function touchEvent(){
    wx.onTouchStart(e =>{
        let curData = e.changedTouches[0];
        dataBus.touchStartPoint = curData;
    })
}