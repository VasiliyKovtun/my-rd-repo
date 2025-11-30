declare global {
    var age: number;
}

export function initGlobal(): void {
    globalThis.age = 18;
}
