<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require "db.php";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT COUNT(*) FROM bookings WHERE DATE(time) = CURDATE()");
    
    $count = $stmt->fetchColumn();

    // Output only the value
    echo json_encode($count);

} catch (PDOException $e) {
    echo json_encode(0);
}
?>