function showLoginPage() {
    $("#login-form").show()
    $("#logout-button").hide()
}

function showMainPage() {
    $("#login-form").hide()
    $("#logout-button").show()
    fetchTrivia()
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
    $.ajax({
        url: "http://localhost:3000/triviaAPI",
        method: "GET",

    })
    .done(response => {

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

            $('#trivia-list').append(`<h1>${response[random].question}</h1>
            <div class="btn"><button class="answer" onclick="btnAnswer('${temp[option1]}', '${temp[3]}')">${temp[option1]}</button></div>
            <div class="btn"><button class="answer" onclick="btnAnswer('${temp[option2]}', '${temp[3]}')">${temp[option2]}</button></div>
            <div class="btn"><button class="answer" onclick="btnAnswer('${temp[option3]}', '${temp[3]}')">${temp[option3]}</button></div>
            <div class="btn"><button class="answer" onclick="btnAnswer('${temp[option4]}', '${temp[3]}')">${temp[option4]}</button></div>`)

    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus);
    })
    
}

