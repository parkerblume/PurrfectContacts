<?php
    $inData = getRequestInfo();

    $id = $inData["id"];
    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $email = $inData["email"];
    $password = $inData["password"];
    $ProfileImagePath = $inData["profilePicPath"];

    $conn = new mysqli("localhost", "Admins", "COP4331", "COP4331");
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } 
    else 
    {
        $stmt = $conn->prepare("UPDATE Users SET FirstName=?, LastName=?, Email=?, Password=?, ProfileImagePath=? WHERE ID=?");
        $stmt->bind_param("sssssi", $firstName, $lastName, $email, $password, $ProfileImagePath, $id);
        if ($stmt->execute())
        {
            $stmt->close();
            $conn->close();
            http_response_code(200);
            returnWithInfo( $firstName, $lastName, $email, $ProfileImagePath, $id );
        }
        else
        {
            $stmt->close();
            $conn->close();
            http_response_code(400);
            returnWithError("Failed to update!");
        }
    }

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err)
    {
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithInfo( $firstName, $lastName, $email, $profilePicPath, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","email":"' . $email . '","profilePicPath":"' . $profilePicPath . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>
