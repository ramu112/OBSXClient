(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateChannelController: function(scope, resourceFactory, location,webStorage) {
    	scope.formdata={};
    	scope.broadcasterDatas = {};
    	
    	resourceFactory.channelTemplateResource.get(function(data) {
			  scope.broadcasterDatas = data.broadcasterDatas;
		});
    	
         
         scope.reset123 = function(){
          	location.path('/broadcasterchannelmapping');
          	webStorage.add("callingTab", {someString: "channel" });
  	       };
    	
    	scope.submit = function(){
    		
    		resourceFactory.channelResource.save(scope.formData,function(data){
    			location.path('/broadcasterchannelmapping');
    			webStorage.add("callingTab", {someString: "channel" });
    		});
    		
    	};
    }
  });
  mifosX.ng.application.controller('CreateChannelController', [
    '$scope', 
    'ResourceFactory', 
    '$location',
    'webStorage',
    mifosX.controllers.CreateChannelController]).run(function($log) {
    $log.info("CreateChannelController initialized");
  });
}(mifosX.controllers || {}));
