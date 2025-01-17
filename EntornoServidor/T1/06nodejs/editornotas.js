const fs = require('fs');
const path = require('path');
const readline = require('readline');


const notesDir = path.join(__dirname, 'notes');


if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const showMenu = () => {
    console.log(`
    1. Crear nueva nota
    2. Editar nota existente
    3. Eliminar nota
    4. Salir
    `);
    rl.question('Selecciona una opción: ', handleMenuChoice);
};


const handleMenuChoice = (choice) => {
    switch (choice.trim()) {
        case '1':
            createNote();
            break;
        case '2':
            editNote();
            break;
        case '3':
            deleteNote();
            break;
        case '4':
            rl.close();
            break;
        default:
            console.log('Opción no válida. Por favor intenta de nuevo.');
            showMenu();
            break;
    }
};


const createNote = () => {
    rl.question('Introduce el nombre de la nota (sin extensión .note): ', (name) => {
        const filePath = path.join(notesDir, `${name}.note`);
        console.log('Escribe el contenido de la nota. Presiona Enter dos veces para guardar.');

        let content = '';
        const input = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        input.on('line', (line) => {
            if (line === '') {
                if (content.endsWith('\n\n')) {
                    input.close();
                } else {
                    content += '\n';
                }
            } else {
                content += line + '\n';
            }
        });

        input.on('close', () => {
            fs.writeFileSync(filePath, content.trim());
            console.log(`Nota guardada como ${name}.note`);
            showMenu();
        });
    });
};


const editNote = () => {
    const notes = getNotes();
    if (notes.length === 0) {
        console.log('No hay notas disponibles para editar.');
        showMenu();
        return;
    }

    console.log('Notas disponibles:');
    notes.forEach((note, index) => {
        console.log(`${index + 1}. ${note}`);
    });

    rl.question('Selecciona el número de la nota a editar: ', (choice) => {
        const noteIndex = parseInt(choice.trim()) - 1;
        if (noteIndex >= 0 && noteIndex < notes.length) {
            const noteName = notes[noteIndex];
            const filePath = path.join(notesDir, noteName);
            const currentContent = fs.readFileSync(filePath, 'utf8');

            console.log('Contenido actual de la nota:');
            console.log(currentContent);
            console.log('Escribe el nuevo contenido. Presiona Enter dos veces para guardar.');

            let content = '';
            const input = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            input.on('line', (line) => {
                if (line === '') {
                    if (content.endsWith('\n\n')) {
                        input.close();
                    } else {
                        content += '\n';
                    }
                } else {
                    content += line + '\n';
                }
            });

            input.on('close', () => {
                fs.writeFileSync(filePath, content.trim());
                console.log(`Nota ${noteName} actualizada.`);
                showMenu();
            });
        } else {
            console.log('Selección no válida.');
            showMenu();
        }
    });
};


const deleteNote = () => {
    const notes = getNotes();
    if (notes.length === 0) {
        console.log('No hay notas disponibles para eliminar.');
        showMenu();
        return;
    }

    console.log('Notas disponibles:');
    notes.forEach((note, index) => {
        console.log(`${index + 1}. ${note}`);
    });

    rl.question('Selecciona el número de la nota a eliminar: ', (choice) => {
        const noteIndex = parseInt(choice.trim()) - 1;
        if (noteIndex >= 0 && noteIndex < notes.length) {
            const noteName = notes[noteIndex];
            const filePath = path.join(notesDir, noteName);
            fs.unlinkSync(filePath);
            console.log(`Nota ${noteName} eliminada.`);
        } else {
            console.log('Selección no válida.');
        }
        showMenu();
    });
};


const getNotes = () => {
    return fs.readdirSync(notesDir).filter(file => file.endsWith('.note'));
};


showMenu();
