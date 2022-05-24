# redux

## 大致流程

创建 state 和 reducer,传入 createStore 合并 reducer 和 state，添加订阅函数 ，状态获取， dispatch 函数 ，创建 action 封装 dispatch，触发 action,传入事件类型， reducer 处理后返回新的 state，调用订阅函数

```JS
state={
  name:123
}

reducer(state,type){
    switch(type){
        case 'demo'
        return {
            name:'demo',
            ...state
        }
    }
}
createStore(state,reducer){

    listen=[]

    getstate()=>state

    sub(fn){
        listen.push(fn)
    }
    dispatch(state,type){
        state=reducer(state,type)
        listen.foreach(e=>e())
    }
    return{
        getstate,
        sub,
        dispatch
    }
}

store= createStore(state,reducer)
store.sub(()={xxx})
store.dispatch({
    type:'demo'
})

```

## 结合使用

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      #tv {
        width: 700px;
        height: 400px;
        text-align: center;
        line-height: 400px;
        background: #000;
        font-size: 28px;
        color: #fff;
        letter-spacing: 1px;
        margin: 0 auto;
        user-select: none;
      }
      #button {
        width: 100%;
        font-size: 24px;
        padding: 20px 0;
        color: #000;
        text-align: center;
        cursor: pointer;
        user-select: none;
      }
    </style>
  </head>
  <body>
    <div id="tv"></div>
    <div id="button"></div>
  </body>
  <script>
    //数据管理 接收：1.自定义数据修改函数
    const createStore = (setState) => {
      //数据初始化
      let State = {
        isPlay: false,
        tv: {
          title: "暂未开始",
        },
        button: "播放",
      };

      //数据监听数组
      let listenerArr = [];

      //订阅监听
      const subscribe = (listener) => {
        listenerArr.push(listener);
      };

      //数据获取
      const getState = () => State;

      //数据分发  接收：1.修改内容  传入内部state和修改内容
      const dispatch = (action) => {
        //数据修改 setState纯函数，返回新数据
        State = setState(action, State);
        //自动触发监听函数
        listenerArr.forEach((item) => item());
      };

      return { getState, dispatch, subscribe };
    };

    //数据渲染管理
    const renderApp = (nweState, oldState = {}) => {
      renderTv(nweState.tv, oldState.tv);
      renderButtonv(nweState.button, oldState.button);
    };

    const renderTv = (nweState, oldState) => {
      if (nweState === oldState) return;
      document.getElementById("tv").innerHTML = nweState.title;
    };
    const renderButtonv = (nweState, oldState) => {
      if (nweState === oldState) return;
      document.getElementById("button").innerHTML = nweState;
    };

    //自定义数据修改函数 接收：1.修改内容 2.初始化数据
    let setState = (action, State) => {
      switch (action.type) {
        case "play":
          return {
            ...State,
            isPlay: true,
            tv: {
              title: "正在播放中...",
            },
            button: "点击停止",
          };
        case "playOver": //该数据不会重复button
          return {
            ...State,
            tv: {
              title: "播放结束",
            },
          };
        case "stop":
          return {
            ...State,
            isPlay: false,
            tv: {
              title: "暂未开始",
            },
            button: "点击播放",
          };
        default:
          return State;
      }
    };

    //初始化数据管理 传入：1.自定义数据修改函数
    let Store = createStore(setState);
    //记录数据渲染变化
    let oldState = Store.getState();
    //传入需要自动的触发函数
    Store.subscribe(() => {
      //获取 setState后返回的新数据
      let nweState = Store.getState();
      //渲染传入新老数据避免不必要组件数据渲染
      renderApp(nweState, oldState);
      //更新记录
      oldState = nweState;
    });

    //初始化渲染
    renderApp(Store.getState());

    //操作
    document.getElementById("button").addEventListener("click", (e) => {
      if (!Store.getState().isPlay) {
        //未完成在此处添加修改信息
        Store.dispatch({
          type: "play",
        });
        setTimeout(() => {
          Store.dispatch({
            type: "playOver",
          });
        }, 3000);
      } else {
        Store.dispatch({
          type: "stop",
        });
      }

      // renderApp(Store.getState());
    });
  </script>
</html>
```
