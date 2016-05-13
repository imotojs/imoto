(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Imoto"] = factory();
	else
		root["Imoto"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _require = __webpack_require__(2);

	var getEl = _require.getEl;

	var Imoto = function () {
	  function Imoto() {
	    var _this = this;

	    _classCallCheck(this, Imoto);

	    var pointers = {};
	    var props = this.props;
	    var data = this.data;
	    var methods = this.methods;
	    var template = this.template;
	    var styleSheet = this.styleSheet;
	    var created = this.created;
	    var ready = this.ready;

	    [props, data, methods].forEach(function (obj) {
	      if (!obj) return;
	      for (var key in obj) {
	        pointers[key] = obj[key];
	      }
	    });
	    this.$$pointers = pointers;
	    this.$$styleSheet = styleSheet;
	    if (created) created.call(pointers);
	    this.$$dom = document.createElement('div');
	    this.$$dom.innerHTML = template;
	    // 调用渲染
	    ['pubsub', 'render', 'setStyle'].forEach(function (name) {
	      __webpack_require__(3)("./" + name)(_this);
	    });
	    if (ready) ready.call(pointers);
	  }

	  _createClass(Imoto, [{
	    key: 'render',
	    value: function render(selector) {
	      var rootEl = getEl(selector);
	      rootEl.appendChild(this.$$dom);
	    }
	  }], [{
	    key: 'use',
	    value: function use(plugin) {
	      plugin(this);
	    }
	  }]);

	  return Imoto;
	}();

	module.exports = Imoto;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var toArr = function toArr(map) {
	  return Array.prototype.slice.call(map);
	};

	module.exports = {
	  getEl: function getEl(query, el) {
	    return (el || document).querySelector(query);
	  },
	  getEls: function getEls(query, el) {
	    return (el || document).querySelectorAll(query);
	  },

	  toArr: toArr,
	  attrEls: function attrEls(el, value) {
	    var VMs = {};
	    var walk = function walk(node) {
	      if (node.nodeType === 1) {
	        toArr(node.attributes).forEach(function (attr) {
	          var name = attr.name;
	          var nodeValue = attr.nodeValue;

	          var params = nodeValue.match(/{{(.*?)}}/g);
	          params = params ? params.map(function (item) {
	            return item.replace(/[ {}]/g, '');
	          }) : params;
	          if (params && params.indexOf(value) !== -1) {
	            attr.$$temp = nodeValue;
	            attr.$$value = nodeValue;
	            attr.$$param = value;
	            if (!VMs.$reps) VMs.$reps = [attr];else VMs.$reps.push(attr);
	            attr.nodeValue = nodeValue.replace('{{' + value + '}}', '');
	          }
	          if (name === ':for') {
	            var keyVal = nodeValue.split(' in ');
	            if (keyVal.length === 2 && keyVal[1] === value) {
	              if (!VMs[name]) VMs[name] = [_defineProperty({}, keyVal[0], node)];else VMs[name].push(_defineProperty({}, keyVal[0], node));
	              node.removeAttribute(name);
	            }
	          } else if (name.indexOf(':') === 0 && value === nodeValue) {
	            if (!VMs[name]) VMs[name] = [node];else VMs[name].push(node);
	            node.removeAttribute(name);
	          } else if (name.indexOf('@') === 0) {
	            var args = nodeValue.match(/\((.*)\)/);
	            if (nodeValue === value || nodeValue.indexOf(value + '(') === 0) {
	              args = args ? args[1] : '';
	              if (!VMs[name]) VMs[name] = [{ args: args, node: node }];else VMs[name].push({ args: args, node: node });
	              node.removeAttribute(name);
	            } else if (args && args[1].indexOf(value) !== -1) {
	              if (!VMs[':bind']) VMs[':bind'] = [{ value: value, node: node }];else VMs[':bind'].push({ value: value, node: node });
	            }
	          }
	        });
	        if (node.hasChildNodes()) toArr(node.childNodes).forEach(walk);
	      }
	    };
	    walk(el);
	    return VMs;
	  },
	  extend: function extend(prop, copy) {
	    if (prop === null || (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) !== 'object') return prop;
	    if (prop.constructor !== Object && prop.constructor !== Array) return prop;
	    if (prop.constructor === Date || prop.constructor === RegExp || prop.constructor === Function || prop.constructor === String || prop.constructor === Number || prop.constructor === Boolean) return new prop.constructor(prop);

	    copy = copy || new prop.constructor();

	    for (var name in prop) {
	      copy[name] = typeof copy[name] === 'undefined' ? module.exports.extend(prop[name], null) : copy[name];
	    }
	    return copy;
	  },
	  getVal: function getVal(obj, str) {},
	  setVal: function setVal(obj, str, value) {}
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./pubsub": 4,
		"./pubsub.js": 4,
		"./render": 5,
		"./render.js": 5,
		"./setStyle": 6,
		"./setStyle.js": 6,
		"./tools": 2,
		"./tools.js": 2
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 3;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (self) {
	  self.$on = function (name, callback) {};
	  self.$emit = function (name) {};
	  self.$dispatch = function (name) {};
	  self.$broadcast = function () {};
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _require = __webpack_require__(2);

	var attrEls = _require.attrEls;
	var extend = _require.extend;

	// [{if: el1, show: el2, text: el3, html: el4}]
	// bindVM，这里在一个对象的某个属性发生变化时需要告知所有的父属性，并在deepwatch时触发其事件
	// 重点在于defineProperty的重写与读取

	module.exports = function (self) {
	  // 在初次赋值以及setter函数触发时调用，为当前变量绑定的VM完成指定行为
	  var setVMs = function setVMs(VMs, newVal, pointers, pointerKey) {
	    var parse = function parse(val) {
	      if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
	        val = JSON.parse(JSON.stringify(val));
	        delete val.$$name;
	        return JSON.stringify(val);
	      }
	      return val;
	    };
	    var deal = function deal(vm, key) {
	      if (key.indexOf('$') === 0) {
	        // replace
	        if (vm.$$value.indexOf(vm.$$param) !== 0) vm.$$temp = vm.$$value;
	        vm.$$value = vm.$$temp.replace('{{' + vm.$$param + '}}', parse(newVal));
	        vm.nodeValue = vm.$$value;
	      } else if (key.indexOf('@') === 0) {
	        if (typeof newVal !== 'function') return console.error('Imoto Warning: should\'t set method as not a function');
	        // bind events
	        var method = function method() {
	          // 解析当前需要的变量
	          var argNames = vm.args ? vm.args.split(',').map(function (item) {
	            return item.trim();
	          }) : [];
	          var args = argNames.length ? argNames.map(function (key) {
	            return vm.node.$$params[key];
	          }) : [];
	          newVal.apply(self.$$pointers, args);
	        };
	        var name = key.substr(1, key.length - 1);
	        if (vm.node['$$' + name]) vm.node.removeEventListener(vm.node['$$' + name]);
	        vm.node['$$' + name] = method;
	        vm.node.addEventListener(name, vm.node['$$' + name]);
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
	              vm[item].$$parent.$$forArr.forEach(function (node) {
	                vm[item].$$parent.removeChild(node);
	              });
	              vm[item].$$parent.$$forArr = [];
	              newVal.forEach(function (itemVal, index) {
	                // 同样需要记住父节点
	                var node = vm[item].cloneNode(true);
	                walk(node, extend(self.$$pointers, _defineProperty({ $index: index }, item, itemVal)));
	                vm[item].$$parent.$$forArr.push(node);
	                vm[item].$$parent.appendChild(node);
	              });
	            }
	            break;
	          case ':if':
	            // 这里是需要重新绑定的，坑。
	            if (newVal && vm.$$next) {
	              setTimeout(function () {
	                if (vm.$$next) vm.$$parent.insertBefore(vm, vm.$$next);else vm.$$parent.appendChild(vm);
	                delete vm.$$parent;
	                delete vm.$$next;
	              });
	            } else {
	              vm.$$parent = vm.parentNode;
	              vm.$$next = vm.nextSibling;
	              setTimeout(function () {
	                vm.parentNode.removeChild(vm);
	              });
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
	          case ':model':
	            vm.value = newVal;
	            if (!vm.$$model) {
	              vm.$$model = function (newVal) {
	                pointers[pointerKey] = event.target.value;
	              };
	              vm.addEventListener('input', vm.$$model.bind(self.$$pointers));
	            }
	            break;
	        }
	      }
	    };
	    for (var key in VMs) {
	      VMs[key].forEach(function (vm) {
	        deal(vm, key);
	      });
	    }
	  };

	  // 通过指定属性值获取当前组件所有该属性值VM
	  var getVMs = function getVMs(dom, name, val, pointers, key) {
	    var VMs = attrEls(dom, name);
	    setVMs(VMs, val, pointers, key);
	    return VMs;
	  };

	  // 重写pointers所有属性
	  var defineProp = function defineProp(pointers, key, VMs) {
	    var val = pointers[key];
	    if (pointers[key] instanceof Function) return;
	    Object.defineProperty(pointers, key, {
	      set: function set(newVal) {
	        val = newVal;
	        setVMs(VMs, newVal);
	      },
	      get: function get() {
	        return val;
	      }
	    });
	  };

	  // 遍历pointers
	  var walk = function walk(dom, pointers) {
	    if (!pointers) return;
	    if ((typeof pointers === 'undefined' ? 'undefined' : _typeof(pointers)) === 'object' && !pointers.length) {
	      for (var key in pointers) {
	        var child = pointers[key];
	        var isObj = child && (typeof child === 'undefined' ? 'undefined' : _typeof(child)) === 'object';
	        var VMs;
	        if (isObj) {
	          if (!child.$$name) child.$$name = key;else child.$$name += '.' + key;
	          VMs = getVMs(dom, child.$$name, child, pointers, key);
	          defineProp(pointers, key, VMs);
	          walk(dom, child);
	        } else {
	          VMs = getVMs(dom, key, child, pointers, key);
	          defineProp(pointers, key, VMs);
	        }
	      }
	    }
	  };
	  walk(self.$$dom, self.$$pointers);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var getEl = _require.getEl;


	module.exports = function (self) {
	  var el = getEl('style#i-style');
	  if (!el) {
	    el = document.createElement('style');
	    el.id = 'i-style';
	    document.head.appendChild(el);
	  }
	  if (self.$$styleSheet) el.innerHTML += self.$$styleSheet;
	};

/***/ }
/******/ ])
});
;