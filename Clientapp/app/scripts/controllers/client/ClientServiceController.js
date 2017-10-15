(function(module) {
	  mifosX.controllers = _.extend(module, {
		  ClientServiceController: function(scope, webStorage,routeParams , location, resourceFactory,dateFilter,
				  																	$rootScope,API_VERSION,http) {
		  
			  scope.clientId=routeParams.clientId;
			  var officeId=routeParams.officeId;
			  scope.formData = {};
			  scope.date = {};
			  scope.officesDatas = [];
			  scope.itemDatas = [];
			  scope.details = [];
			  
			  var clientData = webStorage.get('clientData');
			  if(webStorage.get('clientData')){
				    scope.hwSerialNumber=clientData.hwSerialNumber;
				    scope.displayName=clientData.displayName;
				    scope.statusActive=clientData.statusActive;
				    scope.accountNo=clientData.accountNo;
				    scope.officeName=clientData.officeName;
				    scope.balanceAmount=clientData.balanceAmount;
				    scope.hwSerialNumber=clientData.hwSerialNumber;
				    scope.currency=clientData.currency;
				    scope.imagePresent=clientData.imagePresent;
				    scope.categoryType=clientData.categoryType;
			        scope.email=clientData.email;
			        scope.phone=clientData.phone;
			        if(scope.imagePresent){
			        scope.image=clientData.image;
			        }
		  		}
			  
		  resourceFactory.clientserviceResource.get(function(data) {
			  scope.serviceData = data.serviceData;
		  });
	        
	    }
	  });
	  mifosX.ng.application.controller('ClientServiceController', [
	                                                           '$scope',
	                                                           'webStorage',
	                                                           '$routeParams',
	                                                           '$location',
	                                                           'ResourceFactory',
	                                                           'dateFilter',
	                                                           '$rootScope',
	                                                           'API_VERSION',
	                                                           '$http',
	                                                           mifosX.controllers.ClientServiceController]).run(function($log) {
        $log.info("ClientServiceController initialized");
    });
}(mifosX.controllers || {}));