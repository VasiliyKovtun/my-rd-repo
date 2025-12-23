import path from 'path';
import fs from 'fs';
import { ConfigDto } from '../models/config.dto';

export class ConfigService {
    public get config(): ConfigDto {
        if (!this._config.auth || !this._config.uiConfig || !this._config.apiConfig) {
            throw new Error('Config is not fully initialized');
        }
        return this._config as ConfigDto;
    }

    private _config: Partial<ConfigDto> = {};

    public constructor() {
        this.initConfig();
    }

    private initConfig(): ConfigDto {
        this.readFileConfig();
        this.readAuthConfig();
        return this._config as ConfigDto;
    }

    private readAuthConfig(): void {
        const login = process.env.FOPHELP_LOGIN;
        const password = process.env.FOPHELP_PASSWORD;

        if (!login || !password) {
            throw new Error('FOPHELP_LOGIN or FOPHELP_PASSWORD is missing');
        }

        this._config = {
            ...this._config,
            auth: {
                login,
                password,
                apiToken: Buffer.from(`${login}:${password}`).toString('base64')
            }
        };
    }

    private readFileConfig(): void {
        const filePath = path.resolve(process.cwd(), 'src/config/fophelp-test.config.json');

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(fileContent);
        console.log('Loaded config:', parsed);
        this._config = {
            ...this._config,
            ...JSON.parse(fileContent)
        } as ConfigDto;
    }
}
