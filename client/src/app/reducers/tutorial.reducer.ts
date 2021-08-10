import { Action } from '@ngrx/store';
import { ITutorial } from '../models/tutorial.model';
import * as TutorialActions from '../actions/tutorial.actions';

const initialState: ITutorial[] = [
  {
    name: 'Initial Tutorial',
    url: 'http://google.com',
    id: 3178236321,
  },
];

// : ActionReducer<ITutorial[], TutorialActions.Actions>

export const reducer = (state: ITutorial[] = initialState, action: any) => {
  switch (action.type) {
    case TutorialActions.ADD_TUTORIAL:
      return [...state, action.payload];
    case TutorialActions.REMOVE_TUTORIAL:
      return [...state].filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};
