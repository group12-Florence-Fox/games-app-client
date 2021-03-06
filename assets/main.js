$(document).ready(function(){
    if (localStorage.getItem('access_token')) {
        showMainPage()
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
        // fetchIgdbAPI()
    });

    $("#jokes-btn").on("click", function () {
        jokes()
    });
}); 
