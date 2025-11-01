import { ITransport, IFreightTransport, IPassengerTransport } from './abstractions/index';
import { SportCar } from './sport-car';
import { Bus } from './bus';

class TravelService {
    public constructor(public readonly name: string) {}

    public moveTourists(transport: ITransport & IPassengerTransport, passengerQuantity: number): void {
        transport.loadPassenger(passengerQuantity);
        transport.start();
        transport.move(80);
        transport.brake(0);
        transport.turnOff();
        transport.unloadPassenger(passengerQuantity);
    }

    public moveTouristsWithBaggage(
        transport: ITransport & IPassengerTransport & IFreightTransport,
        passengerQuantity: number,
        weight: number): void {

        transport.loadPassenger(passengerQuantity);
        transport.loadTrunk(weight);
        transport.start();
        transport.move(80);
        transport.brake(0);
        transport.turnOff();
        transport.unloadPassenger(passengerQuantity);
        transport.unloadTrunk(weight);
    }
}

const agency = new TravelService('Travel agency');
const car = new SportCar('Sports car', 240, 2);
const bus = new Bus('Volvo bus', 100, 20, 500);

agency.moveTourists(car, 22);
console.log('-----------------------------------------');

agency.moveTouristsWithBaggage(bus, 22, 2000);
console.log('-----------------------------------------');
