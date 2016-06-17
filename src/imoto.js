const {getEl, getEls, toArr, copyAttrs} = require('./core/tools');

let core = {};
['pubsub', 'components', 'render', 'setStyle'].forEach((name) => {
  core[name] = require(`./core/${name}`);
});

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
    this.$$directives = Imoto.directives || {};
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
      core[name](this);
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
  setComponent(name, Component) {
    for (var key in this.$childs) {
      var oldChild = this.$childs[key];
      if (oldChild.$$name === name) {
        oldChild.$$dom.parentNode.removeChild(oldChild.$$dom);
        delete this.$childs[key];
      }
    }
    var doms = toArr(getEls(name, this.$$dom));
    doms.forEach((dom) => {
      var child = new Component(this);
      child.$$name = name;
      if (!this.$childs) this.$childs = {};
      dom.$$id = child.$$dom.$$id;
      this.$childs[child.$$dom.$$id] = child;
      child.render(dom);
    });
  }
  static use(plugin) {
    plugin.init(this);
  }
  static addDirective(name, callback) {
    if (!this.directives) this.directives = {[name]: callback};
    else this.directives[name] = callback;
  }
}

module.exports = Imoto;
