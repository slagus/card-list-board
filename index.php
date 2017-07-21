<html lang="en" ng-app="clbBoard">
	<head>
		<link rel="stylesheet" href="css/style.css">
		
		<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		
		<script src="../angular/angular.min.js"></script>
		<script src="js/app.js"></script>
		<title>Trello Board</title>
		
		<style>
			.textbox{
				padding:8px 10px;
				border:1px solid #c1c1c1;
				border-radius:2px;
			}
			
			h1,h4{color:#fff;}
			
			.button{
				padding:8.5px 10px;
				border:0px;
				border-radius:2px;
				background:#fc2;
			}
			.select{
				padding:7px 10px;
				border:1px solid #c1c1c1;
				border-radius:2px;
			}
		</style>

	</head>
	<body>
		<div ng-controller="ClbBoardController">
			
			<div style="padding:20px;">
				
				<h1>CARD LIST BOARD</h1>
				<div style="margin-bottom:10px;">
				
					<h4>Add New List</h4>
					<input type="text" class="textbox" placeholder="New List Title" ng-model="newlistTitle"/>
					<button ng-click="createList()" class="button">Create List</button>
					<h4>Add New card</h4>
					<input type="text" class="textbox" placeholder="List Index" ng-model="newCard.targetlistIndex"/>
					<input type="text" class="textbox" placeholder="Card Title" ng-model="newCard.title"/>
					<select type="text" class="select" placeholder="Card Type" ng-model="newCard.type">
						<option value="">Select Type</option>
						<option value="{{key}}" ng-repeat="(key, type) in cardTypes">{{type.title}}</option>
					</select>
					<button ng-click="createCard()" class="button">Create Card</button>
					
					<h4>Edit List</h4>
					<input type="text" class="textbox" placeholder="List Index" ng-change="getList()" ng-model="editListIndex"/>
					<input type="text" class="textbox" placeholder="List Title" ng-model="editList.title"/>
					<button ng-click="updateList()" class="button">Update List</button>
					
					<h4>Edit Card</h4>
					<input type="text" class="textbox" placeholder="List Index" ng-model="editCardTargetlistIndex"/>
					<input type="text" class="textbox" placeholder="Card Index" ng-change="getCard()" ng-model="editCardTargetcardIndex"/>
					<input type="text" class="textbox" placeholder="Card Title" ng-model="editCard.title"/>
					<input type="text" class="textbox" placeholder="Priority" ng-model="editCard.priority"/>
					<select type="text" class="select" placeholder="Card Type" ng-model="editCard.type">
						<option value="">Select Type</option>
						<option value="{{key}}" {{editCard.type == key ? 'selected'}} ng-repeat="(key, type) in cardTypes">{{type.title}}</option>
					</select>
					<button ng-click="updateCard()" class="button">Update Card</button>
					
				
				</div>
				
				
				<button ng-click="deleteLists()" class="button">Delete Lists</button>
				<button ng-click="lists = lists2" class="button">Overwite List</button>
				<button ng-click="cardUpdateCallback()" class="button">Card Update Callback Test</button>
			</div>
			
			<clb-board 
				clb-lists="lists" 
				clb-card-types="cardTypes"
				on-update="cardUpdateCallback(item)"
				on-card-click="cardClicked(card)"
				priority-index="'priority'"
			></clb-board>
		</div>
		
	</body>
</html>