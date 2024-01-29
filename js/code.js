const urlBase = 'https://fakewhitepages.com/LAMPAPI';
const extension = 'php';
const baseImagePath = 'https://fakewhitepages.com/images/User%20Images/';

let userId = 0;
let firstName = "";
let lastName = "";
let email = "";
let profileImage = "";

let register = document.getElementById("registerSelect");
let login = document.getElementById("loginSelect");
let slider = document.getElementById("slider");

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
    var hash = md5( password );
	let loginResult = document.getElementById("loginResult");

    if (!validLoginForm(login, password))
    {
        loginResult.innerHTML = "Invalid username or password!";
        return;
    }

	loginResult.innerHTML = "";
	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify(tmp);
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
            console.log(this.readyState);
            console.log(this.responseText);
            console.log(this.status);
            console.log(this.responseType);
            if (this.status === 409)
            {
                loginResult.innerHTML = "User/Password combination incorrect";
                return;
            }
            else if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					loginResult.innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;
                email = jsonObject.email;
                profileImage = jsonObject.profilePicPath;


				saveCookie();

                loginResult.innerHTML = "Login successful!";
				window.location.href = "contacts.html";
			}
            else
            {
                loginResult.innerHTML = "Login failed!";
            }
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		loginResult.innerHTML = err.message;
	}

}

function doRegister() {
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    email = document.getElementById("email").value;

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (!validSignUpForm(firstName, lastName, email, username, password)) {
        document.getElementById("signupResult").innerHTML = "Invalid signup!";
        return;
    }

    var hash = md5(password);

    document.getElementById("signupResult").innerHTML = "";

    // Gather random default profile image
    let imagePath = baseImagePath + getRandomImage();
    let tmp = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: hash,
        profilePicPath: imagePath
    };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/Register.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) {
                return;
            }

            if (this.status == 409) {
                document.getElementById("signupResult").innerHTML = "User already exists";
                return;
            }

            if (this.status == 200) {

                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;
                document.getElementById("signupResult").innerHTML = "User added";
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;
                email = jsonObject.email;
                profileImage = jsonObject.profilePicPath;

                saveCookie();
                window.location.href = "contacts.html";
            }
        };

        xhr.send(jsonPayload);
    } catch (err) {
        document.getElementById("signupResult").innerHTML = err.message;
    }
    // fix this later.
    //showLogin();
}

function getRandomImage()
{
    let randNum = Math.floor(Math.random() * (3) + 1)
    return "defaultCat" + randNum + ".png";
}

function togglePasswordVisibility(check) {
    var input = check === "register" ? document.getElementById("password") : document.getElementById("loginPassword") ;

    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (register && login && slider)
    {
        register.addEventListener("click", () => {
            slider.classList.add("moveslider");
            });    

        login.addEventListener("click", () => {
            slider.classList.remove("moveslider");
        });   
    }

    loginPassword.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            doLogin();
        }
    });

    const navbarContainer = document.getElementById("navbar");
    const xhr = new XMLHttpRequest();

    // grabs current active page to do css stuffs :)
    const currentPage = window.location.pathname;
  
    // loads the navbar onto the current page
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          navbarContainer.innerHTML = xhr.responseText;

          setupNavbar();

          // display active page in navbar
          const navLinks = document.querySelectorAll('.nav-links a');
          navLinks.forEach(link => {
              const href = link.getAttribute('href');
              if (href === "" || href === "/index.html")
              {
                if (currentPage === "/" || currentPage === "/index.html") link.classList.add('active');
              }
              else if (currentPage.endsWith(href)) {
                  link.classList.add('active');
              }
          });

        } else {
          console.error('Failed to load navbar.');
        }
      }
    };
  
    xhr.open('GET', 'navbar.html', true);
    xhr.send();

});

function setupNavbar()
{
    const homeLink = document.getElementById('homeLink');
    const userDisplay = document.getElementById('user-display');
    homeLink.innerHTML = '<a href="/index.html" class="">Home</a>';

    // user logged in
    if (loggedIn())
    {
        userDisplay.style.display = 'block';
        homeLink.innerHTML = '<a href="/contacts.html" class="">Contacts</a>'; 
        // add user elements to profile block in navbar
        const user = document.getElementById('userName');
        user.textContent = `   ${firstName} ⮛`;
        document.getElementById("user-picture").src = profileImage;
    }
    else
    {
        homeLink.innerHTML = '<a href="/index.html" class="">Home</a>';
        userDisplay.style.display = 'none';
    }
}

