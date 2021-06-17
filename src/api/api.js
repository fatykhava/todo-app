import axios from "axios";

const instance = axios.create({
  baseURL: 'https://todolist-7bfe.restdb.io/rest/',
  crossDomain: true,
  headers: {
    "x-apikey": "60c865cee2c96c46a2463560",
  }
})

const NotesAPI = {
  getNotes() {
    return instance.get('todo').then(response => response.data);
  },
  deleteNote(noteId) {
    return instance.delete('todo/' + noteId).then(response => response.data);
  },
  addNote(note, date) {
    return instance.post('todo', {
      value: note,
      tags: note.split(' ').filter(word => word[0] === '#').join(' '),
      addDate: date,
    }).then(response => response.data);
  },
  updateNote(noteId, newValue) {
    return instance.put('todo/' + noteId, {
      value: newValue,
      tags: newValue.split(' ').filter(word => word[0] === '#').join(' '),
    });
  }
}

export default NotesAPI;
