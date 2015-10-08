angular.module('myApp',[]);

var mainControllerFunc = function($scope, $http, $timeout){
 $scope.disableStart = false;
 $scope.replayBox = true
 $scope.loadingBox = false
 $scope.scoresArray = []
 $scope.introBox = true
 $scope.score = 0
 $scope.answerArray = []
 $scope.userResponse = ''
  // $scope.movies = []
  $scope.genres = []
  var theMovieDb ={}
  theMovieDb = {
    api_key: "?api_key=06a6a9bf065c2353b58de7eb390814d1",
    base_uri: "http://api.themoviedb.org/3/",
    images_uri: "http://image.tmdb.org/t/p/w780",
    discover: "discover/movie",
    with_genres: "&with_genres=",
    release_year: "&language=en&primary_release_year="
}

// console.log(theMovieDb.base_uri + 'genre/movie/list' + theMovieDb.api_key)
$http.get(theMovieDb.base_uri + 'genre/movie/list' + theMovieDb.api_key).success(function(response){
  // console.log(response.genres)
  $scope.genres = response.genres 
  // console.log($scope.genres)
})

  $scope.hideNext = true


$scope.data = { 
           value: 35,
           laps: []
       }

// http://api.themoviedb.org/3/discover/movie?api_key=06a6a9bf065c2353b58de7eb390814d1&sort_by=popularity.desc
$scope.yearClick = function(){
  $scope.loadingBox = true
  $scope.disableStart = true
  // console.log($scope.date)
  $scope.data.value = 35
  $scope.movies = []
  $scope.answerArray = []
  $scope.hideNext = false
  theMovieDb.base_uri + theMovieDb.discover + theMovieDb.api_key + theMovieDb.release_year
  var queryYear = ''
  queryYear = theMovieDb.base_uri + theMovieDb.discover + theMovieDb.api_key + theMovieDb.release_year + $scope.yearValue
  queryGenre = theMovieDb.base_uri + theMovieDb.discover + theMovieDb.api_key + theMovieDb.with_genres + $scope.selectedGenre 
  // console.log(queryGenre)
  // console.log(queryYear)

    var getMovieData = function(index, cb){
      // console.log(index)
      var queryDetails = theMovieDb.base_uri + 'movie/' + $scope.movies[index].id +  theMovieDb.api_key
      $http.get(queryDetails).success(function(response){
        $scope.movies[index].details = response
        cb(index)
      })
    }

    var getImageData = function(index, cb){
      // console.log(index)
      var queryDetails = theMovieDb.base_uri + 'movie/' + $scope.movies[index].id + '/images' +theMovieDb.api_key
      $http.get(queryDetails).success(function(response){
        $scope.movies[index].backdrops = response.backdrops || []
        cb()
      })
    }
    
    // for (var i = 0; i < response2.results.length; i++) {
    //   $scope.movies.push(response2.results[i])
    // };

    for (var i = 1; i < 2; i++) {
        var pageNumber = '&page='+i
        // console.log(pageNumber)
        // console.log(queryYear)
        var movieQuery = ''
        if ($scope.yearValue) {
          movieQuery = queryYear
        } else{
          movieQuery = queryGenre
        };
        $http.get(movieQuery+pageNumber).success(function(response){ 
        if ($scope.movies === undefined) {
          $scope.movies = response.results
        } else{
          for (var i = 0; i < response.results.length; i++) {
            $scope.movies.push(response.results[i])
          };

        };
        
        // console.log($scope.movies)
        for (var b = 0; b < $scope.movies.length; b++) {
          getMovieData(b, function(index){
            getImageData(index, function(){

            })
          })    
      };
    })
    };


            $timeout( function(){
              if ($scope.movies[3].backdrops) {
                $scope.imgUrl = theMovieDb.images_uri + $scope.movies[3].backdrops[1].file_path
                $scope.displayAnswer = $scope.movies[3].details.original_title
              } else{
                $scope.imgUrl = theMovieDb.images_uri + $scope.movies[$scope.randomMovie].backdrop_path
                $scope.displayAnswer = $scope.movies[3].details.original_title
              };
              // $scope.imgUrl = theMovieDb.images_uri + $scope.movies[3].backdrops[1].file_path
              // $scope.displayAnswer = $scope.movies[3].original_title
              console.log($scope.movies)
              for (var i = 5; i > $scope.answerArray.length; i--) {
                var movieAnswerChoice = $scope.movies[(Math.floor(Math.random()* $scope.movies.length))].details.original_title
                console.log("answermoviechoic:", movieAnswerChoice)
                console.log("displayAnswer:", $scope.displayAnswer)
                if (movieAnswerChoice == $scope.displayAnswer) {
                  movieAnswerChoice = $scope.movies[(Math.floor(Math.random()* $scope.movies.length))].details.original_title
                }

                $scope.answerArray.push(movieAnswerChoice)  


              };
              // $scope.answerArray.push( $scope.movies[(Math.floor(Math.random()* $scope.movies.length))].details.original_title )  
              // $scope.answerArray.push( $scope.movies[(Math.floor(Math.random()* $scope.movies.length))] )  
              // $scope.answerArray.push( $scope.movies[(Math.floor(Math.random()* $scope.movies.length))] )
              // $scope.answerArray.push( $scope.movies[(Math.floor(Math.random()* $scope.movies.length))] ) 
              $scope.answerArray.push( $scope.movies[3].details.original_title )  
              shuffle($scope.answerArray)
              console.log( $scope.answerArray)

           }, 6200)

    $scope.yearValue = ''
    $scope.selectedGenre = ''

    $timeout(function() {
      $scope.start();
      $scope.loadingBox = false
    }, 6000);
  
  }

$scope.randomClick = function(){
  $scope.disableSubmit = false;
  $scope.displayResult = ''
  $scope.userResponse = ''
  $scope.answer=false
  $scope.randomMovie = (Math.floor(Math.random()* $scope.movies.length))
  $scope.displayAnswer = $scope.movies[$scope.randomMovie].details.original_title
  $scope.answerArray = []

  for (var i = 6; i > $scope.answerArray.length; i--) {
    var movieAnswerChoice = $scope.movies[(Math.floor(Math.random()* $scope.movies.length))].details.original_title
    console.log("answermoviechoic:", movieAnswerChoice)
    console.log("displayAnswer:", $scope.displayAnswer)
    if (movieAnswerChoice == $scope.displayAnswer) {
      movieAnswerChoice = $scope.movies[(Math.floor(Math.random()* $scope.movies.length))].details.original_title
    }

    $scope.answerArray.push(movieAnswerChoice)  


  };
  // $scope.answerArray.push( $scope.movies[(Math.floor(Math.random()* $scope.movies.length))].details.original_title )  
  // $scope.answerArray.push( $scope.movies[(Math.floor(Math.random()* $scope.movies.length))] )  
  // $scope.answerArray.push( $scope.movies[(Math.floor(Math.random()* $scope.movies.length))] )
  // $scope.answerArray.push( $scope.movies[(Math.floor(Math.random()* $scope.movies.length))] ) 
  $scope.answerArray.push( $scope.movies[$scope.randomMovie].details.original_title )  
  shuffle($scope.answerArray)
  console.log( $scope.answerArray)


  // $scope.answerArray.push( $scope.movies[(Math.floor(Math.random()* $scope.movies.length))] )  
  // $scope.answerArray.push( $scope.movies[(Math.floor(Math.random()* $scope.movies.length))] )  
  // $scope.answerArray.push( $scope.movies[(Math.floor(Math.random()* $scope.movies.length))] ) 
  // $scope.answerArray.push( $scope.movies[(Math.floor(Math.random()* $scope.movies.length))] ) 
  // console.log($scope.movies[$scope.randomMovie])
  // $scope.answerArray.push( $scope.movies[$scope.randomMovie])
  // shuffle($scope.answerArray)
  // console.log($scope.answerArray)
  // console.log('randomMovie:', $scope.randomMovie)
  // console.log('Movies:', $scope.movies)
  // console.log($scope.movies[$scope.randomMovie].backdrops)
  // console.log($scope.movies[$scope.randomMovie].backdrop_path)
  console.log($scope.randomMovie, ":randomMovie", $scope.randomImage, ":randomImage")
  console.log($scope.movies)

  if ($scope.movies[$scope.randomMovie].backdrops && $scope.movies[$scope.randomMovie].backdrops.length > 1) {

    $scope.randomImage = Math.floor(Math.random()* $scope.movies[$scope.randomMovie].backdrops.length)

  } else{
    console.log($scope.movies[$scope.randomMovie].backdrop_path)
    if ($scope.movies[$scope.randomMovie].backdrop_path) {

      $scope.imgUrl = theMovieDb.images_uri + $scope.movies[$scope.randomMovie].backdrop_path

    } else{

      $scope.imgUrl = 'http://placekitten.com/780/400'
      
    };

    

  };
  // $scope.randomImage = (Math.floor(Math.random()* $scope.movies[$scope.randomMovie].backdrops.length)) || theMovieDb.images_uri + $scope.movies[$scope.randomMovie].backdrop_path
  // console.log($scope.movies )
  // console.log($scope.movies[$scope.randomMovie].backdrops[$scope.randomImage])
  if ($scope.movies[$scope.randomMovie].backdrops && $scope.movies[$scope.randomMovie].backdrops[$scope.randomImage]) {
    $scope.imgUrl = (theMovieDb.images_uri + $scope.movies[$scope.randomMovie].backdrops[$scope.randomImage].file_path)
  } else{
    if ($scope.movies[$scope.randomMovie].backdrop_path) {
      $scope.imgUrl = (theMovieDb.images_uri + $scope.movies[$scope.randomMovie].backdrop_path)
    } else{
       
      $scope.imgUrl = 'http://placekitten.com/780/400'
    };
    
  };

}



$scope.hideAnswer = function (){
  // console.log($scope.movies)
  // console.log($scope.movies[$scope.randomMovie])
  $scope.answer = true
  // if ($scope.randomMovie === undefined) {
  //   $scope.displayAnswer = $scope.movies[3].original_title
  // } else{
  //   $scope.displayAnswer = $scope.movies[$scope.randomMovie].original_title
  // };
}



$scope.nextClick = function(){
  // console.log($scope.randomMovie)

  if ($scope.randomMovie === undefined) {
     $scope.randomImage = (Math.floor(Math.random()* $scope.movies[3].backdrops.length)) 
     $scope.imgUrl = theMovieDb.images_uri + $scope.movies[3].backdrops[$scope.randomImage].file_path || theMovieDb.images_uri + $scope.movies[3].backdrop_path

  } else{
    console.log($scope.movies)

     if ($scope.movies[$scope.randomMovie].backdrops && $scope.movies[$scope.randomMovie].backdrops.length > 1) {

     $scope.randomImage = (Math.floor(Math.random()* $scope.movies[$scope.randomMovie].backdrops.length))
     console.log($scope.randomMovie, $scope.randomImage)
     $scope.imgUrl = theMovieDb.images_uri + $scope.movies[$scope.randomMovie].backdrops[$scope.randomImage].file_path


     } else{
      console.log($scope.movies[$scope.randomMovie].backdrop_path)
      if ($scope.movies[$scope.randomMovie].backdrop_path) {
        $scope.imgUrl = theMovieDb.images_uri + $scope.movies[$scope.randomMovie].backdrop_path
      } else{
        $scope.imgUrl = 'http://placekitten.com/780/400'
      };

      
     };
     // $scope.randomImage = (Math.floor(Math.random()* $scope.movies[$scope.randomMovie].backdrops.length))
     // $scope.imgUrl = theMovieDb.images_uri + $scope.movies[$scope.randomMovie].backdrops[$scope.randomImage].file_path || theMovieDb.images_uri + $scope.movies[$scope.randomMovie].backdrop_path
  }; 
 
  // console.log($scope.randomImage, ":randomImage")
}

$scope.clickSubmit = function (){
  // console.log($scope.multipleChoiceAnswer)
    $scope.disableSubmit = true;
    if ($scope.multipleChoiceAnswer === $scope.displayAnswer) {
      $scope.displayResult = 'Correct'
      $scope.score++
      $scope.randomClick();
      $scope.disableSubmit = false;
      // $scope.randomClick();
    } else{
      $scope.displayResult = 'Incorrect'
      $scope.disableSubmit = false;
    }

}

$scope.multipleChoiceAnswer = ""

// $scope.counter = 45;
//    $scope.onTimeout = function(){
//        $scope.counter--;
//        mytimeout = $timeout($scope.onTimeout,1000);
//        if($scope.counter === 0) {
//           $timeout.cancel(mytimeout)
//    }
//    }
//    var mytimeout = $timeout($scope.onTimeout,1000);
   
//    $scope.stop = function(){
//        $timeout.cancel(mytimeout);
//    }

// $scope.data = { 
//            value: 60,
//            laps: []
//        },
       stopwatch = null;
       
   $scope.start = function () {;
       stopwatch = $timeout(function() {
           $scope.data.value--;
           $scope.start();
           if($scope.data.value === 0){
               $scope.stop()
               $scope.scoresArray.push($scope.score)
               $scope.replayBox = false
           }
       }, 1000);
   };

   $scope.stop = function () {
       $timeout.cancel(stopwatch);
       stopwatch = null;
   };

   $scope.reset = function () {
       $scope.stop()
       $scope.data.value = 60;
       $scope.data.laps = [];
   };

   $scope.lap = function () {
       $scope.data.laps.push($scope.data.value);
   };

   // return {
   //     data: $scope.data,
   //     start: $scope.start,
   //     stop: $scope.stop,
   //     reset: $scope.reset,
   //     lap: $scope.lap
   // };
$scope.exitInfoBox = function(){
  $scope.introBox = false
}

$scope.hideReplay = function(){
  $scope.replayBox = true
  $scope.score = 0
  $scope.disableStart = false
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


}
angular.module('myApp').controller('mainController',['$scope','$http', '$timeout', mainControllerFunc,])