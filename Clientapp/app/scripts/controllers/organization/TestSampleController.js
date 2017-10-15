(function (module) {
    mifosX.controllers = _.extend(module, {
    	TestSampleController: function (scope, resourceFactory, $rootScope, location) {

        	

        }
    });
    mifosX.ng.application.controller('TestSampleController', ['$scope', 'ResourceFactory', '$rootScope', '$location', mifosX.controllers.TestSampleController]).run(function ($log) {
        $log.info("TestSampleController initialized");
    });
}(mifosX.controllers || {}));
