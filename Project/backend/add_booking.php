<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require "db.php";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $data = json_decode(file_get_contents("php://input"), true);

    if (
        !empty($data['username']) &&
        !empty($data['booking_name']) &&
        !empty($data['time'])
    ) {
        $query = "INSERT INTO bookings (username, booking_name, booking_time) VALUES (:username, :booking_name, :time)";
        
        $stmt = $pdo->prepare($query);

        // Sanitize inputs
        $username = htmlspecialchars(strip_tags($data['username']));
        $booking_name = htmlspecialchars(strip_tags($data['booking_name']));
        $time = htmlspecialchars(strip_tags($data['time']));

        // Bind parameters
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':booking_name', $booking_name);
        $stmt->bindParam(':time', $time);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Booking successfully created."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to create booking."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Unable to create booking. Data is incomplete."]);
    }

} catch (PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}
?>