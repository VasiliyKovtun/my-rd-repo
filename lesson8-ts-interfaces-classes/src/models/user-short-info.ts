import { User } from './users';

export class UserShortData {
    public id?: number;
    public name?: string;
    public address?: string;

    public constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.address = `${user.address.city}, ${user.address.street}`;
    }

    public getAddress(): string {
        return this.address ?? '';
    }
}
