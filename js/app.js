angular.module('clbBoard', []).controller('ClbBoardController', function($scope){
	$scope.lists = [
		{ 
			title : 'Worker 1',
			cards : [
				{title: "Create new database with some new fresh columns and try to mainatian the speed and performance as much improved as we can.", type : 'DONE', priority : 5},
				{title: "Need to fix the dashboard issue", type : 'BUG', priority : 3}
			]
		},
		{ 
			title : 'Worker 2',
			cards : [
				{title: "Coputer needs to be repaired", type : 'BUG', priority : 1},
				{title: "3rd layout", type : 'PENDING', priority : 3},
				{title: "Car parking should be expanded", type : 'PENDING', priority : 2}
			]
		},
		{
			title : 'Worker 3',
			cards : []
			
		}
	];
	
	$scope.lists2 = [
		{ 
			title : 'In stock',
			cards : [
				{title: "Peripherals", type : 'DONE', priority : 5},
				{title: "mousepads", type : 'DONE', priority : 3}
			]
		},
		{ 
			title : 'Out of stock',
			cards : [
				{title: "Laptops", type : 'BUG', priority : 1},
				{title: "Data Cables", type : 'BUG', priority : 3},
				{title: "LCD", type : 'BUG', priority : 2}
			]
		},
		{
			title : 'Potential Stock',
			cards : []
			
		}
	];
	
	$scope.cardClicked = function(item){
		console.log(item);
	};
	
	$scope.cardUpdateCallback = function(item){
		if ($scope.lists[item.prevListIndex].cards) {
			var injectableJson = $scope.lists[item.prevListIndex].cards.splice(item.prevIndex, 1);			
			console.log(injectableJson);
			$scope.lists[item.newListIndex].cards.splice(item.newIndex, 0, injectableJson[0]);			
		}
		
		console.log('Item prevIndex', item.prevIndex + 1);
		console.log('Item newIndex', item.newIndex + 1);
		console.log('Item prevListIndex', item.prevListIndex + 1);
		console.log('Item newListIndex', item.newListIndex + 1);
	};
	
	$scope.cardTypes = {
		BUG : {title : 'Bug fixes', colorCode: '#d00'},
		DONE : {title : 'Successfully Done', colorCode: '#57b408'},
		PENDING : {title : 'Pending task', colorCode: '#f4a408'},
	}
	
	$scope.deleteLists = function(){
		$scope.lists = [];
	};
	
	$scope.createList = function(){
		$scope.lists.push({
			title : $scope.newlistTitle,
			cards : []
		});
	};
	$scope.newCard = {targetlistIndex: 1, title: "", type : "", priority : 999};
	$scope.createCard = function(){
		$scope.lists[$scope.newCard.targetlistIndex - 1].cards.push({
			title : $scope.newCard.title,
			type : $scope.newCard.type,
		});
	};
	
	$scope.getList = function(){
		var index = $scope.editListIndex - 1;
		$scope.editList = $scope.lists[index];
	};
	$scope.editList = {};
	$scope.updateList = function(){
		var targetList 		= $scope.lists[$scope.editListIndex - 1];
		targetList.title 	= $scope.editList.title;
	};
	
	$scope.getCard = function(){
		var listIndex = $scope.editCardTargetlistIndex - 1;
		var cardIndex = $scope.editCardTargetcardIndex - 1;
		$scope.editCard = $scope.lists[listIndex].cards[cardIndex];
	};
	$scope.editCard = {};
	$scope.updateCard = function(){
		var listIndex = $scope.editCardTargetlistIndex - 1;
		var cardIndex = $scope.editCardTargetcardIndex - 1;
		
		var targetCard = $scope.lists[listIndex].cards[cardIndex];
		targetCard.title = $scope.editCard.title;
		targetCard.type = $scope.editCard.type;	
	};
	
})
.directive('clbBoard', function() {
	return {
		restrict: 'E',
		scope: {
			clbLists: '=',
			clbCardTypes: '=',
			onUpdateCallback: '&?onUpdate',
			priorityIndex: '=',
			onCardClickCallback: '&?onCardClick'
		},
		template : '<div class="clb-board">'+
			'<div clb-list data-list-index="{{key}}" ng-repeat="(key, list) in clbLists" class="clb-list"></div>'+	
		'</div>'
	};
}).directive('clbList', function() {
  return {
    restrict: 'A',
	link: function($scope, element, attrs) {
		$( element ).find('.clb-sortable').sortable({
		  placeholder: "clb-board-placeholder",
		  connectWith: ".clb-connected-sortable",
		  start: function(event, ui){
			  var prevListIndex = $(ui.item).parents('[data-list-index]').data('list-index');
			  ui.item.prevListIndex = prevListIndex;
			  ui.item.prevIndex = ui.item.index();
			  var height = $(ui.item).outerHeight();
			  $(".clb-board-placeholder").height(height);
			  $(ui.item).addClass('clb-card-dragging');
		  },
		  stop: function(event, ui){
			  $(ui.item).removeClass('clb-card-dragging');
			  
			  var newListIndex = $(ui.item).parents('[data-list-index]').data('list-index');
			  var newCardIndex 	= ui.item.index();
			  // callback should only be executed if card has been actually updated among connected lists
			  // jquery ui sortable callback has bug, it fires twice the update function 
			  // that is why using stop function
			  if (newCardIndex != ui.item.prevIndex || newListIndex != ui.item.prevListIndex) {
				  ui.item.newListIndex = newListIndex;
				  ui.item.newIndex = newCardIndex;
				  $scope.$apply(function(){
					$scope.onUpdateCallback({item: ui.item});  
				  });
				  
			  }
		  }
		});
		$( element ).disableSelection();
		
		
	},
	
	template: '<div class="clb-list-title">{{list.title}}</div>'+
	'<div class="clb-card-wraper clb-sortable clb-connected-sortable">'+
		'<div clb-card ng-click="onCardClickCallback({card:card})" title="{{card.title}}" ng-repeat="card in list.cards | orderBy:priorityIndex" class="clb-card ui-state-default"></div>'+
	'</div>'
  };
}).directive('clbCard', function() {
  return {
	restrict: 'A',
	template: '<div class="clb-card-label-wrap">'+
		'<div class="clb-card-label" style="background:{{clbCardTypes[card.type].colorCode}}"></div>'+
	'</div>'+
'<div class="clb-card-title">{{card.priority}} - {{card.title}}</div>'
  };
});