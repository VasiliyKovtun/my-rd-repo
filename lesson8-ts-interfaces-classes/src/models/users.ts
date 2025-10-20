export class User {
    public id: number;
    public name: string;
    public username?: string;
    public email: string;
    public address: AddressData;
    public phone: string;
    public website: string;
    public company: CompanyData;

    public constructor(row: Record<string, unknown>) {
        this.id = row['id'] as number;
        this.name = row['name'] as string;
        this.username = row['username'] as string;
        this.email = row['email'] as string;
        this.address = new AddressData(row['address'] as Record<string, unknown>);
        this.phone = row['phone'] as string;
        this.website = row['website'] as string;
        this.company = new CompanyData(row['company'] as Record<string, string>);

    }

    public hasCityWithSouth(): boolean {
        return this.address?.city?.includes('South') ?? false;
    }

    public getCity(): string {
        return this.address?.city ?? '';
    }
}

class AddressData {
    public street: string;
    public suite: string;
    public city: string;

    public zipcode: string;
    public geo: GeoData;

    public constructor(row: Record<string, unknown>) {
        this.street = row['street'] as string;
        this.suite = row['suite'] as string;
        this.city = row['city'] as string;
        this.zipcode = row['zipcode'] as string;
        this.geo = new GeoData(row['geo'] as Record<string, string>);
    }
}

class GeoData {
    public lat: string;
    public lng: string;

    public constructor(row: Record<string, string>) {
        this.lat = row['lat'] as string;
        this.lng = row['lng'] as string;
    }
}

class CompanyData {
    public name: string;
    public catchPhrase: string;
    public bs: string;


    public constructor(row: Record<string, string>) {
        this.name = row['name'] as string;
        this.catchPhrase = row['catchPhrase'] as string;
        this.bs = row['bs'] as string;

    }
}
