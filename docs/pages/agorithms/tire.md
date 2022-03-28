# tire树


```js
const level = ['province', 'city', 'name','area']
const data = [
    { 'province': '广东', 'city': '广州', 'name': '小明' ,area:'张三'},
    { 'province': '广东', 'city': '深圳', 'name': '小李' ,area:'李四' },
    { 'province': '广东', 'city': '广州', 'name': '小红' },
  
    { 'province': '广西', 'city': '玉林', 'name': '小蓝' },
    { 'province': '广西', 'city': '横州市', 'name': '小黑' },

    { 'province': '上海', 'city': '黄浦区', 'name': '小白' },
    { 'province': '上海', 'city': '黄浦区', 'name': '小黄' },
    { 'province': '上海', 'city': '黄浦区', 'name': '小张' },
    { 'province': '上海', 'city': '长宁区', 'name': '小粉' },
];


// 输出
// [
//     {
//         "value": "广东",
//         "children":[
//             {
//                 "value": "广州",
//                 "children": [
//                     { "value": "小明" ,children:[{value:'张三'}]},
//                     { "value": "小红" }
//                 ]
//             },
//             {
//                 "value": "深圳",
//                 "children":[
//                     { "value": "小李",children:[{value:'李四'}] }
//                 ]
//             },
//         ]
//     },
//     {
//         "value": "广西",
//         "children":[
//             {
//                 "value": "玉林",
//                 "children": [
//                     { "value": "小蓝" }
//                 ]
//             },
//             {
//                 "value": "横州市",
//                 "children":[
//                     { "value": "小黑" }
//                 ]
//             },
//         ]
//     }
// ]
```

## 一
```js
class TrieNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    findChild(value) {
        for (let child of this.children) {
            if(child.value === value) return child;
        }
        return false;
    }

    addChild(node) {
        this.children.push(node);
    }
}

class TrieTree {
    constructor(arr = []) {
        this.root = new TrieNode(null);
        if (arr.length) {
            this.insert(arr);
        }
    }

    insert(valueArr) { // 塞入关系链
        let node = this.root;
        for (let value of valueArr) {
            const findNode = node.findChild(value);
            if (findNode) node = findNode; // 如果已经有相关子节点，直接指向子节点
            else { // 如果没有，则新建子节点，并将指针指向子节点
                const insertNode = new TrieNode(value);
                node.addChild(insertNode);
                node = insertNode;
            }
        }
    }

    print() {
        const ret = this.getPrintChildren(this.root); // 递归方式输出
        console.log(ret)
    }

    getPrintChildren(node) {
        const ret = [];
        for (let childNode of node.children) { // 遍历子节点
            const retNode = { value: childNode.value }; // 构造当前节点的value值
            if (childNode.children.length) { // 如果当前节点有子节点，再递归并赋值给children属性
                retNode.children = (this.getPrintChildren(childNode));
            }
            ret.push(retNode)
        }
        return ret;
    }
}
const trieTree = new TrieTree(); // 新建一棵树
for (let item of data) {
    const insertData = [];
    for (let key of level) {
        insertData.push(item[key]); // 根据level中的顺序，将对象换成数组
    }
    trieTree.insert(insertData); // 将一整条关系链塞入树中
}

trieTree.print();

```

## 二  

这种依靠名称去匹配父级，如果名称重复会有问题

```js
function createTree(data,level){
    //当前层级的名称
    const newData=[];
    level.forEach(function(name,nameIndex){
        data.forEach(item=>{
            const  newItem={
                value:item[name],
                children:[]
            }
            const itemParent=getParent(newData,nameIndex > 0 ? item[level[nameIndex-1]] : false);
            if(!itemParent){
                //查重 存在就不push了
                if(newData.findIndex(obj=>obj.value===item[name]) === -1){
                    newData.push(newItem);
                }
            }else{
                // //查重 存在就不push了
                if(itemParent['children'].findIndex(obj=>obj.value===item[name]) === -1){
                    itemParent['children'].push(newItem);
                }
            }
        })
    })
    return newData
}

//递归 查找父级 push children
function getParent(data,parentName){
    if(!parentName)return false;
    let childData=''
    for(let i=0;i<data.length;i++){
        if(data[i].value===parentName){
            return data[i];
        }
        if(data[i].children.length){
            childData= getParent(data[i].children,parentName)
        }
        if(childData){
             return childData
        }
    }
}
console.log(createTree(data,level))


```