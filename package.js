Package.describe( {
    name: 'tap:i18n',
    summary: 'A comprehensive internationalization solution for Meteor',
    version: '2.0.1',
    git: 'https://github.com/TAPevents/tap-i18n'
});



Package.onUse( function( api ){

    api.versionsFrom( 'METEOR@1.8.2' );


    Npm.depends({
        'i18next': '3.4.1',
        'i18next-sprintf-postprocessor': '0.2.2'
    });


    api.use( 'isobuild:compiler-plugin@1.0.0' );


    api.use([
        'ecmascript',
        'modules',
        'es5-shim',
        'promise',

        'meteor-base',
        'http'
    ], [ 'server', 'client' ]);


    api.use([
        'webapp'
    ], [ 'server' ]);


    api.use([
        'tracker',
        'session',
        'jquery',
        'blaze',
        'templating',
        'spacebars',
    ], [ 'client' ]);


    api.mainModule( 'exports_server.js', 'server' );
    api.mainModule( 'exports_client.js', 'client' );
});



Package.registerBuildPlugin({
    name: 'tap-i18n-compiler',
    use: [
        'ecmascript',
        'modules',
        'es5-shim',
        'promise',

        'caching-compiler',
        'babel-compiler',

        'check',
        'blaze',
        'templating',
        'spacebars',
    ],
    npmDependencies: {
        'node-json-minify': '1.0.0',
        'yamljs': '0.3.0',
        'simpl-schema': '1.5.6',
    },
    sources: [
        './shared/etc/config-defaults.js',
        './shared/etc/language-names.js',

        './plugin/schemas/project-tap.i18n.js',
        './plugin/schemas/package-tap.i18n.js',

        './plugin/code-templates/configuration.js',
        './plugin/code-templates/translation.js',


        './plugin/compilers/lib/translation-utils.js',

        './plugin/compilers/project-tap.i18n.js',
        './plugin/compilers/package-tap.i18n.js',
        './plugin/compilers/i18n.js',
        './plugin/compilers/i18n.json.js',
        './plugin/compilers/i18n.yml.js',

        './plugin/compilers/tapi18n.js',
        './plugin/extensions/tapi18n.js',
    ]
});
