# extend

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    <!--<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no"/> -->
    <meta name="format-detection" content="telephone=no" />
    <style>
      * {
        padding: 0;
        margin: 0;
      }

      html,
      body {
        background: #eeeeee;
        position: relative;
        height: 100%;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div id="adf">jq扩展点我</div>
    <div id="adf2">自定义扩展点我</div>
  </body>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script type="text/javascript">
    //封装点击
    (function ($) {
      $.fn.extend({
        DIY: function (opt, time) {
          if (typeof opt == "function") {
            //js

            var Element = null;
            if (this[0].id) {
              Element = document.getElementById(this[0].id);
            } else if (this[0].className) {
              Element = document.getElementsByClassName(this[0].className)[0];
            } else {
              Element = document.getElementsByTagName(this[0].tagName)[0];
            }

            Element.addEventListener(
              "click",
              function () {
                var self = this;
                setTimeout(function () {
                  //该方法指向Window 返回this
                  opt(self);
                }, time);
              },
              false
            );

            //jQ
            //							$(this.selector).on("click",function(){
            //								opt();
            //							})
          }
        },
      });
    })(jQuery);

    $("#adf").DIY(function (This) {
      This.remove();
    }, 500);
    //extend 等于想prototype上挂载方法
    console.log(jQuery.extend === $.extend);
    console.log(jQuery.fn === jQuery.prototype);

    //------------------------
    function test(dom) {
      this.dom = dom;
    }
    test.prototype.click = function (fn) {
      document.getElementById(this.dom).addEventListener("click", function () {
        fn.apply(this, arguments);
      });
    };

    var $test = function (dom) {
      return new test(dom);
    };

    $test("adf2").click(function () {
      console.log(this);
    });
  </script>
</html>
```
