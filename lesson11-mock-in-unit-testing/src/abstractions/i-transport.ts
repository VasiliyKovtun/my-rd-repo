export interface ITransport {
    name: string;
    maxSpeed: number;
    currentSpeed: number;
    engineState: boolean;

    start(): void;
    turnOff(): void;
    move(speed: number): void;
    brake(speed: number): void;
}
