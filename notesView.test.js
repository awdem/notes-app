/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require('./notesView');
const NotesModel = require('./notesModel');

describe('Notes view class', () => {
  let model;
  let view;

  beforeEach(() => {
    model = new NotesModel();
    view = new NotesView(model);
    document.body.innerHTML = fs.readFileSync('./index.html');
  });

  it('constructs', () => {
    expect(view).toBeTruthy();
    expect(view).toHaveProperty('notesModel', model);
  });

  it('creates a new div element on the page for each note in the model', () => {
    model.addNotes('Go to work');
    model.addNotes('Go to sleep');

    view.displayNotes();

    const matches = document.querySelectorAll('div.note');

    expect(matches.length).toBe(2);

    const noteOne = matches.item(0);
    const noteTwo = matches.item(1);
  
    expect(noteOne.textContent).toBe('Go to work');
    expect(noteTwo.textContent).toBe('Go to sleep');
  });
});
