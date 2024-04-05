"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/wallets/api/loadCipherKey";
exports.ids = ["pages/wallets/api/loadCipherKey"];
exports.modules = {

/***/ "./pages/wallets/api/loadCipherKey.ts":
/*!********************************************!*\
  !*** ./pages/wallets/api/loadCipherKey.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction handler(req, res) {\n    let rawData = fs__WEBPACK_IMPORTED_MODULE_0__.readFileSync(\"encryptedKey.json\", \"utf8\");\n    let jsonData = JSON.parse(rawData);\n    res.status(200).json(jsonData);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy93YWxsZXRzL2FwaS9sb2FkQ2lwaGVyS2V5LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUF5QjtBQUVWLFNBQVNDLE9BQU8sQ0FBQ0MsR0FBUSxFQUFFQyxHQUFRLEVBQUM7SUFDL0MsSUFBSUMsT0FBTyxHQUFHSiw0Q0FBZSxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQztJQUMxRCxJQUFJTSxRQUFRLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDSixPQUFPLENBQUM7SUFDbENELEdBQUcsQ0FBQ00sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUNKLFFBQVEsQ0FBQyxDQUFDO0NBQ2xDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc29sYW5hLW1lbW8vLi9wYWdlcy93YWxsZXRzL2FwaS9sb2FkQ2lwaGVyS2V5LnRzP2QyNGIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoYW5kbGVyKHJlcTogYW55LCByZXM6IGFueSl7XG4gICAgbGV0IHJhd0RhdGEgPSBmcy5yZWFkRmlsZVN5bmMoJ2VuY3J5cHRlZEtleS5qc29uJywgJ3V0ZjgnKTtcbiAgICBsZXQganNvbkRhdGEgPSBKU09OLnBhcnNlKHJhd0RhdGEpO1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGpzb25EYXRhKTtcbn0iXSwibmFtZXMiOlsiZnMiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwicmF3RGF0YSIsInJlYWRGaWxlU3luYyIsImpzb25EYXRhIiwiSlNPTiIsInBhcnNlIiwic3RhdHVzIiwianNvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/wallets/api/loadCipherKey.ts\n");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/wallets/api/loadCipherKey.ts"));
module.exports = __webpack_exports__;

})();