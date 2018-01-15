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
    },

    /**
     * 矩阵顺时针旋转90°解决方案
     * @param {number[][]} matrix
     * @returns {number[][]}
     */
    turnMatrix: function turnMatrix(matrix) {
        var _matrix = {
            matrix: this.makeMatrix(0, 4, 4),
            w: 0,
            h: 0
        };
        _matrix.matrix = _matrix.matrix.map(function (rV, rI) {
            return rV.map(function (cV, cI) {
                return matrix.matrix[3 - cI][rI];
            });
        });
        _matrix.w = matrix.h;
        _matrix.h = matrix.w;
        return _matrix;
    }
};
exports.default = Toolkit;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var local_1 = __webpack_require__(2);
var local = new local_1.default();
var score = 0;
var time = 0;
setInterval(function () {
    time += 0.1;
    $('#m').text(Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60));
    $('#s').text(time % 60 < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60));
    if (local.game.lose) {
        local.socket.emit('lose');
        local.game.lose = false;
    }
    if (local.game.win) {
        local.socket.emit('win');
        local.game.win = false;
    }
    if (!local.game.gameover) {
        local.socket.emit('playing', { game: local.game.gameMatrix, next: local.game.nextMatrix });
        local.socket.on('playing', function (data) {
            local.remote.refreshGame(data.game, data.next);
        });
    }
    if (score !== local.game.score) {
        var count = (local.game.score - score) / 10;
        local.socket.emit('disturb', { count: count });
        score = local.game.score;
    }
}, 1000);
$('#panel-name').show();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __webpack_require__(3);

var Local = function () {
    function Local() {
        var _this = this;

        _classCallCheck(this, Local);

        this._game = new game_1.default('local');
        this._remote = new game_1.default('remote');
        this.bindEvent();
        this._socket = io('http://192.168.50.124:3000');
        this._socket.on('start', function (data) {
            $('#prepare').hide();
            $('#win').hide();
            $('#lose').hide();
            $('#name-remote').text(data.remoteName);
            _this._game.init();
            _this._remote.init();
            _this._game.loop();
            _this._game.start = true;
        });
        this._socket.on('win', function () {
            _this._game.onWin();
        });
        this._socket.on('lose', function () {
            _this._game.onLose();
        });
        this._socket.on('disturb', function (data) {
            _this._game.disturb(data.count);
        });
    }

    _createClass(Local, [{
        key: "bindEvent",

        /**
         * 绑定键盘事件
         */
        value: function bindEvent() {
            var _this2 = this;

            $(document).on('keydown', function (e) {
                if (_this2._game.gameover) {
                    return;
                }
                if (e.keyCode === 38) {
                    _this2._game.currentSquare.turn(_this2._game);
                } else if (e.keyCode === 37) {
                    _this2._game.currentSquare.left();
                } else if (e.keyCode === 39) {
                    _this2._game.currentSquare.right();
                } else if (e.keyCode === 40) {
                    _this2._game.currentSquare.down();
                } else if (e.keyCode === 32) {
                    _this2._game.currentSquare.drop(_this2._game);
                } else {
                    return;
                }
                _this2._game.refreshGame();
            });
            this.bindStart('start');
            this.bindStart('win-again');
            this.bindStart('lose-again');
            $('#btn-name').on('click', function () {
                var name = $('#ipt-name').val();
                if (!!name) {
                    $('#name-local').text(name);
                }
                _this2._socket.emit('nickname', { name: name });
                $('#panel-name').hide();
                $('#prepare').show();
            });
        }
        /**
         * 绑定开始游戏事件工具
         * @param {string} id
         */

    }, {
        key: "bindStart",
        value: function bindStart(id) {
            var _this3 = this;

            $('#' + id).on('click', function () {
                $('#' + id).addClass('disabled');
                $('#' + id).text('等待对手确认...');
                //TODO 点击准备按钮发送准备
                _this3._socket.emit('start', {});
            });
        }
    }, {
        key: "game",
        get: function get() {
            return this._game;
        }
    }, {
        key: "socket",
        get: function get() {
            return this._socket;
        }
    }, {
        key: "remote",
        get: function get() {
            return this._remote;
        }
    }]);

    return Local;
}();

