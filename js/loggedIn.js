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
    user.textContent = `${firstName} ⮛`;
    document.getElementById("user-picture").src = profileImage;
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(let i = 0; i < splits.length; i++) 
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

function createTableRow(jsonObject)
{

    let form = [];
    let row = document.createElement("tr");
    if (jsonObject != null)
    {
        let userPhoto = `<td><img src="${jsonObject.ContactImagePath}"></img></td>`;
        let name = jsonObject.Name.split(" ");

        let firstNameItem = `<input type="text" style="width:100%" value="${name[0]}" required>`;
        let lastNameItem = `<input type="text" style="width:100%" value="${name[1]}" required>`;
        let emailItem = `<input type="text" style="width:100%" value="${jsonObject.Email}" pattern="^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$" required>`;
        let phoneItem = `<input type="text" style="width:100%" value="${jsonObject.Phone}" required pattern="^[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4}$">`;

        form = [
            userPhoto,
            firstNameItem,
            lastNameItem,
            emailItem,
            phoneItem,
        ];

    }
    else
    {
        let image = baseImagePath + getRandomImage();
        let userPhoto = `<td><img src="${image}"></img></td>`;

        // all NEW rows will follow this format
        form = [
            userPhoto,
            '<input type="text" style="width:100%" placeholder="First Name" required>',
            '<input type="text" style="width:100%" placeholder="Last Name" required>',
            '<input type="text" style="width:100%" placeholder="name@email.com" pattern="^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$" required>',
            '<input type="text" style="width:100%" placeholder="XXX-XXX-XXXX" required pattern="^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$">',
            '<button type="button" class="check" onclick=""><ion-icon name="checkmark-outline"></ion-icon></button>'
        ];
    }

    // for each field, we make a td tag, and set styling properties
    let counter = 0;
    for (let field of form)
    {
        let item = document.createElement("td");
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

    if (jsonObject != null)
    {
        // add edit/delete buttons
        let td = document.createElement("td");
        let container = document.createElement('div');
        container.style = "display: flex;";
    
        // change check to edit button
        button = document.createElement('button');
        button.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
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

        td.appendChild(container); 
        td.style = "width:100px; height:50px; padding:0;";
        row.setAttribute("data-contact-id", jsonObject.ContactID); // allows us to pull contact ID later when edits are made.
    }
    else
    {
        // event listener for adding check button to properly allow a contact to be added.
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
    }


    return row;
}

function addContactForm() 
{
    // this appends a row to the table body, so that way if there is more rows
    // it won't remove them by messing with the innerHTML property.
    let tbody = document.getElementById("tBody");
    let newRow = createTableRow(null);
    tbody.appendChild(newRow);
}

function changeRowButtons(row)
{
    let td = row.lastElementChild;
    let button = "";

    // if they confirm their changes
    if ((document.querySelector('.check')) != null)
    {
        let container = document.createElement('div');
        container.style = "display: flex;";
    
        // change check to edit button
        button = document.createElement('button');
        button.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
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
        // remove edit/delete buttons
        td.innerHTML = "";

        button = document.createElement('button');
        button.classList.add('check');
        button.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon>';

        // re-add event listener but instead use updateContact()
        let fieldsFilled = false;
        let eventListener = function () {
            let firstName = row.querySelector('input[placeholder="First Name"]');
            let lastName = row.querySelector('input[placeholder="Last Name"]');
            let email = row.querySelector('input[placeholder="name@email.com"]');
            let number = row.querySelector('input[placeholder="XXX-XXX-XXXX"]');
    
            fieldsFilled = validAddContact(firstName, lastName, number, email);
            if (fieldsFilled) {
                updateContact(this);
            }
        }
        
        button.addEventListener('click', eventListener);
        td.appendChild(button);
    }
}

// Contact Table - CRUD operations
function addContact(button)
{
	// change button from checkmark, to edit/delete icons
    let row = button.parentNode.parentNode; // grabs the specific row

    let firstname = row.querySelector('[placeholder="First Name"]').value;
    let lastname = row.querySelector('[placeholder="Last Name"]').value;

    let name = firstname + " " + lastname;
    let phonenumber = row.querySelector('[placeholder="XXX-XXX-XXXX"]').value;
    let emailaddress = row.querySelector('[placeholder="name@email.com"]').value;
    let contactPic = row.querySelector('td:first-child img').getAttribute('src');

    // check button checks for validity through the event listener, so no need to do it here again.

    // change input fields back to regular
    row.querySelectorAll('input[required]').forEach(input => {
        if (input.value)
        input.style.borderColor = '';
    });

    changeRowButtons(row);

    let tmp = {
        name: name,
        phoneNumber: phonenumber,
        emailAddress: emailaddress,
        userId: userId,
        contactImagePath: contactPic
    };

	let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/AddContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) 
			{
                console.log("Contact has been added!");
                //loadContacts();
                //showTable();
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

                // grab the table body element, and create a row for each contact
                let tbody = document.getElementById("tBody");
                for (let i = 0; i < jsonObject.results.length; i++) {
                    let row = createTableRow(jsonObject.results[i]);
                    tbody.appendChild(row);
                }
                
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}

function edit_row(row) 
{
    // change input fields to allow editing
    row.querySelectorAll('input[required]').forEach(input => {
        input.readOnly = false;
    });   
    changeRowButtons(row);
}

function updateContact(button)
{
    let row = button.parentNode.parentNode;
    let firstname = row.querySelector('[placeholder="First Name"]').value;
    let lastname = row.querySelector('[placeholder="Last Name"]').value;

    let name = firstname + " " + lastname;
    let phonenumber = row.querySelector('[placeholder="XXX-XXX-XXXX"]').value;
    let emailaddress = row.querySelector('[placeholder="name@email.com"]').value;
    let contactID =  row.getAttribute("data-contact-id");

    // check button checks for validity through the event listener, so no need to do it here again.

    row.querySelectorAll('input[required]').forEach(input => {
        input.readOnly = true;
    });   

    changeRowButtons(row);

    // change input fields back to regular border if needed
    row.querySelectorAll('input[required]').forEach(input => {
        if (input.value)
        input.style.borderColor = '';
    });

    let tmp = {
        name: name,
        phoneNumber: phonenumber,
        emailAddress: emailaddress,
        userId: userId,
        contactID: contactID
    };

	let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/EditContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) 
			{
                console.log("Contact has been added!");
                //loadContacts();
            }
        };
        xhr.send(jsonPayload);
    } 
	catch (err) 
	{
        console.log(err.message);
    }
}

function delete_row(row) 
{
    let namef_val = document.getElementById("first_Name" + no).innerText;
    let namel_val = document.getElementById("last_Name" + no).innerText;
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

        let url = urlBase + '/DeleteContact.' + extension;

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

    let fNameErr = lNameErr = phoneErr = emailErr = true;

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
        let regex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

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
        let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

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
