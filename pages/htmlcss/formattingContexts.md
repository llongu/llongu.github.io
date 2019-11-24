## 格式上下文 formatting contexts

- 块级格式化上下文( Block formatting contexts )( BFC )
- 行内格式化上下文( Inline formatting contexts ) ( IFC )
- 自适应格式化上下文( Flex Formatting Contexts )( FFC )（CSS3）
- 网格布局格式化上下文( GridLayout Formatting Contexts )( GFC )（CSS3）

> ### BFC

- **根元素**或其它包含它的元素；
- **浮动** (元素的`float`不为`none`)；
- **绝对定位元素** (元素的`position`为`absolute`或`fixed`)；
- **行内块**`inline-blocks`(元素的 `display: inline-block`)；
- **表格单元格**(元素的`display: table-cell`，HTML 表格单元格默认属性)；
- `overflow`的值不为`visible`的元素；
- **弹性盒 flex boxes** (元素的`display: flex`或`inline-flex`)；

  例：垂直边界 margin 重叠是因为，多个块级盒子垂直相邻边界会以最大的边距为距离，可使用 overflow：hidden 解决，使块之间为不同的 BFC(块级格式上下文，BFC 之间互不影响，就不会导致重叠问题)

  **意义：如 P 标签是块级元素，那么段落之间就不会尝试双倍边距**
