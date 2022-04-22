# 路由模式

## hash
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title></title>
  </head>
  <body>
    <ul>
      <li><a href="#/">turn white</a></li>
      <li><a href="#/blue">turn blue</a></li>
      <li><a href="#/green">turn green</a></li>
    </ul>
  </body>
  <script type="text/javascript">
    function Router() {
      this.routes = {};
      this.currentUrl = '';
    }
    Router.prototype.route = function(path, callback) {
      this.routes[path] = callback || function() {}; //把所有调用route的路由地址 存进对象并做为回调函数 每次更新的时候触发对应的效果
    };
    Router.prototype.refresh = function() {
      this.currentUrl = location.hash.slice(1) || '/';
      this.routes[this.currentUrl]();
    };
    Router.prototype.init = function() {
      window.addEventListener('load', this.refresh.bind(this), false); //加载完成 更新路由
      window.addEventListener('hashchange', this.refresh.bind(this), false); //发生变化 更新路由
    };
    window.Router = new Router();
    window.Router.init();

    Router.route('/', function() {
      changeBgColor('white');
    });
    Router.route('/blue', function() {
      changeBgColor('blue');
    });
    Router.route('/green', function() {
      changeBgColor('green');
    });

    var content = document.querySelector('body');
    // change Page anything
    function changeBgColor(color) {
      content.style.backgroundColor = color;
    }
  </script>
</html>

```

## history

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title></title>
  </head>
  <body>
    <!-- history  -->
    <ul id="history">
      <li><a href="/">index</a></li>
      <li><a href="/shop">shop</a></li>
      <li><a href="/new">news</a></li>
    </ul>
  </body>
  <script>
    let historyDom = document.querySelector('#history');

    function Router() {
      this.routes = {};
      this.currentUrl = '';
    }
    Router.prototype.route = function(path, callback) {
      this.routes[path] = callback || function() {}; //把所有调用route的路由地址 存进对象并做为回调函数 每次更新的时候触发对应的效果
    };
    Router.prototype.refresh = function() {
      this.currentUrl = location.pathname || '/';
      console.log(this.currentUrl);
      this.routes[this.currentUrl] && this.routes[this.currentUrl]();
    };
    Router.prototype.init = function(dom) {
      this.proxyA(dom);
      window.addEventListener('load', this.refresh.bind(this), false); //加载完成 更新路由
      window.addEventListener('popstate', this.refresh.bind(this), false); //发生变化 更新路由
    };

    Router.prototype.proxyA = function(dom) {
      let _this = this;
      dom.onclick = function(e) {
        let targetDom = e.target;
        if (targetDom.nodeName !== 'A') return;
        e.preventDefault();
        let route = targetDom.getAttribute('href');
        window.history.pushState({}, route, route);
        _this.refresh();
      };
    };
    window.Router = new Router();
    window.Router.init(historyDom);

    Router.route('/', function() {
      changeBgColor('white');
    });
    Router.route('/shop', function() {
      changeBgColor('blue');
    });
    Router.route('/new', function() {
      changeBgColor('green');
    });

    var content = document.querySelector('body');
    // change Page anything
    function changeBgColor(color) {
      content.style.backgroundColor = color;
    }
  </script>
</html>

```