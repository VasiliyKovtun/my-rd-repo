export interface IFreightTransport {
    trunkCapacity: number;
    loadTrunk(weight: number): void;
    unloadTrunk(weight: number): void;
}
