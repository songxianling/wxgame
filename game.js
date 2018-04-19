import './weapp-adapter';
import './global-data';

import Main from './main';
new Main()





// import './databus';
// import DataBus from './databus'
// export default class Game {
//   constructor(){
//     window.dataBus = new DataBus();
//     // this.dataBus = new DataBus();
//   }
// }


// // console.log(dataBus);
// let ctx = canvas.getContext('2d')
// // var canvas = wx.createCanvas();
// // console.log(canvas.width, canvas.height)
// const WIDTH = canvas.width;
// const HEIGHT = canvas.height;
// // 背景
// let bg = wx.createImage();
// // bg.width = canvas.width;
// // bg.height = canvas.height;
// bg.src = 'images/timg.jpg';
// bg.onload = function () {
//   ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT)
// }
// // 锤子
// let c = wx.createImage();
// c.src = 'images/c5.ico';
// c.onload = function () {
//   ctx.drawImage(c, dataBus.cx, dataBus.cy, 70, 70)
// }

// let c6 = wx.createImage();
// c6.src = 'images/c6.ico';

// // wx.onTouchStart(function (e) {
// //   console.log(e.touches[0].clientY);
// //   let cx = e.touches[0].clientX;
// //   let cy = e.touches[0].clientY - 14;
// //   // ctx.clearRect(cx, cy, 70, 70);
// //   ctx.drawImage(c, cx, cy, 70, 70)
// //   // console.log(e.touches[0].clientX, e.touches[0].clientY)
// // });
// wx.onTouchEnd(function (e) {
//   console.log(e);
//   let cx = e.changedTouches[0].clientX;
//   let cy = e.changedTouches[0].clientY - 14;
  
//   // ctx.clearRect(cx, cy, 70, 70);
//   dataBus.cx = cx;
//   dataBus.cy = cy;
//   console.log(dataBus);
//   ctx.drawImage(c, dataBus.cx, dataBus.cy, 70, 70)
//   // console.log(e.touches[0].clientX, e.touches[0].clientY)
// });