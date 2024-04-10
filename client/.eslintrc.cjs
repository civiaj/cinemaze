module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "@feature-sliced/eslint-config/rules/import-order",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh", "@typescript-eslint"],
    settings: {
        "import/resolver": {
            typescript: { alwaysTryTypes: true },
        },
    },
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        // "import/order": [
        //     "warn",
        //     {
        //         groups: [
        //             "builtin",
        //             "external",
        //             "internal",
        //             "unknown",
        //             "parent",
        //             "sibling",
        //             "index",
        //             "object",
        //             "type",
        //         ],
        //         "newlines-between": "never",
        //     },
        // ],
    },
};
