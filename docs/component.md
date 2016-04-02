## component自定义属性

**@event** 原有事件或自定义事件,后跟方法函数

**:attr** 属性绑定值，后跟变量

新增属性可能有: `text`, `html`

**:attr.sync** 属性双向绑定值，后跟变量

## component模板定义

```
// example.js

class example extends Imoto {
  // 定义一波数据
  get styleSheet() {
    return `h1 {...}` // 默认为scoped，需要global与scoped时如下
    return {global: ``, scoped: ``}
  },
  get data() {
    return {a: ...} // 该组件定义的内部变量或外部调用属性
  },
  get method() {
    return {
      inputChange() {...} // 该组件定义的方法函数。从中可以通过this取得当前组件与其父类的data
    }
  },
  get component() {
    return {
      example1: require(...)
    }
  },
  // 生命周期相关
  get created() {}, // 页面渲染前自动调用，从中可获得当前组件与其父类的props与data
  get ready() {}, // 页面渲染完成后自动调用
  // 定义模板
  get template() {
    return `<div>
      <span :text="a"></span>
      <input :value.sync="b" @change="inputChange">
      <example1></example1>
    </div>`
  }
}
```
关于从this中emit事件或者做其他事，需要精确设计Imoto类。详见下一篇文档。
