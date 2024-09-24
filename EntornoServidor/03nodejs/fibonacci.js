function fibonacciHasta100() {
    let fibonacci = [0, 1];

    while (true) {
        let siguienteNumero = fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2];
        if (siguienteNumero > 100) {
            break; 
        }
        fibonacci.push(siguienteNumero);
    }

    return fibonacci;
}

console.log(fibonacciHasta100());
