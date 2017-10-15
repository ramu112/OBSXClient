(function(module) {
	mifosX.controllers = _.extend(module,{
		ProvisioningDetailsController : function(scope, $modal, location, resourceFactory, paginatorService, PermissionService, routeParams) {
			
				scope.PermissionService = PermissionService;
				scope.formData = {};
				scope.clientId = routeParams.id;
		    	 scope.client = [];
				
				resourceFactory.provisioningDetailsMappingResource.query({clientId:scope.clientId} , function(data) {
	                scope.provisioningdatas = data;
	                scope.sentMessagesData = [];
	                for(var i in data){
	              	  scope.sentMessagesData.push(data[i]);
	                };
	                
	              });
										
			}					
	});
	
	mifosX.ng.application.controller('ProvisioningDetailsController', [ 
	'$scope',
	'$modal', 
	'$location', 
	'ResourceFactory', 
	'PaginatorService', 
	'PermissionService', 
	'$routeParams',
	mifosX.controllers.ProvisioningDetailsController 
	]).run(function($log) {						
		$log.info("ProvisioningDetailsController initialized");					
	});
}(mifosX.controllers || {}));
