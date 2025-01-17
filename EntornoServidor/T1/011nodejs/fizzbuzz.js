function fizzbuzz(n) {
    if (n % 15 === 0) return 'fizzbuzz';
    if (n % 3 === 0) return 'fizz';
    if (n % 5 === 0) return 'buzz';
    return n;
}

module.exports = fizzbuzz;





function fizzbuzz(n, conditions) {
    let result = '';
    for (let i = 1; i <= n; i++) {
        let output = '';
        for (const [key, value] of Object.entries(conditions)) {
            if (i % key === 0) {
                output += value;
            }
        }
        result += output || i;
        result += '\n';
    }
    return result.trim();
}

module.exports = fizzbuzz;