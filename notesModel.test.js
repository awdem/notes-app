const NotesModel = require('./notesModel');

let model;

beforeEach(() => {
  model = new NotesModel();
});

describe('NotesModel class', () => {
  it('constructs', () => {
    expect(model).toBeTruthy();
    expect(model).toHaveProperty('notes', []);
  });

  it('gets notes', () => {
    expect(model.getNotes()).toEqual([]);
  });

  it('adds notes', () => {
    model.addNotes('Buy milk');
    model.addNotes('Go to the gym');
    expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
  });

  it('resets notes attribute', () => {
    model.addNotes('Buy milk');
    model.addNotes('Go to the gym');
    expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
    model.reset();
    expect(model.getNotes()).toEqual([]);
  });

  it('sets the notes attribute', () => {
    const newNotes = ['new note'];

    model.setNotes(newNotes);

    expect(model).toHaveProperty('notes', newNotes);
  });
});
