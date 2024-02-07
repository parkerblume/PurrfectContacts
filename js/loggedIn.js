function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ,lastName= ,userId= ,email= ,img= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}

document.addEventListener('DOMContentLoaded', function () {
    readCookie();
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
                if (currentPage === "" || currentPage === "/index.html") link.classList.add('active');
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
    userDisplay.style.display = 'block';
    homeLink.innerHTML = '<a href="/contacts.html" class="">Contacts</a>'; 

    // add user elements to profile block in navbar
    const user = document.getElementById('userName');
    user.textContent = `   ${firstName} ⮛`;
    document.getElementById("user-picture").src = profileImage;
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
	}
	
	if( userId < 0 )
	{
		//window.location.href = "index.html"; UNCOMMENT BEFORE FINISH PROJECT. (force redirect to index if logged out)
	}
}

function getRandomImage()
{
    let randNum = Math.floor(Math.random() * (11) + 1)
    return "defaultCat" + randNum + ".png";
}

function createTableRow()
{
    var row = document.createElement("tr");

    let image = baseImagePath + getRandomImage();
    let userPhoto = `<td><img src="${image}" /></td>`;

    // all NEW rows will follow this format
    const form = [
        userPhoto,
        '<input type="text" style="width:100%" placeholder="First Name" required>',
        '<input type="text" style="width:100%" placeholder="Last Name" required>',
        '<input type="text" style="width:100%" placeholder="name@email.com" pattern="^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$" required>',
        '<input type="text" style="width:100%" placeholder="XXX-XXX-XXXX" required pattern="^[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4}$">',
        '<button type="button" class="check" onclick=""><ion-icon name="checkmark-outline"></ion-icon></button>'
    ];

    // for each field, we make a td tag, we can probably further set properties
    // such as for the image we may want the width to be smaller,
    // vs the field names, we may want to be larger.
    // We can stylize the columns in the header on the html and maybe apply it here,
    // such as a counter so we know 1 - image, 2 - firstName, etc.
    let counter = 0;
    for (let field of form)
    {
        var item = document.createElement("td");
        switch (counter++)
        {
            // image field
            case 0:
                item.style="width:8%; height:10px; padding:0; padding-left:15px;";
                break;
            // name fields
            case 1:
            case 2:
                item.style="width:20%; height:10px;";
                break;
            // email/phone 
            case 3:
            case 4:
                item.style="width:25%; height:10px;";
                break;
            // button field
            case 5:
                item.style="width:100px; height:50px; padding:0;";
                break;
        }
        item.innerHTML = field;
        row.appendChild(item);
    }

    let check = row.querySelector('button.check');
    let fieldsFilled = false;
    let eventListener = function () {
        let firstName = row.querySelector('input[placeholder="First Name"]');
        let lastName = row.querySelector('input[placeholder="Last Name"]');
        let email = row.querySelector('input[placeholder="name@email.com"]');
        let number = row.querySelector('input[placeholder="XXX-XXX-XXXX"]');

        fieldsFilled = validAddContact(firstName, lastName, number, email);
        if (fieldsFilled) {
            addContact(this);
        }
    }

    check.addEventListener('click', eventListener);


    return row;
}

function addContactForm() 
{
    // this appends a row to the table body, so that way if there is more rows
    // it won't remove them by messing with the innerHTML property.
    var tbody = document.getElementById("tBody");
    var newRow = createTableRow();
    tbody.appendChild(newRow);
}

function changeRowButtons(row)
{
    let td = row.lastElementChild;
    let button = "";

    // if they confirm their changes
    if ((button = document.querySelector('.check') != null))
    {
        let container = document.createElement('div');
        container.style = "display: flex;";
    
        // change check to edit button
        button = document.querySelector('.check');
        button.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
        button.classList.remove('check');
        button.classList.add('table_button');
        button.addEventListener('click', function() { edit_row(row); });
    
        // add delete button
        let delButton = document.createElement('button');
        delButton.classList.add('table_button');
        delButton.innerHTML = '<ion-icon name="trash-outline"></ion-icon>'
        delButton.addEventListener('click', function() { delete_row(row); });
    
        // disable input fields
        row.querySelectorAll('input[required]').forEach(input => {
            input.readOnly = true;
        });
    
        // append it to the td tag with the edit button
        container.appendChild(button);
        container.appendChild(delButton);
    
        td.innerHTML = "";
        td.appendChild(container); 
    }
    else
    {
        // re add check button
        // give check button onlick to be updateContact(this) instead of addContact(this).
    }
}

