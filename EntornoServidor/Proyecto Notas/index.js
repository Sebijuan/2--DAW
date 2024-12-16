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
            console.log('Opción no válida.');
            showMenu();
            break;
    }
};

const createNote = () => {
    rl.question('Introduce el título de la nota: ', (title) => {
        rl.question('Introduce el contenido de la nota: ', (content) => {
            const filePath = path.join(notesDir, `${title}.note`);
            fs.writeFileSync(filePath, content);
            console.log('Nota creada.');
            showMenu();
        });
    });
};

const editNote = () => {
    const notes = getNotes();
    if (notes.length === 0) {
        console.log('No hay notas para editar.');
        showMenu();
        return;
    }
    console.log('Notas disponibles:');
    notes.forEach((note, index) => {
        console.log(`${index + 1}. ${note}`);
    });
    rl.question('Selecciona el número de la nota a editar: ', (number) => {
        const noteIndex = parseInt(number) - 1;
        if (noteIndex >= 0 && noteIndex < notes.length) {
            const notePath = path.join(notesDir, notes[noteIndex]);
            rl.question('Introduce el nuevo contenido de la nota: ', (content) => {
                fs.writeFileSync(notePath, content);
                console.log('Nota editada.');
                showMenu();
            });
        } else {
            console.log('Número de nota no válido.');
            showMenu();
        }
    });
};

const deleteNote = () => {
    const notes = getNotes();
    if (notes.length === 0) {
        console.log('No hay notas para eliminar.');
        showMenu();
        return;
    }
    console.log('Notas disponibles:');
    notes.forEach((note, index) => {
        console.log(`${index + 1}. ${note}`);
    });
    rl.question('Selecciona el número de la nota a eliminar: ', (number) => {
        const noteIndex = parseInt(number) - 1;
        if (noteIndex >= 0 && noteIndex < notes.length) {
            const notePath = path.join(notesDir, notes[noteIndex]);
            fs.unlinkSync(notePath);
            console.log('Nota eliminada.');
            showMenu();
        } else {
            console.log('Número de nota no válido.');
            showMenu();
        }
    });
};

const getNotes = () => {
    return fs.readdirSync(notesDir).filter(file => file.endsWith('.note'));
};

const sortNotes = () => {
    const notes = getNotes();
    notes.sort();
    console.log('Notas ordenadas:');
    notes.forEach(note => console.log(note));
    showMenu();
};

const filterNotes = () => {
    rl.question('Introduce el término de búsqueda: ', (term) => {
        const notes = getNotes();
        const filteredNotes = notes.filter(note => note.includes(term));
        console.log('Notas filtradas:');
        filteredNotes.forEach(note => console.log(note));
        showMenu();
    });
};

const paginateNotes = () => {
    const notes = getNotes();
    const pageSize = 5;
    let pageIndex = 0;

    const showPage = () => {
        const start = pageIndex * pageSize;
        const end = start + pageSize;
        const pageNotes = notes.slice(start, end);
        console.log(`Página ${pageIndex + 1}:`);
        pageNotes.forEach(note => console.log(note));
        if (end < notes.length) {
            rl.question('Presiona Enter para ver más o escribe "salir" para volver al menú: ', (input) => {
                if (input.trim().toLowerCase() === 'salir') {
                    showMenu();
                } else {
                    pageIndex++;
                    showPage();
                }
            });
        } else {
            showMenu();
        }
    };

    showPage();
};

// Función para importar notas
const importNotes = (files) => {
    files.forEach(file => {
        const destPath = path.join(notesDir, file.originalname);
        fs.renameSync(file.path, destPath);
    });
};

// Función para exportar notas
const exportNotes = () => {
    const notes = fs.readdirSync(notesDir).filter(file => file.endsWith('.note'));
    return notes.map(note => ({ path: path.join(notesDir, note), name: note }));
};

authenticate(showMenu);
