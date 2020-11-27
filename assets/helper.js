function showLoginPage() {
    $("#login-form").show()
    $("#logout-button").hide()
    $("#trivia-list").hide()
    $("#gotd-content").hide()
    $("#jokes-content").hide()
    $("#menu-button").hide()
}

function showMainPage() {
    $("#login-form").hide()
    $("#logout-button").show()
    $("#trivia-list").hide()
    $("#gotd-content").hide()
    $("#jokes-content").hide()
    $("#menu-button").show()
}

function showTrivia() {
    $("#login-form").hide()
    $("#logout-button").show()
    $("#trivia-list").show()
    $("#gotd-content").hide()
    $("#jokes-content").hide()
}

function showGotd() {
    $("#login-form").hide()
    $("#logout-button").show()
    $("#trivia-list").hide()
    $("#gotd-content").show()
    $("#jokes-content").hide()
}

function showJokes() {
    $("#login-form").hide()
    $("#logout-button").show()
    $("#trivia-list").hide()
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

function gotd() {
    $("#gotd-content").append(`<div class="media">
    <img src="..." class="mr-3" alt="...">
    <div class="media-body">
        <h5 class="mt-0">Judul Film</h5>
        Description
    </div>
    </div>`)
    fetchIgdbAPI()
    showGotd()
    $("#trivia-list").empty()
    $("#jokes-content").empty()

}

function jokes() {
    $("#jokes-content").empty()
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
            $("#trivia-list").empty()
            $("#gotd-content").empty()
        })
}

function btnAnswer(options, answer) {
    if (options === answer) {
        Swal.fire(
            'Correct!',
            'Good Job Bro!',
            'success'
        )
    } else {
        Swal.fire(
            'Incorrect!',
            'Please try Again!',
            'error'
        )
    }
}

function fetchTrivia() {
    $("#trivia-list").empty()
    $.ajax({
        url: "http://localhost:3000/triviaAPI",
        method: "GET",

    })
    .done(response => {
        showTrivia()
        const random = Math.floor(Math.random() * response.length) 
        while(response[random].type == 'boolean') {
            const random = Math.floor(Math.random() * response.length) 
        }
 
        const temp = [response[random].incorrect_answers[0], response[random].incorrect_answers[1], response[random].incorrect_answers[2], response[random].correct_answer]
        let option1 = Math.floor(Math.random() * temp.length)
        let option2 = Math.floor(Math.random() * temp.length)
        let option3 = Math.floor(Math.random() * temp.length)
        let option4 = Math.floor(Math.random() * temp.length)


        while (option2 === option1) {
            option2 = Math.floor(Math.random() * temp.length)
        }
        while (option3 === option2 || option3 === option1) {
            option3 = Math.floor(Math.random() * temp.length)
        }
        while (option3 === option4 || option4 === option2 || option4 === option1) {
            option4 = Math.floor(Math.random() * temp.length)
        }

            $('#trivia-list').append(`<div class="card">
            <div class="card-header">
              Trivia
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
              <h3>${response[random].question}</h3>
              <div class="text-center mt-5"><div class="btn"><button class="answer btn btn-outline-primary" onclick="btnAnswer('${temp[option1]}', '${temp[3]}')">${temp[option1]}</button></div>
              <div class="btn"><button class="answer btn btn-outline-primary" onclick="btnAnswer('${temp[option2]}', '${temp[3]}')">${temp[option2]}</button></div>
              <div class="btn"><button class="answer btn btn-outline-primary" onclick="btnAnswer('${temp[option3]}', '${temp[3]}')">${temp[option3]}</button></div>
              <div class="btn"><button class="answer btn btn-outline-primary" onclick="btnAnswer('${temp[option4]}', '${temp[3]}')">${temp[option4]}</button></div></div>
              </blockquote>
            </div>
          </div>
            `)


            $("#jokes-content").empty()
            $("#gotd-content").empty()

    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus);
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