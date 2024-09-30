function oddishevenish(numero) {
    const digito = String(numero);          
    const suma = digito                     
        .split('')                         
        .map(Number)                        
        .reduce((acc, digit) => acc + digit, 0); 

  
    return suma % 2 === 0 ? "Evenish" : "Oddish";
}


console.log(oddishevenish(1234));
console.log(oddishevenish(9875)); 