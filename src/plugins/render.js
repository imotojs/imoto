const {attrEls} = require('./tools');

// [{if: el1, show: el2, text: el3, html: el4}]
// bindVM，这里在一个对象的某个属性发生变化时需要告知所有的父属性，并在deepwatch时触发其事件
// 重点在于defineProperty的重写与读取
const setVMs = (VMs, newVal) => {

};

const getVMs = (dom, name) => {
  var VMs = {
    text: [],
    html: [],
    for: [],
    if: [],
    show: []
  };
  for (var key in VMs) {
    VMs[key] = attrEls(dom, `${key}`, name);
  }
  return VMs;
};

var walk = (dom, data) => {
  if (!data) return;
  if (typeof data === 'object' && !data.length) {
    for (var key in data) {
      var child = data[key];
      var isObj = typeof child === 'object' && !child.length;
      var VMs;
      if (isObj) {
        if (!child.$$name) child.$$name = key;
        else child.$$name += `.${key}`;
        VMs = getVMs(dom, child.$$name);
        return walk(dom, child);
      } else {
        VMs = getVMs(dom, key);
      }
      Object.defineProperty(data, key, {
        set: (newVal) => {
          console.log(VMs);
          setVMs(VMs, newVal);
        },
        get: undefined
      });
    }
  }
  return data;
};

module.exports = (self) => {
  // 遍历当前组件data与props树，找到当前组件与之对应的所有dom,返回新的值
  self.data = walk(self.$$dom, self.$$pointer);
};
