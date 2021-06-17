import React from 'react';
import Modal from "./Modal";
import {connect} from "react-redux";
import {toggleModal, togglePreloader, updateNotesArr, updateNoteText} from "../../../redux/reducers/NotesReducer";
import NotesAPI from "../../../api/api";

class ModalContainer extends React.Component {
  updateNotes = (noteId = null) => {
    this.props.togglePreloader(true);
    if (noteId) {
      NotesAPI.updateNote(noteId, this.props.newNoteText).then(response => {
        this.props.togglePreloader(false);
        this.props.toggleModal(false);
        document.body.classList.remove('lock');
        this.props.updateNotesArr(this.props.newNoteText, noteId);
      });
    } else {
      NotesAPI.addNote(this.props.newNoteText, new Date()).then(data => {
        if (data) {
          this.props.togglePreloader(false);
          this.props.toggleModal(false);
          document.body.classList.remove('lock');
          this.props.updateNotesArr(data);
        }
      });
    }
  }

  render = () => {
    return <Modal {...this.props} updateNotes={this.updateNotes}/>;
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notesPage.notes,
    newNoteText: state.notesPage.newNoteText,
    editNoteId: state.notesPage.editNoteId,
  };
}

export default connect(mapStateToProps, {toggleModal, togglePreloader, updateNotesArr, updateNoteText})(ModalContainer);
