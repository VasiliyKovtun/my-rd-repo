import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: [],
        include: ['./tests/**/?(*.)+(spec|test).[t]s?(x)'],
        // globalSetup: './src/hooks/vitest-global-setup.ts',
        setupFiles: ['./src/hooks/env-setup.ts'],
        globals: true
    }
});
