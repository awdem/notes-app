/* eslint-disable require-jsdoc */
class NotesView {
  constructor(model, client) {
    this.notesModel = model;
    this.notesClient = client;
    //  event listener for add note button
    document.querySelector('#add_note_button').addEventListener('click', () => {
      this.addNote();
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

  addNote() {
    const newNoteText = document.querySelector('#add_note_button_text').value;
    this.notesModel.addNotes(newNoteText);
    this.displayNotes();
  }

  displayNotesFromApi() {
    return this.notesClient.loadNotes((data) => {
      this.notesModel.setNotes(data);
      this.displayNotes();
    });
  };
}

module.exports = NotesView;
