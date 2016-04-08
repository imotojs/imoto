const {getEl} = require('./plugins/tools');

class Imoto {
  constructor() {
    var pointers = {};
    var {props, data, methods, template, styleSheet, created, ready} = this;
    [props, data, methods].forEach((obj) => {
      if (!obj) return;
      for (var key in obj) {
        pointers[key] = obj[key];
      }
    });
    this.$$pointers = pointers;
    this.$$styleSheet = styleSheet;
    if (created) created.call(pointers);
    this.$$dom = document.createElement('div');
    this.$$dom.innerHTML = template;
    // 调用渲染
    ['pubsub', 'render', 'setStyle'].forEach((name) => {
      require(`./plugins/${name}`)(this);
    });
    if (ready) ready.call(pointers);
  }
  render(selector) {
    var rootEl = getEl(selector);
    rootEl.appendChild(this.$$dom);
  }
  static use(plugin) {
    plugin(this);
  }
}

module.exports = Imoto;
