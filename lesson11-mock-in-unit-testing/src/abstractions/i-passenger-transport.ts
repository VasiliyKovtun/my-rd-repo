export interface IPassengerTransport {
    passengerPlaces: number;
    loadPassenger(passengerQuantity: number): void;
    unloadPassenger(passengerQuantity: number): void;
}

