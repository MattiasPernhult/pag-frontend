var myApp = angular.module('myApp', []);

var finished = true;

myApp.factory('DataBasket', function () {
    return {};
});

myApp.controller('TipsController', function ($http, $window) {
    var vm = this;

    vm.movieLockImage = "img/glyphicons-205-unlock.png";
    vm.snackLockImage = "img/glyphicons-205-unlock.png";
    vm.drinkLockImage = "img/glyphicons-205-unlock.png";

    vm.isMovieLocked = false;
    vm.isSnackLocked = false;
    vm.isDrinkLocked = false;

    vm.domain = "http://192.168.0.16:8080/pag.com/api/tips/";

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
        $http.get("http://192.168.0.16:8080/pag.com/api/movies/" + vm.movie.id + "/actors").success(function (data) {
            vm.actors = data;
        }).error(function (data) {
            alert("ERROR");
        });
    };

    vm.getSnackInfo = function () {
        $http.get("http://192.168.0.16:8080/snacks.com/api/snacks/combine?id=" + vm.snack.id).success(function(data) {
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
        $http.get(vm.domain + "movie").success(function (data) {
            console.log("Har skrivit");
            vm.movie = data.movie;
            stopMachines();
        });
    };

    vm.getSnack = function () {
        $http.get(vm.domain + "snack?movie_genre=" + vm.getGenre()).success(function (data) {
            console.log("Har skrivit");
            vm.snack = data.snack;
            stopMachines();
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
        $http.get(vm.domain + "drink?movie_genre=" + vm.getGenre()).success(function (data) {
            console.log("Har skrivit");
            vm.drink = data.drink;
            stopMachines();
        });
    };

    vm.getMovieSnack = function () {
        $http.get(vm.domain + "movie/snack").success(function (data) {
            console.log("Har skrivit");
            vm.movie = data.movie;
            vm.snack = data.snack;
            stopMachines();
        });
    };

    vm.getMovieDrink = function () {
        $http.get(vm.domain + "movie/drink").success(function (data) {
            console.log("har skrivit");
            vm.movie = data.movie;
            vm.drink = data.drink;
            stopMachines();
        }).error(function (data) {
            alert("Error");
        });
    };

    vm.getSnackDrink = function () {
        $http.get(vm.domain + 'snack/drink?movie_genre=' + vm.getGenre()).success(function (data) {
            console.log("har skrivit");
            vm.snack = data.snack;
            vm.drink = data.drink;
            stopMachines();
        });
    };

    vm.getMovieSnackDrink = function () {
        $http.get(vm.domain + 'movie/snack/drink').success(function (data) {
            console.log("har skrivit");
            vm.movie = data.movie;
            vm.snack = data.snack;
            vm.drink = data.drink;
            stopMachines();
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
        randomize: function (activeElementIndex) {
            return 6;
        }
    });

    machine2 = $("#machine2").slotMachine({
        active: 5,
        delay: 500,
        randomize: function (activeElementIndex) {
            return 6;
        }
    });

    machine3 = $("#machine3").slotMachine({
        active: 2,
        delay: 500,
        randomize: function (activeElementIndex) {
            return 6;
        }
    });
});
