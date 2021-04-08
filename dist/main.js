/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cards.js":
/*!**********************!*\
  !*** ./src/cards.js ***!
  \**********************/
/***/ (function(module) {

function Cards() {
  this.fullDeck = [];
  this.addDecks();
}

SINGLEDECK = [[2, 'diamond'], [2, 'heart'], [2, 'spade'], [2, 'clover'], [3, 'diamond'], [3, 'heart'], [3, 'spade'], [3, 'clover'], [4, 'diamond'], [4, 'heart'], [4, 'spade'], [4, 'clover'], [5, 'diamond'], [5, 'heart'], [5, 'spade'], [5, 'clover'], [6, 'diamond'], [6, 'heart'], [6, 'spade'], [6, 'clover'], [7, 'diamond'], [7, 'heart'], [7, 'spade'], [7, 'clover'], [8, 'diamond'], [8, 'heart'], [8, 'spade'], [8, 'clover'], [9, 'diamond'], [9, 'heart'], [9, 'spade'], [9, 'clover'], [10, 'diamond'], [10, 'heart'], [10, 'spade'], [10, 'clover'], ['J', 'diamond'], ['J', 'heart'], ['J', 'spade'], ['J', 'clover'], ['Q', 'diamond'], ['Q', 'heart'], ['Q', 'spade'], ['Q', 'clover'], ['K', 'diamond'], ['K', 'heart'], ['K', 'spade'], ['K', 'clover'], ['A', 'diamond'], ['A', 'heart'], ['A', 'spade'], ['A', 'clover']];
FACECARDVALUES = {
  "J": 10,
  "Q": 10,
  "K": 10,
  "A": [11, 1]
};
Cards.DIM_X = 100;
Cards.DIM_Y = 150; //This blackjack app will use a total of 6 full deck of cards

Cards.prototype.addDecks = function () {
  for (var i = 0; i < SINGLEDECK.length; i += 1) {
    var singleCard = SINGLEDECK[i];

    for (var n = 1; n <= 6; n += 1) {
      this.fullDeck.push(singleCard);
    }
  }

  return this.fullDeck;
}; //this function will draw a random card and remove that card from the current deck


Cards.prototype.drawCard = function () {
  var cardIndex = Math.floor(Math.random() * this.fullDeck.length);
  return this.fullDeck.splice(cardIndex, 1);
}; //deck gets reshuffled when approximately 60% of the cards have been dealt (312cards / 0.4 = 124.8cards)


Cards.prototype.shuffleDeck = function () {
  if (this.fullDeck.length <= 125) {
    this.fullDeck = [];
    this.fullDeck.addDecks();
  }
};

module.exports = Cards;

/***/ }),

/***/ "./src/dealer.js":
/*!***********************!*\
  !*** ./src/dealer.js ***!
  \***********************/
