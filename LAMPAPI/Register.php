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
		$stmt = $conn->prepare("INSERT into USERS (FirstName,LastName,Email,Login,Password,ProfileImagePath) VALUES(?,?,?,?,?,?)");
		$stmt->bind_param("ssssss", $firstName,$lastName,$email,$username,$password,$profilePicPath);	
		$stmt->close();
		$conn->close();			
		returnWithError("Execute failed: " . $stmt->error);
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
