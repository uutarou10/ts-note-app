import { Dispatch } from 'redux';
import { ActionType, createAction } from 'typesafe-actions';
import Note from '../model/note';
import storage from '../utils/storage';

enum ActionTypes {
  ADD_ITEMS = 'ADD_ITEMS',
  FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS',
  START_FETCH = 'START_FETCH'
}

export const fetchItemsRequest = () => {
  return async (dispatch: Dispatch) => {
    dispatch(startFetch());
    const notes = await storage.note.getAll();
    dispatch(fetchItemsSuccess(notes));
  };
};

const fetchItemsSuccess = createAction(ActionTypes.FETCH_ITEMS_SUCCESS, resolve => {
  return (items: Note[]) => resolve(items);
})

const startFetch = createAction(ActionTypes.START_FETCH, resolve => {
  return () => resolve()
});

// const startFetch = () => ({
//   type: ActionTypes.START_FETCH
// });

/* Reducer */

interface StateType {
  items: Note[],
  isFetching: boolean
}

const defaultState: StateType = {
  items: [],
  isFetching: false
}

type Actions = ActionType<typeof fetchItemsSuccess | typeof startFetch>

export default (state: StateType = defaultState, action: Actions): StateType => {
  switch (action.type) {
    case ActionTypes.START_FETCH:
      return {
        ...state,
        isFetching: true
      };
    case ActionTypes.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isFetching: false
      };
    default:
      return state;
  }
}