$(document).ready(function(){
    if (localStorage.getItem('access_token')) {
        showMainPage()
        fetchIgdbAPI()
    } else {
        showLoginPage()
    }

    $("#login-form").on("submit", function (e) {
        e.preventDefault()
        login()
    });

    $("#logout-button").on("click", function () {
        logout()
    });

    $("#trivia-btn").on("click", function () {
        fetchTrivia()
    });

    $("#gotd-btn").on("click", function () {
        gotd()
    });

    $("#jokes-btn").on("click", function () {
        jokes()
    });
}); 