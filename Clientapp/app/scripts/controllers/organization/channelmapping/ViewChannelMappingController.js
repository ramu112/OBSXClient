(function(module) {
	mifosX.controllers = _.extend(module, {
		ViewChannelMappingController: function(scope, routeParams , location,resourceFactory ,PermissionService,$modal,webStorage) {
			
			scope.channelMapping = [];
			scope.PermissionService = PermissionService;
			
			scope.gobroadcasterchannelmapping = function(){
	        	webStorage.add("callingTab", {someString: "channelmapping"});
	        };
	        
	        resourceFactory.channelMappingResource.get({channelmappingId: routeParams.id} , function(data) {
	            scope.channelMapping = data;
	           });
			
	        scope.deleteChannelMapping = function(id) {
	        	console.log("hi");
	        	scope.channelmappingId=id;
	        	$modal.open({
	        		templateUrl: 'ChannelMapping.html',
	        		controller:channelMappingDelete,
	        		resolve:{}
	        	});
	        };
	        
	        function channelMappingDelete($scope,$modalInstance) {
	        	$scope.approve = function (){
	        		resourceFactory.channelMappingResource.remove({channelmappingId:routeParams.id}, {} ,function(){
	        			location.path('/broadcasterchannelmapping');
	        			webStorage.add("callingTab", {someString: "channelmapping"});
	        		});
	        		$modalInstance.dismiss('delete');
	        	};
	        	$scope.cancel = function (){
	        		
	        		$modalInstance.dismiss('cancel');
	        	};
	        }
	        
		}		
	});
	 mifosX.ng.application.controller('ViewChannelMappingController', [
	        '$scope', 
	        '$routeParams', 
	        '$location',
	        'ResourceFactory',
	        'PermissionService',
	        '$modal',
	        'webStorage',
	  mifosX.controllers.ViewChannelMappingController]).run(function($log) {
	      $log.info("ViewChannelMappingController initialized");
	  });
}(mifosX.controllers || {}));