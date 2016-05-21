const {getEl, copyAttrs} = require('./core/tools');

class Imoto {
  constructor(parent) {
    var pointers = {};
    var {props, data, methods, template,
      styleSheet, created, ready, components} = this;
    [props, data, methods].forEach((obj) => {
      if (!obj) return;
      for (var key in obj) {
        pointers[key] = obj[key];
      }
    });
    if (parent) this.$parent = parent;
    this.$$pointers = pointers;
    this.$$styleSheet = styleSheet;
    if (created) created.call(pointers);
    this.$$dom = document.createElement('div');
    this.$$dom.innerHTML = template;
    this.$$dom.$$id = Math.random().toString();
    this.$$components = components || {};
    if (this.$parent) this.$root = this.$parent.$root;
    else this.$root = this;
    // 调用渲染
    ['pubsub', 'components', 'render', 'setStyle'].forEach((name) => {
      require(`./core/${name}`)(this);
    });
    if (ready) ready.call(pointers);
  }
  render(selector) {
    if (typeof selector === 'string') getEl(selector).appendChild(this.$$dom);
    else {
      if (selector.nextSibling) selector.parentNode.insertBefore(this.$$dom, selector.nextSibling);
      else selector.parentNode.appendChild(this.$$dom);
      // 遍历属性
      copyAttrs(this.$$dom, selector);
      selector.parentNode.removeChild(selector);
    };
  }
  static use(plugin) {
    plugin.init(this);
  }
}

module.exports = Imoto;
