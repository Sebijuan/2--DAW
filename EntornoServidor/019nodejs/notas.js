mport fs from 'fs';
import readlineSync from 'readline-sync';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const notesDir = path.join(__dirname, 'notes');

// Crear directorio de notas si no existe
if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}

// Call the createNote function
createNote();

function createNote() {
    const noteName = readlineSync.question('Introduce el nombre de la nota: ') + '.note';
    const notePath = path.join(notesDir, noteName);
    let content = '';
    let line;

    console.log('Escribe tu nota. Introduce dos líneas en blanco para finalizar.');

    while (!(line === '' && content.endsWith('\n\n'))) {
        line = readlineSync.question('');
        if (line === '' && content.endsWith('\n\n')) break;
        content += line + '\n';
    }

    fs.writeFileSync(notePath, content.trim());
    console.log('Nota creada con éxito.');
}