const test = require('ava');
const fizzbuzz = require('./fizzbuzz');

test('fizzbuzz returns "fizz" for multiples of 3', t => {
    t.is(fizzbuzz(3), 'fizz');
});

test('fizzbuzz returns "buzz" for multiples of 5', t => {
    t.is(fizzbuzz(5), 'buzz');
});

test('fizzbuzz returns "fizzbuzz" for multiples of both 3 and 5', t => {
    t.is(fizzbuzz(15), 'fizzbuzz');
});

test('fizzbuzz returns the number for non-multiples of 3 or 5', t => {
    t.is(fizzbuzz(1), 1);
});