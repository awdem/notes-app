/* eslint-disable require-jsdoc */
class NotesView {
  constructor(model) {
    this.notesModel = model;
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
}

module.exports = NotesView;
