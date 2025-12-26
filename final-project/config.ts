import path from 'path';
import fs from 'fs';

interface FophelpTestConfig {
    uiConfig: { fophelpBaseUrl: string };
    apiConfig: { fophelpApiUrl: string };
}

function getConfigPath(): string {
    const configPath = path.resolve(process.cwd(), './src/config/fophelp-test.config.json');
    if (!fs.existsSync(configPath)) {
        throw new Error(`Config file not found at ${configPath}. Please make sure fophelp-test.config.json is in the project root.`);
    }
    return configPath;
}

export function readConfig(): FophelpTestConfig {
    const raw = fs.readFileSync(getConfigPath(), 'utf-8');
    return JSON.parse(raw) as FophelpTestConfig;
}

export function getApiBaseUrl(): string {
    return readConfig().apiConfig.fophelpApiUrl;
}
