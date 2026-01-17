module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>'],
	testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
	transform: {
		'^.+\\.ts$': ['ts-jest', {
			tsconfig: {
				esModuleInterop: true,
				allowSyntheticDefaultImports: true,
				resolveJsonModule: true,
				moduleResolution: 'node',
				strict: false,
				skipLibCheck: true,
				allowImportingTsExtensions: true,
				noEmit: true,
			}
		}],
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
	},
	moduleFileExtensions: ['ts', 'js', 'json'],
	collectCoverageFrom: [
		'nodes/**/*.ts',
		'credentials/**/*.ts',
		'!nodes/**/*.node.json',
		'!**/*.d.ts',
		'!**/node_modules/**',
		'!**/dist/**',
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov', 'html'],
	verbose: true,
	testTimeout: 30000,
};
