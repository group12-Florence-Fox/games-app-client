function showMainPage() {
    $('#login-form').hide()
    $('#main-page').show()
    $('#btn-logout').show()
}

function showLogIn() {
    $('#login-form').show()
    $('#main-page').hide()
    $('#btn-logout').show()
}

function login(){
    const email = $('#email-login').val()
    const password = $('#password-login').val()
    $.ajax({
            url: "http://localhost:3000/login",
            method: "POST",
            data: {
                email,
                password
            }
        })
        .done(response => {
            localStorage.setItem('access_token', response.access_token);
            showMainPage()
        })
        .fail((xhr, textStatus) => {
            console.log(xhr);
        })
        .always(() => {
            $('#email-login').val('')
            $('#password-login').val('')
        })
}

function logout(){
    localStorage.clear()
    showLogIn()
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //   console.log('User signed out.');
    // });
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
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Year</th>
            <th scope="col">Cover url</th>
            <th scope="col">Game url</th>
            </tr>`)
            response.forEach(element => {
                $('#table-body').append(` 
                <tr>
                     <th scope="row">1</th>
                     <td>${element.name}</td>
                     <td>${element.release_dates[0].y}</td>
                     <td>${element.cover ? element.cover.url.slice(2) : 'cek'}</td>
                     <td>${element.url}</td>
                </tr>`);
                 
            });
            // response.forEach((el, i) => {
            //     $('#table-body').append(` <tr>
            //     <th scope="row">${i+1}</th>
            //     <td>${el.name}</td>
            //     <td>${el.release_dates[0].y}</td>
            //     <td>${el.cover.url.slice(2)}</td>
            //     <td>${el.url}</td>
            //      </tr>`);
            // })


            })
        .fail((xhr, textStatus) => {
            console.log(xhr);
        })
}