/***/ (function(module) {

function Dealer() {
  this.cardsValue = 0;
  this.currentCards = [];
}

module.exports = Dealer;

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Cards = __webpack_require__(/*! ./cards */ "./src/cards.js");

var Player = __webpack_require__(/*! ./player */ "./src/player.js");

var Dealer = __webpack_require__(/*! ./dealer */ "./src/dealer.js");

function Game() {
  debugger;
  this.deck = new Cards();
  this.player = new Player();
  this.dealer = new Dealer();
  this.currentDeal = this.player;
}

Game.prototype.countValue = function (currentPlayer) {
  currentPlayer.cardsValue = 0;
  var cards = currentPlayer.currentCards;
  debugger; //at intital count, Aces will value as 11 representing a 'soft' count 

  for (i = 0; i < cards.length; i++) {
    var faceCardValue = null;
    var card = cards[i][0];

    if (Number.isInteger(card[0])) {
      currentPlayer.cardsValue += card[0];
    } else {
      faceCardValue = FACECARDVALUES[card[0]];

      if (Array.isArray(faceCardValue)) {
        currentPlayer.cardsValue += faceCardValue[0];
      } else {
        currentPlayer.cardsValue += faceCardValue;
      }
    }
  } //if the count goes over 21 with an ace, the ace will value as 2 representing a 'hard' count


  for (n = 0; n < cards.length; n++) {
    var isAce = cards[n];

    if (currentPlayer.cardsValue > 21 && isAce[0] === "A") {
      aceValues = FACECARDVALUES[isAce[0]];
      currentPlayer.cardsValue -= aceValues[0];
      currentPlayer.cardsValue += aceValues[1];
    }
  }

  return currentPlayer.cardsValue;
};

Game.prototype.switchDeal = function () {
  if (this.currentDeal === this.player) {
    this.currentDeal = this.dealer;
  }
};

Game.prototype.dealCard = function () {
  var card = this.deck.drawCard();
  this.currentDeal.currentCards.push(card);
  this.countValue(this.currentDeal);
}; //at initalDeal, cards at dealt alternating between player and dealer
//player gets dealt first and ends with the dealer 


Game.prototype.initialDeal = function () {
  while (this.dealer.currentCards.length < 2) {
    this.dealCard();
    this.switchDeal();
  }
};

module.exports = Game;

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ (function(module) {

function Player() {
  this.cardsValue = 0;
  this.currentCards = [];
  this.chipStack = 1000;
} // Player.prototype.drawCards() {
// }


module.exports = Player;

/***/ }),

/***/ "./src/scripts/canvas.js":
/*!*******************************!*\
  !*** ./src/scripts/canvas.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Canvas = /*#__PURE__*/function () {
  function Canvas(props) {
    _classCallCheck(this, Canvas);

    this.canvas = document.createElement("canvas");
    this.coords = [0, 0, 600, 350];
    this.fillColor = 'green';
    this.canvas.width = 300;
    this.canvas.height = 300;
    this.ctx = this.canvas.getContext("2d");
  }

  _createClass(Canvas, [{
    key: "createCanvas",
    value: function createCanvas() {
      document.body.append(this.canvas);
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this.fillColor = color;
      document.body.style.backgroundColor = color;
    }
  }]);

  return Canvas;
}();

/* harmony default export */ __webpack_exports__["default"] = (Canvas);

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _scripts_canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/canvas */ "./src/scripts/canvas.js");



var Game = __webpack_require__(/*! ./game */ "./src/game.js");

document.addEventListener("DOMContentLoaded", startCanvas);

function startCanvas() {
  console.log('hello');
  var game = new Game();
  var canvas = new _scripts_canvas__WEBPACK_IMPORTED_MODULE_1__.default();
  canvas.createCanvas();
}
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibGFja2phY2tfcHJvLy4vc3JjL2NhcmRzLmpzIiwid2VicGFjazovL2JsYWNramFja19wcm8vLi9zcmMvZGVhbGVyLmpzIiwid2VicGFjazovL2JsYWNramFja19wcm8vLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9ibGFja2phY2tfcHJvLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9ibGFja2phY2tfcHJvLy4vc3JjL3NjcmlwdHMvY2FudmFzLmpzIiwid2VicGFjazovL2JsYWNramFja19wcm8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vYmxhY2tqYWNrX3Byby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ibGFja2phY2tfcHJvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmxhY2tqYWNrX3Byby8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJDYXJkcyIsImZ1bGxEZWNrIiwiYWRkRGVja3MiLCJTSU5HTEVERUNLIiwiRkFDRUNBUkRWQUxVRVMiLCJESU1fWCIsIkRJTV9ZIiwicHJvdG90eXBlIiwiaSIsImxlbmd0aCIsInNpbmdsZUNhcmQiLCJuIiwicHVzaCIsImRyYXdDYXJkIiwiY2FyZEluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwic3BsaWNlIiwic2h1ZmZsZURlY2siLCJtb2R1bGUiLCJleHBvcnRzIiwiRGVhbGVyIiwiY2FyZHNWYWx1ZSIsImN1cnJlbnRDYXJkcyIsInJlcXVpcmUiLCJQbGF5ZXIiLCJHYW1lIiwiZGVjayIsInBsYXllciIsImRlYWxlciIsImN1cnJlbnREZWFsIiwiY291bnRWYWx1ZSIsImN1cnJlbnRQbGF5ZXIiLCJjYXJkcyIsImZhY2VDYXJkVmFsdWUiLCJjYXJkIiwiTnVtYmVyIiwiaXNJbnRlZ2VyIiwiQXJyYXkiLCJpc0FycmF5IiwiaXNBY2UiLCJhY2VWYWx1ZXMiLCJzd2l0Y2hEZWFsIiwiZGVhbENhcmQiLCJpbml0aWFsRGVhbCIsImNoaXBTdGFjayIsIkNhbnZhcyIsInByb3BzIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY29vcmRzIiwiZmlsbENvbG9yIiwid2lkdGgiLCJoZWlnaHQiLCJjdHgiLCJnZXRDb250ZXh0IiwiYm9keSIsImFwcGVuZCIsImNvbG9yIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhcnRDYW52YXMiLCJjb25zb2xlIiwibG9nIiwiZ2FtZSIsImNyZWF0ZUNhbnZhcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsU0FBU0EsS0FBVCxHQUFrQjtBQUNkLE9BQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFFQSxPQUFLQyxRQUFMO0FBQ0g7O0FBRURDLFVBQVUsR0FBRyxDQUNULENBQUMsQ0FBRCxFQUFJLFNBQUosQ0FEUyxFQUNNLENBQUMsQ0FBRCxFQUFJLE9BQUosQ0FETixFQUNvQixDQUFDLENBQUQsRUFBSSxPQUFKLENBRHBCLEVBQ2lDLENBQUMsQ0FBRCxFQUFJLFFBQUosQ0FEakMsRUFFVCxDQUFDLENBQUQsRUFBSSxTQUFKLENBRlMsRUFFTSxDQUFDLENBQUQsRUFBSSxPQUFKLENBRk4sRUFFb0IsQ0FBQyxDQUFELEVBQUksT0FBSixDQUZwQixFQUVpQyxDQUFDLENBQUQsRUFBSSxRQUFKLENBRmpDLEVBR1QsQ0FBQyxDQUFELEVBQUksU0FBSixDQUhTLEVBR00sQ0FBQyxDQUFELEVBQUksT0FBSixDQUhOLEVBR29CLENBQUMsQ0FBRCxFQUFJLE9BQUosQ0FIcEIsRUFHaUMsQ0FBQyxDQUFELEVBQUksUUFBSixDQUhqQyxFQUlULENBQUMsQ0FBRCxFQUFJLFNBQUosQ0FKUyxFQUlNLENBQUMsQ0FBRCxFQUFJLE9BQUosQ0FKTixFQUlvQixDQUFDLENBQUQsRUFBSSxPQUFKLENBSnBCLEVBSWlDLENBQUMsQ0FBRCxFQUFJLFFBQUosQ0FKakMsRUFLVCxDQUFDLENBQUQsRUFBSSxTQUFKLENBTFMs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QU0sQ0FBQ21CLFlBQVA7QUFFSCxDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBDYXJkcyAoKSB7XHJcbiAgICB0aGlzLmZ1bGxEZWNrID0gW11cclxuXHJcbiAgICB0aGlzLmFkZERlY2tzKCk7XHJcbn1cclxuXHJcblNJTkdMRURFQ0sgPSBbXHJcbiAgICBbMiwgJ2RpYW1vbmQnXSxbMiwgJ2hlYXJ0JyBdLFsyLCAnc3BhZGUnXSxbMiwgJ2Nsb3ZlciddLFxyXG4gICAgWzMsICdkaWFtb25kJ10sWzMsICdoZWFydCcgXSxbMywgJ3NwYWRlJ10sWzMsICdjbG92ZXInXSxcclxuICAgIFs0LCAnZGlhbW9uZCddLFs0LCAnaGVhcnQnIF0sWzQsICdzcGFkZSddLFs0LCAnY2xvdmVyJ10sXHJcbiAgICBbNSwgJ2RpYW1vbmQnXSxbNSwgJ2hlYXJ0JyBdLFs1LCAnc3BhZGUnXSxbNSwgJ2Nsb3ZlciddLFxyXG4gICAgWzYsICdkaWFtb25kJ10sWzYsICdoZWFydCcgXSxbNiwgJ3NwYWRlJ10sWzYsICdjbG92ZXInXSxcclxuICAgIFs3LCAnZGlhbW9uZCddLFs3LCAnaGVhcnQnIF0sWzcsICdzcGFkZSddLFs3LCAnY2xvdmVyJ10sXHJcbiAgICBbOCwgJ2RpYW1vbmQnXSxbOCwgJ2hlYXJ0JyBdLFs4LCAnc3BhZGUnXSxbOCwgJ2Nsb3ZlciddLFxyXG4gICAgWzksICdkaWFtb25kJ10sWzksICdoZWFydCcgXSxbOSwgJ3NwYWRlJ10sWzksICdjbG92ZXInXSxcclxuICAgIFsxMCwnZGlhbW9uZCddLFsxMCwnaGVhcnQnIF0sWzEwLCdzcGFkZSddLFsxMCwnY2xvdmVyJ10sXHJcbiAgICBbJ0onLCAnZGlhbW9uZCddLFsnSicsICdoZWFydCcgXSxbJ0onLCAnc3BhZGUnXSxbJ0onLCAnY2xvdmVyJ10sXHJcbiAgICBbJ1EnLCAnZGlhbW9uZCddLFsnUScsICdoZWFydCcgXSxbJ1EnLCAnc3BhZGUnXSxbJ1EnLCAnY2xvdmVyJ10sXHJcbiAgICBbJ0snLCAnZGlhbW9uZCddLFsnSycsICdoZWFydCcgXSxbJ0snLCAnc3BhZGUnXSxbJ0snLCAnY2xvdmVyJ10sXHJcbiAgICBbJ0EnLCAnZGlhbW9uZCddLFsnQScsICdoZWFydCcgXSxbJ0EnLCAnc3BhZGUnXSxbJ0EnLCAnY2xvdmVyJ11cclxuXVxyXG5cclxuRkFDRUNBUkRWQUxVRVMgPSB7XHJcbiAgICBcIkpcIjogMTAsXHJcbiAgICBcIlFcIjogMTAsXHJcbiAgICBcIktcIjogMTAsXHJcbiAgICBcIkFcIjogWzExLDFdXHJcbn1cclxuXHJcbkNhcmRzLkRJTV9YID0gMTAwXHJcbkNhcmRzLkRJTV9ZID0gMTUwXHJcblxyXG4vL1RoaXMgYmxhY2tqYWNrIGFwcCB3aWxsIHVzZSBhIHRvdGFsIG9mIDYgZnVsbCBkZWNrIG9mIGNhcmRzXHJcbkNhcmRzLnByb3RvdHlwZS5hZGREZWNrcyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IFNJTkdMRURFQ0subGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICBjb25zdCBzaW5nbGVDYXJkID0gU0lOR0xFREVDS1tpXVxyXG5cclxuICAgICAgICBmb3IgKGxldCBuID0gMTsgbiA8PSA2OyBuICs9IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5mdWxsRGVjay5wdXNoKHNpbmdsZUNhcmQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmZ1bGxEZWNrO1xyXG59XHJcblxyXG4vL3RoaXMgZnVuY3Rpb24gd2lsbCBkcmF3IGEgcmFuZG9tIGNhcmQgYW5kIHJlbW92ZSB0aGF0IGNhcmQgZnJvbSB0aGUgY3VycmVudCBkZWNrXHJcbkNhcmRzLnByb3RvdHlwZS5kcmF3Q2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IGNhcmRJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZnVsbERlY2subGVuZ3RoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5mdWxsRGVjay5zcGxpY2UoY2FyZEluZGV4LCAxKVxyXG59XHJcblxyXG4vL2RlY2sgZ2V0cyByZXNodWZmbGVkIHdoZW4gYXBwcm94aW1hdGVseSA2MCUgb2YgdGhlIGNhcmRzIGhhdmUgYmVlbiBkZWFsdCAoMzEyY2FyZHMgLyAwLjQgPSAxMjQuOGNhcmRzKVxyXG5DYXJkcy5wcm90b3R5cGUuc2h1ZmZsZURlY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBcclxuICAgIGlmICh0aGlzLmZ1bGxEZWNrLmxlbmd0aCA8PSAxMjUpIHtcclxuICAgICAgICB0aGlzLmZ1bGxEZWNrID0gW11cclxuICAgICAgICB0aGlzLmZ1bGxEZWNrLmFkZERlY2tzKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDYXJkcztcclxuIiwiZnVuY3Rpb24gRGVhbGVyKCkge1xyXG4gICAgdGhpcy5jYXJkc1ZhbHVlID0gMDtcclxuICAgIHRoaXMuY3VycmVudENhcmRzID0gW107XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGVhbGVyICIsImNvbnN0IENhcmRzID0gcmVxdWlyZShcIi4vY2FyZHNcIilcclxuY29uc3QgUGxheWVyID0gcmVxdWlyZShcIi4vcGxheWVyXCIpXHJcbmNvbnN0IERlYWxlciA9IHJlcXVpcmUoXCIuL2RlYWxlclwiKVxyXG5cclxuZnVuY3Rpb24gR2FtZSgpIHtcclxuICAgIGRlYnVnZ2VyIFxyXG4gICAgdGhpcy5kZWNrID0gbmV3IENhcmRzKCk7XHJcbiAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuICAgIHRoaXMuZGVhbGVyID0gbmV3IERlYWxlcigpO1xyXG4gICAgdGhpcy5jdXJyZW50RGVhbCA9IHRoaXMucGxheWVyOyBcclxufVxyXG5cclxuXHJcblxyXG5HYW1lLnByb3RvdHlwZS5jb3VudFZhbHVlID0gZnVuY3Rpb24oY3VycmVudFBsYXllcikge1xyXG4gICAgY3VycmVudFBsYXllci5jYXJkc1ZhbHVlID0gMFxyXG4gICAgY29uc3QgY2FyZHMgPSBjdXJyZW50UGxheWVyLmN1cnJlbnRDYXJkcztcclxuXHJcbiAgICBkZWJ1Z2dlclxyXG4gICAgLy9hdCBpbnRpdGFsIGNvdW50LCBBY2VzIHdpbGwgdmFsdWUgYXMgMTEgcmVwcmVzZW50aW5nIGEgJ3NvZnQnIGNvdW50IFxyXG4gICAgZm9yIChpID0gMDsgaSA8IGNhcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgZmFjZUNhcmRWYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgY2FyZCA9IGNhcmRzW2ldWzBdO1xyXG5cclxuICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihjYXJkWzBdKSkge1xyXG4gICAgICAgICAgICBjdXJyZW50UGxheWVyLmNhcmRzVmFsdWUgKz0gY2FyZFswXTsgICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmYWNlQ2FyZFZhbHVlID0gRkFDRUNBUkRWQUxVRVNbY2FyZFswXV07XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZhY2VDYXJkVmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UGxheWVyLmNhcmRzVmFsdWUgKz0gZmFjZUNhcmRWYWx1ZVswXVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFBsYXllci5jYXJkc1ZhbHVlICs9IGZhY2VDYXJkVmFsdWUgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9pZiB0aGUgY291bnQgZ29lcyBvdmVyIDIxIHdpdGggYW4gYWNlLCB0aGUgYWNlIHdpbGwgdmFsdWUgYXMgMiByZXByZXNlbnRpbmcgYSAnaGFyZCcgY291bnRcclxuICAgIGZvciAobiA9IDA7IG4gPCBjYXJkcy5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgIGNvbnN0IGlzQWNlID0gY2FyZHNbbl07XHJcbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIuY2FyZHNWYWx1ZSA+IDIxICYmIGlzQWNlWzBdID09PSBcIkFcIikge1xyXG4gICAgICAgICAgICBhY2VWYWx1ZXMgPSBGQUNFQ0FSRFZBTFVFU1tpc0FjZVswXV1cclxuICAgICAgICAgICAgY3VycmVudFBsYXllci5jYXJkc1ZhbHVlIC09IGFjZVZhbHVlc1swXTtcclxuICAgICAgICAgICAgY3VycmVudFBsYXllci5jYXJkc1ZhbHVlICs9IGFjZVZhbHVlc1sxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGN1cnJlbnRQbGF5ZXIuY2FyZHNWYWx1ZSBcclxufVxyXG5cclxuR2FtZS5wcm90b3R5cGUuc3dpdGNoRGVhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnREZWFsID09PSB0aGlzLnBsYXllcikge1xyXG4gICAgICAgIHRoaXMuY3VycmVudERlYWwgPSB0aGlzLmRlYWxlclxyXG4gICAgfSBcclxufVxyXG5cclxuR2FtZS5wcm90b3R5cGUuZGVhbENhcmQgPSBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNhcmQgPSB0aGlzLmRlY2suZHJhd0NhcmQoKTtcclxuICAgIHRoaXMuY3VycmVudERlYWwuY3VycmVudENhcmRzLnB1c2goY2FyZCk7XHJcbiAgICB0aGlzLmNvdW50VmFsdWUodGhpcy5jdXJyZW50RGVhbCk7XHJcbn1cclxuXHJcbi8vYXQgaW5pdGFsRGVhbCwgY2FyZHMgYXQgZGVhbHQgYWx0ZXJuYXRpbmcgYmV0d2VlbiBwbGF5ZXIgYW5kIGRlYWxlclxyXG4vL3BsYXllciBnZXRzIGRlYWx0IGZpcnN0IGFuZCBlbmRzIHdpdGggdGhlIGRlYWxlciBcclxuR2FtZS5wcm90b3R5cGUuaW5pdGlhbERlYWwgPSBmdW5jdGlvbigpIHtcclxuICAgIHdoaWxlICh0aGlzLmRlYWxlci5jdXJyZW50Q2FyZHMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgIHRoaXMuZGVhbENhcmQoKTtcclxuICAgICAgICB0aGlzLnN3aXRjaERlYWwoKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZTsiLCJmdW5jdGlvbiBQbGF5ZXIoKSB7XHJcbiAgICB0aGlzLmNhcmRzVmFsdWUgPSAwO1xyXG4gICAgdGhpcy5jdXJyZW50Q2FyZHMgPSBbXTtcclxuICAgIHRoaXMuY2hpcFN0YWNrID0gMTAwMDtcclxufVxyXG5cclxuLy8gUGxheWVyLnByb3RvdHlwZS5kcmF3Q2FyZHMoKSB7XHJcblxyXG4vLyB9XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllcjsgIiwiY2xhc3MgQ2FudmFzIHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpXHJcbiAgICAgICAgdGhpcy5jb29yZHMgPSBbMCwwLDYwMCwzNTBdXHJcbiAgICAgICAgdGhpcy5maWxsQ29sb3IgPSAnZ3JlZW4nXHJcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSAzMDBcclxuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSAzMDBcclxuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNhbnZhcygpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZCh0aGlzLmNhbnZhcylcclxuICAgIH1cclxuXHJcbiAgICBzZXRDb2xvcihjb2xvcikge1xyXG4gICAgICAgIHRoaXMuZmlsbENvbG9yID0gY29sb3I7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhbnZhczsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5zY3NzXCI7XHJcbmltcG9ydCBDYW52YXMgZnJvbSBcIi4vc2NyaXB0cy9jYW52YXNcIlxyXG5cclxuY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vZ2FtZScpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIHN0YXJ0Q2FudmFzKVxyXG5cclxuZnVuY3Rpb24gc3RhcnRDYW52YXMoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnaGVsbG8nKTtcclxuXHJcbiAgICBjb25zdCBnYW1lID0gbmV3IEdhbWUoKTtcclxuICAgIGNvbnN0IGNhbnZhcyA9IG5ldyBDYW52YXMoKVxyXG4gICAgY2FudmFzLmNyZWF0ZUNhbnZhcygpO1xyXG4gIFxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=