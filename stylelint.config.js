module.exports = {
    extends: ["stylelint-config-recommended", "stylelint-config-prettier"],
    // Only for Tailwind support
    rules: {
        "at-rule-no-unknown": [
            true,
            {
                ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen"],
            },
        ],
        "declaration-block-trailing-semicolon": null,
        "no-descending-specificity": null,
    },
};
