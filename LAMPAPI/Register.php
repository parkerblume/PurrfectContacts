<?php
	$inData = getRequestInfo();
	
	$dateCreated = $inData["dateCreated"];
	$lastLoginDate = $inData["lastLoginDate"];
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$email = $inData["email"];
	$username = $inData["username"];
	$password = $inData["password"];
	$profilePicPath = $inData["profilePicPath"]

	// Check if the email is valid.
	if(!filter_var($email, FILTER_VALIDATE_EMAIL))
	{
		returnWithError("Invalid email format");
		exit();
	}

	// Check if the password meet the requirements.
	if (strlen($password) < 6 || !(preg_match('/[A-Z]/', $password) && preg_match('/[a-z]/', $password) && preg_match('/[0-9]/', $password) && preg_match('/[A-Za-z]/', $password) && preg_match('/[^\w]/', $password)))
	{
		returnWithError("Password must be at leat 8 characters, contain uppercase letter, number, and a special characters");
		exit();
	}

		$conn = new mysqli("localhost", "Admins", "COP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into USERS (DateCreated,DateLastLoggedIn,FirstName,LastName,Email,Login,Password,ProfileImagePath) VALUES(?,?,?,?,?,?,?,?)");
		$stmt->bind_param("sssssss", $dateCreated,$lastLoginDate,$firstName,$lastName,$email,$username,$password,$profilePicPath);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
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
