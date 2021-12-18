## 添加页面背景水印

> 借助 canvas 根据传入参数：水印内容，列宽，行间距,旋转 canvas 角度，根据 dom 宽度和传入的列宽间隔计算出每行应该绘制的次数(数量)，使用 x,y 坐标绘制

```js
    this.createWaterMark(
              '我是水印内容',
               document.getElementsByClassName('dom')[0],
              '16px Microsoft JhengHei',
              'rgba(0, 0, 0, 0.5)',
              200, 300
    )


       //水印
     function createWaterMark(text, el, font, color, row=100, col=100) {
              let a = document.createElement("canvas");
              el.appendChild(a),
              a.width = el.offsetWidth;
              a.height = el.offsetHeight;
              a.style.display = "none";

              let f = a.getContext("2d");
              null == f || f.rotate((-10 * Math.PI) / 180);
              f.font = font || "16px Microsoft JhengHei";
              f.fillStyle = color || "rgba(180, 180, 180, 0.3)";
              f.textAlign = "left";
              f.textBaseline = "middle";

              let h=0;
              let w=0;
              for ( h = 0; h < a.height / row; h++){
                  for (w = 0; w < a.width / col; w++){
                    null == f || f.fillText(text, w * col, h * row-10);
                  }
              }

              el.style.backgroundImage = "url(" + a.toDataURL("image/png") + ")";
              a.remove()

   }
```
