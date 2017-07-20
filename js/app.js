angular.module('clbBoard', []).controller('ClbBoardController', function($scope){
	$scope.lists = [
		{ 
			title : 'Worker1',
			cards : [
				{title: "Create new database with some new fresh columns and try to mainatian the speed and performance as much improved as we can.", type : 'DONE', priority : 5},
				{title: "Need to fix the dashboard issue", type : 'BUG', priority : 3}
			]
		},
		{ 
			title : 'Worker2',
			cards : [
				{title: "Coputer needs to be repaired", type : 'BUG', priority : 1},
				{title: "3rd layout", type : 'PENDING', priority : 3},
				{title: "Car parking should be expanded", type : 'PENDING', priority : 2}
			]
		},
		{
			title : 'Worker3'
			
		}
	];
	
	$scope.cardUpdateCallback = function(item){
		$scope.lists[0].cards[item.prevIndex].priority = item.newIndex + 1;
	};
	
	$scope.cardTypes = {
		BUG : {title : 'Bug fixes', colorCode: '#d00'},
		DONE : {title : 'Successfully Done', colorCode: '#57b408'},
		PENDING : {title : 'Pending task', colorCode: '#f4a408'},
	}
	
})
.directive('clbBoard', function() {
	return {
		restrict: 'E',
		scope: {
			clbLists: '=',
			clbCardTypes: '=',
			onUpdateCallback: '&onUpdate',
			priorityIndex: '='
		},
		template : '<div class="board">'+
			'<div clb-list ng-repeat="list in clbLists" class="list"></div>'+	
		'</div>'
	};
}).directive('clbList', function() {
  return {
    restrict: 'A',
	link: function($scope, element, attrs) {
		$( element ).find('.sortable').sortable({
		  placeholder: "ui-state-highlight",
		  connectWith: ".connectedSortable",
		  start: function(event, ui){
			  ui.item.prevIndex = ui.item.index();
			  var height = $(ui.item).outerHeight();
			  $(".ui-state-highlight").height(height);
			  $(ui.item).addClass('dragging');
		  },
		  stop: function(event, ui){
			  $(ui.item).removeClass('dragging');
		  },
		  update: function(event, ui){
			  ui.item.newIndex = ui.item.index();
			  $scope.onUpdateCallback({item: ui.item});
		  }
		});
		$( element ).disableSelection();
	},
	
	template: '<div class="list-title">{{list.title}}</div>'+
	'<div class="card-wraper sortable droptrue connectedSortable">'+
		'<div clb-card ng-repeat="card in list.cards | orderBy:priorityIndex" class="card ui-state-default"></div>'+
	'</div>'
  };
}).directive('clbCard', function() {
  return {
	restrict: 'A',
	template: '<div class="card-label-wrap">'+
		'<div class="card-label" style="background:{{clbCardTypes[card.type].colorCode}}"></div>'+
	'</div>'+
'<div class="card-title">{{card.priority}} - {{card.title}}</div>'
  };
});