import { Animal } from '../abstraction/abstraction';

export class Dog extends Animal {
    public constructor(name: string, sound?: string) {
        super(name, sound);
    }

    public move(): void {
        console.log(`${this.name} can walk on the ground with its paws.`);
    }
}

export class Bird extends Animal {
    public constructor(name: string, sound?: string) {
        super(name, sound);
    }

    public move(): void {
        console.log(`${this.name} can walk on the ground with its paws and fly in the sky using its wings.`);
    }
}

export class PetOwner {
    public constructor(public ownerName: string, public pet: Animal) {}

    public getPetOwner(): void {
        console.log(`${this.ownerName} has a ${this.pet.name}.`);
    }
}
