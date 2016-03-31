module.exports = {
  getEl(query, el) {
    return (el || document).querySelector(query);
  },
  getEls(query, el) {
    return (el || document).querySelectorAll(query);
  },
  attrEls(el, attr, value) => {
    return Array.prototype.slice.call(el.querySelectorAll('[' + attr + '=\'' + value + '\']'));
  },
  getVal(obj, str) {},
  setVal(obj, str, value) {}
};
