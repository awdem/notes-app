/* eslint-disable require-jsdoc */
class NotesView {
  constructor(model) {
    this.notesModel = model;
    // add note button event listener
    document.querySelector('#add_note_button').addEventListener('click', () => {
      this.addNote();
    });
  }

  displayNotes() {
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
}

module.exports = NotesView;
