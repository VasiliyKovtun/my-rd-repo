const sumArray = (arr) => {
    if (!Array.isArray(arr)) {
        return;
    }

    const allNumbers = arr.every(item => typeof item === 'number');
    const allStrings = arr.every(item => typeof item === 'string');

    if (allNumbers) {
        return arr.reduce((acc, item) => acc + item, 0);
    }

    if (allStrings) {
        return arr.join('');
    }
};

const stringArray = ['a', 'b', 'c', 'd', 'b'];
const numberArray = [1, 2, 3, 4, 3];

const sumStringArray = sumArray(stringArray);
const sumNumberArray = sumArray(numberArray);

console.log('sumStringArray = ', sumStringArray);
console.log('sumNumberArray = ', sumNumberArray);
