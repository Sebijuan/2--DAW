const test = require('ava');
const dateCompare = require('./datecompare');

test('dateCompare returns correct order for two dates', t => {
    const result = dateCompare('2023-01-01', '2023-12-31');
    t.deepEqual(result, { startDate: '2023-01-01T00:00:00.000Z', endDate: '2023-12-31T00:00:00.000Z' });
});

test('dateCompare compares with current date if only one date is provided', t => {
    const result = dateCompare('2023-01-01');
    const now = new Date().toISOString();
    t.deepEqual(result, { startDate: '2023-01-01T00:00:00.000Z', endDate: now });
});




const dateCompare = require('./datecompare');

test('dateCompare returns correct order for two dates', () => {
    const result = dateCompare('2023-01-01', '2023-12-31');
    expect(result).toEqual({ startDate: '2023-01-01T00:00:00.000Z', endDate: '2023-12-31T00:00:00.000Z' });
});

test('dateCompare compares with current date if only one date is provided', () => {
    const result = dateCompare('2023-01-01');
    const now = new Date().toISOString();
    expect(result).toEqual({ startDate: '2023-01-01T00:00:00.000Z', endDate: now });
});





