class Imoto {
  constructor(config) {
    var pointer = {};
    [config.props, config.data, config.method].forEach((obj) => {
      if (!obj) return;
      for (var key in obj) {
        pointer[key] = obj[key];
      }
    });
    this.$$pointer = pointer;
    this.$$el = config.el;
    this.$$template = config.template;
    this.$$styleSheet = config.styleSheet;
    if (config.created) config.created.call(pointer);
    // 调用渲染
    ['pubsub', 'initTemp', 'render', 'setStyle'].forEach((name) => {
      require(`./plugins/${name}`)(this);
    });
    if (config.ready) config.ready.call(pointer);
  }
  static use(plugin) {
    plugin(this);
  }
}

module.exports = Imoto;
