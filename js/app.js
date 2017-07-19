angular.module('clbBoard', []).controller('ClbBoardController', function($scope){
	$scope.lists = [
		{ 
			title : 'Worker1',
			cards : [
				{title: "Create new database with some new fresh columns and try to mainatian the speed and performance as much improved as we can.", type : 'DONE'},
				{title: "Need to fix the dashboard issue", type : 'BUG'}
			]
		},
		{ 
			title : 'Worker2',
			cards : [
				{title: "Coputer needs to be repaired", type : 'BUG'},
				{title: "Car parking should be expanded", type : 'PENDING'}
			]
		},
		{
			title : 'Worker3'
			
		}
	];
	
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
		 clbCardTypes: '='
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
				console.log(element);
			  var height = $(ui.item).outerHeight();
			  $(".ui-state-highlight").height(height);
			  $(ui.item).addClass('dragging');
		  },
		  stop: function(event, ui){
			  $(ui.item).removeClass('dragging');
		  }
		});
		$( element ).disableSelection();
	},
	
	template: '<div class="list-title">{{list.title}}</div>'+
	'<div class="card-wraper sortable droptrue connectedSortable">'+
		'<div clb-card ng-repeat="card in list.cards" class="card ui-state-default"></div>'+
	'</div>'
  };
}).directive('clbCard', function() {
  return {
	restrict: 'A',
	template: '<div class="card-label-wrap">'+
		'<div class="card-label" style="background:{{clbCardTypes[card.type].colorCode}}"></div>'+
	'</div>'+
	'<div class="card-title">{{card.title}}</div>'/**/
  };
});