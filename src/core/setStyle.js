const {getEl} = require('./tools');

module.exports = (self) => {
  var el = getEl('style#i-style');
  if (!el) {
    el = document.createElement('style');
    el.id = 'i-style';
    document.head.appendChild(el);
  }
  if (self.$$styleSheet) el.innerHTML += self.$$styleSheet;
};
