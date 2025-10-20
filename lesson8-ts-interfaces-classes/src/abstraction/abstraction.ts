export abstract class Animal {
    public name: string;
    public sound?: string;

    public constructor(name: string, sound?: string) {
        this.name = name;
        this.sound = sound;
    }

    public abstract move(): void;

    public getSound(): void {
        if (this.sound) {
            console.log(`${this.name} says ${this.sound}`);
        } else {
            console.log(`${this.name} says nothing`);
        }
    }
}
