import type { UserConfigExport } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import svg from 'vite-plugin-svgr';

const TEST_DIR = 'tests';

export default {
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{spec,test}.{ts,cts,mts,tsx}'],
		setupFiles: ['@testing-library/react/dont-cleanup-after-each'],
		reporters: ['junit', 'verbose', 'vitest-sonar-reporter'],
		outputFile: {
			junit: `${TEST_DIR}/junit.xml`,
			'vitest-sonar-reporter': `${TEST_DIR}/sonar.xml`,
		},
		testTimeout: 6000,
		coverage: {
			all: true,
			provider: 'v8',
			reportsDirectory: `${TEST_DIR}/coverage`,
			reporter: ['text', 'text-summary', 'lcov', 'cobertura', 'json'],
			include: ['src/**/*.{ts,cts,mts,tsx}'],
			exclude: [
				'**/*.{d,config,mock,fixture}.{ts,cts,mts,tsx}',
				'**/*.mock.{ts,cts,mts,tsx}',
				'**/*.config.{ts,cts,mts,tsx}',
				'**/{index,main}.{ts,cts,mts,tsx}',
				'**/__{tests,mocks,fixtures}__',
				'src/libs/*',
			],
		},
	},
	plugins: [svg(), tsconfigPaths()],
} satisfies UserConfigExport;
