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
var child_process_1 = require("child_process");
// import { writeFileSync, mkdirSync } from 'fs';
var util_1 = require("util");
var actions_1 = require("./models/actions");
var execPromisified = util_1.promisify(child_process_1.exec);
var TEMP_WORKSPACE_NAME = "99: Temporary";
function showActionChoices() {
    return __awaiter(this, void 0, void 0, function () {
        var actions, actionChosen, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    actions = actions_1.possibleActions.map(function (v) { return "<b>" + v + "</b>"; });
                    return [4 /*yield*/, promptRofi("What to do ?", actions, {
                            onlyMatch: true,
                            noCustom: true,
                        })];
                case 1:
                    actionChosen = _b.sent();
                    _a = actionChosen;
                    switch (_a) {
                        case actions_1.ACTION_GO_TO_WORKSPACE: return [3 /*break*/, 2];
                        case actions_1.ACTION_RENAME_WORKSPACE: return [3 /*break*/, 4];
                        case actions_1.ACTION_NEW_WORKSPACE: return [3 /*break*/, 6];
                        case actions_1.ACTION_LOAD_WORKSPACE_IN_CURRENT: return [3 /*break*/, 8];
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
function promptRofi(promptMessage, choices, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var baseCommand, choice, choiceCleaned;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseCommand = "echo \"" + choices.join("\n") + "\" | rofi       -i -location 0 -width 40 -dmenu -markup-rows -format p -p \"" + promptMessage + "\"";
                    if (options.onlyMatch) {
                        baseCommand += " --only-match ";
                    }
                    if (options.noCustom) {
                        baseCommand += " --no-custom ";
                    }
                    return [4 /*yield*/, execPromisified(baseCommand)];
                case 1:
                    choice = _a.sent();
                    choiceCleaned = choice.stdout.replace("\n", "");
                    if (choiceCleaned === "") {
                        throw new Error("Nothing chosen");
                    }
                    return [2 /*return*/, choiceCleaned];
            }
        });
    });
}
function getWorkspaces() {
    return __awaiter(this, void 0, void 0, function () {
        var currentWorkspacesRaw;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execPromisified("i3-msg -t get_workspaces")];
                case 1:
                    currentWorkspacesRaw = _a.sent();
                    return [2 /*return*/, JSON.parse(currentWorkspacesRaw.stdout)];
            }
        });
    });
}
function switchToWorkspace() {
    return __awaiter(this, void 0, void 0, function () {
        var currentWorkspaces, message, choices, workspaceChosen;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getWorkspaces()];
                case 1:
                    currentWorkspaces = _a.sent();
                    message = "Select workspace to go";
                    choices = currentWorkspaces.map(function (v) { return "<b>" + v.name + "</b>"; });
                    return [4 /*yield*/, promptRofi(message, choices, {
                            onlyMatch: true,
                            noCustom: true,
                        })];
                case 2:
                    workspaceChosen = _a.sent();
                    return [4 /*yield*/, execPromisified("i3-msg -t command workspace \"" + workspaceChosen + "\"")];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function renameWorkspace() {
    return __awaiter(this, void 0, void 0, function () {
        var renameMessage, workspaceName, currentWorkspaces, currentWorkspaceVisible;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    renameMessage = "Rename to";
                    return [4 /*yield*/, promptRofi(renameMessage, [])];
                case 1:
                    workspaceName = _a.sent();
                    return [4 /*yield*/, getWorkspaces()];
                case 2:
                    currentWorkspaces = _a.sent();
                    currentWorkspaceVisible = currentWorkspaces.find(function (v) { return v.visible && v.focused; });
                    if (!currentWorkspaceVisible) {
                        throw new Error('[Rename] Current workspace not found');
                    }
                    return [4 /*yield*/, execPromisified("i3-msg 'rename workspace \"" + currentWorkspaceVisible.name + "\" to \"" + workspaceName + "\"'")];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function newWorkspaceAndMoveCurrent() {
    return __awaiter(this, void 0, void 0, function () {
        var currentWorkspaces, currentWorkspaceVisible, currentWorkspaceName, newWorkspaceNumber, newWorkspaceName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getWorkspaces()];
                case 1:
                    currentWorkspaces = _a.sent();
                    currentWorkspaceVisible = currentWorkspaces.find(function (v) { return v.visible && v.focused; });
                    if (!currentWorkspaceVisible) {
                        throw new Error('[Rename] Current workspace not found');
                    }
                    currentWorkspaceName = extractNameWithoutNum(currentWorkspaceVisible.name);
                    newWorkspaceNumber = getFreeWorkspaceNum(currentWorkspaceVisible.num * 100, currentWorkspaces);
                    newWorkspaceName = newWorkspaceNumber + ": " + currentWorkspaceName;
                    return [4 /*yield*/, execPromisified("i3-msg 'rename workspace \"" + currentWorkspaceVisible.name + "\" to \"" + newWorkspaceName + "\"'")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, execPromisified("i3-msg -t command workspace number " + currentWorkspaceVisible.num)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getFreeWorkspaceNum(from, currentWorkspaces) {
    var newWorkspaceNumber = from;
    var checkWorkspaceExists = function (index) {
        return currentWorkspaces.find(function (v) { return v.num === index; });
    };
    for (var i = 0; i < 99; i++) {
        if (!checkWorkspaceExists(newWorkspaceNumber)) {
            break;
        }
        newWorkspaceNumber++;
    }
    return newWorkspaceNumber;
}
function extractNameWithoutNum(name) {
    var newName = name;
    console.log(newName);
    var _a = newName.split(":"), splittedName2 = _a[1];
    console.log(splittedName2);
    if (splittedName2) {
        console.log(typeof splittedName2);
        console.log(splittedName2.trim);
        newName = splittedName2.trim();
    }
    return newName;
}
function loadWorkspaceInCurrent() {
    return __awaiter(this, void 0, void 0, function () {
        var currentWorkspaces, currentWorkspacesNotFocused, message, choices, workspaceNameChosen, currentWorkspaceFocused, workspaceChosen, newWorkspaceChosenName, oldWorkspaceNewName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getWorkspaces()];
                case 1:
                    currentWorkspaces = _a.sent();
                    console.log(currentWorkspaces);
                    currentWorkspacesNotFocused = currentWorkspaces.filter(function (v) { return !v.focused; });
                    message = "Select workspace to load";
                    choices = currentWorkspacesNotFocused.map(function (v) { return "<b>" + v.name + "</b>"; });
                    return [4 /*yield*/, promptRofi(message, choices, {
                            onlyMatch: true,
                            noCustom: true,
                        })];
                case 2:
                    workspaceNameChosen = _a.sent();
                    currentWorkspaceFocused = currentWorkspaces.find(function (v) { return v.focused; });
                    workspaceChosen = currentWorkspacesNotFocused.find(function (v) { return v.name === workspaceNameChosen; });
                    if (!currentWorkspaceFocused) {
                        throw new Error('[LoadWorkspace] Current workspace focused not found');
                    }
                    if (!workspaceChosen) {
                        throw new Error('[LoadWorkspace] Chosen workspace not found');
                    }
                    console.log(workspaceChosen);
                    newWorkspaceChosenName = extractNameWithoutNum(workspaceChosen.name);
                    oldWorkspaceNewName = extractNameWithoutNum(currentWorkspaceFocused.name);
                    newWorkspaceChosenName = currentWorkspaceFocused.num + ": " + newWorkspaceChosenName;
                    return [4 /*yield*/, execPromisified("i3-msg 'rename workspace \"" + currentWorkspaceFocused.name + "\" to \"" + TEMP_WORKSPACE_NAME + "\"'")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, execPromisified("i3-msg 'rename workspace \"" + workspaceChosen.name + "\" to \"" + newWorkspaceChosenName + "\"'")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, getWorkspaces()];
                case 5:
                    currentWorkspaces = _a.sent();
                    oldWorkspaceNewName = getFreeWorkspaceNum(currentWorkspaceFocused.num * 100, currentWorkspaces) + ": " + oldWorkspaceNewName;
                    return [4 /*yield*/, execPromisified("i3-msg 'rename workspace \"" + TEMP_WORKSPACE_NAME + "\" to \"" + oldWorkspaceNewName + "\"'")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, execPromisified("i3-msg -t command workspace \"" + newWorkspaceChosenName + "\"")];
                case 7:
                    _a.sent();
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
