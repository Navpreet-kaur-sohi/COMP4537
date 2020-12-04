const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const signUpconfirm = document.getElementById('signupconfirm');
const signInconfirm = document.getElementById('signinconfirm');
const container = document.getElementById('container');
const host = "http://localhost:4000";

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

signUpconfirm.addEventListener('click', () => {
	const name = $('#SignupName').val();
	const password = $('#SignupPassword').val();
	const email = $('#SignupEmail').val();

	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	let requestOptions = {
	method: 'POST',
	headers: myHeaders,
	body: JSON.stringify({"username":name,"password":password,"email":email}),
	redirect: 'follow'
	};

	fetch("http://localhost:4000/api/v1/user/create", requestOptions)
	.then((response) => {
		if (response.status == 409) throw response.json()
		return response.json()
	})
	.then((result) => {
		fetch("http://localhost:4000/api/v1/login", requestOptions)
		.then(response => response.json())
		.then((result) => {
			console.log(result);
			localStorage.setItem("token", result.token);
			window.location.href = "../views/QuizList.html";
		})
		.catch(error => console.log('error', error));
	})
	.catch(error => error.then(msg => alert(msg.message)));
});

signInconfirm.addEventListener('click', () => {
	let name = $('#SigninName').val();
	let password = $('#Signinpassword').val();
	console.log(name, password);
	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	let requestOptions = {
	method: 'POST',
	headers: myHeaders,
	body: JSON.stringify({"username":name,"password":password}),
	redirect: 'follow'
	};
	fetch("http://localhost:4000/api/v1/login", requestOptions)
		.then((response) => {
			if(response.status == 401) throw response.json();
			return response.json()
		})
		.then((result) => {
			console.log(result);
			localStorage.setItem("token", result.token);
			window.location.href = "../views/QuizList.html";
		})
		.catch(error => error.then(msg => alert(msg.message)));
	
});

