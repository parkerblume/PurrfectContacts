<?php
    $inData = getRequestInfo();

    $name = $inData["name"];
    $phone = $inData["phoneNumber"];
    $email = $inData["email"];
    $userId = $inData["userId"];
    $id = $inData["contactID"];

    $conn = new mysqli("localhost", "Admins", "COP4331", "COP4331");
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } 
    else 
    {
        $stmt = $conn->prepare("UPDATE Contacts SET Name=?, Phone=?, Email=? WHERE UserID=? AND ID=?");
        $stmt->bind_param("sssii", $name, $phone, $email, $userId, $id);
        if ($stmt->execute())
        {
            $stmt->close();
            $conn->close();
            http_response_code(200);
            responseWithError("");
        }
        else
        {
            $stmt->close();
            $conn->close();
            returnWithError("Could not update contact");
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
?>
