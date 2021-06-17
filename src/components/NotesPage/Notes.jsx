import React from 'react';
import NoteItem from "./NoteItem";
import Preloader from "../common/Preloader";
import ModalContainer from "../common/Modal/ModalContainer";
import trashPic from "../../assets/image/trash-solid.png";

const Notes = (props) => {
  return (
    <>
      {props.isFetching ? <Preloader/> : <NoteContent {...props}/>}
      {props.isModal ? <ModalContainer/> : ''}
    </>
  );
}

const NoteContent = (props) => {
  const tagText = React.createRef();
  let notes = [];

  const createNoteArr = (notes) => {
    return notes.map(note => <NoteItem key={note.id} id={note._id} note={note.value}  tags={note.tags} date={note.addDate}
                                       deleteNote={props.deleteNote} toggleModal={props.toggleModal}/>);
  }

  if (props.filterNotesArr) {
    notes = createNoteArr(props.filterNotesArr);
  } else if (props.notes) {
    notes = createNoteArr(props.notes);
  }

  const onFilterChange = () => {
    let newFilterText = tagText.current.value;
    props.updateFilterText(newFilterText);
  };

  const toggleModal = () => {
    document.body.classList.add('lock');
    props.toggleModal(true)
  }

  return (
    <div className="wr-content">
      <button className="add-btn" onClick={() => toggleModal()}>Add note</button>
      <h1>TO DO LIST APP</h1>
      <div className="notes-container">
        {notes}
      </div>
      <div className="wr-filter">
        <input type="text" ref={tagText} onChange={onFilterChange} value={props.filterValue}/>
        <button onClick={props.filterNotes}>Find tag</button>
        <button className="wr-pic" onClick={()=>props.deleteFilter()}>
          <img src={trashPic} alt="trash"/>
        </button>
      </div>
    </div>
  )
    ;
}

export default Notes;
