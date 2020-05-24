import { exec } from "child_process";
// import { writeFileSync, mkdirSync } from 'fs';
import { promisify } from "util";
import {
  possibleActions,
  ACTION_GO_TO_WORKSPACE,
  ACTION_RENAME_WORKSPACE,
  ACTION_NEW_WORKSPACE,
  ACTION_LOAD_WORKSPACE_IN_CURRENT,
} from "./models/actions";
import {Workspace} from "./models/workspaces";

const execPromisified = promisify(exec);

const TEMP_WORKSPACE_NAME = "99: Temporary";

async function showActionChoices() {

  let actionChosen: string;

  if (process.argv.length > 3) {
    const namespace = process.argv[2];
    const command = process.argv[3];
    const actionFound = possibleActions.find(v => v.namespace === namespace && v.command === command);
    actionChosen = actionFound ? actionFound.message : '';
  } else {
    const actions: string[] = possibleActions.map((v) => `<b>${v.message}</b>`);
    actionChosen = await promptRofi("What to do ?", actions, {
      onlyMatch: true,
      noCustom: true,
    });
  }

  switch (actionChosen) {
    case ACTION_GO_TO_WORKSPACE.message:
      // Go to workspace
      await switchToWorkspace();
      break;
    case ACTION_RENAME_WORKSPACE.message:
      // Rename current workspace
      await renameWorkspace();
      break;
    case ACTION_NEW_WORKSPACE.message:
      // New workspace
      await newWorkspaceAndMoveCurrent();
      break;
    case ACTION_LOAD_WORKSPACE_IN_CURRENT.message:
      // Load workspace in current
      await loadWorkspaceInCurrent();
      break;
    default:
      break;
  }
}

async function promptRofi(
  promptMessage: string,
  choices: string[],
  options: { onlyMatch?: boolean, noCustom?: boolean } = {},
): Promise<string> {
  let baseCommand = `echo "${choices.join("\n")}" | rofi \
      -i -location 0 -width 40 -dmenu -markup-rows -format p -p "${promptMessage}"`;

  if (options.onlyMatch) {
    baseCommand += " --only-match ";
  }

  if (options.noCustom) {
    baseCommand += " --no-custom ";
  }

  const choice = await execPromisified(baseCommand);
  const choiceCleaned = choice.stdout.replace("\n", "");
  if (choiceCleaned === "") {
    throw new Error("Nothing chosen");
  }
  return choiceCleaned;
}

async function getWorkspaces(): Promise<Workspace[]> {
  const currentWorkspacesRaw = await execPromisified(
    "i3-msg -t get_workspaces"
  );
  return JSON.parse(currentWorkspacesRaw.stdout);
}

async function switchToWorkspace() {
  const currentWorkspaces = await getWorkspaces();

  const message = "Select workspace to go";
  const choices: string[] = currentWorkspaces.map((v) => `<b>${v.name}</b>`);
  const workspaceChosen = await promptRofi(message, choices, {
    onlyMatch: true,
    noCustom: true,
  });

  await execPromisified(`i3-msg -t command workspace "${workspaceChosen}"`);
}

async function renameWorkspace() {
  const renameMessage = "Rename to";
  const workspaceName = await promptRofi(renameMessage, []);

  const currentWorkspaces = await getWorkspaces();
  const currentWorkspaceVisible = currentWorkspaces.find(
    (v) => v.visible && v.focused
  );

  if (!currentWorkspaceVisible) {
    throw new Error('[Rename] Current workspace not found');
  }

  await execPromisified(
    `i3-msg 'rename workspace "${currentWorkspaceVisible.name}" to "${workspaceName}"'`
  );
}

