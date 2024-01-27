<?php
    $inData = getRequestInfo();

    $id = $inData["id"];
    $email = $inData["email"];
    $password = $inData["password"];
    $ProfileImagePath = $inData["ProfileImagePath"];

    $conn = new mysqli("localhost", "Admins", "COP4331", "COP4331");
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } 
    else 
    {
        $stmt = $conn->prepare("UPDATE Users SET Email=?, Password=?, ProfileImagePath=? WHERE ID=?");
        $stmt->bind_param("sssi", $email, $password, $ProfileImagePath, $id);
        $stmt->execute();
        $stmt->close();
        $conn->close();
        returnWithError("");
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

// Which essentially, allows the user to upload a file (change ProfileImagePath), their email, and password
