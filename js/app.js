require.config({
    paths: {
        jquery: 'lib/jquery-1.11.1.min',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

require(['jquery', 'underscore', 'backbone', 'views/calculatorView'],
function($, _, Backbone, calculatorView) {
    $(function() {
        new calculatorView();
    })
});
