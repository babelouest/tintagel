angular.module('sagremorApp')
    .controller('heatersCtrl', [
    '$scope',
    '$translate',
    'sagremorService',
    'benoicFactory',
    'sharedData',
    function($scope, $translate, sagremorService, benoicFactory, sharedData) {
      
        var self = this;
        
        this.heaterList = [];
        
        this.init = function () {
			$translate(["edit", "monitor"]).then(function (results) {
				self.menuSensor = [
					{
						name: "edit", 
						display: results.edit, 
						action: function (param) {
							sagremorService.editHeater(param);
						}
					},
					{
						name: "monitor", 
						display: results.monitor, 
						action: function (param) {
							sagremorService.monitor(param);
						}
					}
				];
				
				self.updateHeaters();
			});
		};
        
        $scope.$on('benoicDevicesChanged', function () {
            self.updateHeaters();
        });
        
        $scope.$on('benoicHeatersChanged', function () {
            self.updateHeaters();
        });
        
        this.updateHeaters = function () {
            var devices = sharedData.all('benoicDevices');
            for (key in devices) {
                var deviceName = devices[key].name;
                if (devices[key].connected && devices[key].enabled) {
                    for (se in devices[key].element.heaters) {
                        var heaters = devices[key].element.heaters[se];
                        heaters.device = deviceName;
                        heaters.name = se;
                        self.heaterList.push(heaters);
                    }
                }
            }
        };
        
        this.init();
        
    }
]);