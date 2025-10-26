import { expect } from 'chai';
import { SportCar } from '../src/sport-car';

describe('Unit tests', () => {
    let car: SportCar;

    beforeEach(() => {
        car = new SportCar('Sport car', 300, 2);
    });
    describe('Sport car current speed', () => {

        it('Default current speed should be 0', () => {
            expect(car.getCurrentSpeed()).to.equal(0);
        });

        it('Move and check speed', () => {
            car.start();
            car.move(50);
            expect(car.getCurrentSpeed()).to.equal(50);
        });

        it('Move, break and check speed', () => {
            car.start();
            car.move(50);
            car.brake(20);
            expect(car.getCurrentSpeed()).to.equal(20);
        });
    });
});
