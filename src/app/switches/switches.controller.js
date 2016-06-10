angular.module('sagremorApp')
    .controller('switchesCtrl', [
    '$scope',
    '$translate',
    'sagremorService',
    'benoicFactory',
    'sharedData',
    'sagremorParams',
    function($scope, $translate, sagremorService, benoicFactory, sharedData, sagremorParams) {
      
        var self = this;
        
        this.switchList = [];
        this.dimmerList = [];
        this.sagremorParams = sagremorParams;
        
        this.init = function () {
			$translate(["edit", "monitor", "add_to_dashboard"]).then(function (results) {
				self.menuSwitcher = [
					{
						name: "edit", 
						display: results.edit, 
						action: function (param) {
							sagremorService.editSwitcher(param);
						}
					},
					{
						name: "monitor", 
						display: results.monitor, 
						action: function (param) {
							sagremorService.monitor(param);
						}
					},
					{
						name: "add_dashboard", 
						display: results.add_to_dashboard, 
						action: function (param) {
							if (sagremorService.addToDashboard(param)) {
                                $scope.$broadcast("refreshDashboard");
                            }
						}
					}
				];
				self.menuDimmer = [
					{
						name: "edit", 
						display: results.edit, 
						action: function (param) {
							sagremorService.editDimmer(param);
						}
					},
					{
						name: "monitor", 
						display: results.monitor, 
						action: function (param) {
							sagremorService.monitor(param);
						}
					},
					{
						name: "add_dashboard", 
						display: results.add_to_dashboard, 
						action: function (param) {
							if (sagremorService.addToDashboard(param)) {
                                $scope.$broadcast("refreshDashboard");
                            }
						}
					}
				];
				
				self.updateSwitchers();
				self.updateDimmers();
			});
		};
        
        $scope.$on('benoicDevicesChanged', function () {
            self.updateSwitchers();
            self.updateDimmers();
        });
        
        $scope.$on('benoicSwitchesChanged', function () {
            self.updateSwitchers();
            self.updateDimmers();
        });
        
        this.updateSwitchers = function () {
            var devices = sharedData.all('benoicDevices');
            for (key in devices) {
                var deviceName = devices[key].name;
                if (devices[key].connected && devices[key].enabled) {
                    for (sw in devices[key].element.switches) {
                        var switcher = devices[key].element.switches[sw];
                        switcher.device = deviceName;
                        switcher.name = sw;
                        self.switchList.push(switcher);
                    }
                }
            }
        };
        
        this.updateDimmers = function () {
            var devices = sharedData.all('benoicDevices');
            for (key in devices) {
                var deviceName = devices[key].name;
                if (devices[key].connected && devices[key].enabled) {
                    for (di in devices[key].element.dimmers) {
                        var dimmer = devices[key].element.dimmers[di];
                        dimmer.device = deviceName;
                        dimmer.name = di;
                        self.dimmerList.push(dimmer);
                    }
                }
            }
        };
        
        this.init();
        
    }
]);
