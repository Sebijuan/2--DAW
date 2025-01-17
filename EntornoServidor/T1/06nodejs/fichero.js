const fs = require('fs');


if (process.argv.length < 3) {
    console.log('Por favor, escribe el nombre del archivo como argumento.');
    process.exit(1); 
}


const fileName = process.argv[2];


fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error al leer el archivo: ${err.message}`);
        process.exit(1);
    }
    
   
    console.log(data);
});
