'use strict';
angular.module("qualityControlApp")
	.constant('uploadUrl','http://10.172.13.5:8890/api/attach/upload')
  .constant('uploadUrls','http://10.172.13.5:8890/api/attach/upload2')
	.factory('myService',function($http,uploadUrl){
		return{
			upload: function(obj){
				return $http({
					method:'post',
					url:uploadUrl,
					data:{file:obj.file,name:obj.name},
					headers: {
						'Content-Type': undefined
					},
					transformRequest: function(data) {
						var formData = new FormData();
						formData.append('file',data.file);
						formData.append('filename',data.name);
						return formData;
					}
				})
			}
		}
	})
  .factory('myServices',function($http,uploadUrls){
    return{
      upload: function(obj){
        return $http({
          method:'post',
          url:uploadUrls,
          data:{file:obj.file,name:obj.name},
          headers: {
            'Content-Type': undefined
          },
          transformRequest: function(data) {
            var formData = new FormData();
            formData.append('file',data.file);
            formData.append('filename',data.name);
            return formData;
          }
        })
      }
    }
  })
  .factory('staAva',function($uibModal){
    return{
      open:function(obj){
        var modalInstance = $uibModal.open({
          size:'lg',
          animation:true,
          templateUrl: 'views/liveQualityModal.html',
          controller:'myController',
          resolve: {
            staAvaData: function() {
              return obj;
            }
          }
        });
        modalInstance.opened.then(function(){
          if(window.console){
            console.log('it is open');
          }
        });
        modalInstance.result.then(function(result){
          if(window.console){
            console.log(result);
          }
        },function(reason){
          if(window.console){
            console.log(reason);
          }
        })
      }
    }
  })
  .factory('staAvaT',function($uibModal){
    return{
      open:function(obj){
        var modalInstance = $uibModal.open({
          size:'lg',
          animation:true,
          templateUrl: 'views/sandLiveModel.html',
          controller:'myControllerSand',
          resolve: {
            staAvaData: function() {
              return obj;
            }
          }
        });
        modalInstance.opened.then(function(){
          if(window.console){
            console.log('it is open');
          }
        });
        modalInstance.result.then(function(result){
          if(window.console){
            console.log(result);
          }
        },function(reason){
          if(window.console){
            console.log(reason);
          }
        })
      }
    }
  })

  .factory('staAvaTs',function($uibModal){
    return{
      open:function(obj){
        var modalInstance = $uibModal.open({
          size:'lg',
          animation:true,
          templateUrl: 'views/sandLiveModelP.html',
          controller:'myControllerSandS',
          resolve: {
            staAvaData: function() {
              return obj;
            }
          }
        });
        modalInstance.opened.then(function(){
          if(window.console){
            console.log('it is open');
          }
        });
        modalInstance.result.then(function(result){
          if(window.console){
            console.log(result);
          }
        },function(reason){
          if(window.console){
            console.log(reason);
          }
        })
      }
    }
  })
