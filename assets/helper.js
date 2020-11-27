function showLoginPage() {
    $("#login-form").show()
    $("#logout-button").hide()
    $("#trivia-content").hide()
    $("#gotd-content").hide()
    $("#jokes-content").hide()
    $("#menu-button").hide()
}

function showMainPage() {
    $("#login-form").hide()
    $("#logout-button").show()
    $("#trivia-content").hide()
    $("#gotd-content").hide()
    $("#jokes-content").hide()
    $("#menu-button").show()
}

function showTrivia() {
    $("#login-form").hide()
    $("#logout-button").show()
    $("#trivia-content").show()
    $("#gotd-content").hide()
    $("#jokes-content").hide()
}

function showGotd() {
    $("#login-form").hide()
    $("#logout-button").show()
    $("#trivia-content").hide()
    $("#gotd-content").show()
    $("#jokes-content").hide()
}

function showJokes() {
    $("#login-form").hide()
    $("#logout-button").show()
    $("#trivia-content").hide()
    $("#gotd-content").hide()
    $("#jokes-content").show()
}

function login() {
    const email = $("#email-login").val()
    const password = $("#password-login").val()

    $.ajax({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: {
            email,
            password
        }
    })
        .done(response => {
            console.log(response.access_token);
            localStorage.setItem('access_token', response.access_token)
            showMainPage()
        })
        .fail((xhr, textStatus) => {
            console.log(xhr.responseJSON, textStatus);
        })
        .always(_ => {
            $("#email-login").val("")
            $("#password-login").val("")
        })
}

function onSignIn(googleUser) {
    const googleToken = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: 'http://localhost:3000/googlelogin',
        method: 'POST',
        data: {
            googleToken
        }
    })
        .done(response => {
            console.log(response.access_token);
            localStorage.setItem('access_token', response.access_token)
            showMainPage()
        })
        .fail(err => {
            console.log(err);
        })
}

function logout() {
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    showLoginPage()
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function trivia() {
    showTrivia()
    $("#gotd-content").empty()
    $("#jokes-content").empty()

}

function gotd() {
    $("#gotd-content").append(`<div class="media">
    <img src="..." class="mr-3" alt="...">
    <div class="media-body">
        <h5 class="mt-0">Judul Film</h5>
        Description
    </div>
    </div>`)
    showGotd()
    $("#trivia-content").empty()
    $("#jokes-content").empty()

}

function jokes() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/jokesAPI",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(response => {
            let jokes
            if (!response.joke) {
                jokes = '<h1>You arent Lucky :( <br> Try Again!</h1>'
            } else {
                jokes = response.joke
            }
            $("#jokes-content").append(`<div class="card">
            <div class="card-header">
              Jokes
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>${jokes}</p>
                <footer class="blockquote-footer">Someone <cite title="Source Title">Jokes</cite></footer>
              </blockquote>
            </div>
          </div>`)
            showJokes()
            $("#trivia-content").empty()
            $("#gotd-content").empty()
        })
}


