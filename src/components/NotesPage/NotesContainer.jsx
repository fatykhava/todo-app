import React from 'react';
import Notes from "./Notes";
import {connect} from "react-redux";
import {
  deleteFilter,
  deleteNote, filterNotes,
  setNotes,
  toggleModal,
  togglePreloader, updateFilterText,
  updateNotesArr
} from "../../redux/reducers/NotesReducer";
import NotesAPI from "../../api/api";

class NotesContainer extends React.Component {
  componentDidMount() {
    this.props.togglePreloader(true);
    NotesAPI.getNotes().then(data => {
      if (data) {
        this.props.togglePreloader(false);
        this.props.setNotes(data);
      }
    });
  }

  deleteNote = (noteId) => {
    this.props.togglePreloader(true);
    NotesAPI.deleteNote(noteId).then(data => {
      if (data) {
        this.props.togglePreloader(false);
        this.props.deleteNote(noteId);
      }
    });
  }

  render = () => {
    return (
      <Notes {...this.props} deleteNote={this.deleteNote}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notesPage.notes,
    isModal: state.notesPage.isModal,
    newNoteText: state.notesPage.newNoteText,
    isFetching: state.notesPage.isFetching,
    filterValue: state.notesPage.filterValue,
    filterNotesArr: state.notesPage.filterNotesArr,
  }
}

export default connect(mapStateToProps, {
  setNotes,
  toggleModal,
  updateNotesArr,
  deleteNote,
  togglePreloader,
  updateFilterText,
  filterNotes,
  deleteFilter
})(NotesContainer);
