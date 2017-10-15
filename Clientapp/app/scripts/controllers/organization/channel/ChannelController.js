(function(module) {
  mifosX.controllers = _.extend(module, {
	  ChannelController: function(scope, resourceFactory,location,PermissionService,$modal,paginatorService,route) {
		  
		  scope.channels = [];
		  scope.pageItems = [];
		  
		  scope.routeTo = function(id){
	            location.path('/viewChannel/'+ id);
	          };
		  
		  scope.channelFetchFunction = function(offset, limit, callback) {
				resourceFactory.channelResource.get({ offset : offset, limit : limit }, function(data){
				scope.totalpropeties = data.totalFilteredRecords;
	        	scope.allDatas = data.pageItems;
	        	if(scope.totalpropeties%15 == 0)	
	        		scope.totalPages = scope.totalpropeties/15;
	        	else
	        		scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
	        	callback(data);
				});
			};
			
		scope.channels = paginatorService.paginate( scope.channelFetchFunction, 14);
		
		scope.deleteChannel = function(id){
			console.log("hi");
			scope.channelId = id;
			$modal.open({
				templateUrl: 'channel.html',
				controller: channelDelete,
				resolve:{}
			});
		};
		function channelDelete($scope,$modalInstance){
			$scope.approve = function () {
				resourceFactory.channelResource.remove({channelId: scope.channelId}, {} ,function (){
					console.log("hi");
					route.reload();
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
  mifosX.ng.application.controller('ChannelController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     'PermissionService',
     '$modal',
     'PaginatorService',
     '$route',
     mifosX.controllers.ChannelController]).run(function($log) {
    $log.info("ChannelController initialized");
  });
}(mifosX.controllers || {}));
