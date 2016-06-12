const components = require('./components');

module.exports = (self) => {
  var val;
  Object.defineProperty(self, 'components', {
    set(newVal) {
      val = newVal;
      var keys = Object.keys(newVal);
      for (let key in self.$childs) {
        let child = self.$childs[key];
        if (keys.indexOf(child.$$name) === -1) {
          child.parentNode.removeChild(child);
          delete self.$childs[key];
        }
      }
      self.$components = newVal;
      components(self);
    },
    get() {
      return val;
    }
  });
};