// Contact Table - CRUD operations
function addContact(button)
{
	// change button from checkmark, to edit/delete icons
    let row = button.parentNode.parentNode; // grabs the specific row
    changeRowButtons(row);

    let firstname = row.querySelector('[placeholder="First Name"]').value;
    let lastname = row.querySelector('[placeholder="Last Name"]').value;
    let phonenumber = row.querySelector('[placeholder="XXX-XXX-XXXX"]').value;
    let emailaddress = row.querySelector('[placeholder="name@email.com"]').value;
    let contactPic = row.querySelector('td:first-child img').getAttribute('src');

    // change input fields back to regular
    row.querySelectorAll('input[required]').forEach(input => {
        if (input.value)
        input.style.borderColor = '';
    });

    if (!validAddContact(firstname, lastname, phonenumber, emailaddress)) {
        console.log("INVALID FIRST NAME, LAST NAME, PHONE, OR EMAIL ENTERED");
        return;
    }
    let tmp = {
        firstName: firstname,
        lastName: lastname,
        phoneNumber: phonenumber,
        emailAddress: emailaddress,
        userId: userId,
        contactImagePath: contactPic
    };

	let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/AddContacts.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) 
			{
                console.log("Contact has been added!");
                // Clear input fields in form 
                document.getElementById("addMe").reset();
                // reload contacts table and switch view to show
                loadContacts();
                showTable();
            }
        };
        xhr.send(jsonPayload);
    } 
	catch (err) 
	{
        console.log(err.message);
    }
	
}

function loadContacts() {
    let tmp = {
        search: "",
        userId: userId
    };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/SearchContacts.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) 
			{
                let jsonObject = JSON.parse(xhr.responseText);
                if (jsonObject.error) {
                    console.log(jsonObject.error);
                    return;
                }
                let text = "<table border='1'>"
                for (let i = 0; i < jsonObject.results.length; i++) {
                    ids[i] = jsonObject.results[i].ID
                    text += "<tr id='row" + i + "'>"
                    text += "<td id='first_Name" + i + "'><span>" + jsonObject.results[i].FirstName + "</span></td>";
                    text += "<td id='last_Name" + i + "'><span>" + jsonObject.results[i].LastName + "</span></td>";
                    text += "<td id='email" + i + "'><span>" + jsonObject.results[i].EmailAddress + "</span></td>";
                    text += "<td id='phone" + i + "'><span>" + jsonObject.results[i].PhoneNumber + "</span></td>";
                    text += "<td>" +
                        "<button type='button' id='edit_button" + i + "' class='w3-button w3-circle w3-lime' onclick='edit_row(" + i + ")'>" + "<span class='glyphicon glyphicon-edit'></span>" + "</button>" +
                        "<button type='button' id='save_button" + i + "' value='Save' class='w3-button w3-circle w3-lime' onclick='save_row(" + i + ")' style='display: none'>" + "<span class='glyphicon glyphicon-saved'></span>" + "</button>" +
                        "<button type='button' onclick='delete_row(" + i + ")' class='w3-button w3-circle w3-amber'>" + "<span class='glyphicon glyphicon-trash'></span> " + "</button>" + "</td>";
                    text += "<tr/>"
                }
                text += "</table>"
                document.getElementById("tbody").innerHTML = text;
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}

