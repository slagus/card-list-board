<html lang="en" ng-app="clbBoard">
	<head>
		<link rel="stylesheet" href="css/style.css">
		
		<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		
		<script src="../angular/angular.min.js"></script>
		<script src="js/app.js"></script>
		<title>Trello Board</title>
		

	</head>
	<body>
		
		<div ng-controller="ClbBoardController">
			<clb-board 
				clb-lists="lists" 
				clb-card-types="cardTypes"
				on-update="cardUpdateCallback(item)"
				priority-index="priority"
			></clb-board>
		</div>
		
	</body>
</html>