const NotesModel = require('./notesModel');
const NotesView = require('./notesView');

const model = new NotesModel();
const view = new NotesView(model);

model.addNotes('This is an example note');
model.addNotes('This is another example note');
view.displayNotes();
