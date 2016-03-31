const {attrEls} = require('./tools');

// [{if: el1, show: el2, text: el3, html: el4}]
// bindVM，这里在一个对象的某个属性发生变化时需要告知所有的父属性，并在deepwatch时触发其事件
// 重点在于defineProperty的重写与读取
const bindVM = () => {}

var walk = () => {};

module.exports = (self) => {
  // 遍历当前组件data与props树，找到当前组件与之对应的所有dom,返回新的值
  self.data = walk(self.$$dom, self.data);
  self.props = walk(self.$$dom, self.props);
};
