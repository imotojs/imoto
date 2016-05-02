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
          var params = nodeValue.match(/{{(.*?)}}/g);
          params = params ? params.map((item) => {return item.replace(/[ {}]/g, '');}) : params;
          if (params && params.indexOf(value) !== -1) {
            attr.$$temp = nodeValue;
            attr.$$value = nodeValue;
            attr.$$param = value;
            if (!VMs.$reps) VMs.$reps = [attr];
            else VMs.$reps.push(attr);
            attr.nodeValue = nodeValue.replace(`{{${value}}}`, '');
          }
          if (name === ':for') {
            var keyVal = nodeValue.split(' in ');
            if (keyVal.length === 2 && keyVal[1] === value) {
              if (!VMs[name]) VMs[name] = [{[keyVal[0]]: node}];
              else VMs[name].push({[keyVal[0]]: node});
              node.removeAttribute(name);
            }
          } else if (name.indexOf(':') === 0 && value === nodeValue) {
            if (!VMs[name]) VMs[name] = [node];
            else VMs[name].push(node);
            node.removeAttribute(name);
          } else if (name.indexOf('@') === 0) {
            var args = nodeValue.match(/\((.*)\)/);
            if (nodeValue === value || nodeValue.indexOf(`${value}(`) === 0) {
              args = args ? args[1] : '';
              if (!VMs[name]) VMs[name] = [{args, node}];
              else VMs[name].push({args, node});
              node.removeAttribute(name);
            } else if (args && args[1].indexOf(value) !== -1) {
              if (!VMs[':bind']) VMs[':bind'] = [{value, node}];
              else VMs[':bind'].push({value, node});
            }
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
