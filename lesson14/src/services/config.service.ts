import * as dotenv from 'dotenv-safe';
import { ApiConfigDto, AuthConfigDto, ConfigDto } from '../models/config/api.config';

export class ConfigService {

    public constructor() {
        dotenv.config();
    }

    public getConfig(): ConfigDto {
        const authConfig = this.getAuthConfig();
        const apiConfig = this.getApiConfig();

        return {
            auth: authConfig,
            api: apiConfig
        };
    }

    private getAuthConfig(): AuthConfigDto {

        return {
            theCatsApi: {
                apiKey: process.env.CAT_API_KEY ? process.env.CAT_API_KEY : '',
                baseUrl: 'https://api.thecatapi.com/v1'
            }
        };
    }

    private getApiConfig(): ApiConfigDto {
        return {
            theCatsApi: {
                baseUrl: 'https://api.thecatapi.com/v1'
            }
        };
    }
}
