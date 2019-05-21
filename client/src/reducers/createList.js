import { combineReducers } from "redux";

const createList = entity => {
  const ids = (state = [], action) => {
    switch (action.type) {
      case `FETCH_${entity.toUpperCase()}_SUCCESS`:
      case `CREATE_${entity.toUpperCase()}_SUCCESS`:
        return action.payload.result
          ? [...state, ...action.payload.result]
          : state;
      case `DELETE_${entity.toUpperCase()}_SUCCESS`:
        return [...state.filter(id => id !== action.payload)];
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case `FETCH_${entity.toUpperCase()}_REQUEST`:
      case `CREATE_${entity.toUpperCase()}_REQUEST`:
      case `UPDATE_${entity.toUpperCase()}_REQUEST`:
      case `DELETE_${entity.toUpperCase()}_REQUEST`:
        return true;
      case `FETCH_${entity.toUpperCase()}_FAILURE`:
      case `CREATE_${entity.toUpperCase()}_FAILURE`:
      case `UPDATE_${entity.toUpperCase()}_FAILURE`:
      case `DELETE_${entity.toUpperCase()}_FAILURE`:
      case `FETCH_${entity.toUpperCase()}_SUCCESS`:
      case `CREATE_${entity.toUpperCase()}_SUCCESS`:
      case `UPDATE_${entity.toUpperCase()}_SUCCESS`:
      case `DELETE_${entity.toUpperCase()}_SUCCESS`:
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    switch (action.type) {
      case `FETCH_${entity.toUpperCase()}_FAILURE`:
      case `CREATE_${entity.toUpperCase()}_FAILURE`:
      case `UPDATE_${entity.toUpperCase()}_FAILURE`:
      case `DELETE_${entity.toUpperCase()}_FAILURE`:
        return action.payload;
      case `FETCH_${entity.toUpperCase()}_REQUEST`:
      case `CREATE_${entity.toUpperCase()}_REQUEST`:
      case `UPDATE_${entity.toUpperCase()}_REQUEST`:
      case `DELETE_${entity.toUpperCase()}_REQUEST`:
      case `FETCH_${entity.toUpperCase()}_SUCCESS`:
      case `CREATE_${entity.toUpperCase()}_SUCCESS`:
      case `UPDATE_${entity.toUpperCase()}_SUCCESS`:
      case `DELETE_${entity.toUpperCase()}_SUCCESS`:
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
};

const getIds = state => state.ids;
const getIsFetching = state => state.isFetching;
const getErrorMessage = state => state.errorMessage;

export default createList;
export { getIds, getIsFetching, getErrorMessage };
