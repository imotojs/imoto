const toArr = (map) => {
  return Array.prototype.slice.call(map);
};

module.exports = {
  getEl(query, el) {
    return (el || document).querySelector(query);
  },
  getEls(query, el) {
    return (el || document).querySelectorAll(query);
  },
  toArr: toArr,
  attrEls(el, value) {
    var VMs = {};
    var walk = (node) => {
      if (node.nodeType === 1) {
        toArr(node.attributes).forEach((attr) => {
          var {name, nodeValue} = attr;
          if (name === ':for') {
            var keyVal = nodeValue.split(' in ');
            if (keyVal.length === 2 && keyVal[1] === value) {
              if (!VMs[name]) VMs[name] = [{[keyVal[0]]: node}];
              else VMs[name].push({[keyVal[0]]: node});
              node.removeAttribute(name);
            }
          } else if (name.search(/[:@]/) === 0 && value === nodeValue) {
            if (!VMs[name]) VMs[name] = [node];
            else VMs[name].push(node);
            node.removeAttribute(name);
          }
        });
        if (node.hasChildNodes()) toArr(node.childNodes).forEach(walk);
      }
    };
    walk(el);
    return VMs;
  },
  getVal(obj, str) {},
  setVal(obj, str, value) {}
};
