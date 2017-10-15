(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewItemController: function(scope, routeParams , resourceFactory ,location,$modal,PermissionService,webStorage ) {
        scope.item = [];
        scope.audit = [];
        scope.supplierDatas = [];
        scope.showType="";
        scope.PermissionService = PermissionService;
        scope.totalItem=routeParams.totalItem;
        var showtype = routeParams.showtype;
        scope.totalItem=routeParams.totalItem;
        
        scope.goinventory = function(){
        	webStorage.add("callingTab", {someString: "items" });
        };
        
        resourceFactory.itemResource.get({itemId: routeParams.id} , function(data) {
        	scope.item = data;
        	scope.audit = data.auditDetails;
        	scope.itemPricesDatas = data.itemPricesDatas;
            scope.supplierDatas = data.supplierData;
        });
        
        scope.deleteItem = function(){
            $modal.open({
                templateUrl: 'approve.html',
                controller: Approve,
                resolve:{}
            });
        
    		
    	};
    	
    	scope.showAudit = function(){
    		scope.showType = "audit";
    	};
    	scope.showItems =function(){
    		scope.showType = "item";
    	};
    	if(showtype == 'audit'){
    		scope.showAudit();
    	}
    	var Approve = function ($scope, $modalInstance) {
            $scope.approve = function (act) {
                scope.approveData = {};
            resourceFactory.itemResource.delete({itemId: routeParams.id},{},function(data){
                    location.path('/inventory');

            });
                $modalInstance.close('delete');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
    }
  });
  mifosX.ng.application.controller('ViewItemController', ['$scope', '$routeParams','ResourceFactory', '$location','$modal','PermissionService','webStorage',mifosX.controllers.ViewItemController]).run(function($log) {
    $log.info("ViewItemController initialized");
  });
}(mifosX.controllers || {}));
