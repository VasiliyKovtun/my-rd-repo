export interface IFreightTransport {
    trunkCapacity: number;
    loadTrunk(weight: number): number;
    unloadTrunk(weight: number): number;
}
