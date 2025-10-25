export interface IPassengerTransport {
    passengerPlaces: number;
    loadPassenger(passengerQuantity: number): number;
    unloadPassenger(passengerQuantity: number): number;
}

