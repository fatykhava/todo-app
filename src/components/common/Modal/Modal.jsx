import React from 'react';

const Modal = (props) => {
  const noteText = React.createRef();

  const onNoteChange = () => {
    let newNoteText = noteText.current.value;
    props.updateNoteText(newNoteText);
  };

  const toggleModal = ()=> {
    document.body.classList.remove('lock');
    props.toggleModal(false)
  }

  return (
    <>
      <div className="modal">
        <h2>{props.editNoteId ? 'Edit note' : 'Add new note'}</h2>
        {props.editNoteId ?
          <div className='tags-selection'> {
            props.newNoteText.split(' ')
                              .filter(word => word[0] === '#')
                              .map((word, index) => <span className='tags' key={`tags-${index}`}>{word}</span>)
          } </div> : ''}
        <textarea ref={noteText} onInput={onNoteChange} value={props.newNoteText} />
        <button onClick={() => props.updateNotes(props.editNoteId)}>Save</button>
        <button className="close-btn" onClick={() => toggleModal()}>×</button>
      </div>
      <div className="modal-shadow"></div>
    </>
  );
}

export default Modal;
