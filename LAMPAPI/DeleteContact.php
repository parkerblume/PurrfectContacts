<?php
    $inData = getRequestInfo();

    $userId = $inData["userId"];
    $id = $inData["id"];

    $conn = new mysqli("localhost", "Admins", "COP4331", "COP4331");
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } 
    else 
    {
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE UserID=? AND ID=?");
        $stmt->bind_param("ii", $userId, $id);
        if ($stmt->execute())
        {
            http_response_code(200);
            returnWithError("");
        }
        else
        {
            returnWithError("Unable to delete contact");
        }
        
        $stmt->close();
        $conn->close();
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
?>
