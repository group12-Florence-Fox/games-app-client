$(document).ready(function(){
    if (localStorage.getItem('access_token')) {
        showMainPage()
        fetchIgdbAPI()
        // fetchJokesAPI()
        // fetchTriviaAPI()
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
}); 
