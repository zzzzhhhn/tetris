/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var squareFactory_1 = __webpack_require__(3);
var toolkit_1 = __webpack_require__(4);
var square_1 = __webpack_require__(5);
/**
 * 生成游戏面板
 */

var Game = function () {
    function Game(user) {
        _classCallCheck(this, Game);

        this._user = user;
        this._speed = 3000;
    }
    /**
     * 初始化游戏
     */


    _createClass(Game, [{
        key: "init",
        value: function init() {
            this._gameMatrix = toolkit_1.default.matrix.makeMatrix(0, 10, 20);
            this._nextMatrix = toolkit_1.default.matrix.makeMatrix(1, 4, 4);
            this._currentSquare = new square_1.default(this._nextMatrix);
            this.build();
        }
        /**
         * 刷新主体
         */

    }, {
        key: "refreshGame",
        value: function refreshGame() {
            var _this = this;

            this._gameMatrix = toolkit_1.default.matrix.makeMatrix(0, 10, 20);
            this._currentSquare.matrix.forEach(function (rV, rI) {
                rV.forEach(function (cV, cI) {
                    _this._gameMatrix[_this._currentSquare.y + rI][_this._currentSquare.x + cI] = cV;
                });
            });
            this.refresh(1);
        }
        /**
         * 刷新预览
         * @param {number[][]} nextMatrix
         */

    }, {
        key: "refreshNext",
        value: function refreshNext(nextMatrix) {
            this._nextMatrix = nextMatrix;
            this.refresh(2);
        }
        /**
         * 生成dom
         */

    }, {
        key: "build",
        value: function build() {
            this._gameSquare = new squareFactory_1.default(this._gameMatrix, $('#panel-' + this._user));
            this._gameSquare.build();
            this._nextSquare = new squareFactory_1.default(this._nextMatrix, $('#next-' + this._user));
            this._nextSquare.build();
        }
    }, {
        key: "refresh",
        value: function refresh(val) {
            if (val === 1) {
                this._gameSquare.refresh(this._gameMatrix);
            } else {
                this._nextSquare.refresh(this._nextMatrix);
            }
        }
        /**
         * 循环游戏
         */

    }, {
        key: "loop",
        value: function loop() {
            var _this2 = this;

            setInterval(function () {
                _this2._currentSquare.down();
                _this2.refreshGame();
            }, this._speed);
        }
    }]);

    return Game;
}();

exports.Game = Game;
exports.default = Game;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var local_1 = __webpack_require__(2);
var remote_1 = __webpack_require__(6);
var local = new local_1.default();
var remote = new remote_1.default();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __webpack_require__(0);

var Local = function Local() {
    _classCallCheck(this, Local);

    var game = new game_1.default('local');
    game.init();
    game.loop();
};

exports.default = Local;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 传入二维数组生成 div dom
 */

var SquareFactory = function () {
    function SquareFactory(matrix, $contain) {
        _classCallCheck(this, SquareFactory);

        this._matrix = matrix;
        this._contain = $contain;
    }
    /**
     * 生成方块dom
     */


    _createClass(SquareFactory, [{
        key: "build",
        value: function build() {
            var _this = this;

            this._matrix.forEach(function (row, rowIndex) {
                var rowDiv = $('<div></div>');
                row.forEach(function (col, colIndex) {
                    var colDiv = $('<div></div>');
                    colDiv.addClass('square');
                    colDiv.css({ left: colIndex * 30 + 'px', top: rowIndex * 30 + 'px' });
                    if (col === 0) {
                        colDiv.addClass('none').removeClass('current').removeClass('done');
                    } else if (col == 1) {
                        colDiv.addClass('current').removeClass('none').removeClass('done');
                    } else {
                        colDiv.addClass('done').removeClass('none').removeClass('current');
                    }
                    rowDiv.append(colDiv);
                });
                _this._contain.append(rowDiv);
            });
        }
        /**
         * 刷新方块
         */

    }, {
        key: "refresh",
        value: function refresh(matrix) {
            var _this2 = this;

            console.log(matrix);
            matrix.forEach(function (row, rowIndex) {
                row.forEach(function (col, colIndex) {
                    var div = _this2._contain.find("div:nth-child(" + (rowIndex + 1) + ")").find("div:nth-child(" + (colIndex + 1) + ")");
                    if (col === 0) {
                        div.addClass('none').removeClass('current').removeClass('done');
                    } else if (col == 1) {
                        div.addClass('current').removeClass('none').removeClass('done');
                    } else {
                        div.addClass('done').removeClass('none').removeClass('current');
                    }
                });
            });
        }
    }]);

    return SquareFactory;
}();

exports.SquareFactory = SquareFactory;
exports.default = SquareFactory;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Toolkit = function () {
    function Toolkit() {
        _classCallCheck(this, Toolkit);
    }

    _createClass(Toolkit, null, [{
        key: "matrix",
        get: function get() {
            return MatrixToolkit;
        }
    }]);

    return Toolkit;
}();

exports.Toolkit = Toolkit;
/**
 * 生成矩阵工具类
 * @type {{}}
 */
var MatrixToolkit = {
    /**
     * 生成一维数组工具
     * @param {number} v  值
     * @param {number} l  长度
     * @returns {number[]}
     */
    makeRow: function makeRow() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var l = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

        var arr = new Array(l);
        arr.fill(v);
        return arr;
    },

    /**
     * 生成二位数组矩阵工具
     * @param {number} v 值
     * @param {number} l1 横向长度
     * @param {number} l2 纵向长度
     * @returns {number[][]}
     */
    makeMatrix: function makeMatrix() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var _this = this;

        var l1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
        var l2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;

        // const arr = new Array(l2);
        // arr.map(value => this.makeRow(v,l1));
        var arr = Array.from({ length: l2 }, function () {
            return _this.makeRow(v, l1);
        });
        return arr;
    }
};
exports.default = Toolkit;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Square = function () {
    function Square(matrix) {
        _classCallCheck(this, Square);

        this.x = 2;
        this.y = 0;
        this.matrix = matrix;
    }
    /**
     * 下降
     * @param {number[][]} matrix
     */


    _createClass(Square, [{
        key: "down",
        value: function down() {
            this.y++;
        }
    }]);

    return Square;
}();

exports.default = Square;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __webpack_require__(0);

var Local = function Local() {
    _classCallCheck(this, Local);

    var game = new game_1.default('remote');
    game.init();
};

exports.default = Local;

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map