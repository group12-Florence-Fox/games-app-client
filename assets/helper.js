function showLoginPage() {
    $("#login-form").show()
    $("#logout-button").hide()
}

function showMainPage() {
    $("#login-form").hide()
    $("#logout-button").show()
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
        .done(response =>{
            console.log(response.access_token);
            localStorage.setItem('access_token', response.access_token)
            showMainPage()
        })
        .fail((xhr, textStatus)=>{
            console.log(xhr.responseJSON, textStatus);
        })
        .always(_=> {
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


