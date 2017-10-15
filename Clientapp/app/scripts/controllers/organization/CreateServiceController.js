(function(module) {
  mifosX.controllers = _.extend(module, {
CreateServiceController: function(scope, resourceFactory, location,dateFilter) {
	  scope.formData = {};
	  scope.services = [];
      scope.statuses = [];
      scope.serviceArray = [];
      scope.serviceFormData = [];
      scope.serviceCategories = ["P","S"];
      scope.paramTypes = ["Text","Combo","Date","Boolean"];
      scope.paramValues = ["true","false"];
      scope.paramType = dateFilter(new Date(),'dd-MMM-yyyy');
        resourceFactory.serviceTemplateResource.get(function(data) {
        	 scope.services= data.serviceTypes;
        	 scope.statuses= data.status;
        	 scope.serviceParamsData = angular.copy(data.serviceParamsData);
        	 
        	 for(var i in scope.statuses){
        		 if((scope.statuses[i].value).toLowerCase() == "active"){
        			 scope.formData.status = scope.statuses[i].value;
        		 }
        	 }
             
        });
        
         scope.deleteService = function (index) {
            scope.serviceArray.splice(index,1);
          };
        
          scope.changeServiceCategory = function(){
        	  scope.serviceArray = [];
        	  if(scope.formData.serviceCategory == 'S'){
        		  for(var i in scope.serviceParamsData){
        			  if(scope.serviceParamsData[i].mCodeValue == "Network_node"){
        				  scope.serviceFormData.paramName = scope.serviceParamsData[i].id;break;
        			  }
        		  }
                  scope.serviceFormData.paramType = "Combo";
                  scope.serviceFormData.paramValue = "select b.id,code_value from m_code a, m_code_value b where a.id = b.code_id and code_name='Provisioning' order by id"; 
                  scope.addService();
        	  }
          }
          
        scope.addService = function () {
        	console.log(scope.serviceFormData.paramValue);
        	if (scope.serviceFormData.paramName && scope.serviceFormData.paramType && scope.serviceFormData.paramValue) {
									              scope.serviceArray
											.push({
												paramName : scope.serviceFormData.paramName,
												paramType : scope.serviceFormData.paramType,
												paramValue: scope.serviceFormData.paramValue
											});
              scope.serviceFormData.paramName = undefined;
              scope.serviceFormData.paramType = undefined;
              scope.serviceFormData.paramValue = undefined;
        	}
          };
	        scope.onAddChangeParam = function(index){
	        	if(index != null){
	            		scope.serviceArray[index].paramValue = [];
	        	}else{
	        		scope.serviceFormData.paramValue = [];
	        	}
	        };
        
        scope.submit = function() {  
        	scope.formData.serviceArray =new Array();
            if (scope.serviceArray.length > 0) {
             
                for (var i in scope.serviceArray) {
					                   scope.formData.serviceArray
												.push({
													paramName : scope.serviceArray[i].paramName,
													paramType : scope.serviceArray[i].paramType,
													paramValue : scope.serviceArray[i].paramValue
												});
                };
              }
        	
          resourceFactory.serviceResource.save(scope.formData,function(data){
        		  location.path('/services');
          });
        };
    }
  });
 mifosX.ng.application.controller('CreateServiceController', [
                                                              '$scope', 
                                                              'ResourceFactory', 
                                                              '$location', 
                                                              'dateFilter',
                                                              mifosX.controllers.CreateServiceController]).run(function($log) {
    $log.info("CreateServiceController initialized");
  });
}(mifosX.controllers || {}));
