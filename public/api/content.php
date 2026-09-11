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

// GET Request: Serve live content from JSON storage
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        echo json_encode(["status" => "default", "message" => "Using default content"]);
    }
    exit();
}

// POST Request: Save updated content from Admin Panel
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    if (!empty($rawInput)) {
        file_put_contents($dataFile, $rawInput);
        echo json_encode(["success" => true, "message" => "Content updated live in Hostinger database!"]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "No data received"]);
    }
    exit();
}
?>
