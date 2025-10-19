import { User, UserShortData } from './models/index';
import { Dog, Bird, PetOwner} from './implementation/animal-classes';

async function getApiUserData(): Promise<User[]> {
    const response = await fetch ('https://jsonplaceholder.typicode.com/users');
    const json = await response.json();
    return (json as Record<string, unknown>[]).map((row) => new User(row));
}

(async () => {

    const apiUsers = await getApiUserData();
    const usersShortInfo = apiUsers.map((user) => new UserShortData(user));
    usersShortInfo.forEach(user => console.log(`${user.name}'s address is: ${user.getAddress()}`));

})();

console.log('------------------------------------------------------------');

const dog = new Dog('Dog', 'Woof');
const bird = new Bird('Parrot');
const petOwner = new PetOwner('Alex', dog);

dog.move();
dog.getSound();
bird.move();
bird.getSound();
petOwner.getPetOwner();

console.log('------------------------------------------------------------');
