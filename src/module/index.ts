import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import notes from './notes';

export type RootState = StateType<typeof rootReducer>;

const rootReducer = combineReducers({
  notes
});

export default rootReducer;