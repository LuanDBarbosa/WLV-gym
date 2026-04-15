<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require "db.php";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $cleanQuery = "DELETE FROM bookings WHERE DATE(time) < CURDATE()";
    $pdo->exec($cleanQuery);
    $username = isset($_GET['username']) ? $_GET['username'] : null;

    if ($username) {
        $stmt = $pdo->prepare("SELECT username, booking_name, time FROM bookings WHERE username = :user");
        $stmt->bindParam(':user', $username);
        $stmt->execute();
        $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($bookings) {
            echo json_encode($bookings);
        } else {
            echo json_encode([]); 
        }
    } else {
        echo json_encode(["error" => "No username provided."]);
    }

} catch (PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}
?>