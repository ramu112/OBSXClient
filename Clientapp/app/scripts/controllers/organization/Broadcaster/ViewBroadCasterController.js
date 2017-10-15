(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewBroadCasterController: function(scope, routeParams , location,resourceFactory ,PermissionService,$modal) {
        scope.broadcaster = [];
        scope.PermissionService = PermissionService;
        
        scope.gobroadcasterchannelmapping = function(){
        	webStorage.add("callingTab", {someString: "broadcaster"});
        };
        
        resourceFactory.broadCasterResource.get({broadcasterId: routeParams.id} , function(data) {
            scope.broadcaster = data;
           
        });
        scope.deleteBroadcaster = function(id){
			  console.log("hi");
			  scope.broadcasterId=id;
	         	 $modal.open({
	 	                templateUrl: 'broadcaster.html',
	 	                controller: broadcasterDelete,
	 	                resolve:{}
	 	        });
		  };
		  
		  function  broadcasterDelete($scope, $modalInstance) {
	     		$scope.approve = function () {
	            resourceFactory.broadCasterResource.remove({broadcasterId: routeParams.id} , {} , function() {
	              location.path('/broadcasterchannelmapping');
	             });
	             	 $modalInstance.dismiss('delete');
	          };
	             $scope.cancel = function () {
	                 $modalInstance.dismiss('cancel');
	           };
	         } 
        
    }
  });
  mifosX.ng.application.controller('ViewBroadCasterController', [
    '$scope', 
    '$routeParams', 
    '$location',
    'ResourceFactory',
    'PermissionService',
    '$modal',
    mifosX.controllers.ViewBroadCasterController]).run(function($log) {
    $log.info("ViewBroadCasterController initialized");
  });
}(mifosX.controllers || {}));
