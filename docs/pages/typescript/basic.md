# 基本类型

```ts

const str: string = '123';
const num: number = 123;
const bool: boolean = false;
const obj: object = {};
const n: null = null;
const u: undefined = undefined;
const as: Array<string> = ['123','456'];

const anytype: any = 123 + '123';
const anyArr: any[] = ['123', 123];

// 元组 明确数组每个成员值类型的数组为元组
const hd: [string, number, boolean]=['123', 123, true]

//用于表示未知的类型 与 any 的区别是 any 不进行 TS 校验，unknown 类型要安全得多，会进行 TS 的类型检查
const unk: unknown = 'unknown'; 

 //void 类型的值可以是 null 或 undefined，但如果 TS 配置开启了 strict 或 strictNullChecks 则不允许 void 为 null。
const vo:void=null || undefined

//函数返回值使用 never与 void 的区别是 never 是永远不会结束的函数，所以也不会有返回值
function nev():never{ 
	throw new Error("出错了")
}

//枚举
enum Color {
  Red = '1',
  Green = 2,
  Blue = 3
}
let a: Color = Color.Red;
let b: Color = Color.Green;
let c: Color = Color.Blue;

//类型断言
let someValue: any = '123123123' || 6;
//例：当不确定someValue是什么类型，但是我需要输出length 所以需要用类型断言 as string或者<string> 类推断
let strLength: string = <string>someValue.length;//或者 (someValue as string).length; 
```