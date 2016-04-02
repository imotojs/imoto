class Imoto {
  constructor(config) {
    this.props = config.props;
    this.data = config.data;
    this.method = config.method;
    this.$$el = config.el;
    this.$$template = config.template;
    this.$$styleSheet = config.styleSheet;
    if (config.created) config.created.call(this);
    // 调用渲染
    ['pubsub', 'initTemp', 'render', 'setStyle'].forEach((name) => {
      require(`./plugins/${name}`)(this);
    });
  }
  static use(plugin) {
    plugin(this);
  }
}

module.exports = Imoto;
