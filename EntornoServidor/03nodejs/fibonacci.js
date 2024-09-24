function fibonacciHasta100() {
    let fibonacci = [0];

    let siguienteNumero = 1
    while (siguienteNumero <= 100) {
        fibonacci.push(siguienteNumero);
        siguienteNumero = fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2];
    }

    return fibonacci;
}

console.log(fibonacciHasta100());
