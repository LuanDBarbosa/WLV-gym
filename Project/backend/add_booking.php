<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// ... existing headers and logic

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require "db.php";

try {
    // 1. Check if DB variables exist
    if (!isset($host, $username, $password, $dbname)) {
        throw new Exception("Database credentials missing in db.php");
    }

    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 2. Get and decode JSON
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        throw new Exception("No JSON data received from React.");
    }

    // 3. Prepare and Execute
    $query = "INSERT INTO GymBookings (username, booking_name, booking_time) VALUES (:username, :booking_name, :booking_time)";
    $stmt = $pdo->prepare($query);

    $stmt->execute([
        ':username'     => $data['username'] ?? 'Anonymous',
        ':booking_name' => $data['booking_name'] ?? 'General',
        ':booking_time' => $data['booking_time'] ?? date('Y-m-d H:i:s')
    ]);

    echo json_encode(["success" => true, "message" => "Booking saved!"]);

} catch (Exception $e) {
    // This sends the actual error message back to Axios
    http_response_code(500);
    echo json_encode([
        "success" => false, 
        "error" => $e->getMessage()
    ]);
}
?>