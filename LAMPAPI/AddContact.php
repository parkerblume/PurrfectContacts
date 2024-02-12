<?php
	$inData = getRequestInfo();
	
	$name = $inData["name"];
	$phone = $inData["phoneNumber"];
	$email = $inData["emailAddress"];
	$userID = $inData["userId"];
	$contactImagePath = $inData["contactImagePath"];


	$conn = new mysqli("localhost", "Admins", "COP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (Name,Phone,Email,UserID,ContactImagePath) VALUES(?,?,?,?,?)");
		$stmt->bind_param("sssis", $name, $phone, $email, $userID, $contactImagePath);
		if ($stmt->execute())
		{
			$stmt->close();
			$conn->close();
			http_response_code(200);
			returnWithError("");
		}
		else
		{
			$stmt->close();
			$conn->close();
			http_response_code(400);
			returnWithError("Failed to add contact.");
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
	
?>
