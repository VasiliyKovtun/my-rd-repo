import { ITransport, IPassengerTransport } from './abstractions/index';

export class SportCar implements ITransport, IPassengerTransport {
    public maxSpeed: number;
    public currentSpeed = 0;
    public engineState = false;
    public passengerPlaces: number;
    public engagedPassengerPlaces = 0;

    public constructor(public readonly name: string, maxSpeed: number, passengerPlaces: number) {
        this.maxSpeed = maxSpeed;
        this.passengerPlaces = passengerPlaces;
    }

    public start(): void {
        this.engineState = true;
    }

    public turnOff(): void  {
        this.engineState = false;
        console.log('Engine is stopped');
    }

    public playMusic(musicState: boolean): void {
        if (musicState === false) {
            console.log(`Music doesn't play in ${this.name}`);
        } else {
            console.log(`Music plays in ${this.name}`);
        }
    }

    public move(wishedSpeed: number): void {
        if (this.maxSpeed >= wishedSpeed) {
            this.moveInsideLogic(wishedSpeed);
        } else {
            console.log(`${this.name} can't move ${wishedSpeed} km/h. ${this.name} will move under max Speed ${this.maxSpeed} km/h.`);
            this.moveInsideLogic(this.maxSpeed);
        }
    }

    public loadPassenger(passengerQuantity: number): void {
        const available = this.passengerPlaces - this.engagedPassengerPlaces;

        if (passengerQuantity <= available) {
            this.engagedPassengerPlaces += passengerQuantity;
            console.log(`${passengerQuantity} passengers got into ${this.name}`);
        } else {
            this.engagedPassengerPlaces = this.passengerPlaces;
            console.log(`${this.name} has ${available} free places, only ${available} passengers got into ${this.name}`);
        }
    }

    public unloadPassenger(passengerQuantity: number): void {
        if (passengerQuantity <= this.engagedPassengerPlaces) {
            this.engagedPassengerPlaces -= passengerQuantity;
            console.log(`${passengerQuantity} got out of ${this.name}`);
        } else {
            this.engagedPassengerPlaces = 0;
            console.log(`${this.passengerPlaces} passengers got out of ${this.name}`);
        }
    }

    public brake(wishedSpeed: number): void {
        if (this.currentSpeed >= wishedSpeed) {
            while (this.currentSpeed > wishedSpeed) {
                this.currentSpeed -= 20;
                console.log(`${this.name} is moving with the speed ${this.currentSpeed} km/h.`);
            }
        } else {
            console.log(`Current speed ${this.maxSpeed} km/h is less than you want`);
        }
    }

    private moveInsideLogic(speed: number): void {
        if (!this.engineState) {
            console.log(`${this.name} is not on! Please use 'Start' function.`);
            return;
        }

        while (this.currentSpeed < speed) {
            this.currentSpeed += 20;
            console.log(`${this.name} is moving with the speed ${this.currentSpeed} km/h.`);
        }
    }
}
