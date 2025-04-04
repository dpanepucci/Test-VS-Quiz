import { defineConfig } from 'cypress';
import viteConfig from './vite.config';

export default defineConfig ({
    component: {
        port: 2025,
        devServer: {
            framework: 'react',
            bundler: 'vite',
            viteConfig,
        },
    },

    e2e: {
        baseUrl: 'http://localhost:3001',
        setupNodeEvents(on, config) {

        },
    },
});