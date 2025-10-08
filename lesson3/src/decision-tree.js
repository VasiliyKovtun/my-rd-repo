
const n = 5;
const n2 = 9;
const s = '9';
const s2 = 'true';
const b = true;

if (n > n2 && s === s2) {
    console.log('1st condition');
} else if (n > n2 || b === false) {
    console.log('2nd condition');
} else if (n > n2 || b === true || s === '8') {
    console.log('3rd condition');
} else {
    console.log('last condition');
};
