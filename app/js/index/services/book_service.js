angular.module("index").factory("BookService", function($q, $http) {

  var getBooks = function() {
    return $http.get('/books');
  };

  return { getBooks: getBooks };
});
