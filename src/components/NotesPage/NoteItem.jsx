import React from 'react';

const NoteItem = (props) => {

  const toggleModal = (id) => {
    document.body.classList.add('lock');
    props.toggleModal(true, id)
  }

  return (
    <div className="wr-note">
      <h3>{props.note}</h3>
      <p>{props.tags}</p>
      <div className="wr-btn">
        <button onClick={()=> toggleModal(props.id)}>Edit</button>
        <button className="delete-btn" onClick={() => props.deleteNote(props.id)}>×</button>
      </div>
    </div>
  );
}

export default NoteItem;
