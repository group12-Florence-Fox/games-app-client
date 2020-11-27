$(document).ready(function(){
    if (localStorage.getItem('access_token')) {
        showMainPage()
        fetchIgdbAPI()
<<<<<<< HEAD
=======
        // fetchJokesAPI()
        // fetchTriviaAPI()
>>>>>>> 4e0a55ee0edf149954913e59efd649fc4c2ca875
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
<<<<<<< HEAD

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
=======
}); 
>>>>>>> 4e0a55ee0edf149954913e59efd649fc4c2ca875
