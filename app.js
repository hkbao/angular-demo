var app = angular.module('plunker', []);

app.controller('MainCtrl', ['$scope', 'bookService', function($scope, bookService) {
  $scope.newBook = {id: '', name: ''}
  $scope.add = function(book) {
    bookService.addBook(book)
    $scope.newBook = {id: '', name: ''}
  };
  $scope.update = function(book) {
    bookService.updateBook(book)
  };
  $scope.delete = function(book) {
    bookService.deleteBook(book)
  }
  $scope.books = bookService.getBooks()
  
}]);

app.directive('bookAdd', function() {
  return {
    restrict: 'E',
    template: '<div><input type="text" ng-model="book.name"></input><button ng-click="add(book)" ng-disabled="!book.name">add</button></div>',
    scope: {
      // same as '=customer'
      book: '=',
      add: '&'
    },
    link: function(scope, element, attrs) {
      scope.bookName = ''
      scope.optBook = function() {
        if (scope.opt == 'add') {
          alert('add book' + scope.bookName)
        }
      } 
    }
  };
});


app.directive('bookDisp', function() {
  return {
    restrict: 'E',
    template: '<div><input type="text" ng-if="editMode" ng-model="book.name"></input><span ng-if="!editMode">{{book.name}}</span><button ng-click="editBook()" ng-hide="editMode">edit</button><button ng-click="deleteBook()" ng-hide="editMode">delete</button><button ng-click="updateBook()" ng-show="editMode">update</button></div>',
    scope: {
      // same as '=customer'
      book: '=',
      delete: '&',
      update: '&'
    },
    link: function(scope, element, attrs) {
      editMode = false
      scope.editBook = function() {
        scope.editMode = true
      }
      scope.updateBook = function() {
        scope.editMode = false
      }
      scope.deleteBook = function() {
        scope.delete(scope.book)
      }
    }
  };
});

app.service('bookService', function() {
  var books = [{id: 1, name: 'Book 1'}, {id: 2, name: 'Book 2'}]
  return {
    addBook: function(book) {
      books.push({id: books.length, name: book.name})
    },
    updateBook: function(book) {
      
    },
    deleteBook: function(book) {
      for (var i=0; i<books.length; i++) {
        if (book.id == books[i].id) {
          books.splice(i,1);
          break;
        }
      }
    },
    getBooks: function() {
      return books
    }
  }
})