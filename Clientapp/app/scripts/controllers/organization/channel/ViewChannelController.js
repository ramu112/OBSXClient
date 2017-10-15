(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewChannelController: function(scope, routeParams , location,resourceFactory ,PermissionService,$modal,webStorage) {
		  scope.channel = [];
	        scope.PermissionService = PermissionService;
	        
	        scope.gobroadcasterchannelmapping = function(){
	        	webStorage.add("callingTab", {someString: "channel"});
	        };
	        
	        resourceFactory.channelResource.get({channelId: routeParams.id} , function(data) {
	            scope.channel = data;
	           
	        });
	        
	        scope.deleteChannel = function(id) {
	        	console.log("hi");
	        	scope.channelId=id;
	        	$modal.open({
	        		templateUrl: 'channel.html',
	        		controller:channelDelete,
	        		resolve:{}
	        	});
	        };
	        function channelDelete($scope,$modalInstance) {
	        	$scope.approve = function (){
	        		resourceFactory.channelResource.remove({channelId:routeParams.id}, {} ,function(){
	        			location.path('/channel');
	        		});
	        		$modalInstance.dismiss('delete');
	        	};
	        	$scope.cancel = function (){
	        		
	        		$modalInstance.dismiss('cancel');
	        	};
	        }
	  }
  });
  mifosX.ng.application.controller('ViewChannelController', [
    '$scope', 
    '$routeParams', 
    '$location',
    'ResourceFactory',
    'PermissionService',
    '$modal',
    'webStorage',
    mifosX.controllers.ViewChannelController]).run(function($log) {
    $log.info("ViewChannelController initialized");
  });
}(mifosX.controllers || {}));
