const {getEls, toArr} = require('./tools');

module.exports = (self) => {
  for (var key in self.$$components) {
    var doms = toArr(getEls(key, self.$$dom));
    doms.forEach((dom) => {
      var child = new self.$$components[key](self);
      if (!self.$childs) self.$childs = {};
      self.$childs[child.$$dom.$$id] = child;
      child.render(dom);
    });
  }
};
