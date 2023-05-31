const NotesClient = require('./notesClient');
require('jest-fetch-mock').enableMocks();


describe('notes client class', () => {
  let client;

  beforeEach(() => {
    client = new NotesClient();
  });

  it('calls fetch and returns data', (done) => {
    fetch.mockResponseOnce(JSON.stringify(
        ['this is a server note'],
    ));

    client.loadNotes((apiData) => {
      expect(apiData).toEqual(['this is a server note']);
      done();
    });
  });
});
