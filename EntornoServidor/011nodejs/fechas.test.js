test('hello world!', () => {
	expect(1 + 1).toBe(2);
});
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



const fizzbuzz = require('./fizzbuzz');

test('fizzbuzz returns "fizz" for multiples of 3', () => {
    expect(fizzbuzz(3)).toBe('fizz');
});

test('fizzbuzz returns "buzz" for multiples of 5', () => {
    expect(fizzbuzz(5)).toBe('buzz');
});

test('fizzbuzz returns "fizzbuzz" for multiples of both 3 and 5', () => {
    expect(fizzbuzz(15)).toBe('fizzbuzz');
});

test('fizzbuzz returns the number for non-multiples of 3 or 5', () => {
    expect(fizzbuzz(1)).toBe(1);
});




const fizzbuzz = require('./fizzbuzz');

const conditions = {
    2: 'poo',
    3: 'fizz',
    5: 'buzz',
    15: 'foo'
};

test('fizzbuzz returns correct string for given conditions', () => {
    const result = fizzbuzz(15, conditions);
    const expected = `1\npoo\nfizz\npoo\nbuzz\nfizzpoo\n7\npoo\nfizz\npoobuzz\n11\nfizzpoo\n13\npoo\nfizzbuzzfoo`;
    expect(result).toBe(expected);
});





