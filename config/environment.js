/* eslint-env node */

module.exports = function(environment) {
    const authorizationType = 'cookie';

    const ENV = {
        modulePrefix: 'reviews',
        appName: 'Reviews',
        environment,
        rootURL: '/reviews/',
        locationType: 'auto',
        authorizationType,
        sentryDSN: 'http://test@localhost/80' || process.env.SENTRY_DSN,
        'ember-simple-auth': {
            authorizer: `authorizer:osf-${authorizationType}`,
            authenticator: `authenticator:osf-${authorizationType}`,
        },
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            },
        },
        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        },
        moment: {
            outputFormat: 'YYYY-MM-DD hh:mm a',
        },
        i18n: {
            defaultLocale: 'en',
        },
        'ember-analytics': {
            appID: 'Lm9zZi1uYXZiYXItbG9nbw==',
            clientID: 'YW5pbWF0aW9uOiBzcGluIDExMHMgbGluZWFyIGluZmluaXRlOw==',
        },
        PROVIDER_SETTINGS: [{
            disabled: false,
            name: 'reviewsWorkflow',
            options: ['pre-moderation', 'post-moderation'],
        }, {
            disabled: false,
            name: 'reviewsCommentsPrivate',
            options: [true, false],
        }, {
            disabled: true,
            name: 'reviewsCommentsAnonymous',
            options: [true, false],
        }],
    };

    if (environment === 'development') {
        // Empty
    }

    if (environment === 'test') {
        // Empty
    }

    if (environment === 'production') {
        // Empty
    } else {
        // Empty
    }

    return ENV;
};
