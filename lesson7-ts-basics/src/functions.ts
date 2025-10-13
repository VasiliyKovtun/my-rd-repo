export {};

function sumArray(arr: number[]): number;
function sumArray(arr: string[]): string;
function sumArray(arr: (number | string)[]): number | string {
    const allNumbers = arr.every(item => typeof item === 'number');
    const allStrings = arr.every(item => typeof item === 'string');

    if (allNumbers) {
        return (arr as number[]).reduce((acc, item) => acc + item, 0);
    }

    if (allStrings) {
        return (arr as string[]).join('');
    }

    throw new Error('Array contains mixed types');
}

const stringArray = ['a', 'b', 'c', 'd', 'b'];
const numberArray = [1, 2, 3, 4, 3];

const sumStringArray = sumArray(stringArray);
const sumNumberArray = sumArray(numberArray);

console.log('sumStringArray = ', sumStringArray);
console.log('sumNumberArray = ', sumNumberArray);
