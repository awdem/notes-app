/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require('./notesView');
const NotesModel = require('./notesModel');
const NotesClient = require('./notesClient');

jest.mock('./notesClient');


describe('Notes view class', () => {
  let model;
  let client;
  let view;

  beforeEach(() => {
    // line below this comment has to go before others!
    // Otherwise you can't put elements in the constructor methods
    document.body.innerHTML = fs.readFileSync('./index.html');
    model = new NotesModel();
    client = new NotesClient();
    view = new NotesView(model, client);
    NotesClient.mockClear();
  });

  it('constructs', () => {
    expect(view).toBeTruthy();
    expect(view).toHaveProperty('notesModel', model);
    expect(view).toHaveProperty('notesClient', client);
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

  it('adds a note then displays on click', () => {
    // text input
    const textInputField = document.querySelector('#add_note_button_text');
    textInputField.value = 'Buy some groceries';
    // button click
    const buttonEl = document.querySelector('#add_note_button');
    buttonEl.click();

    const notes = document.querySelectorAll('div.note');

    expect(notes.length).toBe(1);
    expect(notes.item(0).textContent).toBe('Buy some groceries');
  });

  it('displays the right number of notes when called twice', () => {
    const textInputField = document.querySelector('#add_note_button_text');
    const buttonEl = document.querySelector('#add_note_button');

    textInputField.value = 'note one';
    buttonEl.click();
    textInputField.value = 'note two';
    buttonEl.click();

    const notes = document.querySelectorAll('div.note');

    expect(notes.length).toBe(2);
  });

  it('displays notes from the api', () => {
    // mock client methods first
    const mockData = ['mock api note'];
    // this replaces loadNotes with a new function that takes a callback
    // and returns a promise that is using the mockData in the
    // callback. So it's very similar to the real loadNotes, but it
    // skips the fetch to make the test deterministic.
    client.loadNotes.mockImplementation((callback) => {
      return Promise.resolve(callback(mockData));
    });

    return view.displayNotesFromApi()
        .then(() => {
          const notes = document.querySelectorAll('div.note');
          expect(notes.length).toBe(1);
          expect(notes.item(0).textContent).toBe('mock api note');
        });
  });
});
