# 卡片或网格列表自适应宽度布局

 > 都要固定最小宽度，然后宽度+列数撑满盒子，高度可以自适应（height:0;padding-bottom:100%;）

1. 固定列数

    - 固定间距，自适应宽度
    
    - 固定宽度，自适应间距

2. 不固定列数

   - 需要借助媒体查询或js，或者使用grid布局

   - grid可以设置自动填充列，并设置列最小宽度与最大宽度 [参考效果](https://dribbble.com/)

```css
.wrap{
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
    grid-gap:15px;
}

```