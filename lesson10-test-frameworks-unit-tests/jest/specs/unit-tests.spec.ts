import { Bus } from '../src/bus';
import { TravelService } from '../src/index';

describe('Unit tests', () => {
    let agency: TravelService;
    let bus: Bus;

    beforeEach(() => {
        agency = new TravelService('Travel agency');
        bus = new Bus('Volvo bus', 100, 20, 500);
    });

    describe('Transport tourists', () => {

        it('Move only passengers, should be 20', () => {
            expect(agency.moveTourists(bus, 20)).toBe(20);
        });

        it('Try to move more passengers than maximum, should be 20', () => {
            expect(agency.moveTourists(bus, 30)).toBe(20);
        });

        it('Move passengers with baggage, should be 10 passengers and 200 baggage', () => {
            const result = agency.moveTouristsWithBaggage(bus, 10, 200);
            expect(result.passengers).toBe(10);
            expect(result.weight).toBe(200);
        });

        it('Move passengers with baggage more than maximum, should be 20 passengers and 500 baggage', () => {
            const result = agency.moveTouristsWithBaggage(bus, 30, 700);
            expect(result.passengers).toBe(20);
            expect(result.weight).toBe(500);
        });
    });
});
