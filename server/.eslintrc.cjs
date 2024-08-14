module.exports = {
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    rules: {
        "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            { argsIgnorePattern: "^_", ignoreRestSiblings: true },
        ],
    },
};
