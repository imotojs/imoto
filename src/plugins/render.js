const {attrEls} = require('./tools');

// [{if: el1, show: el2, text: el3, html: el4}]
// bindVM，这里在一个对象的某个属性发生变化时需要告知所有的父属性，并在deepwatch时触发其事件
// 重点在于defineProperty的重写与读取

module.exports = (self) => {
  // 在初次赋值以及setter函数触发时调用，为当前变量绑定的VM完成指定行为
  const setVMs = (VMs, newVal) => {
    const parse = (val) => {
      return typeof val === 'object' ? JSON.stringify(val) : val;
    };
    const deal = (vm, key) => {
      if (key.indexOf('@') === 0) {
        if (typeof newVal !== 'function') return console.error('Imoto Warning: should\'t set method as not a function');
        // bind events
        vm.addEventListener(key.substr(1, key.length - 1), newVal.bind(self.$$pointers));
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
