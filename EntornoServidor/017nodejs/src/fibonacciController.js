const calculateFibonacci = (n) => {
    if (n < 0) return 'Número no válido';
    if (n === 0) return 0;
    if (n === 1) return 1;

    let a = 0, b = 1, temp;
    for (let i = 2; i <= n; i++) {
        temp = a + b;
        a = b;
        b = temp;
    }
    return b;
};

const getFibonacci = (req, res) => {
    const number = parseInt(req.params.number, 10);
    if (isNaN(number)) {
        return res.status(400).json({ error: 'Debe proporcionar un número válido' });
    }

    const result = calculateFibonacci(number);
    res.json({ number, result });
};

module.exports = { getFibonacci };
