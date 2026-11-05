<?php
// Contact form endpoint for maheshbunage.com (sends mail through Mailjet).
//
// Credentials are read from a .env file that is NOT in the repo. Preferred
// location is outside the web root, so it can never be downloaded:
//   domains/maheshbunage.com/.env          (next to public_html)
// The old location (public_html/.env) still works as a fallback.

$allowed_origins = ["https://maheshbunage.com", "https://www.maheshbunage.com"];
$origin = $_SERVER["HTTP_ORIGIN"] ?? "";
if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Vary: Origin");
}
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["detail" => "Method not allowed"]);
    exit;
}

$env = false;
foreach ([__DIR__ . "/../../.env", __DIR__ . "/../.env"] as $path) {
    if (is_readable($path)) {
        $env = parse_ini_file($path);
        break;
    }
}
$env = $env ?: [];

$MAILJET_API_KEY    = $env["MAILJET_API_KEY"] ?? null;
$MAILJET_SECRET_KEY = $env["MAILJET_SECRET_KEY"] ?? null;
$FROM_EMAIL         = $env["FROM_EMAIL"] ?? null;
$TO_EMAIL           = $env["TO_EMAIL"] ?? null;

if (!$MAILJET_API_KEY || !$MAILJET_SECRET_KEY || !$FROM_EMAIL || !$TO_EMAIL) {
    http_response_code(500);
    echo json_encode(["detail" => "Email service not configured"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (!is_array($data)) {
    $data = [];
}

// Strip line breaks from single-line fields and cap lengths.
$name    = mb_substr(trim(preg_replace('/[\r\n]+/', ' ', (string)($data["name"] ?? ""))), 0, 100);
$email   = mb_substr(trim((string)($data["email"] ?? "")), 0, 254);
$message = mb_substr(trim((string)($data["message"] ?? "")), 0, 5000);

if ($name === "" || $email === "" || $message === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["detail" => "Invalid input"]);
    exit;
}

$h = fn($s) => htmlspecialchars($s, ENT_QUOTES, "UTF-8");

$payload = [
    "Messages" => [[
        "From" => [
            "Email" => $FROM_EMAIL,
            "Name"  => "$name via Portfolio"
        ],
        "To" => [[
            "Email" => $TO_EMAIL,
            "Name"  => "Mahesh"
        ]],
        "ReplyTo" => [
            "Email" => $email,
            "Name"  => $name
        ],
        "Subject" => "New message from $name",
        "TextPart" => "Name: $name\nEmail: $email\n\n$message",
        "HTMLPart" => "<h3>New Contact Message</h3>"
            . "<p><b>Name:</b> " . $h($name) . "</p>"
            . "<p><b>Email:</b> " . $h($email) . "</p>"
            . "<p><b>Message:</b><br>" . nl2br($h($message)) . "</p>"
    ]]
];

$ch = curl_init("https://api.mailjet.com/v3.1/send");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
    CURLOPT_USERPWD => $MAILJET_API_KEY . ":" . $MAILJET_SECRET_KEY,
    CURLOPT_TIMEOUT => 10
]);

$response = curl_exec($ch);
$status   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($status !== 200) {
    http_response_code(500);
    echo json_encode(["detail" => "Email sending failed"]);
    exit;
}

echo json_encode(["ok" => true, "detail" => "Message sent successfully"]);
