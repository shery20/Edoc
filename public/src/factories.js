/**
 * Created by Muhammad on 4/13/2015.
 */
angular.module('ContactsApp')
   .factory('Contact', function ($resource){
        return $resource('/api/contact/:id', {id: '@id'},{
           'update': {method: 'PUT'}
        });
    });