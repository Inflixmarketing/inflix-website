<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataFile = __DIR__ . '/content_db.json';

// GET Request: Serve live content from server storage file
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        $data = file_get_contents($dataFile);
        if ($data !== false && !empty($data)) {
            echo $data;
            exit();
        }
    }
    echo json_encode(["status" => "default", "message" => "Using default content"]);
    exit();
}

// POST Request: Save updated content from Admin Panel
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    if (!empty($rawInput)) {
        // Validate JSON payload
        $decoded = json_decode($rawInput, true);
        if ($decoded !== null) {
            $saved = file_put_contents($dataFile, $rawInput);
            if ($saved !== false) {
                echo json_encode(["success" => true, "message" => "Content updated live on Hostinger server!"]);
                exit();
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Failed to write content_db.json on server. Check folder write permissions."]);
                exit();
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Invalid JSON payload received."]);
            exit();
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "No data received."]);
        exit();
    }
}
?>
