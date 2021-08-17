import { IState } from "./common.interface";
import { ITutorial } from "./todo.interface";

export interface IReportState extends IState {
    todos: ITutorial[];
  }