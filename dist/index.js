module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(674);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 129:
/***/ (function(module) {

module.exports = require("child_process");

/***/ }),

/***/ 669:
/***/ (function(module) {

module.exports = require("util");

/***/ }),

/***/ 674:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var child_process_1 = __webpack_require__(129);
// import { writeFileSync, mkdirSync } from 'fs';
var util_1 = __webpack_require__(669);
var execPromisified = util_1.promisify(child_process_1.exec);
var ACTION_GO_TO_WORKSPACE = 'Go to workspace';
var ACTION_RENAME_WORKSPACE = 'Rename current workspace';
var ACTION_NEW_WORKSPACE = 'New workspace';
var ACTION_LOAD_WORKSPACE_IN_CURRENT = 'Load workspace in current';
var possibleActions = [
    ACTION_GO_TO_WORKSPACE,
    ACTION_RENAME_WORKSPACE,
    ACTION_NEW_WORKSPACE,
    ACTION_LOAD_WORKSPACE_IN_CURRENT,
];
function showActionChoices() {
    return __awaiter(this, void 0, void 0, function () {
        var actions, actionChosen, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    actions = possibleActions.map(function (v) { return "<b>" + v + "</b>"; });
                    return [4 /*yield*/, promptRofi('What to do ?', actions)];
                case 1:
                    actionChosen = _b.sent();
                    console.log(actionChosen);
                    _a = actionChosen;
                    switch (_a) {
                        case ACTION_GO_TO_WORKSPACE: return [3 /*break*/, 2];
                        case ACTION_RENAME_WORKSPACE: return [3 /*break*/, 4];
                        case ACTION_NEW_WORKSPACE: return [3 /*break*/, 6];
                        case ACTION_LOAD_WORKSPACE_IN_CURRENT: return [3 /*break*/, 8];
                    }
                    return [3 /*break*/, 10];
                case 2: 
                // Go to workspace
                return [4 /*yield*/, switchToWorkspace()];
                case 3:
                    // Go to workspace
                    _b.sent();
                    return [3 /*break*/, 11];
                case 4: 
                // Rename current workspace
                return [4 /*yield*/, renameWorkspace()];
                case 5:
                    // Rename current workspace
                    _b.sent();
                    return [3 /*break*/, 11];
                case 6: 
                // New workspace
                return [4 /*yield*/, newWorkspaceAndMoveCurrent()];
                case 7:
                    // New workspace
                    _b.sent();
                    return [3 /*break*/, 11];
                case 8: 
                // Load workspace in current
                return [4 /*yield*/, loadWorkspaceInCurrent()];
                case 9:
                    // Load workspace in current
                    _b.sent();
                    return [3 /*break*/, 11];
                case 10: return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function promptRofi(promptMessage, options) {
    return __awaiter(this, void 0, void 0, function () {
        var choice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execPromisified("echo \"" + options.join('\n') + "\" | rofi       -i -location 0 -width 40 -dmenu -markup-rows -format p -p \"" + promptMessage + "\"")];
                case 1:
                    choice = _a.sent();
                    return [2 /*return*/, choice.stdout.replace('\n', '')];
            }
        });
    });
}
function getWorkspaces() {
    return __awaiter(this, void 0, void 0, function () {
        var currentWorkspacesRaw;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execPromisified('i3-msg -t get_workspaces')];
                case 1:
                    currentWorkspacesRaw = _a.sent();
                    return [2 /*return*/, JSON.parse(currentWorkspacesRaw.stdout)];
            }
        });
    });
}
function switchToWorkspace() {
    return __awaiter(this, void 0, void 0, function () {
        var currentWorkspaces, message, choices, workspaceChosen, workspaceChosenSplitted, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getWorkspaces()];
                case 1:
                    currentWorkspaces = _a.sent();
                    console.log(currentWorkspaces);
                    message = 'Select workspace to go';
                    choices = currentWorkspaces.map(function (v) { return "<b>" + v.name + "</b>"; });
                    return [4 /*yield*/, promptRofi(message, choices)];
                case 2:
                    workspaceChosen = _a.sent();
                    console.log(workspaceChosen);
                    workspaceChosenSplitted = workspaceChosen.split(':');
                    console.log(workspaceChosenSplitted);
                    console.log(choices);
                    // if (layoutChosenSplitted.length > 1) {
                    //   layoutChosen = layoutChosenSplitted[1];
                    // }
                    console.log(workspaceChosen);
                    workspaceChosen = workspaceChosen.trim();
                    console.log(workspaceChosen);
                    return [4 /*yield*/, execPromisified("i3-msg -t command workspace \"" + workspaceChosen + "\"")];
                case 3:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
function renameWorkspace() {
    return __awaiter(this, void 0, void 0, function () {
        var renameMessage, workspaceName, currentWorkspaces, currentWorkspaceVisible, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Renaming workspace');
                    renameMessage = 'Rename to';
                    return [4 /*yield*/, promptRofi(renameMessage, [])];
                case 1:
                    workspaceName = _a.sent();
                    return [4 /*yield*/, getWorkspaces()];
                case 2:
                    currentWorkspaces = _a.sent();
                    currentWorkspaceVisible = currentWorkspaces.find(function (v) { return v.visible && v.focused; });
                    return [4 /*yield*/, execPromisified("i3-msg 'rename workspace \"" + currentWorkspaceVisible.name + "\" to \"" + workspaceName + "\"'")];
                case 3:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
function newWorkspaceAndMoveCurrent() {
    return __awaiter(this, void 0, void 0, function () {
        var currentWorkspaces, currentWorkspaceVisible, currentWorkspaceName, _a, splittedName2, newWorkspaceNumber, checkWorkspaceExists, i, newWorkspaceName;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getWorkspaces()];
                case 1:
                    currentWorkspaces = _b.sent();
                    currentWorkspaceVisible = currentWorkspaces.find(function (v) { return v.visible && v.focused; });
                    console.log(currentWorkspaceVisible);
                    currentWorkspaceName = currentWorkspaceVisible.name;
                    _a = currentWorkspaceName.split(':'), splittedName2 = _a.slice(1);
                    if (splittedName2) {
                        currentWorkspaceName = splittedName2;
                    }
                    newWorkspaceNumber = currentWorkspaceVisible.num * 100;
                    checkWorkspaceExists = function (index) { return currentWorkspaces.find(function (v) { return v.num === index; }); };
                    for (i = 0; i < 99; i++) {
                        if (!checkWorkspaceExists(newWorkspaceNumber)) {
                            break;
                        }
                        newWorkspaceNumber++;
                    }
                    newWorkspaceName = newWorkspaceNumber + ": " + currentWorkspaceName;
                    return [4 /*yield*/, execPromisified("i3-msg 'rename workspace \"" + currentWorkspaceVisible.name + "\" to \"" + newWorkspaceName + "\"'")];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, execPromisified("i3-msg -t command workspace number " + currentWorkspaceVisible.num)];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function loadWorkspaceInCurrent() {
    return __awaiter(this, void 0, void 0, function () {
        var currentWorkspacesNotFocused, message, choices, workspaceNameChosen, workspaceChosen;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getWorkspaces()];
                case 1:
                    currentWorkspacesNotFocused = (_a.sent()).filter(function (v) { return !v.focused; });
                    console.log(currentWorkspacesNotFocused);
                    message = 'Select workspace to load';
                    choices = currentWorkspacesNotFocused.map(function (v) { return "<b>" + v.name + "</b>"; });
                    return [4 /*yield*/, promptRofi(message, choices)];
                case 2:
                    workspaceNameChosen = _a.sent();
                    console.log(workspaceNameChosen);
                    workspaceChosen = currentWorkspacesNotFocused.find(function (v) { return v.name === workspaceNameChosen; });
                    console.log(workspaceChosen);
                    return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, showActionChoices()];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();


/***/ })

/******/ });