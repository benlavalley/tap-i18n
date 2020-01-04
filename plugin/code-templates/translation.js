
'use strict';



import CONFIG_DEFAULTS from './../../shared/etc/config-defaults';



const { 
    PROJECT_NAMESPACE,
    FALLBACK_LANGUAGE
} = CONFIG_DEFAULTS;



function generate( options = {} ){
    
    const { 
        langTag = FALLBACK_LANGUAGE.tag, 
        namespace = PROJECT_NAMESPACE,
        translations = {}
    } = options; 
    
    const src = `
        'use strict';
        
        module.link('./tapi18n');
        var preload;
        module.link('meteor/tap:i18n', {
          _preloadTranslations(v) {
            preload = v;
          }
        
        }, 0);
        
        var langTag = '${ langTag }';
        var namespace = '${ namespace }';
        var translations = ${ JSON.stringify( translations ) };
                
        preload( translations, langTag, namespace );
        `;
    
    
    return src;
}



export { generate as default };
