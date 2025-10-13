export {};

type SumResult<T extends number | string> = T extends number ? number : string;

const sumArray = <T extends number | string>(arr: T[]): SumResult<T> => {
    if (typeof arr[0] === 'number') {
        const result = (arr as number[]).reduce((acc, item) => acc + item, 0);
        return result as SumResult<T>;
    }

    if (typeof arr[0] === 'string') {
        const result = (arr as string[]).join('');
        return result as SumResult<T>;
    }

    throw new Error('Array contains mixed or empty types');
};

const stringArray = ['a', 'b', 'c', 'd', 'b'];
const numberArray = [1, 2, 3, 4, 3];

const sumStringArray = sumArray(stringArray);
const sumNumberArray = sumArray(numberArray);

console.log('sumStringArray = ', sumStringArray);
console.log('sumNumberArray = ', sumNumberArray);
