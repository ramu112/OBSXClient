(function(module) {
	mifosX.controllers = _.extend(module, {
		ViewClientServiceController : function(scope, webStorage, routeParams,
				route, location, resourceFactory, http, PermissionService) {

			scope.walletConfig = webStorage.get('is-wallet-enable');
			scope.id = routeParams.id;
			scope.clientId = routeParams.clientId;
			var clientData = webStorage.get('clientData');
			scope.hwSerialNumber = clientData.hwSerialNumber;
			scope.displayName = clientData.displayName;
			scope.statusActive = clientData.statusActive;
			scope.accountNo = clientData.accountNo;
			scope.officeName = clientData.officeName;
			scope.balanceAmount = clientData.balanceAmount;
			scope.currency = clientData.currency;
			scope.imagePresent = clientData.imagePresent;
			scope.categoryType = clientData.categoryType;
			scope.email = clientData.email;
			scope.phone = clientData.phone;
			scope.clientserviceId = [];

			resourceFactory.viewClientServiceResource.get({
				clientId : routeParams.id,
				id : scope.id
			}, function(data) {
				scope.clientserviceId = data;
				scope.ServiceParameterData = data.ServiceParameterData;
			});

		}
	});
	mifosX.ng.application.controller(
			'ViewClientServiceController',
			[ '$scope', 'webStorage', '$routeParams', '$route', '$location',
					'ResourceFactory', '$http', 'PermissionService',
					mifosX.controllers.ViewClientServiceController ]).run(
			function($log) {
				$log.info("ViewClientServiceController initialized");
			});
}(mifosX.controllers || {}));