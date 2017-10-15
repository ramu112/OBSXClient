(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateItemController: function(scope, resourceFactory, location,$rootScope,webStorage) {
    	 scope.itemClassDatas = [];
         scope.unitDatas = [];
         scope.chargesDatas = [];
         scope.formData = [];
         scope.itemPrices = [];
         scope.supplierDatas = [];
         scope.configurationData = [];
         scope.itemPricesFormData={};
         
         resourceFactory.itemTemplateResource.get(function(data) {
         	scope.itemClassDatas = data.itemClassData;
             scope.unitDatas = data.unitData;
             scope.chargesDatas = data.chargesData;
             scope.regionDatas = data.regionDatas;
             scope.configurationData = data.configurationData;
             scope.supplierDatas = data.supplierData;
             scope.formData = {
             		itemClassData : scope.itemClassDatas[0].id,
                     unitData : scope.unitDatas[0].id,
                     chargesData : scope.chargesDatas[0].id,
                     };
         });
         
         scope.goinventory = function(){
         	webStorage.add("callingTab", {someString: "items" });
         };
         
         scope.reset123 = function(){
         	location.path('/inventory');
         	webStorage.add("callingTab", {someString: "items" });
 	       };
         
       
        
        scope.getBothSup =function(supplierCode,supplierDescription){
        	return supplierCode+"--"+supplierDescription;
        };
        
        
            
	      scope.getBothCharge = function(chargeCode, chargeDescription){
	    	  return chargeCode+"--"+chargeDescription;
	      };
	       scope.addItemPrice = function () {
	           if (scope.itemPricesFormData.regionId && scope.itemPricesFormData.price) {
	        	   
	                scope.itemPrices.push({regionId:scope.itemPricesFormData.regionId, 
	                	price:scope.itemPricesFormData.price
	                });
	              
	                scope.itemPricesFormData.regionId = undefined;
	                scope.itemPricesFormData.price = undefined;
	                
	          	}
	            };
	              scope.removeItemPrices = function (index) {
	                scope.itemPrices.splice(index,1);
	              };
	            
	            
        scope.submit = function() {
        	this.formData.unitPrice=0;
        	delete this.formData.unitData;
        	delete this.formData.chargesData;
        	delete this.formData.itemClassData;
        	//this.formData.unitPrice = "0";
        	 scope.formData.itemPrices =new Array();
        	 if (scope.itemPrices.length > 0) {
                 
                 for (var i in scope.itemPrices) {
                	
                   scope.formData.itemPrices.push({regionId:scope.itemPrices[i].regionId, 
                	   price:scope.itemPrices[i].price,locale:$rootScope.locale.code});
                 };
               }
        	 
        	this.formData.locale = $rootScope.locale.code;
            resourceFactory.itemResource.save(this.formData,function(data){
            location.path('/viewitem/'+data.resourceId+'/item/0');

          });
        };
    }
  });
  mifosX.ng.application.controller('CreateItemController', ['$scope', 'ResourceFactory', '$location','$rootScope','webStorage', mifosX.controllers.CreateItemController]).run(function($log) {
    $log.info("CreateItemController initialized");
  });
}(mifosX.controllers || {}));
