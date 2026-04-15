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
$course = $data["course"] ?? "";
$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

// Validate
if (!$username || !$email || !$password) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

// Hash password securely
$hashed = password_hash($password, PASSWORD_DEFAULT);

// Insert into DB
$stmt = $pdo->prepare("INSERT INTO users (username, course, email, password) VALUES (?, ?, ?, ?)");
$ok = $stmt->execute([$username, $course, $email, $hashed]);

if ($ok) {
    echo json_encode(["success" => true, "message" => "User registered successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Database insert failed"]);
}
?>