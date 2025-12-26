export interface ConfigDto {
    auth: AuthDto;
    uiConfig: UiConfigDto;
    apiConfig: ApiConfigDto;
}

export interface AuthDto {
    login: string;
    password: string;
    apiToken: string;
}

export interface UiConfigDto {
    fophelpBaseUrl: string;
}

export interface ApiConfigDto {
    fophelpApiUrl: string;
}