exports.default = Local;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var squareFactory_1 = __webpack_require__(4);
var toolkit_1 = __webpack_require__(0);
var square_1 = __webpack_require__(5);
/**
 * 生成游戏解决方案
 */

var Game = function () {
    function Game(user) {
        _classCallCheck(this, Game);

        this._user = user;
        this._speed = 1000;
    }

    _createClass(Game, [{
        key: "init",

        /**
         * 初始化游戏
         */
        value: function init() {
            this._score = 0;
            this._start = false;
            this._gameOver = false;
            this._win = false;
            this._lose = false;
            $('#score-' + this._user).text(this._score);
            this._gameMatrix = toolkit_1.default.matrix.makeMatrix(0, 10, 20);
            this._nextMatrix = toolkit_1.default.matrix.makeMatrix(0, 4, 4);
            this._currentSquare = new square_1.default();
            this._nextMatrix = this._currentSquare.nextMatrix;
            this.build();
            this.refreshGame();
            this.refreshNext(this._currentSquare.nextMatrix);
        }
        /**
         * 刷新主体
         */

    }, {
        key: "refreshGame",
        value: function refreshGame() {
            var _this = this;

            var gameMatrix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : toolkit_1.default.matrix.makeMatrix(0, 10, 20);
            var nextMatrix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : toolkit_1.default.matrix.makeMatrix(0, 4, 4);

            if (this._user === 'local') {
                var status = 1;
                var left = 3; //方块最左侧位置
                var right = 0; //方块最右侧位置
                this._currentSquare.leftWall = false;
                this._currentSquare.rightWall = false;
                //重置面板
                this._gameMatrix.forEach(function (rV, rI) {
                    return rV.forEach(function (cV, cI) {
                        if (cV === 1) {
                            _this._gameMatrix[rI][cI] = 0;
                        }
                    });
                });
                if (!this.checkDown()) {
                    status = 2;
                }
                //渲染方块所在位置
                this._currentSquare.matrix.forEach(function (rV, rI) {
                    rV.forEach(function (cV, cI) {
                        if (cV) {
                            if (_this._gameMatrix[_this._currentSquare.y + rI]) {
                                _this._gameMatrix[_this._currentSquare.y + rI][_this._currentSquare.x + cI] = status;
                            }
                            right = cI > right ? cI : right;
                            left = cI < left ? cI : left;
                            //监测是否出界
                            if (_this._gameMatrix[_this._currentSquare.y + rI] && _this._gameMatrix[_this._currentSquare.y + rI][_this._currentSquare.x + cI - 1] && _this._gameMatrix[_this._currentSquare.y + rI][_this._currentSquare.x + cI - 1] === 2 || _this._currentSquare.x + left <= 0) {
                                _this._currentSquare.leftWall = true;
                            }
                            if (_this._gameMatrix[_this._currentSquare.y + rI] && _this._gameMatrix[_this._currentSquare.y + rI][_this._currentSquare.x + cI + 1] && _this._gameMatrix[_this._currentSquare.y + rI][_this._currentSquare.x + cI + 1] === 2 || _this._currentSquare.x + right >= 9) {
                                _this._currentSquare.rightWall = true;
                            }
                        }
                    });
                });
                this.checkClear();
                this.refresh(1);
                if (status === 2) {
                    this._currentSquare.done();
                    this.refreshNext(this._currentSquare.nextMatrix);
                }
            } else {
                this._gameMatrix = gameMatrix;
                this.refresh(1);
                this._nextMatrix = nextMatrix;
                this.refresh(2);
            }
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
        /**
         * 刷新dom
         * @param {number} val
         */

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
         * 检测是否可以下降
         * @returns {boolean}
         */

    }, {
        key: "checkDown",
        value: function checkDown() {
            var _this2 = this;

            //判断下一行是否到底或者有方块
            var result = true;
            this._currentSquare.matrix.forEach(function (rV, rI) {
                rV.forEach(function (cV, cI) {
                    if (!!cV) {
                        var next = _this2._gameMatrix[_this2._currentSquare.y + rI + 1] ? _this2._gameMatrix[_this2._currentSquare.y + rI + 1][_this2._currentSquare.x + cI] : -1;
                        if (next === 2 || next === -1) {
                            result = false;
                        }
                    }
                });
            });
            return result;
        }
        /**
         * 检测是否可以旋转
         * @returns {boolean}
         */

    }, {
        key: "checkTurn",
        value: function checkTurn() {
            var _this3 = this;

            var matrix = toolkit_1.default.matrix.turnMatrix(this._currentSquare.matrixObj);
            var left = 3; //方块最左侧位置
            var right = 0; //方块最右侧位置
            var has_done = false; //旁边是否有done
            matrix.matrix.forEach(function (rV, rI) {
                rV.forEach(function (cV, cI) {
                    if (cV) {
                        right = cI > right ? cI : right;
                        left = cI < left ? cI : left;
                    }
                    if (_this3._gameMatrix[_this3._currentSquare.y + rI] && _this3._gameMatrix[_this3._currentSquare.y + rI][_this3._currentSquare.x + cI] && _this3._gameMatrix[_this3._currentSquare.y + rI][_this3._currentSquare.x + cI] === 2) {
                        has_done = true;
                    }
                });
            });
            //根据是否可以旋转返回矩阵
            if (this._currentSquare.x + left <= 0 || this._currentSquare.x + right >= 9 || has_done) {
                return this._currentSquare.matrixObj;
            } else {
                return matrix;
            }
        }
        /**
         *  检测消除
         */

    }, {
        key: "checkClear",
        value: function checkClear() {
            var _this4 = this;

            var score_count = 0;
            var done_count = 0;
            this._gameMatrix.forEach(function (rV, rI) {
                var count = 0;
                rV.forEach(function (cV, cI) {
                    if (cV === 2) {
                        count++;
                    }
                });
                if (count === 10) {
                    score_count++;
                    _this4._gameMatrix.splice(rI, 1);
                    _this4._gameMatrix.unshift(toolkit_1.default.matrix.makeRow(0, 10));
                }
                if (count >= 1) {
                    done_count++;
                }
            });
            //判断得分
            switch (score_count) {
                case 1:
                    this._score += 10;
                    break;
                case 2:
                    this._score += 30;
                    break;
                case 3:
                    this._score += 60;
                    break;
                case 4:
                    this._score += 100;
                    break;
            }
            if (this._score >= 2000) {
                this.onWin();
            }
            //TODO 给对方加速
            //判断游戏结束
            if (done_count >= 19) {
                this.onLose();
            }
            $('#score-' + this._user).text(this._score);
        }
        /**
         * 失败
         */

    }, {
        key: "onLose",
        value: function onLose() {
            $("#lose").show();
            this._lose = true;
            this._gameOver = true;
            clearInterval(this._timer);
        }
        /**
         * 胜利
         */

    }, {
        key: "onWin",
        value: function onWin() {
            $("#win").show();
            this._win = true;
            this._gameOver = true;
            clearInterval(this._timer);
        }
        /**
         * 干扰
         */

    }, {
        key: "disturb",
        value: function disturb(count) {
            for (var i = 0; i < count; i++) {
                this._gameMatrix.shift();
                var arr = Array.from({ length: 10 }, function () {
                    return Math.random() > 0.5 ? 0 : 2;
                });
                this._gameMatrix.push(arr);
            }
        }
        /**
         * 循环游戏
         */

    }, {
        key: "loop",
        value: function loop() {
            var _this5 = this;

            this._timer = setInterval(function () {
                if (!_this5._gameOver && _this5._start) {
                    _this5.refreshGame();
                    _this5._currentSquare.down();
                }
            }, this._speed);
        }
    }, {
        key: "currentSquare",
        get: function get() {
            return this._currentSquare;
        }
    }, {
        key: "gameover",
        get: function get() {
            return this._gameOver;
        },
        set: function set(bool) {
            this._gameOver = bool;
        }
    }, {
        key: "start",
        set: function set(bool) {
            this._start = bool;
        }
    }, {
        key: "win",
        get: function get() {
            return this._win;
        },
        set: function set(bool) {
            this._win = bool;
        }
    }, {
        key: "lose",
        get: function get() {
            return this._lose;
        },
        set: function set(bool) {
            this._lose = bool;
        }
    }, {
        key: "gameMatrix",
        get: function get() {
            return this._gameMatrix;
        }
    }, {
        key: "nextMatrix",
        get: function get() {
            return this._nextMatrix;
        }
    }, {
        key: "score",
        get: function get() {
            return this._score;
        }
    }]);

    return Game;
}();

exports.Game = Game;
exports.default = Game;

/***/ }),
/* 4 */
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

            this._contain.empty();
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 当前方块解决方案
 */
