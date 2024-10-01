function isSimilar(obj1, obj2) {
    // Verificar si ambos son del mismo tipo
    if (typeof obj1 !== typeof obj2) {
        return false;
    }

    // Si son objetos (incluidos arrays)
    if (obj1 && typeof obj1 === 'object' && obj2 && typeof obj2 === 'object') {
        // Obtener las claves de cada objeto
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        // Verificar si tienen el mismo número de claves
        if (keys1.length !== keys2.length) {
            return false;
        }

        // Verificar que las claves y valores sean iguales recursivamente
        for (let key of keys1) {
            if (!keys2.includes(key) || !isSimilar(obj1[key], obj2[key])) {
                return false;
            }
        }
        return true;
    }

    // Si no son objetos, compararlos directamente
    return obj1 === obj2;
}

// Ejemplos de prueba
console.log(isSimilar(["cars", "trains", ["roads", ["railways"]]], ["cars", "trains", ["roads", ["railways"]]])); // true
console.log(isSimilar({"pairs": [[3, 5], [1, 7], [2, 6], [0, 8]]}, {"pairs": [[3, 5], [1, 1], [2, 6], [0, 8]]})); // false
console.log(isSimilar({"Sam": 4, "Elliot": 4, "equality": true}, {"Sam": 4, "Elliot": 5, "equality": false})); // false
console.log(isSimilar([{"D": [0, 3]}, {"X": [1, 3]}, {"D": [3, 7]}], [{"D": [0, 3]}, {"X": [1, 3]}, {"D": [3, 7]}])); // true
