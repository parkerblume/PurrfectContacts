<?php
	$inData = getRequestInfo();
	
	$dateCreated = $inData["dateCreated"];
	$lastLoginDate = $inData["dateLastLoggedIn"];
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
		$sql = "SELECT ID FROM Users WHERE Login=?";
		$stmt = $conn->prepare($sql);
		$stmt->bind_param("s", $username);
		$stmt->execute();
		$result = $stmt->get_result();
		$stmt->
		$rows = mysqli_num_rows($result);
		if ($rows == 0)
		{
			$stmt = $conn->prepare("INSERT into Users (FirstName, LastName, Email, Login, Password, ProfileImagePath) VALUES(?,?,?,?,?,?)");
			$stmt->bind_param("ssssss", $firstName, $lastName, $email, $username, $password, $profilePicPath);
			$stmt->execute();
			$id = $conn->insert_id;
			$stmt->close();
			$conn->close();
			http_response_code(200);
			$searchResults .= '{'.'"id": "'.$id.''.'"}';

			returnWithInfo($searchResults);
		} else {
			http_response_code(409);
			returnWithError("Username taken");
		}
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
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
