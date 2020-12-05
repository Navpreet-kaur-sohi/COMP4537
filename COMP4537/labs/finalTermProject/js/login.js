const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
//const signUpconfirm = document.getElementById('signupconfirm');
//const signUpconfirm = $(docu$('#signupconfirm');
// const signInconfirm = document.getElementById('signinconfirm');
const container = document.getElementById('container');
const host = "http://localhost:4000";

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

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
	
	

	fetch("http://localhost:4000/api/v1/user/create", requestOptions)
	.then((response) => {
		if (response.status == 409) throw response.json()
		window.location.href = "../views/login.html";
		return response.json()

	})
	// .then((result) => {
	// 	localStorage.setItem("id", result.id);
	// 	fetch("http://localhost:4000/api/v1/login", requestOptions2)
	// 	.then((result) => {
	// 		console.log(result);
	// 		localStorage.setItem("token", result.token);
	// 	//	window.location.href = "../views/Profile.html";
	// 	})
	// 	.catch(error => console.log('error', error));
	// })

	.catch(error => error.then(msg => alert(msg.message)));
};

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
    fetch("http://localhost:4000/api/v1/login", requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log("Hello",result);
            localStorage.setItem("token", result.token);
            localStorage.setItem("id", result.id);
            //window.location.href = "../views/Profile.html";
        })
        .catch(error => console.log('error', error));
};

