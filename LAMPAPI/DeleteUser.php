<?php
    $inData = getRequestInfo();

    $userId = $inData["id"];

    $conn = new mysqli("localhost", "Admins", "COP4331", "COP4331");
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } 
    else 
    {
        $stmt = $conn->prepare("DELETE FROM Users WHERE ID=?");
        $stmt->bind_param("i", $userId);
        if ($stmt->execute())
        {
            $stmt->close();
            $conn->close();
            http_response_code(200);
        }
        else
        {
            $stmt->close();
            $conn->close();
            http_response_code(400);
            returnWithError("");
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
