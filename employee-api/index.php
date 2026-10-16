<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(204);
    exit;
}

$conn = mysqli_connect("localhost", "root", "", "employee_directory");

if (!$conn) {
    http_response_code(500);
    echo json_encode(["error" => "db failed"]);
    exit;
}

$method = $_SERVER["REQUEST_METHOD"];

$id = 0;
if (isset($_GET["id"])) {
    $id = (int)$_GET["id"];
}

$data  = json_decode(file_get_contents("php://input"), true);
$name  = isset($data["name"])  ? mysqli_real_escape_string($conn, trim($data["name"]))  : "";
$email = isset($data["email"]) ? mysqli_real_escape_string($conn, trim($data["email"])) : "";
$role  = isset($data["role"])  ? mysqli_real_escape_string($conn, trim($data["role"]))  : "";

// ---------- GET: all employees ----------
if ($method == "GET") {
    $result = mysqli_query($conn, "SELECT * FROM employees ORDER BY id DESC");

    $employees = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $employees[] = $row;
    }

    echo json_encode($employees);
    exit;
}

// ---------- add employee ----------
if ($method == "POST") {
    if ($name == "" || $email == "" || $role == "") {
        http_response_code(422);
        echo json_encode(["error" => "name, email and role are required"]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(422);
        echo json_encode(["error" => "invalid email"]);
        exit;
    }

    $check = mysqli_query($conn, "SELECT id FROM employees WHERE email = '$email'");
    if (mysqli_num_rows($check) > 0) {
        http_response_code(409);
        echo json_encode(["error" => "email already exists"]);
        exit;
    }

    mysqli_query($conn, "INSERT INTO employees (name, email, role) VALUES ('$name', '$email', '$role')");
    $newId = mysqli_insert_id($conn);

    $result = mysqli_query($conn, "SELECT * FROM employees WHERE id = $newId");
    http_response_code(201);
    echo json_encode(mysqli_fetch_assoc($result));
    exit;
}

if ($method == "PUT") {
    if ($id == 0) {
        http_response_code(400);
        echo json_encode(["error" => "ID required"]);
        exit;
    }

    if ($name == "" || $email == "" || $role == "") {
        http_response_code(422);
        echo json_encode(["error" => "name, email and role are required"]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(422);
        echo json_encode(["error" => "invalid email address"]);
        exit;
    }

    $exists = mysqli_query($conn, "SELECT id FROM employees WHERE id = $id");
    if (mysqli_num_rows($exists) == 0) {
        http_response_code(404);
        echo json_encode(["error" => "Employee not found"]);
        exit;
    }

    $check = mysqli_query($conn, "SELECT id FROM employees WHERE email = '$email' AND id != $id");
    if (mysqli_num_rows($check) > 0) {
        http_response_code(409);
        echo json_encode(["error" => "email already exists"]);
        exit;
    }

    mysqli_query($conn, "UPDATE employees SET name='$name', email='$email', role='$role' WHERE id=$id");

    $result = mysqli_query($conn, "SELECT * FROM employees WHERE id=$id");
    echo json_encode(mysqli_fetch_assoc($result));
    exit;
}

// ---------- DELETE----------
if ($method == "DELETE") {
    if ($id == 0) {
        http_response_code(400);
        echo json_encode(["error" => "ID required"]);
        exit;
    }

    mysqli_query($conn, "DELETE FROM employees WHERE id = $id");

    if (mysqli_affected_rows($conn) > 0) {
        echo json_encode(["message" => "employee deleted"]);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "employee not found"]);
    }
    exit;
}
?>