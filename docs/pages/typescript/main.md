# 笔记

 - `FC(function component)` 带 `children`  `vfc` `不带children`,`fc` 不推荐，多余
 - `interface`  在不知道数据是什么类型，如对接接口，写sdk时使用。在自己声明对象是不需要用，ts会自动类型推断
    ```ts
            interface A {
                str: string
                num: number
            }
            //不需要 interface
            const a: A = {
                str: "123",
                num: 123
            }
    ```
 - 解构数组时
 
    ```ts
    function test() {
        const str = "str"
        const num = 1
        //错误
        // return [str, num] //这样使用时 t 和 f 都是联合类型 string | number

        //正确
        // return [str, num] as const //这样使用时 t 是string  f 是 number 更精确
        return tr(str, num) //使用封装工具
    }
    const [t, f] = test()
    console.log(t)
    console.log(f)

    //强制转换为数组
    function tr<T extends unknown[]>(...ele: T): T {
        return ele
    }
   ```
- {} 是万能类型 但与 object相等,小写object只表示类型
- Function 不要做类型使用
