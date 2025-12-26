import fs from 'fs';

export interface StorageCookie {
    name: string;
    value: string;
    domain: string;
    path: string;
    expires?: number;
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'Strict' | 'Lax' | 'None';
}
export interface LocalStorageEntry {
    name: string;
    value: string;
}

export interface OriginStorage {
    origin: string;
    localStorage: LocalStorageEntry[];
}

export interface StorageState {
    cookies: StorageCookie[];
    origins?: OriginStorage[];
}

export function getApiCookies(
    path = '.auth/storage-state-0.json'
): string {
    if (!fs.existsSync(path)) {
        throw new Error(`StorageState file not found: ${path}. 
     UI login must run first or storage-state must be generated.`);
    }
    const raw = fs.readFileSync(path, 'utf-8');
    const state: StorageState = JSON.parse(raw);

    const cookies = state.cookies.filter((c) =>
        [
            'X-Access-Token',
            'X-Username',
            'Session-User',
            'X-Refresh-Token',
            'X-Refresh-Expires'
        ].includes(c.name)
    );

    if (cookies.length === 0) {
        throw new Error('Required API cookies not found in storageState');
    }

    return cookies.map((c) => `${c.name}=${c.value}`).join('; ');
}
