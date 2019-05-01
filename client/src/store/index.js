import reducers from "reducers";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import createDebounce from "redux-debounced";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(createDebounce(), reduxThunk))
);

export default store;
