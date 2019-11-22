module.exports = {
    plugins: {
        'postcss-nested': {},
        'postcss-nesting': {},
        'postcss-custom-media': {
            importFrom: {
                customMedia: {
                    '--mobile': '(min-width: 30em)', /* > 480 */
                    '--mobile-only': '(max-width: 47.99em)',
                    '--tablet': '(min-width: 48em)', /* > 768 */
                    '--desktop': '(min-width: 73em)', /* > 1168 */
                },
            },
        },
    },
};
