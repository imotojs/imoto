class Imoto {
  constructor(config) {
    var pointers = {};
    [config.props, config.data, config.methods].forEach((obj) => {
      if (!obj) return;
      for (var key in obj) {
        pointers[key] = obj[key];
      }
    });
    this.$$pointers = pointers;
    this.$$el = config.el;
    this.$$template = config.template;
    this.$$styleSheet = config.styleSheet;
    if (config.created) config.created.call(pointers);
    // 调用渲染
    ['pubsub', 'initTemp', 'render', 'setStyle'].forEach((name) => {
      require(`./plugins/${name}`)(this);
    });
    if (config.ready) config.ready.call(pointers);
  }
  static use(plugin) {
    plugin(this);
  }
}

module.exports = Imoto;
