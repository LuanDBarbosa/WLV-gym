<?php
error_reporting(0); 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require "db.php";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT COUNT(*) FROM GymBookings WHERE DATE(booking_time) = CURDATE()");
    $count = (int)$stmt->fetchColumn();

    $maxCapacity = 100;
    
    $percentage = ($count / $maxCapacity) * 100;

    echo json_encode([
        "count" => $count,
        "percentage" => $percentage
    ]);

} catch (PDOException $e) {
    echo json_encode(["count" => 0, "percentage" => 0]);
}
?>