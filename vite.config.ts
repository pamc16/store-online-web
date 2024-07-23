import tsconfigPaths from 'vite-tsconfig-paths';
import fonts from 'vite-plugin-webfont-dl';
import svg from 'vite-plugin-svgr';
import { createHtmlPlugin as html } from 'vite-plugin-html';
import { checker } from 'vite-plugin-checker';
import { normalizePath, type UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react-swc';

const fontFamily = 'Catamaran';
const fontWeight = '100;400';

// https://vitejs.dev/config/
export default {
	base: '/landing/inicio',
	envPrefix: 'REACT_',
	server: {
		port: 3000,
		open: true,
		cors: true,
	},
	preview: {
		open: true,
		https: {},
		cors: true,
	},
	build: {
		sourcemap: true,
		emptyOutDir: true,
		minify: true,
		target: 'ESNext',
		rollupOptions: {
			output: {
				manualChunks: {
					react: ['react', 'react-dom'],
				},
			},
		},
	},
	plugins: [
		checker({
			typescript: true,
			enableBuild: false,
			terminal: false,
		}),
		react(),
		svg(),
		tsconfigPaths(),
		fonts(
			[
				`https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${fontWeight}&display=swap`,
			],
			{
				injectAsStyleTag: true,
				minifyCss: true,
				async: true,
				cache: true,
			},
		),
		html({
			inject: {
				data: process.env,
			},
			minify: true,
		}),
	],
} satisfies UserConfigExport;
