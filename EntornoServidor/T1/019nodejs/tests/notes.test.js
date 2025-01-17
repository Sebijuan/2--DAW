
import { getNotes, createNote } from '../controllers/notesController.js';
import assert from 'assert';

describe('Notes Controller', () => {
    it('should get all notes', (done) => {
        // Mock request and response
        const req = {};
        const res = {
            json: (data) => {
                assert(Array.isArray(data));
                done();
            },
            status: (code) => {
                assert.strictEqual(code, 500);
                return res;
            },
            send: (message) => {
                assert.strictEqual(message, 'Error reading notes');
                done();
            }
        };
        getNotes(req, res);
    });

    it('should create a new note', (done) => {
        // Mock request and response
        const req = { body: { title: 'Test Note', content: 'This is a test note' } };
        const res = {
            status: (code) => {
                assert.strictEqual(code, 201);
                return res;
            },
            send: (message) => {
                assert.strictEqual(message, 'Note created');
                done();
            }
        };
        createNote(req, res);
    });
});