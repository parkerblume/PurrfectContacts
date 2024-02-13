<?php
	$inData = getRequestInfo();
	
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$email = $inData["email"];
	$username = $inData["username"];
	$password = $inData["password"];
	$profilePicPath = $inData["profilePicPath"];


	// Password and Email has been checked and hashed on client side -> therefore, no need to check here (for this anyways).

	$conn = new mysqli("localhost", "Admins", "COP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		// Check for duplicate User
		$sql = "SELECT ID FROM Users WHERE Login=?";
		$stmt = $conn->prepare($sql);
		$stmt->bind_param("s", $username);
		$stmt->execute();
		$result = $stmt->get_result();
		$rows = mysqli_num_rows($result);
		if ($rows == 0)
		{
			// if no duplicate, add user to table.
			$stmt = $conn->prepare("INSERT into Users (FirstName, LastName, Email, Login, Password, ProfileImagePath) VALUES(?,?,?,?,?,?)");
			$stmt->bind_param("ssssss", $firstName, $lastName, $email, $username, $password, $profilePicPath);
			$stmt->execute();
			$id = $conn->insert_id;
			http_response_code(200);

		} else {
			http_response_code(409);
			returnWithError("Username taken");
		}

		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>
