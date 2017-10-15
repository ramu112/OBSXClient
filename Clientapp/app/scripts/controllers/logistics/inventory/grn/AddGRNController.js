(function(module) {
  mifosX.controllers = _.extend(module, {
	  AddGRNController: function(scope,webStorage, resourceFactory, location,dateFilter,PermissionService,$rootScope) {
        scope.itemDatas = [];
        scope.officeDatas = [];
        scope.supplierDatas = [];
        scope.formData = {};
        scope.formData.purchaseDate = new Date();
        
        resourceFactory.grnTemplateResource.get(function(data) {
        	scope.itemDatas = data.itemData;
            scope.officeDatas = data.officeData;
            scope.supplierDatas = data.supplierData;
        });
        scope.selectedGRN=function(){
        	webStorage.add("callingTab", {someString: "grn" });
        };
        scope.changeSupplierFun = function(){
        	resourceFactory.supplierItemsResource.query({supplierId: scope.formData.supplierId},function(data) {
        		scope.itemDatas = data;
        	});
        };
        scope.getBothSup =function(supplierCode,supplierDescription){
        	return supplierCode+"--"+supplierDescription;
        };
        
        scope.getBothItem = function(itemCode, itemDescription){
        	return itemCode+"--"+itemDescription;
        };
        
       scope.reset123 = function(){
    	   webStorage.add("callingTab", {someString: "grn" });
       };
                
        scope.submit = function() {
        	this.formData.locale = $rootScope.locale.code;
        	var reqDate = dateFilter(scope.formData.purchaseDate,'dd MMMM yyyy');
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.purchaseDate = reqDate;
            resourceFactory.grnResource.save(this.formData,function(data){
            if(PermissionService.showMenu('READ_GRN'))
            	location.path('/viewgrn/' + data.resourceId);
            else
            	location.path('/inventory');
            	webStorage.add("callingTab", {someString: "grn" });
          });
        };
    }
  });
  mifosX.ng.application.controller('AddGRNController', ['$scope','webStorage', 'ResourceFactory', '$location','dateFilter','PermissionService','$rootScope', mifosX.controllers.AddGRNController]).run(function($log) {
    $log.info("AddGRNController initialized");
  });
}(mifosX.controllers || {}));
