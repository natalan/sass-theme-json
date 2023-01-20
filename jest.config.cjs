/** @returns {Promise<import('jest').Config>} */
module.exports = async() => ({
    verbose: true,
    transform: {
        "^.+\\.(t|j)sx?$": ["@swc/jest"]
    },
    transformIgnorePatterns: [
        `node_modules/(?!${[
            "is-ip"
        ].join("|")})`
    ]
});
