import { IState } from './common.interface';

export interface ITutorial {
  name: string;
  is_completed: boolean;
  id: number;
  user?: any;
}

export interface ITodoState extends IState {
  todos: ITutorial[];
}
