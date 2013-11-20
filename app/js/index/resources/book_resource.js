angular.module("index").factory("BookResource", function($q, $resource) {
  return $resource('/books');
});
