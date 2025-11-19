export interface ConfigDto {
    auth: AuthConfigDto;
    api: ApiConfigDto;
}

export interface AuthConfigDto {
    theCatsApi?: TheCatsApiConfigDto;
}

export interface ApiConfigDto {
    theCatsApi: TheCatsApiConfigDto;
}

export interface TheCatsApiConfigDto {
    apiKey?: string;
}

export interface TheCatsApiConfigDto {
    baseUrl: string;
}
