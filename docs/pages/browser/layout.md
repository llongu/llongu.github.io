## 重排会导致重绘，重绘不一定会重排

> 触发重排条件

- 页面初始渲染
- 添加/删除可见 DOM 元素
- 改变元素位置
- 改变元素尺寸（宽、高、内外边距、边框等）
- 改变元素内容（文本或图片等）
- 改变窗口尺寸
- 计算 offsetWidth 和 offsetHeight
- 设置 style 属性
- 常见的重排元素
  <table><thead></thead><tbody><tr><td align="center">width</td><td align="center">height</td><td align="center">padding</td><td align="center">margin</td></tr><tr><td align="center">display</td><td align="center">border-width</td><td align="center">border</td><td align="center">top</td></tr><tr><td align="center">position</td><td align="center">font-size</td><td align="center">float</td><td align="center">text-align</td></tr><tr><td align="center">overflow-y</td><td align="center">font-weight</td><td align="center">overflow</td><td align="center">left</td></tr><tr><td align="center">font-family</td><td align="center">line-height</td><td align="center">vertical-align</td><td align="center">right</td></tr><tr><td align="center">clear</td><td align="center">white-space</td><td align="center">bottom</td><td align="center">min-height</td></tr></tbody></table>
- js 避免使用的属性

  offsetTop、offsetLeft、offsetWidth、offsetHeight

  clientTop、clientLeft、clientWidth、clientHeight

  scrollTop、scrollLeft、scrollWidth、scrollHeight

  getComputedStyle()（IE 中 currentStyle）
