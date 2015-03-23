var myApp = angular.module('myApp', []);

var finished = false;

myApp.factory('DataBasket', function () {
    return {};
});

var app = this;

myApp.controller('TipsController', function ($scope, $http, $window) {
    var vm = this;

    vm.start = false;

    vm.movieLockImage = "img/glyphicons-205-unlock.png";
    vm.snackLockImage = "img/glyphicons-205-unlock.png";
    vm.drinkLockImage = "img/glyphicons-205-unlock.png";

    vm.isMovieLocked = false;
    vm.isSnackLocked = false;
    vm.isDrinkLocked = false;

    vm.domain = "http://10.1.3.121:8080/pag.com/api/tips/";

    $window.movie = vm.isMovieLocked;
    $window.snack = vm.isSnackLocked;
    $window.drink = vm.isDrinkLocked;

    vm.changeMovieLock = function () {
        if (vm.isMovieLocked) {
            vm.movieLockImage = "img/glyphicons-205-unlock.png";
            vm.isMovieLocked = false;
            $window.movie = vm.isMovieLocked;
        } else {
            vm.movieLockImage = "img/glyphicons-204-lock.png";
            vm.isMovieLocked = true;
            $window.movie = vm.isMovieLocked;
        }
    };

    vm.changeSnackLock = function () {
        if (vm.isSnackLocked) {
            vm.snackLockImage = "img/glyphicons-205-unlock.png";
            vm.isSnackLocked = false;
            $window.snack = vm.isSnackLocked;
        } else {
            vm.snackLockImage = "img/glyphicons-204-lock.png";
            vm.isSnackLocked = true;
            $window.snack = vm.isSnackLocked;
        }
    };

    vm.changeDrinkLock = function () {
        if (vm.isDrinkLocked) {
            vm.drinkLockImage = "img/glyphicons-205-unlock.png";
            vm.isDrinkLocked = false;
            $window.drink = vm.isDrinkLocked;
        } else {
            vm.drinkLockImage = "img/glyphicons-204-lock.png";
            vm.isDrinkLocked = true;
            $window.drink = vm.isDrinkLocked;
        }
    };

    vm.getMovieInfo = function () {
        $http.get("http://" + vm.movie.links[0].link).success(function (data) {
            vm.actors = data;
        }).error(function (data) {

        });
    };

    vm.getSnackInfo = function () {
        $http.get("http://" + vm.snack.links[0].link).success(function(data) {
            vm.combineSnack = data;
        });
    };

    vm.chooseURL = function () {
        if ((vm.isMovieLocked) && (vm.isSnackLocked) && (vm.isDrinkLocked))
            alert(vm.getGenre());
        else if ((!vm.isMovieLocked) && (vm.isSnackLocked) && (vm.isDrinkLocked))
            vm.getMovie();
        else if ((vm.isMovieLocked) && (!vm.isSnackLocked) && (vm.isDrinkLocked))
            vm.getSnack();
        else if ((vm.isMovieLocked) && (vm.isSnackLocked) && (!vm.isDrinkLocked))
            vm.getDrink();
        else if ((!vm.isMovieLocked) && (!vm.isSnackLocked) && (vm.isDrinkLocked))
            vm.getMovieSnack();
        else if ((!vm.isMovieLocked) && (vm.isSnackLocked) && (!vm.isDrinkLocked))
            vm.getMovieDrink();
        else if ((vm.isMovieLocked) && (!vm.isSnackLocked) && (!vm.isDrinkLocked))
            vm.getSnackDrink();
        else if ((!vm.isMovieLocked) && (!vm.isSnackLocked) && (!vm.isDrinkLocked))
            vm.getMovieSnackDrink();
    };

    vm.getMovie = function () {
        vm.start = false;
        $http.get(vm.domain + "movie").success(function (data) {
            console.log("Har skrivit");
            vm.movie = data.movie;
            stopMachines();
            vm.start = true;
            vm.getMovieInfo();
        });
    };

    vm.getSnack = function () {
        vm.start = false;
        $http.get(vm.domain + "snack?movie_genre=" + vm.getGenre()).success(function (data) {
            console.log("Har skrivit");
            vm.snack = data.snack;
            stopMachines();
            vm.start = true;
            vm.getSnackInfo();
        });
    };

    vm.getGenre = function () {
        var returnStr = "";
        var genres = vm.movie.genres;
        for (var i = 0; i < genres.length; i++) {
            returnStr += genres[i];
            if (i < genres.length - 1)
                returnStr += "+"
        }
        return returnStr;
    };

    vm.getDrink = function () {
        vm.start = false;
        $http.get(vm.domain + "drink?movie_genre=" + vm.getGenre()).success(function (data) {
            console.log("Har skrivit");
            vm.drink = data.drink;
            stopMachines();
            vm.start = true;
        });
    };

    vm.getMovieSnack = function () {
        vm.start = false;
        $http.get(vm.domain + "movie/snack").success(function (data) {
            console.log("Har skrivit");
            vm.movie = data.movie;
            vm.snack = data.snack;
            stopMachines();
            vm.start = true;
            vm.getMovieInfo();
            vm.getSnackInfo();
        });
    };

    vm.getMovieDrink = function () {
        vm.start = false;
        $http.get(vm.domain + "movie/drink").success(function (data) {
            console.log("har skrivit");
            vm.movie = data.movie;
            vm.drink = data.drink;
            stopMachines();
            vm.start = true;
            vm.getMovieInfo();
        }).error(function (data) {
            alert("Error");
        });
    };

    vm.getSnackDrink = function () {
        vm.start = false;
        $http.get(vm.domain + 'snack/drink?movie_genre=' + vm.getGenre()).success(function (data) {
            console.log("har skrivit");
            vm.snack = data.snack;
            vm.drink = data.drink;
            stopMachines();
            vm.start = true;
            vm.getSnackInfo();
        });
    };

    vm.getMovieSnackDrink = function () {
        vm.start = false;
        $http.get(vm.domain + 'movie/snack/drink').success(function (data) {
            console.log("har skrivit");
            vm.movie = data.movie;
            vm.snack = data.snack;
            vm.drink = data.drink;
            stopMachines();
            vm.start = true;
            vm.getMovieInfo();
            vm.getSnackInfo();
        }).error(function (data) {
            alert("Error");
        });
    };
});

var machine1;
var machine2;
var machine3;

var movie;
var snack;
var drink;

function stopMachines() {
    setTimeout(function () {
        machine1.stop();
    }, 300);
    setTimeout(function () {
        machine2.stop();
    }, 600);
    setTimeout(function () {
        machine3.stop();
    }, 900);
}

$("#slot-machine-button").click(function () {
    console.log(movie + " " + snack + " " + drink)
    if (!movie)
        machine1.shuffle();
    if (!snack)
        machine2.shuffle();
    if (!drink)
        machine3.shuffle();
});

$(document).ready(function () {
    machine1 = $("#machine1").slotMachine({
        active: 4,
        delay: 200,
        randomize: function (activeElementIndex) {
            return 6;
        }
    });

    machine2 = $("#machine2").slotMachine({
        active: 5,
        delay: 400,
        randomize: function (activeElementIndex) {
            return 6;
        }
    });

    machine3 = $("#machine3").slotMachine({
        active: 2,
        delay: 600,
        randomize: function (activeElementIndex) {
            return 6;
        }
    });
});
