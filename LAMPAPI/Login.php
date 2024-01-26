
<?php
	session_start(); 
	$inData = getRequestInfo();
	
	$id = 0;
	$firstName = "";
	$lastName = "";
	$email = "";

	$conn = new mysqli("localhost", "Admins", "COP4331", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT ID,FirstName,LastName,Email,ProfileImagePath FROM Users WHERE Login=? AND Password =?");
		$stmt->bind_param("ss", $inData["login"], $inData["password"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			$_SESSION['id'] = $row['ID'];
			$_SESSION['firstName'] = $row['FirstName'];
			$_SESSION['lastName'] = $row['LastName'];
			$_SESSION['email'] = $row['Email'];
			$_SESSION['profileImage'] = $row['ProfileImagePath'];
			returnWithInfo( $row['FirstName'], $row['LastName'], $row['Email'], $row['ProfileImagePath'], $row['ID'] );
		}
		else
		{
			returnWithError("No Records Found");
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $email, $profilePicPath, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","email":"' . $email . '","profilePicPath":"' . $profilePicPath . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
