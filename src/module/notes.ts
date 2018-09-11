import { push } from 'connected-react-router';
import { Dispatch } from 'redux';
import { ActionType, createAction } from 'typesafe-actions';
import Note from '../model/note';
import storage from '../utils/storage';

enum ActionTypes {
  ADD_ITEMS = 'ADD_ITEMS',
  FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS',
  START_FETCH = 'START_FETCH',
  START_REQEUST = 'START_REQEUST',
  SAVE_SUCCESS = 'SAVE_SUCCESS',
  DELETE_SUCCESS = 'DELETE_SUCCESS'
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

const startRequest = createAction(ActionTypes.START_REQEUST, resolve => {
  return () => resolve()
});

const saveSuccess = createAction(ActionTypes.SAVE_SUCCESS, resolve => {
  return (updatedNote: Note) => resolve(updatedNote);
});

export const saveNote = (id: string, title: string, body: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(startRequest());
    const updatedNote = await storage.note.update(id, title, body);
    dispatch(saveSuccess(updatedNote));
  };
};

const deleteSuccess = createAction(ActionTypes.DELETE_SUCCESS, resolve => {
  return (id: string) => resolve(id);
});

export const deleteNote = (note: Note) => {
  return async (dispatch: Dispatch) => {
    dispatch(startRequest());
    await storage.note.delete(note);
    dispatch(deleteSuccess(note.id));
    alert('Deleted!')
    dispatch(push('/'));
  };
}

/* Reducer */

interface StateType {
  items: Note[],
  isFetching: boolean,
  isRequesting: boolean
}

const defaultState: StateType = {
  items: [],
  isFetching: false,
  isRequesting: false
}

type Actions = ActionType<
  typeof fetchItemsSuccess |
  typeof startFetch |
  typeof startRequest |
  typeof saveSuccess |
  typeof deleteSuccess
>

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

    case ActionTypes.START_REQEUST:
      return {
        ...state,
        isRequesting: true
      };

    case ActionTypes.SAVE_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        items: state.items.map(item => item.id === action.payload.id ? action.payload : item)
      };

    case ActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        items: state.items.filter(item => item.id !== action.payload)
      };

    default:
      return state;
  }
}