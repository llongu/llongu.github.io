# webComponents

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title></title>
  </head>
  <body>
      
    <my-element>customElements</my-element>

    <p is="word-count" p>customElementsp</p>

  </body>
  <script type="text/javascript">
    class WordCount extends HTMLParagraphElement {
      constructor() {
        // Always call super first in constructor
        super();

        this.addEventListener("click", () => {
          alert("is customElementsp!");
        });
      }
    }
    customElements.define("word-count", WordCount, { extends: "p" });

    class MyElement extends HTMLElement {
      constructor() {
        super();

        this.addEventListener("click", () => {
          alert("customElements!");
        });
      }
    }
    window.customElements.define("my-element", MyElement);
  </script>
</html>
```
