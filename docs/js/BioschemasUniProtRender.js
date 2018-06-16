var BioschemasUniProtRender = (function () {
'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/*jslint node: true */
"use strict";

var BioschemasUniProtRender$1 = function (_HTMLElement) {
    inherits(BioschemasUniProtRender, _HTMLElement);

    function BioschemasUniProtRender() {
        classCallCheck(this, BioschemasUniProtRender);

        var _this = possibleConstructorReturn(this, (BioschemasUniProtRender.__proto__ || Object.getPrototypeOf(BioschemasUniProtRender)).call(this));

        _this._proteinSchema = {};
        return _this;
    }

    createClass(BioschemasUniProtRender, [{
        key: 'connectedCallback',
        value: function connectedCallback() {}
    }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(name, oldValue, newValue) {
            // name will always be "accession" due to observedAttributes
            this._accession = newValue;
            this._init();
        }
    }, {
        key: '_renderEntry',
        value: function _renderEntry() {
            console.log('render', this._proteinSchema);
            var div = document.createElement('div');
            div.innerText = JSON.stringify(this._proteinSchema, null, 2);
            document.body.appendChild(div);
        }
    }, {
        key: '_init',
        value: function _init() {
            while (this.firstChild) {
                this.removeChild(this.firstChild);
            }

            if (this._accession && this._accession.length !== 0) {
                var adapter = document.createElement('bioschemas-uniprot-adapter');
                var loader = document.createElement('data-loader');
                var source = document.createElement('source');

                source.setAttribute('src', 'https://www.ebi.ac.uk/proteins/api/proteins/' + this._accession);
                loader.appendChild(source);
                adapter.appendChild(loader);
                this.appendChild(adapter);

                this._addLoaderListeners();
            }
        }
    }, {
        key: '_addLoaderListeners',
        value: function _addLoaderListeners() {
            var _this2 = this;

            this.addEventListener('load', function (e) {
                if (e.target !== _this2) {
                    e.stopPropagation();
                    try {
                        if (e.detail.payload.errorMessage) {
                            throw e.detail.payload.errorMessage;
                        }
                        _this2._proteinSchema = e.detail.payload;
                        _this2._renderEntry();
                    } catch (error) {
                        _this2.dispatchEvent(new CustomEvent('error', {
                            detail: error,
                            bubbles: true,
                            cancelable: true
                        }));
                    }
                }
            });
        }
    }, {
        key: 'proteinSchema',
        get: function get$$1() {
            return this._proteinSchema;
        }
    }, {
        key: 'accession',
        get: function get$$1() {
            return this._accession;
        },
        set: function set$$1(acc) {
            this.setAttribute('accession', acc);
        }
    }], [{
        key: 'observedAttributes',
        get: function get$$1() {
            return ['accession'];
        }
    }]);
    return BioschemasUniProtRender;
}(HTMLElement);

if (window.customElements) {
    customElements.define('bioschemas-uniprot-render', BioschemasUniProtRender$1);
}

return BioschemasUniProtRender$1;

}());
//# sourceMappingURL=BioschemasUniProtRender.js.map
