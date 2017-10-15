(function(module) {
  mifosX.controllers = _.extend(module, {
	  BroadCasterController: function(scope, resourceFactory,location,PermissionService,paginatorService,$modal,route) {
		  
		  scope.broadcasters = [];
		  scope.pageItems = [];
		  
		  scope.routeTo = function(id){
	         location.path('/viewbroadcaster/'+ id);
	      };
	      
		  scope.broadCasterFetchFunction = function(offset, limit, callback) {
			  resourceFactory.broadCasterResource.get({offset: offset, limit: limit}, function(data) {
				  	scope.totalpropeties = data.totalFilteredRecords;
		        	scope.allDatas = data.pageItems;
		        	if(scope.totalpropeties%15 == 0)	
		        		scope.totalPages = scope.totalpropeties/15;
		        	else
		        		scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
		        	callback(data);
		        });
		  };
		  
		  scope.broadcasters = paginatorService.paginate(scope.broadCasterFetchFunction, 14);
		  
		  scope.deleteBroadcaster = function(id){
			  scope.broadcasterId=id;
	         	 $modal.open({
	 	                templateUrl: 'broadcaster.html',
	 	                controller: broadcasterDelete,
	 	                resolve:{}
	 	        });
		  };
		  
		  function  broadcasterDelete($scope, $modalInstance) {
	     		$scope.approve = function () {
	             	resourceFactory.broadCasterResource.remove({broadcasterId: scope.broadcasterId} , {} , function() {
	                   route.reload();
	             });
	             	 $modalInstance.dismiss('delete');
	          };
	             $scope.cancel = function () {
	                 $modalInstance.dismiss('cancel');
	           };
	         } 
		  
		  
      }
  });
  mifosX.ng.application.controller('BroadCasterController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     'PermissionService',
     'PaginatorService',
     '$modal',
     '$route',
     mifosX.controllers.BroadCasterController]).run(function($log) {
    $log.info("BroadCasterController initialized");
  });
}(mifosX.controllers || {}));
