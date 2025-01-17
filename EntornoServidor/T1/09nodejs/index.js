const notes = require('./notes');


const command = process.argv[2];
const title = process.argv[3];
const content = process.argv.slice(4).join(' '); 

switch (command) {
    case 'add':
        if (title && content) {
            notes.addNote(title, content);
        } else {
            console.log('Por favor, proporciona un título y contenido para la nota.');
        }
        break;
    case 'list':
        notes.listNotes();
        break;
    case 'delete':
        if (title) {
            notes.deleteNote(title);
        } else {
            console.log('Por favor, proporciona un título de la nota a eliminar.');
        }
        break;
    default:
        console.log('Comando no reconocido. Usa "add", "list" o "delete".');
}
