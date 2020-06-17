### 1. Fixed 默认定位浏览器窗口，使用`transform:translate(0,0)`后定位于父级

### 2. 垂直居中与溢出隐藏

```
<style>

/\* 内联元素垂直居中 \*/
.verMiddle::before{
  display: inline-block;

  vertical-align: middle;

  content: '';

  height: 100%;

  width: 0;

  overflow: hidden;
}

.outerLayerWrap{
  width:100px;

  height:100px;

  border:1px  solid  #ccc;

  text-align:center;
}
.innerLayer{
  width:40px;

  height:40px;

  background:red;

  vertical-align:middle;

  display:inline-block;
}

/\*多行文字垂直居中\*/
.father{
  display: table;

  border: 1px  solid  #ccc;

  margin-top: 150px;

  display: flex;

  align-items: center;

  justify-content: space-around;

  flex-direction: column;
}

.children {
  display: table-cell;

  vertical-align: middle;
}


/\* 文字溢出隐藏 \*/

#p {
  width: 15vw;

  white-space: nowrap;

  text-overflow: ellipsis;

  overflow: hidden;/\*超出部分隐藏\*/
}

/\* 多行文字溢出隐藏 仅适用webkit内核 \*/

/\* #p{

width: 15vw;

text-overflow: ellipsis;

overflow: hidden;

display: -webkit-box;

\-webkit-line-clamp: 2;

\-webkit-box-orient: vertical;

} \*/
 </style>
```
