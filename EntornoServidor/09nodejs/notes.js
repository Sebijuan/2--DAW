const fs = require('fs');
const path = require('path');

const notesFile = path.join(__dirname, 'notes.json');


function addNote(title, content) {
    const notes = loadNotes();
    notes.push({ title, content });
    saveNotes(notes);
    console.log('Nota añadida:', title);
}

function listNotes() {
    const notes = loadNotes();
    console.log('Notas:');
    notes.forEach(note => {
        console.log(`- ${note.title}: ${note.content}`);
    });
}

function deleteNote(title) {
    const notes = loadNotes();
    const filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);
    console.log('Nota eliminada:', title);
}

function loadNotes() {
    try {
        return JSON.parse(fs.readFileSync(notesFile));
    } catch (e) {
        return [];
    }
}

function saveNotes(notes) {
    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
}


module.exports = {
    addNote,
    listNotes,
    deleteNote
};
