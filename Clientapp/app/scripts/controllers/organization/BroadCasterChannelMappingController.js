(function(module) {
  mifosX.controllers = _.extend(module, {
	  BroadCasterChannelMappingController: function(scope, resourceFactory,location,PermissionService,$modal,route,paginatorService,webStorage) {
		  
		  scope.broadcasters = [];
		  scope.channels = [];
		  scope.channelmappings = [];
		  scope.pageItems = [];
		  
		  var callingTab = webStorage.get('callingTab',null);
	        if(callingTab === null){
	        	callingTab="";
	        }else{
	  		  scope.displayTab=callingTab.someString;
	 		 
			  if(scope.displayTab == "broadcaster"){
				  scope.broadcasterTab =  true;
				  webStorage.remove('callingTab');
			  }
			  else if(scope.displayTab == "channel"){
					 
				  scope.channelTab =  true;
				  webStorage.remove('callingTab');
			  }
			  else if(scope.displayTab == "channelmapping"){
					 
				  scope.channelmappingTab =  true;
				  webStorage.remove('callingTab');
			  }
			  else{
				  webStorage.remove('callingTab');
			       }
			 
	        }
	        
		  
		  scope.routeToBroadcaster = function(id){
		         location.path('/viewbroadcaster/'+ id);
		      };
		      
	     scope.routeToChannel = function(id){
		          location.path('/viewChannel/'+ id);
		      };
		      
		      scope.routeToChannelMapping = function(id){
		          location.path('/ViewChannelMapping/'+ id);
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
			
		  
		 scope.broadcasters = paginatorService.paginate(scope.broadCasterFetchFunction, 14);
		 
		 scope.channelDetails = function(){
			 scope.channels = paginatorService.paginate(scope.channelFetchFunction, 14);
		 };
		 
		 scope.channelMappingDetails = function(){
			 scope.channelmappings = paginatorService.paginate(scope.channelMappingFetchFunction, 14);
		 };
		 
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
		  
		  scope.deleteChannel = function(id){
				console.log("hi");
				scope.channelId = id;
				$modal.open({
					templateUrl: 'channel.html',
					controller: channelDelete,
					resolve:{}
				});
			}
		  
			function channelDelete($scope,$modalInstance){
				$scope.approve = function () {
					resourceFactory.channelResource.remove({channelId: scope.channelId}, {} ,function (){
						//console.log("hi");
						route.reload();
						//location.path('/broadcasterchannelmapping');
						webStorage.add("callingTab", {someString: "channel"});
					});
					$modalInstance.dismiss('delete');
				};
				$scope.cancel = function (){
					$modalInstance.dismiss('cancel');
				};
			}
		  
			 scope.deleteChannelMapping = function(id){
					console.log("hi");
					scope.channelmappingId = id;
					$modal.open({
						templateUrl: 'ChannelMapping.html',
						controller: channelMappingDelete,
						resolve:{}
					});
				}
			 
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
  mifosX.ng.application.controller('BroadCasterChannelMappingController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     'PermissionService',
     '$modal',
     '$route',
     'PaginatorService',
     'webStorage',
     mifosX.controllers.BroadCasterChannelMappingController]).run(function($log) {
    $log.info("BroadCasterChannelMappingController initialized");
  });
}(mifosX.controllers || {}));
