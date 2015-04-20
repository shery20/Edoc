/**
 * Created by Muhammad on 4/13/2015.
 */
angular.module('ContactsApp')
     .value('FieldTypes', {
       text: ['Text', 'should be text'],
       email: ['Email', 'should be email address'],
       number: ['Number', 'should be number'],
       date: ['Date', 'should be date'],
       datetime: ['Datetime', 'should be date time'],
       time: ['Time', 'should be time'],
       month: ['Month', 'should be a month'],
       week: ['Week', 'should be a week'],
       url: ['URL', 'should be a URL'],
       tel: ['Phone Number', 'should be phone number'],
       color: ['Color', 'should be a color']
    })
     .directive('formField', function($timeout, FieldTypes){
       return{
          restrict:'EA',
          templateUrl: 'views/formField.html',
          replace: true,
          scope: {
              record: '=',
              field: '@',
              live: '@',
              required: '@'
          },
          link: function($scope, element, attr){
              $scope.$on('record:invalid', function(){
                 $scope[$scope.field].$setDirty();
              });
              $scope.types= FieldTypes;
              $scope.remove= function(field){
                  delete $scope.record[field];
                  $scope.blurUpdate();
              };
              $scope.blurUpdate =function(){
                  if($scope.live !== 'false'){
                      $scope.record.$update(function (updateRecord){
                         $scope.record =updateRecord;
                      });
                  }
              };
              var saveTimout;
              $scope.update= function(){
                $timeout.cancel(saveTimout);
                saveTimout=$timeout($scope.blurUpdate, 1000);
              };
          }
       };
    })
    .directive('newField', function ($filter, FieldTypes) {
        return{
          restrict: 'EA',
          templateUrl: 'views/new-field.html',
          replace: true,
          scope: {
              record: '=',
              live: '@'
          },
          require: '^form',
          link: function ($scope, element, attr, form){
              $scope.types=FieldTypes;
              $scope.field={};

              $scope.show= function (type) {
                  $scope.field.type=type;
                  $scope.display=true;
              };

              $scope.remove= function () {
                  $scope.field={};
                  $scope.display=false;
              };

              $scope.add= function(){
                  if(form.newField.$valid){
                      $scope.record[$filter('camelCase')($scope.field.name)]= [$scope.field.value, $scope.field.type];
                      $scope.remove();
                      if($scope.live !== 'false'){
                          $scope.record.$update(function (updateRecord){
                              $scope.record =updateRecord;
                          });
                      }
                  }
              };


          }
        };
    });