function edit_row(id) 
{
    
    document.getElementById("edit_button" + id).style.display = "none";
    document.getElementById("save_button" + id).style.display = "inline-block";

    var firstNameI = document.getElementById("first_Name" + id);
    var lastNameI = document.getElementById("last_Name" + id);
    var email = document.getElementById("email" + id);
    var phone = document.getElementById("phone" + id);

    var namef_data = firstNameI.innerText;
    var namel_data = lastNameI.innerText;
    var email_data = email.innerText;
    var phone_data = phone.innerText;

    firstNameI.innerHTML = "<input type='text' id='namef_text" + id + "' value='" + namef_data + "'>";
    lastNameI.innerHTML = "<input type='text' id='namel_text" + id + "' value='" + namel_data + "'>";
    email.innerHTML = "<input type='text' id='email_text" + id + "' value='" + email_data + "'>";
    phone.innerHTML = "<input type='text' id='phone_text" + id + "' value='" + phone_data + "'>"
}
function save_row(no) {
    var namef_val = document.getElementById("namef_text" + no).value;
    var namel_val = document.getElementById("namel_text" + no).value;
    var email_val = document.getElementById("email_text" + no).value;
    var phone_val = document.getElementById("phone_text" + no).value;
    var id_val = ids[no]

    document.getElementById("first_Name" + no).innerHTML = namef_val;
    document.getElementById("last_Name" + no).innerHTML = namel_val;
    document.getElementById("email" + no).innerHTML = email_val;
    document.getElementById("phone" + no).innerHTML = phone_val;

    document.getElementById("edit_button" + no).style.display = "inline-block";
    document.getElementById("save_button" + no).style.display = "none";

    let tmp = {
        phoneNumber: phone_val,
        emailAddress: email_val,
        newFirstName: namef_val,
        newLastName: namel_val,
        id: id_val
    };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/UpdateContacts.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Contact has been updated");
                loadContacts();
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}

function delete_row(no) 
{
    var namef_val = document.getElementById("first_Name" + no).innerText;
    var namel_val = document.getElementById("last_Name" + no).innerText;
    nameOne = namef_val.substring(0, namef_val.length);
    nameTwo = namel_val.substring(0, namel_val.length);
    let check = confirm('Confirm deletion of contact: ' + nameOne + ' ' + nameTwo);
    if (check === true) 
	{
        document.getElementById("row" + no + "").outerHTML = "";
        let tmp = 
		{
            firstName: nameOne,
            lastName: nameTwo,
            userId: userId
        };

        let jsonPayload = JSON.stringify(tmp);

        let url = urlBase + '/DeleteContacts.' + extension;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            xhr.onreadystatechange = function () 
			{
                if (this.readyState == 4 && this.status == 200) 
				{

                    console.log("Contact has been deleted");
                    loadContacts();
                }
            };
            xhr.send(jsonPayload);
        } 
		catch (err) 
		{
            console.log(err.message);
        }

    };

}

function searchContacts() {
    const content = document.getElementById("searchText");
    const selections = content.value.toUpperCase().split(' ');
    const table = document.getElementById("contacts");
    const tr = table.getElementsByTagName("tr");// Table Row

    for (let i = 0; i < tr.length; i++) {
        const td_fn = tr[i].getElementsByTagName("td")[0];// Table Data: First Name
        const td_ln = tr[i].getElementsByTagName("td")[1];// Table Data: Last Name

        if (td_fn && td_ln) {
            const txtValue_fn = td_fn.textContent || td_fn.innerText;
            const txtValue_ln = td_ln.textContent || td_ln.innerText;
            tr[i].style.display = "none";

            for (selection of selections) {
                if (txtValue_fn.toUpperCase().indexOf(selection) > -1) {
                    tr[i].style.display = "";
                }
                if (txtValue_ln.toUpperCase().indexOf(selection) > -1) {
                    tr[i].style.display = "";
                }
            }
        }
    }
}

function validAddContact(firstName, lastName, phone, email) {

    var fNameErr = lNameErr = phoneErr = emailErr = true;

    if (firstName.value == "") {
        console.log("FIRST NAME IS BLANK");
        firstName.style.borderColor = "red";
    }
    else {
        console.log("first name IS VALID");
        fNameErr = false;
    }

    if (lastName.value == "") {
        console.log("LAST NAME IS BLANK");
        lastName.style.borderColor = "red";
    }
    else {
        console.log("LAST name IS VALID");
        lNameErr = false;
    }

    if (phone.value == "") {
        console.log("PHONE IS BLANK");
        phone.style.borderColor = "red";
    }
    else {
        var regex = /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;

        if (regex.test(phone.value) == false) {
            console.log("PHONE IS NOT VALID");
            phone.style.borderColor = "red";
        }

        else {
            console.log("PHONE IS VALID");
            phoneErr = false;
        }
    }

    if (email.value == "") {
        console.log("EMAIL IS BLANK");
        email.style.borderColor = "red";
    }
    else {
        var regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

        if (regex.test(email.value) == false) {
            console.log("EMAIL IS NOT VALID");
            email.style.borderColor = "red";
        }

        else {

            console.log("EMAIL IS VALID");
            emailErr = false;
        }
    }

    if ((phoneErr || emailErr || fNameErr || lNameErr) == true) {
        return false;

    }

    return true;

}
