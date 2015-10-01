angular.module('myApp',[]);

var mainControllerFunc = function($scope, $http, $timeout){
 
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
// http://api.themoviedb.org/3/discover/movie?api_key=06a6a9bf065c2353b58de7eb390814d1&sort_by=popularity.desc
$scope.yearClick = function(){
  $scope.movies = []

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

    for (var i = 1; i < 5; i++) {
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
              $scope.imgUrl = theMovieDb.images_uri + $scope.movies[3].backdrops[1].file_path
              $scope.displayAnswer = $scope.movies[3].original_title
              // console.log($scope.movies)
           }, 1500)
    $scope.yearValue = ''
    $scope.selectedGenre = ''          
  }

$scope.randomClick = function(){

  $scope.answer=false
  $scope.randomMovie = (Math.floor(Math.random()* $scope.movies.length))
  console.log('randomMovie:', $scope.randomMovie)
  console.log('Movies:', $scope.movies)
  console.log($scope.movies[$scope.randomMovie].backdrops)
  $scope.randomImage = (Math.floor(Math.random()* $scope.movies[$scope.randomMovie].backdrops.length))
  // console.log($scope.movies )
  // console.log($scope.randomMovie, ":randomMovie", $scope.randomImage, ":randomImage")
  // console.log($scope.movies[$scope.randomMovie].backdrops[$scope.randomImage])
  $scope.imgUrl = theMovieDb.images_uri + $scope.movies[$scope.randomMovie].backdrops[$scope.randomImage].file_path || theMovieDb.images_uri + $scope.movies[$scope.randomMovie].backdrop_path 

}



$scope.hideAnswer = function (){
  // console.log($scope.movies)
  // console.log($scope.movies[$scope.randomMovie])
  $scope.answer = true
  if ($scope.randomMovie === undefined) {
    $scope.displayAnswer = $scope.movies[3].original_title
  } else{
    $scope.displayAnswer = $scope.movies[$scope.randomMovie].original_title
  };
}



$scope.nextClick = function(){
  // console.log($scope.randomMovie)
  if ($scope.randomMovie === undefined) {
     $scope.randomImage = (Math.floor(Math.random()* $scope.movies[3].backdrops.length))
     $scope.imgUrl = theMovieDb.images_uri + $scope.movies[3].backdrops[$scope.randomImage].file_path || theMovieDb.images_uri + $scope.movies[3].backdrop_path

  } else{
     $scope.randomImage = (Math.floor(Math.random()* $scope.movies[$scope.randomMovie].backdrops.length))
     $scope.imgUrl = theMovieDb.images_uri + $scope.movies[$scope.randomMovie].backdrops[$scope.randomImage].file_path || theMovieDb.images_uri + $scope.movies[$scope.randomMovie].backdrop_path
  }; 
 
  // console.log($scope.randomImage, ":randomImage")
}


}
angular.module('myApp').controller('mainController',['$scope','$http', '$timeout', mainControllerFunc,])