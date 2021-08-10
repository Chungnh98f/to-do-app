import { ITutorial } from './models/tutorial.model';

export interface AppState {
  readonly tutorial: ITutorial[];
}
