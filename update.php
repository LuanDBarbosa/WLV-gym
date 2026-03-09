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
$stmt = $pdo->prepare("UPDATE users SET username = :username, email = :email, password = :password");
$ok = $stmt->execute([":username" => $username,":email"=>$email,":password" => $hashed]);

if ($ok) {
    echo json_encode(["success" => true, "message" => "User updated"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update user credentials"]);
}
?>