/* eslint-disable require-jsdoc */
class NotesClient {
  loadNotes(callback, errorFunction) {
    return fetch('http://localhost:3000/notes')
        .then((response) => response.json())
        .then((data) => {
          callback(data);
        })
        .catch((error) => {
          errorFunction();
        });
  };

  createNote(note) {
    return fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({content: note}),
    });
  }
}

module.exports = NotesClient;
