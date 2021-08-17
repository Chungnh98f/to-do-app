import { IReportState } from './../interface/report.interface';
import { ITodoState } from '../interface/todo.interface';
import { IAuthState } from './../interface/auth.interface';

export interface AppState {
  readonly tutorial: ITodoState;
  readonly auth: IAuthState;
  readonly report: IReportState;
}
