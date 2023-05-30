/* eslint-disable require-jsdoc */
class NotesModel {
  constructor() {
    this.notes = [];
  }

  getNotes() {
    return this.notes;
  }

  addNotes(note) {
    this.notes.push(note);
  }

  reset() {
    this.notes = [];
  }
};

module.exports = NotesModel;
