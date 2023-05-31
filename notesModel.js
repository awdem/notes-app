/* eslint-disable require-jsdoc */
class NotesModel {
  constructor() {
    this.notes = [];
  }

  getNotes() {
    return this.notes;
  }

  setNotes(newNotes) {
    this.notes = newNotes;
  }

  addNotes(note) {
    this.notes.push(note);
  }

  reset() {
    this.notes = [];
  }
};

module.exports = NotesModel;
