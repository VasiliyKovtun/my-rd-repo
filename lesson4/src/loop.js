
console.log('---------------------for--0-9');
for (let i = 0; i < 10; i++) {
    console.log(i);
}

console.log('---------------------while--0-9');
let iterator = -1;
while (iterator < 9) {
    iterator++;
    console.log(iterator);
}

console.log('---------------------for--100-0');
for (let i = 100; i >= 0; i -= 10) {
    console.log(i);
}

console.log('---------------------while--100-0');
iterator = 100;
while (iterator >= 0) {
    console.log(iterator);
    iterator -= 10;
}
