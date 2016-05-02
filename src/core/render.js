const {attrEls} = require('./tools');

// [{if: el1, show: el2, text: el3, html: el4}]
// bindVM，这里在一个对象的某个属性发生变化时需要告知所有的父属性，并在deepwatch时触发其事件
// 重点在于defineProperty的重写与读取

module.exports = (self) => {
  // 在初次赋值以及setter函数触发时调用，为当前变量绑定的VM完成指定行为
  const setVMs = (VMs, newVal) => {
    const parse = (val) => {
      if (typeof val === 'object') {
        val = JSON.parse(JSON.stringify(val));
        delete val.$$name;
        return JSON.stringify(val);
      }
      return val;
    };
    const deal = (vm, key) => {
      if (key.indexOf('$') === 0) {
        // replace
        if (vm.$$value.indexOf(vm.$$param) !== 0) vm.$$temp = vm.$$value;
        vm.$$value = vm.$$temp.replace(`{{${vm.$$param}}}`, parse(newVal));
        vm.nodeValue = vm.$$value;
      } else if (key.indexOf('@') === 0) {
        if (typeof newVal !== 'function') return console.error('Imoto Warning: should\'t set method as not a function');
        // bind events
        vm.node.addEventListener(key.substr(1, key.length - 1), () => {
          // 解析当前需要的变量
          var argNames = vm.args ? vm.args.split(',').map((item) => {return item.trim();}) : [];
          var args = argNames.length ? argNames.map((key) => {return vm.node.$$params[key];}) : [];
          newVal.apply(self.$$pointers, args);
        });
      } else if (key.indexOf(':') === 0) {
        if (typeof newVal === 'function') return console.error('Imoto Warning: should\'t set data or prop as a function');
        // bind datas
        switch (key) {
          case ':text':
            vm.innerText = parse(newVal);
            break;
          case ':html':
            vm.innerHTML = parse(newVal);
            break;
          case ':value':
            vm.value = parse(newVal);
            break;
          case ':for':
            for (var item in vm) {
              if (vm[item].parentNode) {
                vm[item].$$parent = vm[item].parentNode;
                vm[item].$$parent.removeChild(vm[item]);
              }
              vm[item].$$parent.$$forArr = vm[item].$$parent.$$forArr || [];
              vm[item].$$parent.$$forArr.forEach((node) => {
                vm[item].$$parent.removeChild(node);
              });
              vm[item].$$parent.$$forArr = [];
              newVal.forEach((itemVal, index) => {
                // 同样需要记住父节点
                var node = vm[item].cloneNode(true);
                walk(node, {$index: index, [item]: itemVal});
                vm[item].$$parent.$$forArr.push(node);
                vm[item].$$parent.appendChild(node);
              });
            }
            break;
          case ':if':
            // 这里是需要重新绑定的，坑。
            if (newVal && vm.$$next) {
              setTimeout(() => {
                if (vm.$$next) vm.$$parent.insertBefore(vm, vm.$$next);
                else vm.$$parent.appendChild(vm);
                delete vm.$$parent;
                delete vm.$$next;
              });
            } else {
              vm.$$parent = vm.parentNode;
              vm.$$next = vm.nextSibling;
              setTimeout(() => {vm.parentNode.removeChild(vm);});
            }
            break;
          case ':show':
            vm.style.display = parse(newVal) ? 'block' : 'none';
            break;
          case ':value.sync':
            break;
          case ':bind':
            // 需要apply到某个事件函数的参数
            if (!vm.node.$$params) vm.node.$$params = {};
            vm.node.$$params[vm.value] = newVal;
            break;
        }
      }
    };
    for (var key in VMs) {
      VMs[key].forEach((vm) => {
        deal(vm, key);
      });
    }
  };

  // 通过指定属性值获取当前组件所有该属性值VM
  const getVMs = (dom, name, val) => {
    var VMs = attrEls(dom, name);
    setVMs(VMs, val);
    return VMs;
  };

  // 重写pointers所有属性
  const defineProp = (pointers, key, VMs) => {
    var val;
    Object.defineProperty(pointers, key, {
      set: function(newVal) {
        val = newVal;
        setVMs(VMs, newVal);
      },
      get: function() {
        return val;
      }
    });
  };

  // 遍历pointers
  var walk = (dom, pointers) => {
    if (!pointers) return;
    if (typeof pointers === 'object' && !pointers.length) {
      for (var key in pointers) {
        var child = pointers[key];
        var isObj = child && typeof child === 'object' && !child.length;
        var VMs;
        if (isObj) {
          if (!child.$$name) child.$$name = key;
          else child.$$name += `.${key}`;
          VMs = getVMs(dom, child.$$name, child);
          defineProp(pointers, key, VMs);
          walk(dom, child);
        } else {
          VMs = getVMs(dom, key, child);
          defineProp(pointers, key, VMs);
        }
      }
    }
  };
  walk(self.$$dom, self.$$pointers);
};