var toolkit_1 = __webpack_require__(0);

var Square = function () {
    function Square() {
        _classCallCheck(this, Square);

        this._x = 2;
        this._y = 0;
        this._matrix = this.createMatrix();
        this._nextMatrix = this.createMatrix();
    }

    _createClass(Square, [{
        key: "down",

        /**
         * 下降
         */
        value: function down() {
            this._y++;
        }
        /**
         * 旋转
         */

    }, {
        key: "turn",
        value: function turn(game) {
            this._matrix = game.checkTurn();
        }
        /**
         * 左移
         */

    }, {
        key: "left",
        value: function left() {
            if (!this._leftWall) {
                this._x--;
            }
        }
        /**
         * 右移
         */

    }, {
        key: "right",
        value: function right() {
            if (!this._rightWall) {
                this._x++;
            }
        }
        /**
         * 迅速落地
         */

    }, {
        key: "drop",
        value: function drop(game) {
            while (game.checkDown()) {
                this._y++;
            }
        }
        /**
         * 落地
         */

    }, {
        key: "done",
        value: function done() {
            this._x = 2;
            this._y = 0;
            this._matrix = this._nextMatrix;
            this._nextMatrix = this.createMatrix();
        }
        /**
         * 生成七种矩阵数据
         */

    }, {
        key: "createMatrix",
        value: function createMatrix() {
            var matrixes = [{
                matrix: [[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
                w: 4,
                h: 1
            }, {
                matrix: [[1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
                w: 3,
                h: 2
            }, {
                matrix: [[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
                w: 3,
                h: 2
            }, {
                matrix: [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
                w: 2,
                h: 2
            }, {
                matrix: [[0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
                w: 3,
                h: 2
            }, {
                matrix: [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
                w: 3,
                h: 2
            }, {
                matrix: [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
                w: 3,
                h: 2
            }];
            var matrix = matrixes[Math.floor(Math.random() * 7)];
            if (Math.random() > 0.5) {
                matrix = toolkit_1.default.matrix.turnMatrix(matrix);
            }
            return matrix;
            // return matrixes[3];
        }
    }, {
        key: "x",
        get: function get() {
            return this._x;
        }
    }, {
        key: "y",
        get: function get() {
            return this._y;
        }
    }, {
        key: "w",
        get: function get() {
            return this._matrix.w;
        }
    }, {
        key: "h",
        get: function get() {
            return this._matrix.h;
        }
    }, {
        key: "matrix",
        get: function get() {
            return this._matrix.matrix;
        }
    }, {
        key: "matrixObj",
        get: function get() {
            return this._matrix;
        }
    }, {
        key: "nextMatrix",
        get: function get() {
            return this._nextMatrix.matrix;
        }
        /**
         * 是否可以左移状态修改接口
         * @param {boolean} able
         */

    }, {
        key: "leftWall",
        set: function set(able) {
            this._leftWall = able;
        }
        /**
         * 是否可以右移状态修改接口
         * @param {boolean} able
         */

    }, {
        key: "rightWall",
        set: function set(able) {
            this._rightWall = able;
        }
    }]);

    return Square;
}();

exports.default = Square;

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map