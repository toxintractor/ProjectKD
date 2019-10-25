angular.module('KRRclass', [ 'chart.js']).controller('MainCtrl', ['$scope','$http', mainCtrl]);


function mainCtrl($scope, $http){


	$scope.launchMyGreatApp = function(){

		$scope.myDisplayMessage = "Welcome to my great Web Application called: " + $scope.myInputAppName ;
		$scope.mySparqlEndpoint = $scope.myInputEndPoint ;
	$scope.mySparqlQuery = encodeURI($scope.myInputQuery).replace(/#/, '%23');
	
	//own code, automatic fill the query and endpoint.
	//console.log($scope.mySparqlEndpoint + "?query=" + $scope.mySparqlQuery);
	$scope.mySparqlEndpoint = "http://localhost:7200/repositories/repo-VU";
	$myQuery = "SELECT ?teacher (COUNT(?course) AS ?nbr_courses) WHERE { ?teacher <http://example.org/vu/teaches> ?course } GROUP BY (?teacher) ORDER BY DESC(?nbr_courses)";
	$scope.mySparqlQuery = encodeURI($myQuery).replace(/#/, '%23');

	//teacher code
    $http( {
     	method: "GET",
      url : $scope.mySparqlEndpoint + "?query=" + $scope.mySparqlQuery,
			headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
    	} )
    	.success(function(data, status ) {
			$scope.myDynamicLabels = [];
			$scope.myDynamicData = [];

			//own code, get data
			//console.log(data.results.bindings);

			// now iterate on the results
			angular.forEach(data.results.bindings, function(val) {
    		$scope.myDynamicLabels.push(val.teacher.value);
    		$scope.myDynamicData.push(val.nbr_courses.value);
			});
      })
    	.error(function(error ){
    	    console.log('Error '+error);
    	});

	};


	//own code//own code//own code//own code//own code//own code//own code//own code//own code//own code//own code//own code//own code
	$scope.testSparqEndpoint = "http://localhost:7200/repositories/18019";
	$gameQuery =["PREFIX  ex:   <http://www.videorecommender.org#>",
	"SELECT  DISTINCT ?game",
	"WHERE",
	"{ ?game  ex:HasGenre ?genre.",
	"?game ex:DevelopedBy ?Developer.",
	"?game ex:HasMode ?mode.",
	"?game ex:published_by ?publisher.",
	"?game ex:HasGamingplatform ?platform.",
	"?game ex:HasStory ?story.}",
	].join(" ");


	$scope.gameSparqlQuery = encodeURI($gameQuery).replace(/#/, '%23');

	$http( {
		method: "GET",
	 url : $scope.testSparqEndpoint + "?query=" + $scope.gameSparqlQuery,
		   headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
	   } )
	   .success(function(data, status ) {
		   $scope.myGames = [];

			//own code, get data
			//console.log(data.results.bindings);

			angular.forEach(data.results.bindings, function(val) {
    		$scope.myGames.push(val.game.value);
			});
			
			//console.log($scope.myGames);
	 })
	   .error(function(error ){
		   console.log('Error '+error);
	   });


	$scope.getGames = function(){
		console.log('<' + $scope.chosenGame + '>');
		$chosenGameQuery =[ "PREFIX  ex:   <http://www.videorecommender.org#>", 
			"SELECT  *", 
			"WHERE", 
				"{" + '<' + $scope.chosenGame + '>',
				"a                     ex:VideoGame ;",
				"ex:HasGenre           ?genre ;",
				" ex:published_by       ?publisher ;",
				"ex:HasMode            ?mode ;",
				"ex:DevelopedBy        ?developer ;",
				"ex:HasGamingplatform  ?platform",
				"}"				
	].join(" ");

	$scope.chosenGameSparqlQuery = encodeURI($chosenGameQuery).replace(/#/, '%23');
	$scope.gameGenre = [];
	$scope.gamePublisher = [];
	$scope.gameMode = [];
	$scope.gameDeveloper = [];
	$scope.gamePlatform = [];
	console.log($scope.testSparqEndpoint + "?query=" + $scope.chosenGameSparqlQuery);

	$http( {
		method: "GET",
	 url : $scope.testSparqEndpoint + "?query=" + $scope.chosenGameSparqlQuery,
		   headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
	   } )
	   .success(function(data, status ) {
		   

			//own code, get data
			console.log(data.results.bindings);
			angular.forEach(data.results.bindings, function(val) {
				$scope.gameGenre.push(val.genre.value);
				$scope.gamePublisher.push(val.publisher.value);
				$scope.gameMode.push(val.mode.value);
				$scope.gameDeveloper.push(val.developer.value);
				$scope.gamePlatform.push(val.platform.value);
			});

			$scope.gameGenre = Array.from(new Set($scope.gameGenre));
		   	$scope.gamePublisher = Array.from(new Set($scope.gamePublisher));
		   	$scope.gameMode = Array.from(new Set($scope.gameMode));
		   	$scope.gameDeveloper = Array.from(new Set($scope.gameDeveloper));
		   	$scope.gamePlatform = Array.from(new Set($scope.gamePlatform));


			console.log($scope.gameGenre);
			console.log($scope.gamePublisher);
			console.log($scope.gameMode);
			console.log($scope.gameDeveloper);
			console.log($scope.gamePlatform);
			


			$queryhead = ["PREFIX ex: <http://www.videorecommender.org#>",
				"select ?game (COUNT(?genre) as ?genre) (COUNT(?publisher) as ?publisher) (COUNT(?mode) as ?mode) (COUNT(?developer) as ?developer) (COUNT(?platform) as ?platform)",
				"where",
				"{"
			].join(" ");
			
			$queryGenre = [];
			for (i in $scope.gameGenre){
				$queryGenre.push("{?game ex:HasGenre <" + $scope.gameGenre[i] + ">.");
				$queryGenre.push("?game ex:HasGenre ?genre .");
				$queryGenre.push("?genre (owl:sameAs|^owl:sameAs)* <" + $scope.gameGenre[i] + ">.}");
				$queryGenre.push("UNION");
				
			}
			$queryGenre = $queryGenre. join(" ");

			$queryPublisher = [];
			for (i in $scope.gameGenre){
				$queryPublisher.push("{?game ex:published_by <" + $scope.gamePublisher[i] + ">.");
				$queryPublisher.push("?game ex:published_by ?publisher .");
				$queryPublisher.push("?publisher (owl:sameAs|^owl:sameAs)* <" + $scope.gamePublisher[i] + ">.}");
				$queryPublisher.push("UNION");
				
			}
			$queryPublisher = $queryPublisher.join(" ");

			$queryMode = [];
			for (i in $scope.gameMode){
				$queryMode.push("{?game  ex:HasMode <" + $scope.gameMode[i] + ">.");
				$queryMode.push("?game  ex:HasMode ?mode .");
				$queryMode.push("?mode (owl:sameAs|^owl:sameAs)* <" + $scope.gameMode[i] + ">.}");
				$queryMode.push("UNION");
				
			}
			$queryMode = $queryMode.join(" ");

			$queryDeveloper = [];
			for (i in $scope.gameDeveloper){
				$queryDeveloper.push("{?game  ex:DevelopedBy <" + $scope.gameDeveloper[i] + ">.");
				$queryDeveloper.push("?game  ex:DevelopedBy ?developer .");
				$queryDeveloper.push("?developer (owl:sameAs|^owl:sameAs)* <" + $scope.gameDeveloper[i] + ">.}");
				$queryDeveloper.push("UNION");
				
			}
			$queryDeveloper = $queryDeveloper.join(" ");

			$queryPlatform = [];
			for (i in $scope.gamePlatform){
				$queryPlatform.push("{?game  ex:HasGamingplatform <" + $scope.gamePlatform[i] + ">.");
				$queryPlatform.push("?game  ex:HasGamingplatform ?platform .");
				$queryPlatform.push("?platform (owl:sameAs|^owl:sameAs)* <" + $scope.gamePlatform[i] + ">.}");
				$queryPlatform.push("UNION");
				
			}
			$queryPlatform.pop();
			console.log($queryPlatform);
			$queryPlatform = $queryPlatform.join(" ");



			$queryTail = ["} GROUP BY (?game)"].join(" ");;

			$totalQuery = $queryhead + $queryGenre + $queryPublisher + $queryMode + $queryDeveloper + $queryPlatform + $queryTail;
			
			console.log($totalQuery);
			
			$scope.totalGameSparqlQuery = encodeURI($totalQuery).replace(/#/, '%23');

			$http( {
				method: "GET",
			 url : $scope.testSparqEndpoint + "?query=" + $scope.totalGameSparqlQuery,
				   headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
			   } )
			   .success(function(data, status ) {
					$scope.valueGames = []

					//own code, get data
					console.log(data.results.bindings);
					
					angular.forEach(data.results.bindings, function(val) {
						$scope.valueGames.push(
							{name:val.game.value, 
							genre:val.genre.value,
							mode:val.mode.value,
							developer:val.developer.value,
							publisher:val.publisher.value,
							totalscore: (parseInt(val.genre.value) + parseInt(val.mode.value) + parseInt(val.developer.value) + parseInt(val.publisher.value))
							});
					});

					$scope.valueGames.sort((b, a) => parseFloat(a.totalscore) - parseFloat(b.totalscore));
					$scope.valueGames = $scope.valueGames.slice(0,12)

					console.log($scope.valueGames);
			 })
			   .error(function(error ){
				   console.log('Error '+error);
			   });
			

	 })
	   .error(function(error ){
		   console.log('Error '+error);
	   });



	}





	   








	$scope.names = ["hans", "piet", "jan"];

	$scope.dropdownlist = function(){

		$scope.names = ["hans", "piet", "jan"];
	};

}
