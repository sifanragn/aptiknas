import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import { resolve } from 'path'; // Import modul path
// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), tailwindcss(), vueDevTools()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'), // Tambahkan alias @ untuk src/
        },
    },
});
