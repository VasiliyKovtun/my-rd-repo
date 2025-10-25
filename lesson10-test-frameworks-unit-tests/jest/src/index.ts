import { ITransport, IFreightTransport, IPassengerTransport } from './abstractions/index';
import { SportCar } from './sport-car';
import { Bus } from './bus';

export class TravelService {
    public constructor(public readonly name: string) {}

    public moveTourists(transport: ITransport & IPassengerTransport, passengerQuantity: number): number {
        transport.loadPassenger(passengerQuantity);
        transport.start();
        transport.move(80);
        transport.brake(0);
        transport.turnOff();
        const unloaded = transport.unloadPassenger(passengerQuantity);
        return unloaded;
    }

    public moveTouristsWithBaggage(
        transport: ITransport & IPassengerTransport & IFreightTransport,
        passengerQuantity: number,
        weight: number): { passengers: number; weight: number } {

        transport.loadPassenger(passengerQuantity);
        transport.loadTrunk(weight);
        transport.start();
        transport.move(80);
        transport.brake(0);
        transport.turnOff();
        const unloadedPassengers = transport.unloadPassenger(passengerQuantity);
        const unloadedTrunk = transport.unloadTrunk(weight);
        return { passengers: unloadedPassengers, weight: unloadedTrunk };
    }
}

const agency = new TravelService('Travel agency');
const car = new SportCar('Sports car', 240, 2);
const bus = new Bus('Volvo bus', 100, 20, 500);

agency.moveTourists(car, 22);
console.log('-----------------------------------------');

agency.moveTouristsWithBaggage(bus, 22, 2000);
console.log('-----------------------------------------');
