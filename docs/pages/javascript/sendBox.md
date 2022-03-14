## 沙箱简单实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
<script>
    /**
     *  沙箱环境 （就是用一个新空对象做傀儡，不管做什么操作都是操作这个傀儡，傀儡再记录操作改变window 的值（其实本质使用的window的值），在销毁后把记录好的新增值值删除和和修改前的还原即可）
     *  代理对象 window ，使用api es6 Proxy实现  (使用iframe 实现 参考：https://blog.csdn.net/alitech2017/article/details/106213288)
     *  代理window创造沙箱环境，不可污染 window环境变量，
     *  1. 对于新增的代理值，做记录， 销毁代理模式后，需要删除代理值，以及 window 值
     *  2. 对于window 已存在的值，做修改记录，销毁代理模式后，需要还原 window的值
     *  
     *  需要用到的存储
     *  es6 new Set()
     *  1. cacheNewProps 记录新增的代理值
     *  2. cacheInitProps 记录修改前的代理值
     * 
     *  沙箱还原（沙箱销毁后再还原功能）
     *  需要记录沙箱创建了哪些属性，再销毁沙箱后再还原属性
     *  1. recordSendBoxProps 记录沙箱属性
     *   
    */
    //对代理对象window 的赋值操作
    function setWindowProps(prop,value,del){
        if(!prop){
           return alert('请设置正确的代理prop')
        }
        if(del){
            delete window[prop]
        }
        if(value){
            window[prop] = value
        }
    }

    class SendBox {
        
        constructor(appName){
            this.proxy=null
            //记录新增的值 销毁后删除
            this.cacheNewProps=new Map()
            //记录修改前的值 销毁后还原
            this.cacheInitProps=new Map()
            //记录沙箱属性
            this.recordSendBoxProps=new Map()
            
            const {cacheNewProps,cacheInitProps,recordSendBoxProps}=this
            const fakeWindow = Object.create(null);
            this.proxy= new Proxy(fakeWindow,{
                set(target, prop, value) {
                    //如果window已存在该值 使用cacheInitProps记录修改前的原始值
                    if(prop in window) {
                       cacheInitProps.set(prop,window[prop]) 
                    }else{
                       cacheNewProps.set(prop,value) 
                    }
                    setWindowProps(prop,value)
                    recordSendBoxProps.set(prop,value)
                    return true;
                },
                get(target, prop) {
                    //本质使用的window的值 ,只有代理window才能获取所有的方法和属性
                    return window[prop];
                },
            })
        }

        active(){
            this.recordSendBoxProps.forEach((value,key)=>{
                setWindowProps(key,value)
            })
        }

        inactive(){ 
            this.cacheNewProps.forEach((value,key)=>{
               setWindowProps(key,null,true)
            })
            this.cacheInitProps.forEach((value,key)=>{
               setWindowProps(key,value)
            })
        }

    }

    window.a='3'

    const mySendBox=new SendBox('appName')
    const myProxy=mySendBox.proxy;

    console.log('window已存在a属性',window.a)
    console.log('myProxy改变a属性')
    myProxy.a='1'
    console.log(myProxy.a)
    console.log(window.a)

    console.log('window不存在b属性',window.b)
    console.log('myProxy改变a属性')
    myProxy.b='2'
    console.log(myProxy.b)
    console.log(window.b)   
    
    console.log('myProxy获取window方法toString')
    console.log(myProxy.toString)
    console.log('myProxy改变window方法toString')
    myProxy.toString='changeToString'
    console.log(myProxy.toString)
    console.log(window.toString)

    console.log('销毁沙箱')
    mySendBox.inactive()
    console.log('销毁沙箱后获取a,b,toString属性',myProxy.a,myProxy.b,myProxy.toString)
    console.log('销毁沙箱后获取a,b,toString属性',window.a,window.b,window.toString)

    console.log('重新激活沙箱')
    mySendBox.active()
    console.log('重新激活沙箱后获取a,b,toString属性',myProxy.a,myProxy.b,myProxy.toString)
    console.log('重新激活沙箱后获取a,b,toString属性',window.a,window.b,window.toString);


</script>
</html>

```