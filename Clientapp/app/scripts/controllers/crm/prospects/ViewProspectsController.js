(function(module) {
	mifosX.controllers = _.extend(module, {
		ViewProspectsController : function(scope, routeParams, route, location,
				resourceFactory, httpk, PermissionService) {

			scope.prospects = [];
			scope.prospectDetailData = [];
			scope.PermissionService = PermissionService;
			
			resourceFactory.prospectResource.get({ prospectId : routeParams.id }, function(data) {				
				scope.prospects = data;
			});
			
			resourceFactory.prospectHistoryResource.getHistoryProspects({ prospectdetailid : routeParams.id }, function(data) {
				scope.prospectDetailData = data.prospectDetailData;
			});
			
			/*scope.deletemessage = function (){
			    resourceFactory.discountResource.delete({discountId: routeParams.id} , {} , function(data) {
			          location.path('/leads');
			          // added dummy request param because Content-Type header gets removed 
			          // if the request does not contain any data (a requested body)        
			    });
			  };
			 */

			scope.getVal = function(flag) {
				if (flag === "Closed" || flag === "Canceled") {
					return false;
				} else {
					return true;
				}
			};

			scope.convertProspect = function() {
				resourceFactory.prospectConvertResource.save({ deleteProspectId : routeParams.id }, {}, function(data) {
					if (PermissionService.showMenu('READ_CLIENT'))
						location.path('/viewclient/' + data.resourceId);
					else
						route.reload();
				});
			};
		}
	});
	
	mifosX.ng.application.controller('ViewProspectsController',[ 
	'$scope', 
	'$routeParams', 
	'$route', 
	'$location',
	'ResourceFactory', 
	'$http', 
	'PermissionService',
	mifosX.controllers.ViewProspectsController 
	]).run(function($log) {	
		$log.info("ViewProspectsController initialized");			
	});
}(mifosX.controllers || {}));