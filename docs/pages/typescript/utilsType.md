# 工具类型

## Record
  > Record的内部定义，接收两个泛型参数；Record后面的泛型就是对象键和值的类型

```ts
type keys = 'A' | 'B' | 'C'
const result: Record<keys, number> = {
  A: 1,
  B: 2,
  C: 3
}

或

interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const nav: Record<Page, PageInfo> = {//key 为Page,value 为 pageinfo 对象，对象key为title，value类型为string
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};
console.log(nav)

//record 与 key in 
type firstkey = "a" | "b" | "c" 
type secondkey = "contact" | "home" | "about" 
type secondvalue = "home" | "about" | "contact"
const nav2: Record<firstkey, { [key in secondkey]?: secondvalue }> = {
  a: { contact: "about" },
  b: { home: "contact" },
  c: { about: "home" }
}

const nav3: { [key in firstkey]: { [key in secondkey]?: secondvalue } } = {
  a: { contact: "about" },
  b: { home: "contact" },
  c: { about: "home" }
}

console.log(nav2.a.contact)
console.log(nav3.a.contact)

```
## Partial
  > 生成一个新类型，该类型与 T 拥有相同的属性，但是所有属性皆为可选项


```ts
源码定义:
type Partial<T> = {
    [P in kefof T]?: T[P]
}

interface Foo {
    name: string
    age: number
}
type Bar = Partial<Foo>
// 相当于
type Bar = {
    name?: string
    age?: string
}

```

## Required
  > 生成一个新类型，该类型与 T 拥有相同的属性，但是所有属性皆为必选项


```ts
type Require<T> = {
    [p in keyof T]-?: T[P]
}

interface Foo {
    name: string
    age?: number
}
type Bar = Required<Foo>
// 相当于
type Bar = {
    name: string
    age: string
}
```

## Pick
  > 生成一个新类型，该类型拥有 T 中的 K 属性


```ts
type Pick<T, K extends keyof T> = {
    [p in K]: T[K]
}

interface Foo {
    name: string
    age?: number
    gender: string
}
type Bar = Pick<Foo, 'age' | 'gender'> 
// 相当于 bar 拥有 只拥两个属性
type Bar = {
    age?: string
    gender: string
}
```


## Exclude
  > 如果 T 是 U 的子类型则返回 never 不是则返回 T

```ts
type Exclude<T, U> = T extends U ? never : T


type A = number | string | boolean
type B = number | boolean

type Foo = Exclude<A, B>
// 相当于
type Foo = string
```


## Extract
  > 和 Exclude 相反

```ts
type Extract<T, U> = T extends U ? T : never


type A = number | string | boolean
type B = number | boolean

type Foo = Exclude<A, B>
// 相当于
type Foo = number | boolean
```


## Omit
  > ：生成一个新类型，该类型拥有 T 中除了 K 属性以外的所有属性

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>> 


type Foo = {
	name: string
	age: number
}

type Bar = Omit<Foo, 'age'>
// 相当于
type Bar = {
	name: string
}
```

## NonNullable
  > 从泛型 T 中排除掉 null 和 undefined

```ts
type NonNullable<T> = T extends null | undefined ? never : T;

type t = NonNullable<'name' | undefined | null>;
/* type t = 'name' */
```

## ReturnType
  > 获得函数返回值的类型

```ts
ReturnType<T extends (...args: any) => any>

type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
type t = ReturnType<(name: string) => string | number>
// type t = string | number
```

## is
```ts
// 判断参数是否为string类型, 返回布尔值
function isString(s:unknown):s is string{
  return typeof s === 'string'
}

// 判断参数是否为字符串,是在调用转大写方法
function ifUpperCase(str:unknown){

  if(isString(str)){
    str.toUpperCase()
    // (parameter) str: string
  }
}
```