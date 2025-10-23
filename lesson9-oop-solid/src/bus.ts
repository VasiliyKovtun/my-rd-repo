import { ITransport, IFreightTransport, IPassengerTransport } from './abstractions/index';

export class Bus implements ITransport, IPassengerTransport, IFreightTransport {
    public maxSpeed: number;
    public currentSpeed = 0;
    public engineState = false;
    public passengerPlaces: number;
    public engagedPassengerPlaces = 0;
    public musicState = false;
    public trunkCapacity: number;
    public engagedTrunkCapacity = 0;

    public constructor(public readonly name: string, maxSpeed: number, passengerPlaces: number, trunkCapacity: number) {
        this.maxSpeed = maxSpeed;
        this.passengerPlaces = passengerPlaces;
        this.trunkCapacity = trunkCapacity;
    }

    public start(): void {
        console.log(`Engine of ${this.name} is starting.......`);
        this.engineState = true;
        console.log(`Now engine of ${this.name} is working!`);
    }

    public turnOff(): void  {
        this.engineState = false;
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
            console.log(`${passengerQuantity} passengers got out of ${this.name}`);
        } else {
            this.engagedPassengerPlaces = 0;
            console.log(`${this.passengerPlaces} passengers got out of ${this.name}`);
        }
    }

    public loadTrunk(weight: number): void {
        const available = this.trunkCapacity - this.engagedTrunkCapacity;

        if (weight <= available) {
            this.engagedTrunkCapacity += weight;
            console.log(`${weight} kg loaded into ${this.name}`);
        } else {
            this.engagedTrunkCapacity = this.trunkCapacity;
            console.log(`${this.name} can take only ${this.trunkCapacity} kg, only ${available} kg loaded into ${this.name}`);
        }
    }

    public unloadTrunk(weight: number): void {
        if (weight <= this.engagedTrunkCapacity) {
            this.engagedTrunkCapacity -= weight;
            console.log(`${weight} kg unloaded from ${this.name}`);
        } else {
            this.engagedTrunkCapacity = 0;
            console.log(`${this.trunkCapacity} kg got out of ${this.name}`);
        }
    }

    public brake(wishedSpeed: number): void {
        if (this.currentSpeed >= wishedSpeed) {
            while (this.currentSpeed > wishedSpeed) {
                this.currentSpeed -= 5;
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
            this.currentSpeed += 5;
            console.log(`${this.name} is moving with the speed ${this.currentSpeed} km/h.`);
        }
    }
}
