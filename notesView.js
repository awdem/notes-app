/* eslint-disable require-jsdoc */
class NotesView {
  constructor(model, client) {
    this.notesModel = model;
    this.notesClient = client;
    //  event listener for add note button
    document.querySelector('#add_note_button').addEventListener('click', () => {
      this.addNoteToApi();
      // resets text field to empty
      document.querySelector('#add_note_button_text').value = null;
    });
  }

  displayNotes() {
  // removes all previous notes
    document.querySelectorAll('div.note').forEach((noteElement) => {
      noteElement.remove();
    });

    const notes = this.notesModel.getNotes();
    notes.forEach((note) => {
      const newDiv = document.createElement('div');
      newDiv.textContent = note;
      newDiv.className = 'note';
      document.querySelector('#main-container').append(newDiv);
    });
  }
  // this just adds notes to the model, we need to add notes to the server
  // those notes are then set in the displayNotesFromApi() that is
  // called in the index file
  addNote() {
    const newNoteText = document.querySelector('#add_note_button_text').value;
    this.notesModel.addNotes(newNoteText);
    this.displayNotes();
  }
  // this adds notes the server then updates the display with server notes.
  // why does this work despite it calling an async function before final line?
  addNoteToApi() {
    const newNoteText = document.querySelector('#add_note_button_text').value;
    this.notesClient.createNote(newNoteText);
    this.displayNotesFromApi();
  }

  displayNotesFromApi() {
    return this.notesClient.loadNotes((data) => {
      this.notesModel.setNotes(data);
      this.displayNotes();
    }, this.displayError);
  };

  displayError() {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = 'Oops something went wrong!';
    document.querySelector('#main-container').append(errorMessage);
  }
}

module.exports = NotesView;
