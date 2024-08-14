module.exports = {
    "client/src/**/*.{ts,tsx}": () => ["tsc -p client/tsconfig.json --noEmit"],
    "server/src/**/*.{ts,tsx}": ["tsc -p server/tsconfig.json --noEmit"],
};
