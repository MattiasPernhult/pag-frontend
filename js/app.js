var myApp = angular.module('myApp', []);

myApp.controller('TipsController', function ($scope, $http, $window) {
    var vm = this;

    vm.start = false;

    vm.errorMessage;
    vm.errorStatus;

    vm.snackName = "Snack Kind";
    vm.snackId = 0;

    vm.drinkName = "Drink Kind"
    vm.drinkId = 0;

    vm.showCombine = true;

    vm.movieLockImage = "img/glyphicons-205-unlock.png";
    vm.snackLockImage = "img/glyphicons-205-unlock.png";
    vm.drinkLockImage = "img/glyphicons-205-unlock.png";

    vm.isMovieLocked = false;
    vm.isSnackLocked = false;
    vm.isDrinkLocked = false;

    vm.domain = "http://localhost:8080/pag.com/api/tips/";

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

    vm.chooseURL = function () {
        if ((vm.isMovieLocked) && (vm.isSnackLocked) && (vm.isDrinkLocked))
            alert("You have a match.");
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

    vm.getMovieInfo = function () {
        $http.get("http://" + vm.movie.links[0].link).success(function (data) {
            vm.actors = data;
        }).error(function (data, status) {
            vm.errorMessage = data.message;
            vm.errorStatus = status;
            stopMachines();
            openErrorModal();
        });
    };

    vm.getSnackInfo = function () {
        $http.get("http://" + vm.snack.links[0].link).success(function(data) {
            vm.combineSnack = data;
            if (data.message === "The given snack doesn't have any combined snacks.") {
                vm.showCombine = false;
            }
        }).error(function (data, status) {
            vm.errorMessage = data.message;
            vm.errorStatus = status;
            stopMachines();
            openErrorModal();
        });
    };

    vm.getMovie = function () {
        vm.start = false;
        $http.get(vm.domain + "movie").success(function (data) {
            console.log("Har skrivit");
            vm.movie = data.movie;
            stopMachines();
            vm.start = true;
            vm.getMovieInfo();
        }).error(function (data, status) {
            vm.errorMessage = data.message;
            vm.errorStatus = status;
            stopMachines();
            openErrorModal();
        });
    };

    vm.getSnack = function () {
        vm.start = false;
        vm.showCombine = true;
        $http.get(vm.domain + "snack?movie_genre=" + vm.getGenre() + "&" + "kind=" + vm.snackId).success(function (data) {
            console.log("Har skrivit");
            vm.snack = data.snack;
            stopMachines();
            vm.start = true;
            vm.getSnackInfo();
        }).error(function (data, status) {
            vm.errorMessage = data.message;
            vm.errorStatus = status;
            stopMachines();
            openErrorModal();
        });
    };

    vm.getDrink = function () {
        vm.start = false;
        $http.get(vm.domain + "drink?movie_genre=" + vm.getGenre()  + "&drink=" + vm.drinkId).success(function (data) {
            console.log("Har skrivit");
            vm.drink = data.drink;
            stopMachines();
            vm.start = true;
        }).error(function(data, status) {
            vm.errorMessage = data.message;
            vm.errorStatus = status;
            stopMachines();
            openErrorModal();
        });
    };

    vm.getMovieSnack = function () {
        vm.start = false;
        vm.showCombine = true;
        $http.get(vm.domain + "movie/snack" + "?" + "kind=" + vm.snackId).success(function (data) {
            console.log("Har skrivit");
            vm.movie = data.movie;
            vm.snack = data.snack;
            stopMachines();
            vm.start = true;
            vm.getMovieInfo();
            vm.getSnackInfo();
        }).error(function(data, status) {
            vm.errorMessage = data.message;
            vm.errorStatus = status;
            stopMachines();
            openErrorModal();
        });
    };

    vm.getMovieDrink = function () {
        vm.start = false;
        $http.get(vm.domain + "movie/drink"  + "?drink=" + vm.drinkId).success(function (data) {
            console.log("har skrivit");
            vm.movie = data.movie;
            vm.drink = data.drink;
            stopMachines();
            vm.start = true;
            vm.getMovieInfo();
        }).error(function (data, status) {
            vm.errorMessage = data.message;
            vm.errorStatus = status;
            stopMachines();
            openErrorModal();
        });
    };

    vm.getSnackDrink = function () {
        vm.start = false;
        vm.showCombine = true;
        $http.get(vm.domain + 'snack/drink?movie_genre=' + vm.getGenre()  + "&" + "kind=" + vm.snackId  + "&drink=" + vm.drinkId).success(function (data) {
            console.log("har skrivit");
            vm.snack = data.snack;
            vm.drink = data.drink;
            stopMachines();
            vm.start = true;
            vm.getSnackInfo();
        }).error(function(data, status) {
            vm.errorMessage = data.message;
            vm.errorStatus = status;
            stopMachines();
            openErrorModal();
        });
    };

    vm.getMovieSnackDrink = function () {
        vm.start = false;
        vm.showCombine = true;
        $http.get(vm.domain + 'movie/snack/drink'  + "?" + "kind=" + vm.snackId + "&drink=" + vm.drinkId).success(function (data) {
            console.log("har skrivit");
            vm.movie = data.movie;
            vm.snack = data.snack;
            vm.drink = data.drink;
            stopMachines();
            vm.start = true;
            vm.getMovieInfo();
            vm.getSnackInfo();
        }).error(function (data, status) {
            vm.errorMessage = data.message;
            vm.errorStatus = status;
            stopMachines();
            openErrorModal();
        });
    };

    vm.changeSnackKind = function(snackId, snackName) {
        vm.snackName = snackName;
        vm.snackId = snackId;
    };

    vm.changeDrinkKind = function(drinkId, drinkName) {
        vm.drinkName = drinkName;
        vm.drinkId = drinkId;
    };

});

var machine1;
var machine2;
var machine3;

var movie;
var snack;
var drink;

function openErrorModal() {
    $('#errorModal').modal('show');
}

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
