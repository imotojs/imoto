const {getEl} = require('./tools');

module.exports = (self) => {
  if (self.$$template && self.$$el) {
    var dom = getEl(self.$$el);
    if (!dom) return;
    if (dom && self.$$el !== 'body') dom.innerHTML = self.$$template;
    else dom.innerHTML = self.$$template + dom.innerHTML;
    self.$$dom = dom;
  }
};
