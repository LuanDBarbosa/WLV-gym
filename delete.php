<?php
// --- CORS HEADERS ---
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require "db.php";

// Decode JSON from React
$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"] ?? "";

// Validate
if (!$username) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}
// Insert into DB
$stmt = $pdo->prepare("DELETE FROM users WHERE username = :username");
$stmt->bindParam(":username",$username, PDO::PARAM_STR);
$ok = $stmt->execute();

if ($ok) {
    echo json_encode(["success" => true, "message" => "User deleted"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to delete user"]);
}
?>