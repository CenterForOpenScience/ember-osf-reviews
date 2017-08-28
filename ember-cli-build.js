/* eslint-env node */

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');
const configFunc = require('./config/environment');


module.exports = function(defaults) {
    // const EMBER_DATA_VERSION = defaults.project.addonPackages['ember-data'].pkg.version;
    const EMBER_VERSION = defaults.project.addonPackages['ember-source'].pkg.version;
    const JQUERY_VERSION = require('jquery/package.json').version;

    // Values chosen abritrarily, feel free to change
    const LEAN_BUILD = ['test', 'production'].includes(EmberApp.env());

    // EmberApp.env() will pull from the envvar EMBER_ENV or the command line flags
    const config = configFunc(EmberApp.env());

    // Reference: https://github.com/travis-ci/travis-web/blob/master/ember-cli-build.js
    const app = new EmberApp(defaults, {
        sourcemaps: {
            enabled: true,
            extensions: ['js']
        },
        fingerprint: {
            extensions: ['js', 'css', 'map']
        },
        minifyJS: {enabled: LEAN_BUILD},
        minifyCSS: {enabled: LEAN_BUILD},
        vendorFiles: !LEAN_BUILD ? {} : {
            // These will be CDN'd in via "inlineContent"
            // Ember doesn't like it when these are set to true for some reason
            'handlebars.js': false,
            'ember.js': false,
            'jquery.js': false,
        },
        sassOptions: {
            includePaths: [
                'node_modules/@centerforopenscience/osf-style/sass',
                'node_modules/font-awesome/scss',
                'node_modules/toastr',
            ]
        },
        inlineContent: {
            raven: {
                // Only include raven in production builds, because why not
                enabled: EmberApp.env() === 'production',
                content: `
                <script src="https://cdn.ravenjs.com/3.5.1/ember/raven.min.js"></script>
                <script>Raven.config("${config.sentryDSN}", {}).install();</script>`
            },
            cdn: {
                enabled: LEAN_BUILD,
                content: `
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/${JQUERY_VERSION}/jquery.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/ember.js/${EMBER_VERSION}/ember.prod.js"></script>
                `
                // TODO Figure out how to CDN ember-data
                // The CDN version appears to load a deprecated interface that breaks stuff
                // <script src="//cdnjs.cloudflare.com/ajax/libs/ember-data.js/${EMBER_DATA_VERSION}/ember-data.js"></script>
            },
            assets: {
                enabled: true
            }
        },
        'ember-bootstrap': {
            bootstrapVersion: 3,
            importBootstrapCSS: false,
            importBootstrapFont: false,
        },
        postcssOptions: {
            // Doesn't agree with SCSS; must be disabled
            compile: {enabled: false},
            filter: {
                browsers: ['last 4 versions'],
                enabled: LEAN_BUILD,
                include: ['**/*.css'],
                plugins: [{
                    module: require('autoprefixer')
                }, {
                    module: require('cssnano')
                }]
            },
        },
    });

    // Use `app.import` to add additional libraries to the generated
    // output files.
    //
    // If you need to use different assets in different
    // environments, specify an object as the first parameter. That
    // object's keys should be the environment name and the values
    // should be the asset to use in that environment.
    //
    // If the library that you are including contains AMD or ES6
    // modules that you would like to import into your application
    // please specify an object with the list of modules as keys
    // along with the exports of each module as its value.

    let assets = [
        new Funnel('node_modules/font-awesome/fonts', {
            srcDir: '/',
            destDir: '/assets/fonts',
        }),
        new Funnel('node_modules/@centerforopenscience/osf-style/img', {
            srcDir: '/',
            destDir: '/img',
        })
    ];

    return app.toTree(assets);
};
