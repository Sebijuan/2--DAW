const fs = require('fs');
const path = require('path');
const readline = require('readline');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Cargar variables de entorno
dotenv.config({ path: path.resolve(__dirname, 'admin.env') });

console.log(`ADMIN_USER: ${process.env.ADMIN_USER}`);
console.log(`SECRET_KEY: ${process.env.SECRET_KEY}`);

const notesDir = path.join(__dirname, 'notes');

if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const authenticate = (callback) => {
    rl.question('Introduce el nombre de usuario: ', (username) => {
        if (username === process.env.ADMIN_USER) {
            const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
            console.log(`Token generado: ${token}`);
            callback();
        } else {
            console.log('Usuario no autorizado.');
            rl.close();
        }
    });
};

const showMenu = () => {
    console.log(`
    1. Crear nueva nota
    2. Editar nota existente
    3. Eliminar nota
    4. Ordenar notas
    5. Filtrar notas
    6. Paginar notas
    7. Salir
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
            sortNotes();
            break;
        case '5':
            filterNotes();
            break;
        case '6':
            paginateNotes();
            break;
        case '7':
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

const sortNotes = () => {
    const notes = getNotes();
    if (notes.length === 0) {
        console.log('No hay notas disponibles para ordenar.');
        showMenu();
        return;
    }

    console.log(`
    1. Por fecha de creación/edición
    2. Por título
    3. Por tamaño
    `);
    rl.question('Selecciona un criterio de ordenación: ', (choice) => {
        switch (choice.trim()) {
            case '1':
                notes.sort((a, b) => fs.statSync(path.join(notesDir, a)).mtime - fs.statSync(path.join(notesDir, b)).mtime);
                break;
            case '2':
                notes.sort();
                break;
            case '3':
                notes.sort((a, b) => fs.statSync(path.join(notesDir, a)).size - fs.statSync(path.join(notesDir, b)).size);
                break;
            default:
                console.log('Opción no válida.');
                showMenu();
                return;
        }
        console.log('Notas ordenadas:');
        notes.forEach(note => console.log(note));
        showMenu();
    });
};

const filterNotes = () => {
    const notes = getNotes();
    if (notes.length === 0) {
        console.log('No hay notas disponibles para filtrar.');
        showMenu();
        return;
    }

    console.log(`
    1. Contiene un texto en el título
    2. Contiene un texto en el contenido
    3. Igual a una categoría o grupo
    4. Pertenece a un rango de fechas según creación/actualización
    `);
    rl.question('Selecciona un criterio de filtrado: ', (choice) => {
        switch (choice.trim()) {
            case '1':
                rl.question('Introduce el texto a buscar en el título: ', (text) => {
                    const filteredNotes = notes.filter(note => note.includes(text));
                    console.log('Notas filtradas:');
                    filteredNotes.forEach(note => console.log(note));
                    showMenu();
                });
                break;
            case '2':
                rl.question('Introduce el texto a buscar en el contenido: ', (text) => {
                    const filteredNotes = notes.filter(note => {
                        const content = fs.readFileSync(path.join(notesDir, note), 'utf8');
                        return content.includes(text);
                    });
                    console.log('Notas filtradas:');
                    filteredNotes.forEach(note => console.log(note));
                    showMenu();
                });
                break;
            case '3':
                rl.question('Introduce la categoría o grupo: ', (category) => {
                    // Implementar lógica de filtrado por categoría o grupo
                    showMenu();
                });
                break;
            case '4':
                rl.question('Introduce el rango de fechas (YYYY-MM-DD a YYYY-MM-DD): ', (range) => {
                    const [start, end] = range.split(' a ').map(date => new Date(date));
                    const filteredNotes = notes.filter(note => {
                        const mtime = fs.statSync(path.join(notesDir, note)).mtime;
                        return mtime >= start && mtime <= end;
                    });
                    console.log('Notas filtradas:');
                    filteredNotes.forEach(note => console.log(note));
                    showMenu();
                });
                break;
            default:
                console.log('Opción no válida.');
                showMenu();
                break;
        }
    });
};

const paginateNotes = () => {
    const notes = getNotes();
    if (notes.length === 0) {
        console.log('No hay notas disponibles para paginar.');
        showMenu();
        return;
    }

    const itemsPerPage = 5; // Valor por defecto
    const totalPages = Math.ceil(notes.length / itemsPerPage);

    const showPage = (page) => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageNotes = notes.slice(start, end);

        console.log(`Página ${page} de ${totalPages}`);
        pageNotes.forEach(note => console.log(note));

        if (page < totalPages) {
            rl.question('Presiona Enter para ver la siguiente página o escribe "salir" para volver al menú: ', (input) => {
                if (input.trim().toLowerCase() === 'salir') {
                    showMenu();
                } else {
                    showPage(page + 1);
                }
            });
        } else {
            showMenu();
        }
    };

    showPage(1);
};

authenticate(showMenu);