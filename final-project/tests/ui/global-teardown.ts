import { promises as fs } from 'fs';
import path from 'path';

export default async function globalTeardown(): Promise<void> {
    const authDir = path.resolve('.auth');
    try {
        const files = await fs.readdir(authDir);
        for (const file of files) {
            if (file.startsWith('storage-state-') && file.endsWith('.json')) {
                const filePath = path.join(authDir, file);
                await fs.unlink(filePath);
                console.log(`Deleted ${filePath}`);
            }
        }
    } catch {
        // Directory does not exist or other error
    }
}
