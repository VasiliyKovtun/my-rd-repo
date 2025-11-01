import { stubConstructor } from 'ts-sinon';
import { expect } from 'chai';
import sinon from 'sinon';
import { Bus } from '../src/bus';

describe('Test Bus', () => {
    let mockedBus: sinon.SinonStubbedInstance<Bus>;

    beforeEach(() => {
        mockedBus = stubConstructor(Bus);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('load passenger', () => {
        mockedBus.loadPassenger.returns(5);

        const result = mockedBus.loadPassenger(10);
        expect(result).to.equal(5);
    });

    it('unload passenger', () => {
        mockedBus.unloadPassenger.returns(10);

        const result = mockedBus.unloadPassenger(30);
        expect(result).to.equal(10);
    });

    it('load trunk', () => {
        mockedBus.loadTrunk.returns(50);

        const result = mockedBus.loadTrunk(100);
        expect(result).to.equal(50);
    });

    it('unload trunk', () => {
        mockedBus.unloadTrunk.returns(200);

        const result = mockedBus.unloadTrunk(60);
        expect(result).to.equal(200);
    });

    it('test spy console.log', () => {
        const consoleSpy = sinon.spy(console, 'log');

        const bus = new Bus('Volvo bus', 120, 50, 500);

        bus.start();
        bus.move(80);

        expect(consoleSpy.calledWith(`Engine of ${bus.name} is starting.......`)).to.be.true;
        expect(consoleSpy.calledWith(`Now engine of ${bus.name} is working!`)).to.be.true;
        expect(consoleSpy.calledWith(`${bus.name} is moving with the speed ${bus.currentSpeed} km/h.`)).to.be.true;
    });
});
