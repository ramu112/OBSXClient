(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateSimpleActivationController: function(scope,webStorage,routeParams, resourceFactory, location, http,filter,PermissionService, dateFilter,$rootScope,API_VERSION) {
		  
		  scope.offices = [];
		  scope.clientCategoryDatas = [];
		  scope.cities = [];
		  scope.formData={};
		  scope.formData.clientServiceDetails =[];
		  scope.clientServiceCollapsed =true;
		  scope.deviceCollapsed = true; 
		  scope.planCollapsed = true;
		  scope.serviceData = [];
		  scope.serviceFormData = [];
		  scope.clientServiceData = [];
		  scope.discountMasterDatas = [];
		  scope.itemDatas = [];
		  scope.contractPeriods = [];
		  scope.pairableItemDetails = [];
		  scope.pairableFormData = {};
		  scope.plandatas = [];
		  scope.subscriptiondatas = [];
	      scope.paytermdatas = [];
	      scope.finalData = {};
	      scope.formData.clientServiceDetails = [];
	      scope.isPairable = false;
	      scope.activationDate = new Date();
	      var reqDate = dateFilter(scope.activationDate,'dd MMMM yyyy');
		  
		  scope.collapseOthers = function(){
	            scope.filterText = '';
	            scope.isCollapsed = !scope.isCollapsed;
	            if(scope.isCollapsed==false){
	            scope.clientServiceCollapsed = true;
	            scope.deviceCollapsed = true;
	            scope.planCollapsed = true;
	            }
	        };
	        scope.collapseclientServiceOthers = function(){
	            scope.filterText = '';
	            scope.clientServiceCollapsed = !scope.clientServiceCollapsed;
	            if(scope.clientServiceCollapsed==false){
	                scope.isCollapsed = true;
	                scope.deviceCollapsed = true;
	                scope.planCollapsed = true;
	            }
	        };
	        scope.collapseDeviceOthers = function(){
	        	scope.filterText = '';
	            scope.deviceCollapsed = !scope.deviceCollapsed;
	            if(scope.deviceCollapsed==false){
	                scope.isCollapsed = true;
	                scope.clientServiceCollapsed = true;
	                scope.planCollapsed = true;
	            }
	        };
	        scope.collapsePlanOthers = function(){
	        	scope.filterText = '';
	            scope.planCollapsed = !scope.planCollapsed;
	            if(scope.deviceCollapsed==false){
	                scope.isCollapsed = true;
	                scope.clientServiceCollapsed = true;
	                scope.deviceCollapsed = true;
	                
	            }
	        };
		  
		  resourceFactory.clientTemplateResource.get(function(data) {
              scope.offices = data.officeOptions;
              scope.clientCategoryDatas=data.clientCategoryDatas;
              scope.cities=data.addressTemplateData.cityData;
              scope.flag=data.loginConfigurationProperty.enabled;
              
          });
		  
		  scope.formName=function(name){
              var mesage_array = new Array();
              mesage_array = (name.split(" "));
           
	           this.formData.firstname=mesage_array[0];
	           this.formData.lastname=mesage_array[1];
	           if(this.formData.lastname == null){
	        	   this.formData.lastname="Mr.";
	           }
          };
		  
		  scope.getStateAndCountry=function(city){
        	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
            		scope.formData.state = data.state;
            		scope.formData.country = data.country;
        	  });
          };
		  
		  resourceFactory.clientserviceTemplateResource.get(function(data) {
			  scope.serviceData = data.serviceData;
		  });
		  
		  scope.getBothService = function(serviceCode, serviceDescription){
			  return serviceCode+"--"+serviceDescription;
		  };
		  
		  scope.changeServiceFun = function(){
			  resourceFactory.clientserviceparamResource.get({serviceId: scope.formData.serviceId}, function(data) {
				  scope.serviceDetail = angular.copy(data);
				  scope.details = data;
			  });
		  };
		  
		  resourceFactory.oneTimeSaleTemplateResource.get({clientId:scope.clientId}, function(data) {
	            scope.clientServiceData = data.clientServiceData;
	            /*for(var i in scope.offices){
	            	if(scope.offices[i].id == officeId){
	            		scope.formData.officeId=scope.offices[i].id;
	            	}
	            }*/
	            scope.discountMasterDatas = data.discountMasterDatas;
	            for(var i in scope.discountMasterDatas){
	                if(scope.discountMasterDatas[i].discountCode.toLowerCase() == "none"){
	                 scope.discountId = scope.discountMasterDatas[i].id; 
	                }
	               }
	            scope.itemDatas = angular.copy(data.itemDatas);
	            scope.contractPeriods = data.contractPeriods;
	        }); 
		  	
			  scope.getData = function(query){
		        	return http.get($rootScope.hostUrl+API_VERSION+'/itemdetails/0/0', {
		        	      params: {
		        	    	  		query: query
		        	      		   }
		        	    }).then(function(res){
		        	    						itemDetails = [];
							        	      for(var i in res.data.serialNumbers){
							        	    	  itemDetails.push(res.data.serialNumbers[i]);
							        	    	  if(i == 7)
							        	    		  break;
							        	      }
	
							        	    if(itemDetails.length == 0){
							        	    	delete scope.formData.itemId;
							        	    	delete scope.formData.chargeCode;
							        	    	delete scope.formData.unitPrice;
							        	    	delete scope.formData.quantity;
							        	    }
		        	      return itemDetails;
		        	    });
	          };
	          
	          scope.getPairableItemDetails = function(){
	            	scope.pairableItemDetails = [];
	            	resourceFactory.pairableitemMasterDetailResource.get({serialNo:scope.itemDetail,query:scope.pairableSerialNo},function(data) {
	   				 scope.pairableItemDetails = angular.copy(data.serialNumbers);
	   			 });
	            };
	          
	          scope.getItemData = function(item,model,label){
	            	 scope.isPairable = false;
		        	if(item || model || label){
		        		var serialNum = item || model || label;
			        	resourceFactory.itemMasterDetailTemplateResource.get({query : serialNum,clientId:scope.clientId},function(data) {
			        	   if(data){
			        		   scope.formData.itemId = data.id;
			        		   scope.formData.chargeCode = data.chargeCode;
			        		   scope.formData.unitPrice = data.unitPrice;
			        		   scope.formData.quantity = "1";
			        		   if("Y" == data.isPairing){
			        			 scope.isPairable = true;
			        			 scope.getPairableItemDetails();
			        		   }
			        	   }
			        	});
		        	}
	            };
	            
	            scope.selectPairableItemDetails = function(pairableSerialNo){
	            	scope.pairableSerialNo = pairableSerialNo;
	            	resourceFactory.itemMasterDetailTemplateResource.get({query : pairableSerialNo,clientId:scope.clientId},function(data) {
	            		if(data){
			        		   scope.pairableFormData.itemId = data.id;
			        		   scope.pairableFormData.chargeCode = data.chargeCode;
			        		   scope.pairableFormData.unitPrice = data.unitPrice;
			        		   scope.pairableFormData.quantity = "1";
			        		  
			        	   }
	            	});
	            };
	            
	            scope.selectedNewSale = function(){
		        	delete scope.formData.totalPrice;
		        	delete scope.formData.discountId;
		        	delete scope.pairableFormData.totalPrice;
		        	delete scope.pairableFormData.discountId;
		        	scope.formData.discountId = scope.discountId;
		        	scope.formData.totalPrice = scope.formData.unitPrice;
		        	scope.pairableFormData.totalPrice = scope.pairableFormData.unitPrice;
		        	scope.pairableFormData.discountId = scope.discountId;
		        	scope.newSaleType = !(scope.secondSaleType = scope.deviceRentalType = false);
		        	
		        };
		        
		        resourceFactory.orderTemplateResource.get({planId:'0'},function(data) {
			          scope.plandatas = data.plandata;
			          scope.items = data.plandata;
			          scope.prepaidPlansitems = data.plandata;
			          scope.subscriptiondatas=data.subscriptiondata;
			          scope.paytermdatas=data.paytermdata;
			          scope.clientId = routeParams.id;
			          scope.formData = {
			            		billAlign: false,
			            		
			                  };
			        });
		        scope.setBillingFrequency = function(value) {
		        	scope.paytermdatas=undefined;
		        	 resourceFactory.orderResource.get({planId:value, template: 'true'} , function(data) {
		        		 
		        		 scope.paytermdatas=data.paytermdata;
		        		 scope.formData.isPrepaid=data.isPrepaid;
		        		 scope.isPrepaidPlanFormData4=data.isPrepaid;
		        		 scope.formData.planCode=value;
		        		 
		        		  for (var i in data.subscriptiondata) {
		                 	if(data.subscriptiondata[i].Contractdata == data.contractPeriod){
		                 		 scope.formData.contractPeriod=data.subscriptiondata[i].id; 
		                 	}
		                   
		                  };
		             });
		       };
		       
		       scope.submit = function(){
		    	   
		    	   scope.formData.clientServiceDetails = [];
		    	   scope.finalData.clientData = [];
		    	   scope.finalData.clientServiceData =[];
		    	   scope.finalData.deviceData = [];
		    	   scope.finalData.planData = [];
		    	   console.log(scope.formData);
		    	   scope.finalData.clintData = {
		    			   "activationDate":reqDate,
		    			   "entryType":"IND",
		    			   "officeId" : scope.formData.officeId,
		    			   "clientCategory" : scope.formData.clientCategory,
		    			   "title":"Mr.",
		    			   "firstname":scope.formData.firstname,
		    			   "lastname":scope.formData.lastname,
		    			   "phone":scope.formData.phone,
		    			   "email":scope.formData.email,
		    			   "addressNo":"Addr1",
		    			   "city":scope.formData.city,
		    			   "state":scope.formData.state,
		    			   "country":scope.formData.country,
		    			   "locale":$rootScope.locale.code,
		    			   "active":true,
		    			   "dateFormat":"dd MMMM yyyy",
		    			   
		    			   "flag":scope.flag
		    	   };
		    	   scope.finalData.clientData.push(scope.finalData.clintData);
		    	   delete scope.finalData.clintData;
		    	   
		    	   
		    	   for(var i in scope.serviceDetail){
		        		 scope.formData.clientServiceDetails
							.push({
								 status: 'new',
								 parameterId: parseInt(scope.serviceDetail[i].paramName),
								 parameterValue: scope.serviceDetail[i].paramValue
								 
							});
		        	 }
		    	   scope.finalData.clintServiceData = {
		    			 "clientServiceDetails": scope.formData.clientServiceDetails,
		    			 "serviceId":scope.formData.serviceId
		    	   };
		    	   scope.finalData.clientServiceData.push(scope.finalData.clintServiceData);
		    	   
		    	   scope.deviceData ={};
		    	    scope.deviceData.locale = $rootScope.locale.code;
		    	    scope.deviceData.dateFormat = "dd MMMM yyyy";
		    	    scope.deviceData.officeId = scope.formData.officeId;
		    	    scope.deviceData.itemId = scope.formData.itemId;
		    	    scope.deviceData.chargeCode = scope.formData.chargeCode;
		    	    scope.deviceData.unitPrice = scope.formData.unitPrice;
		    	    scope.deviceData.quantity = scope.formData.quantity;
		    	    scope.deviceData.discountId = scope.formData.discountId;
		    	    scope.deviceData.totalPrice = scope.formData.totalPrice;
		    	    
		        	scope.deviceData.saleType = "NEWSALE";
		        	scope.deviceData.saleDate = dateFilter(scope.date.saleDate,"dd MMMM yyyy");
		        	for(var i in scope.itemDatas){
		        		if(scope.itemDatas[i].id == scope.formData.itemId){
		        			scope.itemType1 = scope.itemDatas[i].itemCode;
		        		}
		        		if(scope.itemDatas[i].id == scope.pairableFormData.itemId){
		        			scope.pairableFormData.itemType = scope.itemDatas[i].itemCode;
		        		}
		        	}
		        	scope.deviceData.serialNumber = [{
						serialNumber 	: scope.itemDetail,
						status 			: "allocated", 
						itemMasterId 	: scope.formData.itemId,
						isNewHw 		: "Y",
						itemType        : scope.itemType1
					}];
		        	if(scope.isPairable){
		        		scope.deviceData.pairableItemDetails ={};
		        		scope.deviceData.pairableItemDetails.dateFormat = "dd MMMM yyyy";
		        		scope.deviceData.pairableItemDetails.locale = $rootScope.locale.code;
		        		scope.deviceData.pairableItemDetails.officeId = scope.formData.officeId;
		        		scope.deviceData.pairableItemDetails.itemId = scope.pairableFormData.itemId;
		        		scope.deviceData.pairableItemDetails.chargeCode = scope.pairableFormData.chargeCode;
		        		scope.deviceData.pairableItemDetails.unitPrice = scope.pairableFormData.unitPrice;
		        		scope.deviceData.pairableItemDetails.quantity = scope.formData.quantity;
		        		scope.deviceData.pairableItemDetails.discountId = scope.pairableFormData.discountId;
		        		scope.deviceData.pairableItemDetails.totalPrice = scope.pairableFormData.totalPrice;
		        		scope.deviceData.pairableItemDetails.saleType = "NEWSALE";
		        		scope.deviceData.pairableItemDetails.saleDate = dateFilter(scope.date.saleDate,"dd MMMM yyyy");
		        		scope.deviceData.pairableItemDetails.clientServiceId = scope.formData.clientServiceId;
		        		scope.deviceData.pairableItemDetails.isPairing = "N";
		        		scope.deviceData.pairableItemDetails.serialNumber = [];
		        		scope.deviceData.pairableItemDetails.serialNumber.push({
						serialNumber 	: scope.pairableSerialNo,
						status 			: "allocated", 
						itemMasterId 	: scope.pairableFormData.itemId,
						isNewHw 		: "Y",
						itemType        : scope.pairableFormData.itemType
					});
		        	scope.deviceData.isPairing = "Y";
		        	}else{
		        		delete scope.deviceData.pairableItemDetails;
		        		scope.deviceData.isPairing = "N";
		        	}
		        	scope.finalData.deviceData.push(scope.deviceData);
		        	
		        
		    	   
		    	   if(this.formData.isPrepaid == 'Y'){
		            	  for (var i in scope.paytermdatas) {
		                     	if(scope.paytermdatas[i].duration == this.formData.contractPeriod){
		                     		 this.formData.paytermCode=scope.paytermdatas[i].paytermtype; 
		                     	}
		                  };
		                  for (var i in scope.subscriptiondatas) {
		                   	if(scope.subscriptiondatas[i].Contractdata == this.formData.contractPeriod){
		                   		 this.formData.contractPeriod=scope.subscriptiondatas[i].id;
		                   		
		                   	}
		                };    
		            //this.formData.paytermCode='Monthly';
		                this.formData.billAlign=false;
		            }
		    	   
		    	   scope.finalData.plnData = {
		    			   "billAlign":false,
		    			   "autoRenew":"",
		    			   "planCode":scope.formData.planCode,
		    			   "contractPeriod":scope.formData.contractPeriod,
		    			   "paytermCode":scope.formData.paytermCode,
		    			   "isNewplan":true,
		    			   "locale":$rootScope.locale.code,
		    			   "dateFormat": "dd MMMM yyyy",
		    			   "start_date":dateFilter(new Date(),'dd MMMM yyyy'),
		    			   
		    	   };
		    	   scope.finalData.planData.push(scope.finalData.plnData);
		    	   delete scope.finalData.plnData;
		    	   resourceFactory.simpleactivationProcessResource.save(scope.finalData,function(data){
		            	location.path('/viewclient/'+ data.clientId);
		            });
		    	   
		       };
	            

	    }
	  });
mifosX.ng.application.controller('CreateSimpleActivationController', [
                                                                  '$scope',
                                                                  'webStorage',
                                                                  '$routeParams',
                                                                  'ResourceFactory', 
                                                                  '$location', 
                                                                  '$http',
                                                                  '$filter',
                                                                  'PermissionService', 
                                                                  'dateFilter',
                                                                  '$rootScope',
                                                                  'API_VERSION',
                                                                  mifosX.controllers.CreateSimpleActivationController]).run(function($log) {
    $log.info("CreateSimpleActivationController initialized");
  });
}(mifosX.controllers || {}));