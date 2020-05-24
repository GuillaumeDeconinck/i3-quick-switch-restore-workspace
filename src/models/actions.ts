

export const ACTION_GO_TO_WORKSPACE = {
  namespace: 'workspace',
  command: 'go_to',
  message: 'Go to workspace',
};
export const ACTION_RENAME_WORKSPACE = {
  namespace: 'workspace',
  command: 'rename',
  message: 'Rename current workspace',
};
export const ACTION_NEW_WORKSPACE = {
  namespace: 'workspace',
  command: 'new',
  message: 'New workspace',
};
export const ACTION_LOAD_WORKSPACE_IN_CURRENT = {
  namespace: 'workspace',
  command: 'load',
  message: 'Load workspace in current',
};

export const possibleActions = [
  ACTION_GO_TO_WORKSPACE,
  ACTION_RENAME_WORKSPACE,
  ACTION_NEW_WORKSPACE,
  ACTION_LOAD_WORKSPACE_IN_CURRENT,
];

