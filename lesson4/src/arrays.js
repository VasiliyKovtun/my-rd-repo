
const stringArray = ['a', 'b', 'c', 'd', 'b'];
const numberArray = [1, 2, 3, 4, 3];
const booleanArray = [true, false, true, false];
const anyArray = [1, 'd', false, { a: 2, b: 4 }];

const filteredStringArray = stringArray.filter ((item) => item === 'b');
const foundBoolean = booleanArray.find((item) => item === false);
const sortedBooleanArray = booleanArray.sort((a, b) => b - a);
const concatenatedArray = stringArray.concat(numberArray, booleanArray, anyArray);
const includedElement = numberArray.includes(7);
const joinedString = stringArray.join('-');
const unitedStringAndNumber = [...stringArray, 0, ...numberArray];


console.log('filteredStringArray = ', filteredStringArray);
console.log('foundBoolean = ', foundBoolean);
console.log('sortedBooleanArray = ', sortedBooleanArray);
console.log('concatenatedArray = ', concatenatedArray);
console.log('includedElement = ', includedElement);
console.log('joinedString = ', joinedString);
console.log('unitedStringAndNumber = ', unitedStringAndNumber);

console.log('-------------------------------------forEach');

numberArray.forEach((number, index) => {
    if (number === 3) {
        console.log('3 found at index: ', index);
    }
});

console.log('-------------------------------------map');
const mappedArray = numberArray.map((value, index) => {
    if (index % 2 === 1) {
        return value * 2;
    } else {
        return value;
    }
});
console.log('mappedArray = ', mappedArray);