async function newWorkspaceAndMoveCurrent() {
  const currentWorkspaces = await getWorkspaces();
  const currentWorkspaceVisible = currentWorkspaces.find(
    (v) => v.visible && v.focused
  );

  if (!currentWorkspaceVisible) {
    throw new Error('[Rename] Current workspace not found');
  }

  const currentWorkspaceName = extractNameWithoutNum(
    currentWorkspaceVisible.name
  );
  let newWorkspaceNumber = getFreeWorkspaceNum(
    currentWorkspaceVisible.num * 100,
    currentWorkspaces
  );
  const newWorkspaceName = `${newWorkspaceNumber}: ${currentWorkspaceName}`;

  await execPromisified(
    `i3-msg 'rename workspace "${currentWorkspaceVisible.name}" to "${newWorkspaceName}"'`
  );
  await execPromisified(
    `i3-msg -t command workspace number ${currentWorkspaceVisible.num}`
  );
}

function getFreeWorkspaceNum(from: number, currentWorkspaces: any[]): number {
  let newWorkspaceNumber = from;
  const checkWorkspaceExists = (index: number) =>
    currentWorkspaces.find((v) => v.num === index);
  for (let i = 0; i < 99; i++) {
    if (!checkWorkspaceExists(newWorkspaceNumber)) {
      break;
    }
    newWorkspaceNumber++;
  }
  return newWorkspaceNumber;
}

function extractNameWithoutNum(name: string) {
  let newName = name;
  console.log(newName);
  const [, splittedName2] = newName.split(":");
  console.log(splittedName2);
  if (splittedName2) {
    console.log(typeof splittedName2);
    console.log(splittedName2.trim);
    newName = splittedName2.trim();
  }
  return newName;
}

async function loadWorkspaceInCurrent() {
  let currentWorkspaces = await getWorkspaces();
  console.log(currentWorkspaces);
  const currentWorkspacesNotFocused = currentWorkspaces.filter(
    (v) => !v.focused
  );

  const message = "Select workspace to load";
  const choices: string[] = currentWorkspacesNotFocused.map(
    (v) => `<b>${v.name}</b>`
  );
  const workspaceNameChosen = await promptRofi(message, choices, {
    onlyMatch: true,
    noCustom: true,
  });

  const currentWorkspaceFocused = currentWorkspaces.find((v) => v.focused);
  const workspaceChosen = currentWorkspacesNotFocused.find(
    (v) => v.name === workspaceNameChosen
  );
  if (!currentWorkspaceFocused) {
    throw new Error('[LoadWorkspace] Current workspace focused not found');
  }
  if (!workspaceChosen) {
    throw new Error('[LoadWorkspace] Chosen workspace not found');
  }
  console.log(workspaceChosen);

  let newWorkspaceChosenName = extractNameWithoutNum(workspaceChosen.name);
  let oldWorkspaceNewName = extractNameWithoutNum(currentWorkspaceFocused.name);

  newWorkspaceChosenName = `${currentWorkspaceFocused.num}: ${newWorkspaceChosenName}`;

  await execPromisified(
    `i3-msg 'rename workspace "${currentWorkspaceFocused.name}" to "${TEMP_WORKSPACE_NAME}"'`
  );
  await execPromisified(
    `i3-msg 'rename workspace "${workspaceChosen.name}" to "${newWorkspaceChosenName}"'`
  );

  currentWorkspaces = await getWorkspaces();
  oldWorkspaceNewName = `${getFreeWorkspaceNum(
    currentWorkspaceFocused.num * 100,
    currentWorkspaces
  )}: ${oldWorkspaceNewName}`;

  await execPromisified(
    `i3-msg 'rename workspace "${TEMP_WORKSPACE_NAME}" to "${oldWorkspaceNewName}"'`
  );
  await execPromisified(
    `i3-msg -t command workspace "${newWorkspaceChosenName}"`
  );
}

(async () => {
  try {
    await showActionChoices();
  } catch (error) {
    console.error(error);
  }
  // const LAYOUT_PATH = `${process.env.HOME}/.config/i3-quick-switch-restore-workspace/layouts`;

  // make directory for storing layouts
  // mkdirSync(LAYOUT_PATH, { recursive: true });

  // logs
  // const LOG_FILE= '/tmp/i3_layout_manager.txt';
  // writeFileSync(LOG_FILE, '');
})();
