## 初始化

放置props与data
执行created
数据与模板绑定
渲染html
插入样式
绑定变量
双向绑定变量
绑定事件
注册绑定自定义事件
实例化子组件
执行ready

## 实例化

```
class example extends Imoto {
  get data() {...},
  get methods() {...},
  get component() {...},
  get created() {...},
  get ready() {...},
  get template() {...},
);

<script>
  (new example()).render('body')
</script>
``` 
