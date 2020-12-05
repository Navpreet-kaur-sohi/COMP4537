/**
 * taking buttons from frontend
 */

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

/**
 * event listener for signup animation
 */
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

/**
 * listener for sign in animation
 */
signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

/**
 * creating a user
 */
signUpconfirm= () => {
	console.log("in this function")
	const name = $('#SignupName').val();
	const password = $('#SignupPassword').val();
	const email = $('#SignupEmail').val();
	console.log("info",name,password,email);
	const data = {
		username:name,
		password:password,
		email:email
	}


	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	let requestOptions = {
	method: 'POST',
	headers: myHeaders,
	body:JSON.stringify(data),
	redirect: 'follow'
	};
	
	
	//making a fetch req
	fetch("https://agile-tundra-39359.herokuapp.com/api/v1/user/create", requestOptions)
	.then((response) => {
		if (response.status == 409) throw response.json()
		window.location.href = "../views/login.html";
		return response.json()

	})
	.catch(error => error.then(msg => alert(msg.message)));
};

/**
 * signin in user
 */
signInconfirm = () => {
	const name = $('#SigninName').val();
	const password = $('#Signinpassword').val();
	
    const data = {
        username:name,
        password:password,
    }

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
    method: 'POST',
    body:JSON.stringify(data),
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch("https://agile-tundra-39359.herokuapp.com/api/v1/login", requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log("Hello",result);
            localStorage.setItem("token", result.token);
            localStorage.setItem("id", result.id);
			if(localStorage.getItem("token") !== null)
            {
                console.log("IN IF");
				window.location.href = "../views/Profile.html";
				
            }
        })
        .catch(error => console.log('error', error));
};

