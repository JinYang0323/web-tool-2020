/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! namespace exports */
/*! export checkLoginStatus [provided] [no usage info] [missing usage info prevents renaming] */
/*! export performLogin [provided] [no usage info] [missing usage info prevents renaming] */
/*! export performLogout [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkLoginStatus": () => /* binding */ checkLoginStatus,
/* harmony export */   "performLogin": () => /* binding */ performLogin,
/* harmony export */   "performLogout": () => /* binding */ performLogout
/* harmony export */ });
var checkLoginStatus = function checkLoginStatus() {
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performLogin = function performLogin(username) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performLogout = function performLogout(username) {
  return fetch('/session', {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  });
};

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services.js */ "./src/services.js");
;
var currentUser = '';
var currentSid = '';
addLogin(); // Check for login

(0,_services_js__WEBPACK_IMPORTED_MODULE_0__.checkLoginStatus)().then(function (userInfo) {
  showContent();
})["catch"](function (error) {
  showLogin();
}); // TODO: Move these HTML-changing functions to an import from another file

function showContent() {
  document.querySelector('#todo-app .login').classList.add('hidden');
  document.querySelector('#todo-app .logged-in').classList.remove('hidden');
}

function showLogin() {
  document.querySelector('#todo-app .login').classList.remove('hidden');
  document.querySelector('#todo-app .logged-in').classList.add('hidden');
}

function showLoginError(error) {
  document.querySelector('#todo-app .login-status').innerText = error.error;
}

function addLogin() {
  disableButtonIfNoInput();
  document.querySelector('#todo-app .login button').addEventListener('click', function () {
    var usernameEl = document.querySelector('#todo-app .login input');
    var username = usernameEl.value; // call service

    (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.performLogin)(username).then(function (_ref) {
      var userInfo = _ref.userInfo,
          sid = _ref.sid;
      currentUser = username;
      currentSid = sid;
      showContent();
      renderTodos(userInfo.todos);
      addAbilityToCompleteItems();
      addAbilityToAddItems();
      addAbilityToDeleteItems();
      addLogout();
    })["catch"](function (err) {
      showLoginError(err);
      usernameEl.value = '';
    });
  });
}

function renderTodos(todos) {
  var listEl = document.querySelector('#todo-app .todos');
  var html = todos.map(function (todo, index) {
    return "\n      <li>\n          <span class=\"todo ".concat(todo.done ? 'complete' : '', "\" data-index=\"").concat(index, "\">").concat(todo.task, "</span>\n          <span class=\"delete\" data-index=\"").concat(index, "\">X</span>\n        </li>");
  }).join('\n');
  listEl.innerHTML = html;
}

function disableButtonIfNoInput() {
  var inputEl = document.querySelector('#todo-app .login input');
  var buttonEl = document.querySelector('#todo-app .login button');
  inputEl.addEventListener('input', function () {
    buttonEl.disabled = !inputEl.value;
  });
}

function convertError(response) {
  if (response.ok) {
    return response.json();
  }

  return response.json().then(function (err) {
    return Promise.reject(err);
  });
}

function addAbilityToCompleteItems() {
  var listEl = document.querySelector('#todo-app .todos');
  listEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('todo')) {
      return;
    }

    var index = e.target.dataset.index;
    fetch("/user/".concat(currentUser, "/task/").concat(index), {
      method: 'PUT'
    })["catch"](function () {
      return Promise.reject({
        error: 'network-error'
      });
    }).then(convertError).then(function (todos) {
      renderTodos(todos);
    });
  });
}

function addAbilityToAddItems() {
  var buttonEl = document.querySelector('#todo-app .add');
  var inputEl = document.querySelector('#todo-app .to-add');
  buttonEl.addEventListener('click', function (e) {
    fetch("/user/".concat(currentUser, "/task/").concat(inputEl.value), {
      method: 'POST'
    })["catch"](function () {
      return Promise.reject({
        error: 'network-error'
      });
    }).then(convertError).then(function (todos) {
      inputEl.value = '';
      renderTodos(todos);
    });
  });
}

function addAbilityToDeleteItems() {
  var listEl = document.querySelector('#todo-app .todos');
  listEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('delete')) {
      return;
    }

    var index = e.target.dataset.index; // read data-index from the element

    fetch("/user/".concat(currentUser, "/task/").concat(index), {
      method: 'DELETE'
    })["catch"](function () {
      return Promise.reject({
        error: 'network-error'
      });
    }).then(convertError).then(function (todos) {
      renderTodos(todos);
    });
  });
}

function addLogout() {
  document.querySelector('#todo-app .logout button').addEventListener('click', function () {
    // call service
    (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.performLogout)(currentSid).then(function () {
      currentUser = '';
      showLogin();
    });
  });
  var usernameEl = document.querySelector('#todo-app .login input');
  usernameEl.value = '';
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/todo.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=todo.js.map