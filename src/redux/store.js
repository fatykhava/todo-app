import {combineReducers, createStore} from "redux";
import NotesReducer from "./reducers/NotesReducer";

const reducers = combineReducers({
  notesPage: NotesReducer
})

const store = createStore(reducers);

window.store = store;
export default store;
