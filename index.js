const NotesModel = require('./notesModel');
const NotesClient = require('./notesClient');
const NotesView = require('./notesView');

const model = new NotesModel();
const client = new NotesClient();
const view = new NotesView(model, client);

// model.addNotes('This is an example note');
// model.addNotes('This is another example note');
view.displayNotesFromApi();
