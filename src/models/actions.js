"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.possibleActions = exports.ACTION_LOAD_WORKSPACE_IN_CURRENT = exports.ACTION_NEW_WORKSPACE = exports.ACTION_RENAME_WORKSPACE = exports.ACTION_GO_TO_WORKSPACE = void 0;
exports.ACTION_GO_TO_WORKSPACE = {
    namespace: 'workspace',
    command: 'go_to',
    message: 'Go to workspace',
};
exports.ACTION_RENAME_WORKSPACE = {
    namespace: 'workspace',
    command: 'rename',
    message: 'Rename current workspace',
};
exports.ACTION_NEW_WORKSPACE = {
    namespace: 'workspace',
    command: 'new',
    message: 'New workspace',
};
exports.ACTION_LOAD_WORKSPACE_IN_CURRENT = {
    namespace: 'workspace',
    command: 'load',
    message: 'Load workspace in current',
};
exports.possibleActions = [
    exports.ACTION_GO_TO_WORKSPACE,
    exports.ACTION_RENAME_WORKSPACE,
    exports.ACTION_NEW_WORKSPACE,
    exports.ACTION_LOAD_WORKSPACE_IN_CURRENT,
];
