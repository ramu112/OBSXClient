(function(module) {
	mifosX.controllers = _.extend(module,{
		 ChannelMappingController: function(scope, resourceFactory,location,PermissionService,$modal,paginatorService,route){
			
			 scope.channelmappings = [];
			 scope.pageItems = [];
			 
			 scope.routeTo = function(id){
		            location.path('/ViewChannelMapping/'+ id);
		          };
		          
		      scope.channelMappingFetchFunction = function(offset, limit, callback) {
				resourceFactory.channelMappingResource.get({ offset : offset, limit : limit }, function(data){
				scope.totalpropeties = data.totalFilteredRecords;
			    scope.allDatas = data.pageItems;
			      if(scope.totalpropeties%15 == 0)	
			        	scope.totalPages = scope.totalpropeties/15;
			       else
			        	scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
			        	callback(data);
					});
			 };
			 
			 scope.channelmappings = paginatorService.paginate( scope.channelMappingFetchFunction, 14);
				
			 scope.deleteChannelMapping = function(id){
					console.log("hi");
					scope.channelmappingId = id;
					$modal.open({
						templateUrl: 'ChannelMapping.html',
						controller: channelMappingDelete,
						resolve:{}
					});
				};
				
				function channelMappingDelete($scope,$modalInstance){
					$scope.approve = function () {
						resourceFactory.channelMappingResource.remove({channelmappingId: scope.channelmappingId}, {} ,function (){
							//console.log("hi");
							route.reload();
							//location.path('/broadcasterchannelmapping');
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
mifosX.ng.application.controller('ChannelMappingController', [
   '$scope', 
   'ResourceFactory',
   '$location',
   'PermissionService',
   '$modal',
   'PaginatorService',
   '$route',
 mifosX.controllers.ChannelMappingController]).run(function($log) {
    $log.info("ChannelMappingController initialized");
});
}(mifosX.controllers || {}));