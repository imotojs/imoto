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

	var Imoto = function () {
	  function Imoto(config) {
	    var _this = this;

	    _classCallCheck(this, Imoto);

	    var pointers = {};
	    [config.props, config.data, config.methods].forEach(function (obj) {
	      if (!obj) return;
	      for (var key in obj) {
	        pointers[key] = obj[key];
	      }
	    });
	    this.$$pointers = pointers;
	    this.$$el = config.el;
	    this.$$template = config.template;
	    this.$$styleSheet = config.styleSheet;
	    if (config.created) config.created.call(pointers);
	    // 调用渲染
	    ['pubsub', 'initTemp', 'render', 'setStyle'].forEach(function (name) {
	      __webpack_require__(2)("./" + name)(_this);
	    });
	    if (config.ready) config.ready.call(pointers);
	  }

	  _createClass(Imoto, null, [{
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
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./initTemp": 3,
		"./initTemp.js": 3,
		"./pubsub": 5,
		"./pubsub.js": 5,
		"./render": 6,
		"./render.js": 6,
		"./setStyle": 7,
		"./setStyle.js": 7,
		"./tools": 4,
		"./tools.js": 4
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
	webpackContext.id = 2;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(4);

	var getEl = _require.getEl;


	module.exports = function (self) {
	  if (self.$$template && self.$$el) {
	    var dom = getEl(self.$$el);
	    if (!dom) return;
	    if (dom && self.$$el !== 'body') dom.innerHTML = self.$$template;else dom.innerHTML = self.$$template + dom.innerHTML;
	    self.$$dom = dom;
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

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
	  attrEls: function attrEls(el, value) {
	    var VMs = {};
	    var walk = function walk(node) {
	      if (node.nodeType === 1) {
	        toArr(node.attributes).forEach(function (attr) {
	          var name = attr.name;
	          var nodeValue = attr.nodeValue;

	          if (name.search(/[:@]/) === 0 && value === nodeValue) {
	            if (!VMs[name]) VMs[name] = [node];else VMs[name].push(node);
	            node.removeAttribute(name);
	          }
	        });
	        if (node.hasChildNodes()) toArr(node.childNodes).forEach(walk);
	      }
	    };
	    walk(el);
	    return VMs;
	  },
	  getVal: function getVal(obj, str) {},
	  setVal: function setVal(obj, str, value) {}
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (self) {
	  self.$on = function (name, callback) {};
	  self.$emit = function (name) {};
	  self.$dispatch = function (name) {};
	  self.$broadcast = function () {};
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _require = __webpack_require__(4);

	var attrEls = _require.attrEls;

	// [{if: el1, show: el2, text: el3, html: el4}]
	// bindVM，这里在一个对象的某个属性发生变化时需要告知所有的父属性，并在deepwatch时触发其事件
	// 重点在于defineProperty的重写与读取

	module.exports = function (self) {
	  // 在初次赋值以及setter函数触发时调用，为当前变量绑定的VM完成指定行为
	  var setVMs = function setVMs(VMs, newVal) {
	    var parse = function parse(val) {
	      return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val) : val;
	    };
	    var deal = function deal(vm, key) {
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
	  var getVMs = function getVMs(dom, name, val) {
	    var VMs = attrEls(dom, name);
	    setVMs(VMs, val);
	    return VMs;
	  };

	  // 重写pointers所有属性
	  var defineProp = function defineProp(pointers, key, VMs) {
	    var val;
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
	        var isObj = child && (typeof child === 'undefined' ? 'undefined' : _typeof(child)) === 'object' && !child.length;
	        var VMs;
	        if (isObj) {
	          if (!child.$$name) child.$$name = key;else child.$$name += '.' + key;
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(4);

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