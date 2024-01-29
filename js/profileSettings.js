firstName = "";
lastName = "";
email="";
profileImage = "";
userId = "";

document.addEventListener('DOMContentLoaded', function () {
    readCookie();
    // populate profile settings fields
    const fName = document.getElementById("displayFirstName");
    const lName = document.getElementById("displayLastName");
    const eDisplay = document.getElementById("displayEmail");
    const userImg = document.getElementById("displayPicture");
    
    fName.value = firstName;
    lName.value = lastName;
    eDisplay.value = email;
    userImg.src = profileImage;
});

function doUploadPhoto()
{
    // uses something to upload user photo
}

function doUpdateUser() {
    // uses api to update user
}

function doDeleteUser() {
    // uses api to delete user and their contacts
}

// just redirects user to contacts page
function doCancel()
{
    window.location.href = "contacts.html";
}

function readCookie()
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
        else if (tokens[0] == "email")
        {
            email = tokens[1];
        }
	}
	
	if( userId < 0 )
	{
		//window.location.href = "index.html"; UNCOMMENT BEFORE FINISH PROJECT. (force redirect to index if logged out)
	}
}