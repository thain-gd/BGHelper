import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "bghelper.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(baseFolder)) {
    fs.mkdirSync(baseFolder, { recursive: true });
}

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        plugin(),
        VitePWA({
            registerType: 'prompt',
            includeAssets: ['favicon.svg', 'icons.svg'],
            pwaAssets: {
                image: 'public/favicon.svg',
                preset: 'minimal-2023',
                includeHtmlHeadLinks: true,
                overrideManifestIcons: true,
            },
            manifest: {
                name: 'BGHelper',
                short_name: 'BGHelper',
                description: 'A helpful companion for board game players.',
                theme_color: '#863bff',
                background_color: '#ffffff',
                display: 'standalone',
                orientation: 'any',
                start_url: '/',
                scope: '/',
                categories: ['games', 'utilities'],
            },
            workbox: {
                cleanupOutdatedCaches: true,
                navigateFallback: '/index.html',
                navigateFallbackDenylist: [
                    /^\/api(?:\/|$)/,
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: parseInt(env.DEV_SERVER_PORT || '52196'),
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
})
