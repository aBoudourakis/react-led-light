module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts",
    ],
    coverageDirectory: "coverage",
    coverageReporters: ["json", "lcov", "text", "clover"],
    setupFilesAfterEnv: [
        "<rootDir>/setupTests.ts"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": ["ts-jest"],
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/styleMock.js"
    },
};
