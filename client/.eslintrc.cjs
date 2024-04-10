module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh", "import"],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        "import/order": [
            "warn",
            {
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index",
                    "object",
                    "type",
                ],
                pathGroups: [
                    {
                        pattern: "@/**",
                        group: "internal",
                        position: "after",
                    },
                ],
                "newlines-between": "never",
                alphabetize: {
                    order: "asc",
                    caseInsensitive: true,
                },
            },
        ],
    },
};
