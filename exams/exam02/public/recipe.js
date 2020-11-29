/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/recipe.js":
/*!***********************!*\
  !*** ./src/recipe.js ***!
  \***********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
;
addLogin();
addLogout();
showRecipeListView();
addAbilityToAddRecipe();
addAbilityToViewRecipeDetail();
addAbilityToReturnHome();
(0,_services__WEBPACK_IMPORTED_MODULE_0__.checkLoginStatus)().then(function (recipes) {
  showContent();
  renderRecipeList(recipes);
})["catch"](function (recipes) {
  showLogin();
  renderRecipeList(recipes);
});

function showContent() {
  document.querySelector('#recipe-app .login').classList.add('hidden');
  document.querySelector('#recipe-app .logout').classList.remove('hidden');
  document.querySelector('#recipe-app .add-recipe').classList.remove('hidden');
  document.querySelector('#recipe-app .add-recipe').classList.remove('hidden');
}

function showLogin() {
  document.querySelector('#recipe-app .login').classList.remove('hidden');
  document.querySelector('#recipe-app .logout').classList.add('hidden');
  document.querySelector('#recipe-app .add-recipe').classList.add('hidden');
  document.querySelector('#recipe-app .login button').disabled = true;
}

function showRecipeListView() {
  document.querySelector('#recipe-app .recipe-detail-view').classList.add('hidden');
  document.querySelector('#recipe-app .recipe-list-view').classList.remove('hidden');
  document.querySelector('#recipe-app .add-recipe-view').classList.add('hidden');
}

function showRecipeDetailView() {
  document.querySelector('#recipe-app .recipe-detail-view').classList.remove('hidden');
  document.querySelector('#recipe-app .recipe-list-view').classList.add('hidden');
  document.querySelector('#recipe-app .add-recipe-view').classList.add('hidden');
}

function showAddRecipeView() {
  document.querySelector('#recipe-app .recipe-detail-view').classList.add('hidden');
  document.querySelector('#recipe-app .recipe-list-view').classList.add('hidden');
  document.querySelector('#recipe-app .add-recipe-view').classList.remove('hidden');
  disableButtonIfNoInputInAdd();
  addAbilityToAddRecipeToServer();
}

function disableButtonIfNoInputInlogin() {
  var inputEl = document.querySelector('#recipe-app .login input');
  var buttonEl = document.querySelector('#recipe-app .login button');
  inputEl.addEventListener('input', function () {
    buttonEl.disabled = !inputEl.value;
  });
}

function disableButtonIfNoInputInAdd() {
  var inputEl = document.querySelector('#recipe-app .add-recipe-view input');
  var ingredientsEl = document.querySelector('#recipe-app .add-recipe-view .ingredients-to-add');
  var instructionsEl = document.querySelector('#recipe-app .add-recipe-view .instructions-to-add');
  var buttonEl = document.querySelector('#recipe-app .add-recipe-view .add-recipe-btn');
  inputEl.addEventListener('input', function () {
    buttonEl.disabled = !(inputEl.value && ingredientsEl.value && instructionsEl.value);
  });
  ingredientsEl.addEventListener('input', function () {
    buttonEl.disabled = !(inputEl.value && ingredientsEl.value && instructionsEl.value);
  });
  instructionsEl.addEventListener('input', function () {
    buttonEl.disabled = !(inputEl.value && ingredientsEl.value && instructionsEl.value);
  });
}

function showLoginError(error) {
  document.querySelector('#recipe-app .login-status').innerText = error.error;
}

function addLogin() {
  disableButtonIfNoInputInlogin();
  document.querySelector('#recipe-app .login button').addEventListener('click', function () {
    var usernameEl = document.querySelector('#recipe-app .login input');
    var username = usernameEl.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.performLogin)(username).then(function (_ref) {
      var recipes = _ref.recipes;
      showContent(recipes);
    })["catch"](function (err) {
      showLoginError(err);
      usernameEl.value = '';
    });
  });
}

function addLogout() {
  document.querySelector('#recipe-app .logout button').addEventListener('click', function () {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.performLogout)().then(showLogin);
  });
}

function renderRecipeList(recipes) {
  var recipeListEl = document.querySelector('#recipe-app .recipes');
  var html = Object.keys(recipes).map(function (recipeId) {
    return "<li key=".concat(recipeId, " data-id=").concat(recipeId, " class='recipe'>\n      ").concat(recipes[recipeId].title, "    ").concat(recipes[recipeId].author, "\n    </li>");
  }).join('\n');
  recipeListEl.innerHTML = html;
}

function renderRecipeDetail(recipe) {
  var recipeDetailEl = document.querySelector('#recipe-app .recipe-detail');
  var html = "\n  <div>Title: ".concat(recipe.recipeName, "</div>\n  <div>Author: ").concat(recipe.author, "</div>\n  <div>ingredients: ").concat(recipe.ingredients, "</div>\n  <div>instructions: ").concat(recipe.instructions, "</div>");
  recipeDetailEl.innerHTML = html;
}

function addAbilityToAddRecipe() {
  var addRecipebtnEl = document.querySelector('#recipe-app .add-recipe');
  addRecipebtnEl.addEventListener('click', function () {
    showAddRecipeView();
  });
}

function addAbilityToAddRecipeToServer() {
  var buttonEl = document.querySelector('#recipe-app .add-recipe-view .add-recipe-btn');
  buttonEl.addEventListener('click', function () {
    var recipeName = document.querySelector('#recipe-app .add-recipe-view .title-to-add').value;
    var ingredients = document.querySelector('#recipe-app .add-recipe-view .ingredients-to-add').value;
    var instructions = document.querySelector('#recipe-app .add-recipe-view .instructions-to-add').value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.performAddRecipe)({
      recipeName: recipeName,
      ingredients: ingredients,
      instructions: instructions
    }).then(function (response) {
      showRecipeDetailView();
      renderRecipeDetail(response.recipe);
    });
  });
}

function addAbilityToViewRecipeDetail() {
  var recipeListEl = document.querySelector('#recipe-app .recipes');
  recipeListEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('recipe')) {
      return;
    }

    (0,_services__WEBPACK_IMPORTED_MODULE_0__.performGetRecipe)(e.target.dataset.id).then(function (response) {
      showRecipeDetailView();
      renderRecipeDetail(response.recipe);
    });
  });
}

function addAbilityToReturnHome() {
  var returnHomeBtnInAdd = document.querySelector('#recipe-app .recipe-detail-view .return-home');
  returnHomeBtnInAdd.addEventListener('click', function () {
    showRecipeListView();
  });
  var returnHomeBtnInDetail = document.querySelector('#recipe-app .recipe-detail-view .return-home');
  returnHomeBtnInDetail.addEventListener('click', function () {
    showRecipeListView();
  });
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! namespace exports */
/*! export checkLoginStatus [provided] [no usage info] [missing usage info prevents renaming] */
/*! export performAddRecipe [provided] [no usage info] [missing usage info prevents renaming] */
/*! export performGetRecipe [provided] [no usage info] [missing usage info prevents renaming] */
/*! export performGetRecipeList [provided] [no usage info] [missing usage info prevents renaming] */
/*! export performLogin [provided] [no usage info] [missing usage info prevents renaming] */
/*! export performLogout [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkLoginStatus": () => /* binding */ checkLoginStatus,
/* harmony export */   "performLogin": () => /* binding */ performLogin,
/* harmony export */   "performLogout": () => /* binding */ performLogout,
/* harmony export */   "performGetRecipeList": () => /* binding */ performGetRecipeList,
/* harmony export */   "performGetRecipe": () => /* binding */ performGetRecipe,
/* harmony export */   "performAddRecipe": () => /* binding */ performAddRecipe
/* harmony export */ });
var checkLoginStatus = function checkLoginStatus() {
  return fetch('/session', {
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json'
    })
  })["catch"](function (err) {
    return Promise.reject({
      err: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) return response.json();
    return response.json().then(function (err) {
      return Promise.reject(err.recipes);
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
    if (response.ok) return response.json();
    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performLogout = function performLogout() {
  return fetch('/session', {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json'
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) return response.json();
    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performGetRecipeList = function performGetRecipeList() {
  return fetch('/recipes', {
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json'
    })
  })["catch"](function (err) {
    return Promise.reject({
      err: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) return response.json();
    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performGetRecipe = function performGetRecipe(recipeId) {
  return fetch("/recipe/".concat(recipeId), {
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json'
    })
  })["catch"](function (err) {
    return Promise.reject({
      err: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) return response.json();
    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performAddRecipe = function performAddRecipe(_ref) {
  var recipeName = _ref.recipeName,
      ingredients = _ref.ingredients,
      instructions = _ref.instructions;
  return fetch("/recipe/".concat(recipeName), {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      ingredients: ingredients,
      instructions: instructions
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) return response.json();
    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};

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
/******/ 	__webpack_require__("./src/recipe.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=recipe.js.map