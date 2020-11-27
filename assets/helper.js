function showMainPage() {
    $('#login-form').hide()
    $('#main-page').show()
    $('#logout-button').show()
}

function showLoginPage() {
    $('#login-form').show()
    $('#main-page').hide()
    $('#logout-button').show()
}

function fetchJokesAPI() {
    // $('#').empty()
    $.ajax({
            url: 'http://localhost:3000/jokesAPI',
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(response => {
            console.log(response);
            })
        .fail((xhr, textStatus) => {
            console.log(xhr);
        })
}

function fetchTriviaAPI() {
    // $('#').empty()
    $.ajax({
            url: 'http://localhost:3000/triviaAPI',
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(response => {
            console.log(response);
            })
        .fail((xhr, textStatus) => {
            console.log(xhr);
        })
}

function fetchIgdbAPI() {
    // $('#main-page').empty()
    console.log('tes');
    $.ajax({
            url: 'http://localhost:3000/igdbAPI',
            method: 'POST',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(response => {
            console.log(response);
            $('#table-head').append(` 
            <tr>
            <th scope="col" class="text-center">#</th>
            <th scope="col" class="text-center">Name</th>
            <th scope="col" class="text-center"> Released Year</th>
            <th scope="col" class="text-center">Cover</th>
            <th scope="col" class="text-center">Details</th>
            </tr>`)
            response.forEach((element, i) => {
                $('#table-body').append(` 
                <tr>
                     <th scope="row" class="text-center">${i+1}</th>
                     <td>${element.name}</td>
                     <td class="text-center">${element.release_dates ? element.release_dates[0].y: '-'}</td>
                     <td><img src="https://${element.cover ? element.cover.url.slice(2) : '-'}" alt="${element.name}" border=3 height=60 width=60></img></td>
                     <td class="text-center"><a href="${element.url}" class="btn btn-outline-primary" role="button" aria-pressed="true" target="_blank">Visit Game</a></td>
                </tr>`)
                 
            });
            })
        .fail((xhr, textStatus) => {
            console.log(xhr);
        })
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
            // console.log(response.access_token);
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
            // console.log(response.access_token);
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


