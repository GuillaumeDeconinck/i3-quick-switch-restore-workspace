
export interface Workspace {
  id: number;
  num: number;
  name: string;
  visible: boolean;
  focused: boolean;
  rect: { x: number, y: number, width: number, height: number };
  output: string;
  urgent: boolean;
}

