const UPDATE_NOTES_ARR = 'UPDATE-NOTES-ARR';
const TOGGLE_MODAL = 'TOGGLE-MODAL';
const DELETE_NOTE = 'DELETE-NOTE';
const SET_NOTES = 'SET-NOTES';
const TOGGLE_PRELOADER = 'TOGGLE-PRELOADER';
const UPDATE_NOTE_TEXT = 'UPDATE-NOTE-TEXT';
const UPDATE_FILTER_TEXT = 'UPDATE-FILTER-TEXT';
const FILTER_NOTES = 'FILTER-NOTES';
const DELETE_FILTER = 'DELETE-FILTER';

export const setNotes = (notes) => ({type: SET_NOTES, notes});
export const toggleModal = (isModal, noteId = null) => ({type: TOGGLE_MODAL, isModal, noteId});
export const updateNotesArr = (data, noteId = null) => ({type: UPDATE_NOTES_ARR, data, noteId});
export const deleteNote = (noteId) => ({type: DELETE_NOTE, noteId});
export const togglePreloader = (isFetching) => ({type: TOGGLE_PRELOADER, isFetching});
export const updateNoteText = (noteText) => ({type: UPDATE_NOTE_TEXT, noteText});
export const updateFilterText = (filterText) => ({type: UPDATE_FILTER_TEXT, filterText});
export const filterNotes = () => ({type: FILTER_NOTES});
export const deleteFilter = () => ({type: DELETE_FILTER});

const initialState = {
  notes: null,
  newNoteText: 'New note',
  isModal: false,
  editNoteId: null,
  isFetching: false,
  filterValue: '#',
  filterNotesArr: null,
}

const NotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTES:
      return {
        ...state,
        notes: [...action.notes],
      };
    case TOGGLE_PRELOADER:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case UPDATE_NOTES_ARR:
      let newNotesArr = [...state.notes];
      if (action.noteId) {
        let newNotesArr = state.notes.map(note => {
          if (note._id === action.noteId) {
            note.value = action.data;
            note.tags = action.data.split(' ').filter(word => word[0] === '#').join(' ');
          }
          return note;
        });

        return {
          ...state,
          notes: newNotesArr,
          editNoteId: null,
        };
      } else {
        let newNote = {
          _id: action.data._id,
          id: action.data.id,
          value: action.data.value,
          addDate: action.data.addDate,
          tags: action.data.value.split(' ').filter(word => word[0] === '#').join(' '),
        };

        newNotesArr.push(newNote);

        return {
          ...state,
          notes: newNotesArr,
        };
      }
    case TOGGLE_MODAL:
      if (action.noteId) {
        let editNote = state.notes.filter(note => {
          if (note._id === action.noteId) {
            return note;
          }
        });
        return {
          ...state,
          isModal: action.isModal,
          editNoteId: action.noteId,
          newNoteText: editNote[0].value,
        };
      } else {
        return {
          ...state,
          isModal: action.isModal,
          editNoteId: null,
          newNoteText: 'New note',
        };
      }
    case DELETE_NOTE:
      let newNotes = state.notes.filter(note => note._id !== action.noteId);
      return {
        ...state,
        notes: newNotes,
      };
    case UPDATE_NOTE_TEXT:
      return {
        ...state,
        newNoteText: action.noteText,
      };
    case UPDATE_FILTER_TEXT:
      return {
        ...state,
        filterValue: action.filterText,
      };
    case FILTER_NOTES:
      if (!state.filterValue || state.filterValue === '#') {
        return {
          ...state,
          filterNotesArr: null,
        };
      }
      let newFilterNotes = state.notes.filter(note => {
        if (note.tags && note.tags.split(' ').indexOf( state.filterValue ) !== -1) {
          return note;
        }
      });
      return {
        ...state,
        filterNotesArr: newFilterNotes,
      };
    case DELETE_FILTER:
      return {
        ...state,
        filterNotesArr: null,
        filterValue: '#',
      };
    default:
      return state;
  }
}

export default NotesReducer;
