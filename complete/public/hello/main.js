define(function (require) {

    var rest = require('rest');
    var mime = require('rest/interceptor/mime');
    var render = require('./render');

    var endpointUrl, name, client;

    endpointUrl = 'http://rest-service.guides.spring.io/greeting';
    name = document.location.search.slice(1);

    client = rest.chain(mime, { mime: 'application/json' });

    client({ path: endpointUrl + '?name=' + name })
        .then(pluckEntity)
        .then(render);

    function pluckEntity (response) {
        return response.entity;
    }

});
