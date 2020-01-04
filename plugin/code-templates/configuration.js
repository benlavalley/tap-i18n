
'use strict';



import CONFIG_DEFAULTS from './../../shared/etc/config-defaults';



const { 
    PROJECT_NAMESPACE
} = CONFIG_DEFAULTS;



function generate( options = {} ){
    
    const { 
        configuration,
        packageName = PROJECT_NAMESPACE,
        preloadTranslationFiles = []
    } = options;
    
    const translationImports = generateTranslationsImportStatements( preloadTranslationFiles );
    
    
    let levelSpecificCode = '';
    
    if( typeof packageName !== 'string' || packageName === PROJECT_NAMESPACE ){
        levelSpecificCode +=    `
                                var translator = initialize( '${ PROJECT_NAMESPACE }', options );
                                var translate = translator.translate.bind( translator );                              
                                
                                module.export(
                                {
                                    default: function () { return translator;},
                                    translate: function () { return translate;},
                                    __: function () { return translate;},
                                  }
                                  );
                                `;
    }else{ // package level
        const { translation_function_name: translateFnName } = configuration;
        levelSpecificCode +=    `
                                var translator = initialize( '${ packageName }', options );
                                var translate = translator.translate.bind( translator );
                                                             
                                module.export(
                                {
                                    default: function () { return translator;},
                                    translate: function () { return translate;},
                                    __: function () { return ${ translateFnName };},
                                  }
                                  );
                                `;
    }
    
    const server =  `
                    'use strict';
                
                    var initialize;
                    module.link('meteor/tap:i18n', {
                      _init(v) {
                        initialize = v;
                      }                    
                    }, 0);
                
                    var options = ${ JSON.stringify( configuration ) };
                    ${ levelSpecificCode }
                    `;
    
    
    const client =  `
                    'use strict';
                
                    var initialize;
                    module.link('meteor/tap:i18n', {
                      _init(v) {
                        initialize = v;
                      }                   
                    }, 0);
                    
                    var options = ${ JSON.stringify( configuration ) };
                    ${ levelSpecificCode }
                    `;
    
    
    return { server, client };
}


function generateTranslationsImportStatements( files = [] ){
    return files.reduce( ( importsString, path )=>{
        if( typeof path !== 'string' ){
            if( typeof path.path === 'string' ){
                path = path.path;
            }else{
                return importsString;
            }
        }
        
        return `${ importsString }
                import './${ path }';`;
    }, '' );
}



export { generate as default };
