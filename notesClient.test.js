const NotesClient = require('./notesClient');
require('jest-fetch-mock').enableMocks();


describe('notes client class', () => {
  let client;

  beforeEach(() => {
    fetch.resetMocks();
    client = new NotesClient();
  });

  it('calls fetch and returns notes', (done) => {
    fetch.mockResponseOnce(JSON.stringify(
        ['this is a server note'],
    ));
    // this is feeding loadNotes a callback function that
    // is checking the fetch worked
    client.loadNotes((apiData) => {
      expect(apiData).toEqual(['this is a server note']);
      expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/notes');
      done();
    });
  });

  it('calls an error function on failure', (done) => {
    // mocking the failed fetch:
    fetch.mockReject(new Error('fake error message'));

    // mocking the necessary functions to call loadNotes
    const fakeCallback = jest.fn();
    const fakeErrorFunction = jest.fn();

    client.loadNotes(fakeCallback, fakeErrorFunction).then(() => {
      // checking that the catch block has been reached
      expect(fakeErrorFunction).toHaveBeenCalled();
      done();
    });
  });

  it('sends a POST request with a new note', () => {
    const newNote = 'new note';
    client.createNote(newNote);
    // this checks that the fetch request has been made
    // with the correct properties.
    expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/notes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({content: newNote}),
        },
    );
  });
});