function showRequiredField()
{
  document.getElementById("requirements").style.display = "contents";
  document.getElementById("requirements").classList.add("fade-in-image");
}
function hideRequiredField()
{
  document.getElementById("requirements").style.display = "none";
  document.getElementById("requirements").classList.remove("fade-in-image");
}

function showSignup()
{
  const loginFields = document.getElementById("loginForm");
  const signUpFields = document.getElementById("signupForm");
  const container = document.getElementById("field-container");
  document.querySelector(".slider").classList.add("moveslider");  
  
  loginFields.style.left = "-500px";
  signUpFields.style.left = "0px";
  container.style.height="570px";
  
}

function showLogin()
{
  const loginFields = document.getElementById("loginForm");
  const signUpFields = document.getElementById("signupForm");
  const container = document.getElementById("field-container");
  document.querySelector(".slider").classList.remove("moveslider");  

  loginFields.style.left = "0px";
  signUpFields.style.left = "500px";
  container.style.height="500px";
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ",email=" + email + ",img=" + profileImage + ";expires=" + date.toGMTString();
}

function loggedIn()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
            loggedIn = true;
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
        else if ( tokens[0] == "img" )
        {
            profileImage = tokens[1];
        }
	}
	
	if( userId < 0)
	{
        return false;
	}
    else
    {
        const currPage = window.location.pathname;
        if (currPage === "/" || currPage === "/index.html") // force redirect if logged in
        {
            window.location.href = "/contacts.html"
        }
        return true;
    }
}


function validLoginForm(logName, logPass) {

    var logNameErr = logPassErr = true;

    if (logName == "") {
        console.log("USERNAME IS BLANK");
    }
    else {
        var regex = /(?=.*[a-zA-Z])[a-zA-Z0-9-_]{3,18}$/;

        if (regex.test(logName) == false) {
            console.log("USERNAME IS NOT VALID");
        }

        else {

            console.log("USERNAME IS VALID");
            logNameErr = false;
        }
    }

    if (logPass == "") {
        console.log("PASSWORD IS BLANK");
        logPassErr = true;
    }
    else {
        var regex = /(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*]).{8,32}/;

        if (regex.test(logPass) == false) {
            console.log("PASSWORD IS NOT VALID");
        }

        else {

            console.log("PASSWORD IS VALID");
            logPassErr = false;
        }
    }

    if ((logNameErr || logPassErr) == true) {
        return false;
    }
    return true;

}

function validSignUpForm(fName, lName, email, user, pass) {

    var fNameErr = lNameErr = emailErr = userErr = passErr = true;

    if (fName == "") {
        console.log("FIRST NAME IS BLANK");
    }
    else {
        console.log("first name IS VALID");
        fNameErr = false;
    }

    if (lName == "") {
        console.log("LAST NAME IS BLANK");
    }
    else {
        console.log("LAST name IS VALID");
        lNameErr = false;
    }

    if (email == "")
    {
        console.log("EMAIL IS BLANK");
    }
    else
    {
        var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!regex.test(email)) 
        {
            console.log("EMAIL IS NOT VALID");
        }
        else
        {
            console.log("EMAIL IS VALID");
            emailErr = false;
        }
    }

    if (user == "") {
        console.log("USERNAME IS BLANK");
    }
    else {
        var regex = /(?=.*[a-zA-Z])([a-zA-Z0-9-_]).{3,18}$/;

        if (regex.test(user) == false) {
            console.log("USERNAME IS NOT VALID");
        }

        else {

            console.log("USERNAME IS VALID");
            userErr = false;
        }
    }

    if (pass == "") {
        console.log("PASSWORD IS BLANK");
    }
    else {
        var regex = /(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*]).{8,32}/;

        if (regex.test(pass) == false) {
            console.log("PASSWORD IS NOT VALID");
        }

        else {

            console.log("PASSWORD IS VALID");
            passErr = false;
        }
    }

    if ((fNameErr || lNameErr || emailErr || userErr || passErr) == true) {
        return false;

    }

    return true;
}