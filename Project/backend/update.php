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

$oldUsername = $data["oldUsername"] ?? "";
$newUsername = $data["username"] ?? "";
$course = $data["course"] ?? "";
$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

// Validate
if (!$newUsername || !$email || !$password || !$oldUsername) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

// Hash password securely
$hashed = password_hash($password, PASSWORD_DEFAULT);

// Insert into DB
$stmt = $pdo->prepare("UPDATE users SET username = :newUsername, course = :course, email = :email, password = :password WHERE username = :oldUsername");
$ok = $stmt->execute([
    ":newUsername" => $newUsername,
    ":course"      => $course,
    ":email"       => $email,
    ":password"    => $hashed,
    ":oldUsername" => $oldUsername
]);

if ($ok) {
    echo json_encode(["success" => true, "message" => "User updated"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update user credentials"]);
}
?>